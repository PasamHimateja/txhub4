import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  User,
  Search,
  ShoppingCart,
  AlertCircle,
  FileText,
  Link as LinkIcon,
  Video,
  PlayCircle,
  Lock,
  Unlock,
  ExternalLink,
  ChevronRight,
  BadgeCheck
} from "lucide-react";
import SEO from "../components/SEO";
import { AuthContext } from "../context/AuthContext";

const CountdownTimer = ({ id, dateStr, timeStr, onStatusChange }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!dateStr || !timeStr) {
      setStatus("Pending");
      return;
    }

    const createTargetDate = () => {
      const [year, month, day] = dateStr.split('-');
      const [hours, minutes, seconds] = timeStr.split(':');

      const target = new Date();
      target.setFullYear(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
      target.setHours(parseInt(hours, 10), parseInt(minutes, 10) || 0, parseInt(seconds, 10) || 0, 0);
      return target;
    };

    const targetDate = createTargetDate();

    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        if (diff > -10800000) { // 3 hours window for "Live Now"
          setTimeLeft("Live Now");
          setStatus("Live");
        } else {
          setTimeLeft("Class Ended");
          setStatus("Ended");
        }
        return false;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${h}h ${m}m ${s}s`);
      setStatus("Upcoming");
      return true;
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, [dateStr, timeStr]);

  useEffect(() => {
    if (onStatusChange && status) {
      onStatusChange(id, status);
    }
  }, [id, status, onStatusChange]); // Now safer with useCallback

  if (!status || status === "Pending") return null;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${status === "Live" ? "bg-rose-50 text-rose-600 animate-pulse border border-rose-100" :
      status === "Ended" ? "bg-slate-100 text-slate-500 border border-slate-200" :
        "bg-blue-50 text-blue-600 border border-blue-100"
      }`}>
      {status === "Live" && <div className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-ping" />}
      {status === "Upcoming" && <Clock size={10} />}
      {status === "Upcoming" ? `Starts in ${timeLeft}` : timeLeft}
    </div>
  );
};

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [resources, setResources] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [recordedClasses, setRecordedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classStatus, setClassStatus] = useState({});

  const handleStatusChange = useCallback((id, status) => {
    setClassStatus(prev => {
      if (prev[id] === status) return prev;
      return { ...prev, [id]: status };
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const [enrollmentRes, resourceRes, liveRes, recordedRes] = await Promise.all([
          fetch(`http://127.0.0.1:8000/api/enrollments/?email=${user.email}`),
          fetch(`http://127.0.0.1:8000/api/resource/`),
          fetch(`http://127.0.0.1:8000/api/live/`),
          fetch(`http://127.0.0.1:8000/api/recorded/`)
        ]);

        const enrollmentData = await enrollmentRes.json();
        const resourceData = resourceRes.ok ? await resourceRes.json() : [];
        const liveData = liveRes.ok ? await liveRes.json() : [];
        const recordedData = recordedRes.ok ? await recordedRes.json() : [];

        if (enrollmentRes.ok) {
          setEnrollments(enrollmentData.data || []);
        } else {
          setError(enrollmentData.error || "Failed to fetch courses");
        }

        if (resourceRes.ok) setResources(resourceData);
        if (liveRes.ok) setLiveClasses(liveData);
        if (recordedRes.ok) setRecordedClasses(recordedData);

      } catch (err) {
        console.error("Fetch error:", err);
        setError("Something went wrong while loading your dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const matchesCourse = (target, courseTitle) => {
    if (!target || !courseTitle) return false;
    const t = target.toLowerCase();
    const e = courseTitle.toLowerCase();
    if (t === 'all courses' || e === 'all courses') return true;
    return t === e || e.includes(t) || t.includes(e);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
            <BookOpen size={24} className="text-blue-600 animate-pulse" />
          </div>
        </div>
        <p className="mt-6 text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Synchronizing Dashboard</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 font-sans selection:bg-blue-100">
      <SEO 
        title="My Courses" 
        description="Access your enrolled courses, live sessions, and learning materials on your TXhub dashboard." 
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Modern Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
              <BadgeCheck size={12} /> Student Dashboard
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[0.9] group">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-600 transition-all duration-700">Learning</span>
              <br />
              Experience
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-xl">
              Glad to see you again, <span className="text-slate-900 font-bold underline decoration-blue-500/30 decoration-4 underline-offset-4">{user?.full_name || "Scholar"}</span>. Your progress is our mission.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col gap-1 items-start min-w-[160px]">
              <div className="p-2 bg-blue-50 rounded-xl text-blue-600 mb-2"><BookOpen size={20} /></div>
              <p className="text-3xl font-black text-slate-900 leading-none">{enrollments.length}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Courses</p>
            </div>
            <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col gap-1 items-start min-w-[160px]">
              <div className="p-2 bg-blue-50 rounded-xl text-blue-600 mb-2"><Calendar size={20} /></div>
              <p className="text-3xl font-black text-slate-900 leading-none">{liveClasses.length}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Sessions</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-12 p-6 bg-rose-50 border-2 border-rose-100 rounded-[2rem] flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-600 shadow-sm shrink-0"><AlertCircle size={24} /></div>
            <div>
              <p className="text-rose-900 font-black text-sm uppercase tracking-widest">System Alert</p>
              <p className="text-rose-600 font-medium">{error}</p>
            </div>
          </div>
        )}

        {enrollments.length === 0 ? (
          <div className="bg-white rounded-[4rem] p-16 lg:p-32 text-center border border-slate-100 shadow-2xl space-y-12">
            <div className="relative inline-block">
              <div className="w-40 h-40 bg-slate-50 rounded-[3rem] flex items-center justify-center text-slate-200">
                <ShoppingCart size={80} strokeWidth={1} />
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl animate-bounce">
                <Search size={24} />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900">Your Journey Starts Here</h2>
              <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed text-lg">You haven't enrolled in any courses yet. Transform your career with our industry-leading programs.</p>
            </div>
            <button
              onClick={() => navigate("/explore")}
              className="inline-flex items-center gap-4 px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-blue-200 group"
            >
              Browse Elite Courses
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {enrollments.map((enrollment, idx) => {
              const isFullyPaid = enrollment.payment_status?.toLowerCase() === 'completed';
              const courseLive = liveClasses.find(live => matchesCourse(live.targetCourse, enrollment.title));
              const courseRecorded = recordedClasses.filter(rec => matchesCourse(rec.targetCourse, enrollment.title));
              const courseRes = resources.filter(res => matchesCourse(res.targetCourse, enrollment.title));

              return (
                <div key={enrollment.id} className="group relative">
                  {/* Card Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-blue-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>

                  <div className="relative bg-white rounded-[3rem] border border-slate-100 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] group-hover:-translate-y-2">
                    <div className="p-8 lg:p-12">
                      <div className="flex flex-col lg:flex-row gap-12">

                        {/* Main Info */}
                        <div className="flex-1 space-y-8">
                          <div className="flex items-start justify-between">
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border border-blue-100">ID: #{String(enrollment.id).padStart(4, '0')}</span>
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] border ${isFullyPaid ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                  }`}>
                                  {enrollment.payment_status}
                                </span>
                              </div>
                              <h2 className="text-3xl font-black text-slate-800 leading-none group-hover:text-blue-600 transition-colors">
                                {enrollment.title}
                              </h2>
                              <div className="flex items-center gap-4 text-slate-400">
                                <span className="flex items-center gap-1.5 text-xs font-bold"><Calendar size={14} className="text-blue-400" /> {enrollment.batch_date}</span>
                                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                <span className="text-xs font-bold tracking-tight uppercase">Enrolled: {new Date(enrollment.created_at).toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="hidden sm:flex flex-col items-end gap-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Investment</p>
                              <p className="text-2xl font-black text-slate-900 italic">₹{enrollment.amount_paid}</p>
                              {!isFullyPaid && (
                                <p className="text-[10px] font-black text-rose-500 uppercase tracking-tighter">Due: ₹{enrollment.total_fee - enrollment.amount_paid}</p>
                              )}
                            </div>
                          </div>

                          {/* Live Action Section */}
                          <div className="p-2 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
                            <div className="flex items-center gap-5 p-4 pl-6">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${courseLive ? 'bg-blue-600 shadow-blue-200' : 'bg-slate-300 shadow-slate-200'
                                }`}>
                                <Video size={24} />
                              </div>
                              <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Class</p>
                                <div className="flex items-center gap-3">
                                  <h4 className="text-lg font-black text-slate-800">{courseLive?.topic || (courseLive?.time ? "Live Session Available" : "Upcoming Session")}</h4>
                                  {courseLive?.date && courseLive?.time && (
                                    <CountdownTimer
                                      id={enrollment.id}
                                      dateStr={courseLive.date}
                                      timeStr={courseLive.time}
                                      onStatusChange={handleStatusChange}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-4 p-4 pr-6 w-full md:w-auto">
                              {courseLive ? (
                                <>
                                  {!isFullyPaid ? (
                                    <button
                                      onClick={() => navigate("/checkout", { 
                                        state: { 
                                          items: [{ title: enrollment.title, price: enrollment.total_fee - enrollment.amount_paid }],
                                          isBalancePayment: true,
                                          totalOriginal: enrollment.total_fee,
                                          amountPreviouslyPaid: enrollment.amount_paid
                                        } 
                                      })}
                                      className="flex items-center gap-3 px-8 py-3.5 bg-rose-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl shadow-rose-200"
                                    >
                                      <Lock size={14} /> Unlock Live Class
                                    </button>
                                  ) : (
                                    classStatus[enrollment.id] === "Live" ? (
                                      <a
                                        href={courseLive.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-300 animate-in fade-in zoom-in duration-500"
                                      >
                                        <Unlock size={14} /> Join Now
                                      </a>
                                    ) : (
                                      <button disabled className="flex items-center gap-3 px-8 py-3.5 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black text-[11px] uppercase tracking-widest cursor-not-allowed">
                                        <Clock size={14} /> Wait for time
                                      </button>
                                    )
                                  )}
                                </>
                              ) : (
                                <p className="text-[10px] font-black text-slate-400 uppercase italic opacity-50 px-6">Schedule Pending</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Sidebar Resources/Recordings */}
                        <div className="lg:w-80 space-y-8">
                          {/* Resources */}
                          <div className="space-y-4">
                            <h5 className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                              <LinkIcon size={12} className="text-blue-500" /> Digital Assets
                            </h5>
                            <div className="space-y-2">
                              {courseRes.length > 0 ? courseRes.map(res => (
                                <a key={res.id} href={res.driveLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-slate-50/50 hover:bg-blue-50 rounded-2xl border border-slate-100/50 transition-all group/res">
                                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-blue-600 shadow-sm"><FileText size={14} /></div>
                                  <p className="text-[11px] font-bold text-slate-600 truncate flex-1">{res.title}</p>
                                  <ExternalLink size={12} className="text-slate-300 group-hover/res:text-blue-500" />
                                </a>
                              )) : (
                                <p className="text-[10px] font-bold text-slate-300 italic py-2">No assets available yet.</p>
                              )}
                            </div>
                          </div>

                          {/* Recordings - Accessible to all */}
                          <div className="space-y-4">
                            <h5 className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest border-b border-emerald-100 pb-2">
                              <PlayCircle size={12} /> Recorded Sessions
                            </h5>
                            <div className="grid grid-cols-1 gap-2">
                              {courseRecorded.length > 0 ? courseRecorded.map(rec => (
                                <div key={rec.id} className="group/rec bg-emerald-50/30 p-4 rounded-3xl border border-emerald-100/50 space-y-3">
                                  <div>
                                    <p className="text-[11px] font-black text-emerald-900 leading-tight line-clamp-1">{rec.title}</p>
                                    <p className="text-[9px] font-bold text-emerald-600 flex items-center gap-1 mt-1"><Clock size={10} /> {rec.duration || "Full Session"}</p>
                                  </div>
                                  <a href={rec.videoLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-2 bg-white text-emerald-700 rounded-xl border border-emerald-200 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                                    Watch <ChevronRight size={12} />
                                  </a>
                                </div>
                              )) : (
                                <p className="text-[10px] font-bold text-slate-300 italic py-2">Library empty.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;