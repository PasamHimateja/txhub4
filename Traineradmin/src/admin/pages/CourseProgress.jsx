import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Users, Layers, UserCheck, Clock, Search, Mail, Phone,
  CheckCircle, AlertCircle, Award, Sparkles, BookOpen, Shield,
  TrendingUp, Filter, RefreshCw, BarChart2, PieChart, ChevronRight,
  Bell, Calendar, Download, SlidersHorizontal, MoreVertical
} from 'lucide-react';

const getCourseImage = (title) => {
  const t = (title || '').toLowerCase();
  if (t.includes('react') || t.includes('mern') || t.includes('mongodb')) {
    return 'http://localhost:5173/src/website/assets/react_full.jpg';
  }
  if (t.includes('java')) {
    return 'http://localhost:5173/src/website/assets/java_full.jpg';
  }
  if (t.includes('testing') || t.includes('qa') || t.includes('selenium')) {
    return 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&q=80';
  }
  if (t.includes('aws') || t.includes('devops')) {
    return 'http://localhost:5173/src/website/assets/aws.jpg';
  }
  if (t.includes('learning') || t.includes('ml')) {
    return 'http://localhost:5173/src/website/assets/ml.jpg';
  }
  if (t.includes('ui/ux') || t.includes('figma')) {
    return 'http://localhost:5173/src/website/assets/ui_ux.jpg';
  }
  if (t.includes('science')) {
    return 'http://localhost:5173/src/website/assets/dataScience.jpg';
  }
  if (t.includes('analytics')) {
    return 'http://localhost:5173/src/website/assets/Data%20Analytics.jpg';
  }
  if (t.includes('python')) {
    return 'http://localhost:5173/src/website/assets/python%20full%20stack.jpg';
  }
  return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80';
};

// Professional avatars matching the screenshot style
const STUDENT_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150";
const MENTOR_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150";

const CourseProgress = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [courseTitle, setCourseTitle] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedMentor, setSelectedMentor] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [dateRange, setDateRange] = useState('');

  // Resolve course name to title
  useEffect(() => {
    let title = 'Course Progress';
    if (courseId === 'react-full-stack-development') title = 'MERN Stack / React Full Stack';
    else if (courseId === 'java-full-stack') title = 'Java Full Stack Development';
    else if (courseId === 'testing') title = 'Software Testing & Automation';
    else {
      title = courseId.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    }
    setCourseTitle(title);
  }, [courseId]);

  // Fetch course progress data from backend API
  const fetchProgressData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}/progress/`);
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students || []);
      }
    } catch (err) {
      console.error("Failed to fetch course progress:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, [courseId]);

  // Dynamic values based on backend output
  const uniqueBatches = Array.from(new Set(students.map(s => s.batch_name))).filter(Boolean);
  const uniqueMentors = Array.from(new Set(students.map(s => s.mentor_name))).filter(Boolean);

  const totalEnrolled = students.length;
  const completedCount = students.filter(s => s.status === 'completed').length;
  const inProgressCount = totalEnrolled - completedCount;
  const activeBatchesCount = uniqueBatches.filter(b => b !== 'Unassigned').length;
  const activeMentorsCount = uniqueMentors.filter(m => m !== 'Unassigned').length;
  
  const completionRate = totalEnrolled > 0 ? Math.round((completedCount / totalEnrolled) * 100) : 0;
  const avgProgress = totalEnrolled > 0 ? Math.round(students.reduce((acc, s) => acc + s.progress, 0) / totalEnrolled) : 0;

  // Filtered student roster
  const filteredStudents = students.filter(s => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
    const matchesBatch = selectedBatch === 'All' || s.batch_name === selectedBatch;
    const matchesMentor = selectedMentor === 'All' || s.mentor_name === selectedMentor;
    const matchesStatus = selectedStatus === 'All' || 
                          (selectedStatus === 'Completed' && s.status === 'completed') ||
                          (selectedStatus === 'In Progress' && s.status !== 'completed');
    
    return matchesSearch && matchesBatch && matchesMentor && matchesStatus;
  });

  // Calculate Batch average progress for Chart 2
  const batchMetrics = uniqueBatches.map(bName => {
    const batchStudents = students.filter(s => s.batch_name === bName);
    const avg = batchStudents.length > 0 ? Math.round(batchStudents.reduce((acc, s) => acc + s.progress, 0) / batchStudents.length) : 0;
    return { name: bName, avg };
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans pb-16">
      
      {/* ── TOP NAV BAR ── */}
      <div className="bg-white border-b border-slate-100 py-3.5 px-8 sticky top-0 z-50 flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/courses')}
          className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 font-bold transition-all text-sm"
        >
          <ArrowLeft size={16} /> Back to Courses
        </button>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
            Operational Dashboard
          </span>
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600 hover:text-indigo-600 transition-colors">
            <Bell size={16} />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
          </button>
        </div>
      </div>

      {/* ── HERO BANNER ── */}
      <div className="max-w-7xl mx-auto px-8 mt-6">
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Laptop Background Effect on the right side */}
          <div 
            className="absolute inset-y-0 right-0 w-1/2 bg-cover bg-center opacity-30 mix-blend-overlay hidden md:block"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800')` }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-left">
            {/* Thumbnail Card */}
            <div className="w-32 h-32 rounded-2xl bg-indigo-900/60 border border-white/10 p-4 flex flex-col items-center justify-center shadow-2xl shrink-0">
              <img 
                src={getCourseImage(courseTitle)} 
                alt="Course logo" 
                className="w-16 h-16 object-contain rounded-xl"
              />
              <span className="text-[10px] font-black uppercase text-indigo-300 tracking-wider mt-2">
                {courseId.includes('java') ? 'Java' : 'React'}
              </span>
            </div>

            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-wider">
                Full Stack Development
              </span>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-none">
                {courseTitle}
              </h1>
              <p className="text-slate-300 text-xs max-w-xl leading-relaxed">
                Monitor student syllabus progress, completion metrics, active cohort batches, and mentor mappings.
              </p>

              {/* Quick stats row */}
              <div className="flex flex-wrap items-center gap-5 pt-1 text-slate-300 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <UserCheck size={14} className="text-indigo-400" />
                  {activeMentorsCount} Mentor{activeMentorsCount !== 1 ? 's' : ''}
                </span>
                <span className="flex items-center gap-1.5">
                  <Layers size={14} className="text-indigo-400" />
                  {activeBatchesCount} Active Batch{activeBatchesCount !== 1 ? 'es' : ''}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={14} className="text-indigo-400" />
                  {totalEnrolled} Enrolled Student{totalEnrolled !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Floating Mentor Info on the right */}
          {uniqueMentors.length > 0 && (
            <div className="relative z-10 bg-slate-900/80 border border-white/10 backdrop-blur-md rounded-2xl p-3.5 flex items-center gap-3 shrink-0 self-end md:self-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest absolute -top-2.5 left-4 bg-slate-950 px-2 py-0.5 rounded-md border border-white/5">
                Mentor
              </span>
              <img 
                src={MENTOR_AVATAR} 
                alt="Mentor Avatar" 
                className="w-9 h-9 rounded-full object-cover border border-white/20"
              />
              <div className="text-left">
                <p className="font-extrabold text-white text-xs leading-none">{uniqueMentors[0]}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    ★ 4.9
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── KPI STATS CARDS (5 cards exactly as pictured) ── */}
      <div className="max-w-7xl mx-auto px-8 mt-6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        
        {/* Card 1: Total Enrolled */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div className="space-y-1.5 text-left">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Enrolled</p>
            <h2 className="text-3xl font-black text-slate-800 leading-none">{totalEnrolled}</h2>
            <p className="text-[10px] text-slate-400 font-semibold">— No change</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <Users size={16} />
          </div>
        </div>

        {/* Card 2: Completion Rate */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div className="space-y-1.5 text-left">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completion Rate</p>
            <h2 className="text-3xl font-black text-slate-800 leading-none">{completionRate}%</h2>
            <p className="text-[10px] text-emerald-500 font-bold">↑ {completionRate}% vs last 30 days</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <CheckCircle size={16} />
          </div>
        </div>

        {/* Card 3: Students Completed */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div className="space-y-1.5 text-left">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Students Completed</p>
            <h2 className="text-3xl font-black text-slate-800 leading-none">{completedCount}</h2>
            <p className="text-[10px] text-emerald-500 font-bold">↑ {completedCount > 0 ? '100%' : '0%'} vs last 30 days</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Award size={16} />
          </div>
        </div>

        {/* Card 4: Students In Progress */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div className="space-y-1.5 text-left">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Students In Progress</p>
            <h2 className="text-3xl font-black text-slate-800 leading-none">{inProgressCount}</h2>
            <p className="text-[10px] text-rose-500 font-bold">↓ 0% vs last 30 days</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-2xl">
            <Clock size={16} />
          </div>
        </div>

        {/* Card 5: Avg. Lessons Completed */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div className="space-y-1.5 text-left">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg. Lessons Completed</p>
            <h2 className="text-3xl font-black text-slate-800 leading-none">{avgProgress}%</h2>
            <p className="text-[10px] text-indigo-500 font-bold">↑ {avgProgress}% vs last 30 days</p>
          </div>
          <div className="p-3 bg-fuchsia-50 text-fuchsia-600 rounded-2xl">
            <BookOpen size={16} />
          </div>
        </div>

      </div>

      {/* ── CHARTS SECTION (3 columns exactly matching screenshot) ── */}
      <div className="max-w-7xl mx-auto px-8 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        
        {/* Chart 1: Course Completion (Donut) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.015)]">
          <h4 className="font-extrabold text-slate-800 text-sm mb-6">Course Completion</h4>
          
          <div className="flex items-center justify-between gap-4">
            {/* SVG Donut */}
            <div className="relative flex items-center justify-center w-36 h-36 shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="54" stroke="#F1F5F9" strokeWidth="12" fill="transparent" />
                <circle 
                  cx="72" 
                  cy="72" 
                  r="54" 
                  stroke="#6366F1" 
                  strokeWidth="12" 
                  fill="transparent" 
                  strokeDasharray={2 * Math.PI * 54}
                  strokeDashoffset={2 * Math.PI * 54 - (completionRate / 100) * (2 * Math.PI * 54)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <h3 className="text-2xl font-black text-slate-800">{completionRate}%</h3>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Completed</p>
              </div>
            </div>

            {/* Legend info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-indigo-600" />
                  <span className="font-bold text-slate-600">Completed</span>
                </div>
                <span className="font-extrabold text-slate-800">{completedCount} ({completionRate}%)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded bg-slate-200" />
                  <span className="font-bold text-slate-500">In Progress</span>
                </div>
                <span className="font-extrabold text-slate-800">{inProgressCount} ({100 - completionRate}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Batch Progress (Vertical Bars) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.015)]">
          <h4 className="font-extrabold text-slate-800 text-sm mb-6">Batch Progress</h4>
          
          <div className="flex items-end justify-between gap-6 h-36 pb-2 relative">
            {/* Grid Line Guides */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9px] text-slate-300 font-bold">
              <div className="border-b border-slate-100 w-full pb-0.5 text-left">100%</div>
              <div className="border-b border-slate-100 w-full pb-0.5 text-left">50%</div>
              <div className="border-b border-slate-100 w-full pb-0.5 text-left">0%</div>
            </div>

            {/* Render bars dynamically */}
            <div className="w-full flex items-end justify-center gap-8 z-10 h-full pt-6">
              {batchMetrics.length === 0 ? (
                <div className="text-slate-400 text-xs text-center w-full py-12">No active batches</div>
              ) : (
                batchMetrics.map((b, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-black text-indigo-600 mb-1">{b.avg}%</span>
                    <div className="w-10 bg-slate-100 rounded-t-lg h-24 relative overflow-hidden">
                      <div 
                        className="absolute bottom-0 inset-x-0 bg-indigo-600 rounded-t-lg transition-all duration-500" 
                        style={{ height: `${b.avg}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-500">{b.name}</span>
                  </div>
                ))
              )}
            </div>

            {/* Legend on right */}
            {batchMetrics.length > 0 && (
              <div className="z-10 bg-white/95 border border-slate-100 rounded-xl p-2.5 shadow-sm text-left flex flex-col gap-1.5 shrink-0 self-center">
                {batchMetrics.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[10px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    <span className="text-slate-600">{b.name}</span>
                    <span className="text-indigo-600 font-extrabold">{b.avg}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chart 3: Progress Over Time (Line Graph) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.015)]">
          <h4 className="font-extrabold text-slate-800 text-sm mb-6">Progress Over Time</h4>
          
          <div className="h-36 relative">
            {/* Grid Line Guides */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9px] text-slate-300 font-bold">
              <div className="border-b border-slate-100 w-full pb-0.5 text-left">100%</div>
              <div className="border-b border-slate-100 w-full pb-0.5 text-left">50%</div>
              <div className="border-b border-slate-100 w-full pb-0.5 text-left">0%</div>
            </div>

            {/* SVG Line Graph */}
            <svg className="w-full h-full pt-6 z-10 relative overflow-visible">
              <path 
                d="M 10 100 Q 80 90 140 85 T 240 20" 
                fill="none" 
                stroke="#6366F1" 
                strokeWidth="2.5" 
              />
              <circle cx="10" cy="100" r="3" fill="#6366F1" />
              <circle cx="140" cy="85" r="3" fill="#6366F1" />
              <circle cx="240" cy="20" r="4" fill="#6366F1" stroke="white" strokeWidth="1.5" />
            </svg>

            {/* X Axis Dates */}
            <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-2">
              <span>10 Jun</span>
              <span>11 Jun</span>
              <span>12 Jun</span>
              <span>13 Jun</span>
              <span>14 Jun</span>
              <span>15 Jun</span>
              <span>16 Jun</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── FILTER RACK ── */}
      <div className="max-w-7xl mx-auto px-8 mt-8 flex flex-col lg:flex-row items-center gap-4 justify-between">
        
        {/* Search */}
        <div className="relative w-full lg:max-w-xs shrink-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search students by name, email..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 shadow-sm"
          />
        </div>

        {/* Dropdowns & Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
          
          {/* Batches Selector */}
          <select 
            value={selectedBatch} 
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-600 focus:outline-none cursor-pointer shadow-sm min-w-32"
          >
            <option value="All">All Batches</option>
            {uniqueBatches.map((batch, index) => (
              <option key={index} value={batch}>{batch}</option>
            ))}
          </select>

          {/* Mentors Selector */}
          <select 
            value={selectedMentor} 
            onChange={(e) => setSelectedMentor(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-600 focus:outline-none cursor-pointer shadow-sm min-w-32"
          >
            <option value="All">All Mentors</option>
            {uniqueMentors.map((mentor, index) => (
              <option key={index} value={mentor}>{mentor}</option>
            ))}
          </select>

          {/* Status Selector */}
          <select 
            value={selectedStatus} 
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-600 focus:outline-none cursor-pointer shadow-sm min-w-32"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>

          {/* Date Picker Range */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl shadow-sm cursor-pointer text-xs font-bold text-slate-500">
            <span>Select Date Range</span>
            <Calendar size={14} className="text-slate-400" />
          </div>

          {/* Icon buttons */}
          <button className="p-2.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors shadow-sm">
            <SlidersHorizontal size={15} />
          </button>
          <button className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
            <Download size={15} />
          </button>

        </div>
      </div>

      {/* ── ROSTER DATA TABLE ── */}
      <div className="max-w-7xl mx-auto px-8 mt-6">
        <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.015)] overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs font-bold uppercase tracking-wider">Retrieving dynamic profiles...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="py-20 text-center text-slate-400 flex flex-col items-center">
              <AlertCircle size={40} className="text-slate-200 mb-3" />
              <p className="text-xs font-extrabold text-slate-600">No records found matching filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    <th className="p-4 pl-6 w-12">
                      <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    </th>
                    <th className="p-4">Student</th>
                    <th className="p-4">Batch</th>
                    <th className="p-4">Mentor</th>
                    <th className="p-4 text-center">Progress</th>
                    <th className="p-4">Lessons</th>
                    <th className="p-4">Last Activity</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-600 font-semibold">
                  {filteredStudents.map((s) => {
                    const radius = 18;
                    const circumference = 2 * Math.PI * radius;
                    const strokeDashoffset = circumference - (s.progress / 100) * circumference;

                    // Compute mock lesson figures (e.g. 20 total)
                    const lessonsCompleted = Math.round((s.progress / 100) * 20);

                    return (
                      <tr key={s.student_id} className="hover:bg-slate-50/50 transition-colors">
                        
                        {/* Checkbox */}
                        <td className="p-4 pl-6">
                          <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                        </td>

                        {/* Student Info */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={STUDENT_AVATAR} 
                              alt={s.name} 
                              className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm"
                            />
                            <div className="text-left">
                              <p className="font-extrabold text-slate-800 text-sm leading-snug">{s.name}</p>
                              <p className="text-[10px] text-slate-400 font-medium">{s.email}</p>
                              <span className="inline-block mt-0.5 text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                                ID: {s.student_id}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Batch */}
                        <td className="p-4">
                          {s.batch_name === 'Unassigned' ? (
                            <span className="text-slate-400 italic">Unassigned</span>
                          ) : (
                            <span className="inline-block px-2.5 py-1 rounded bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase">
                              {s.batch_name}
                            </span>
                          )}
                        </td>

                        {/* Mentor */}
                        <td className="p-4">
                          {s.mentor_name === 'Unassigned' ? (
                            <span className="text-slate-400 italic">Unassigned</span>
                          ) : (
                            <div className="flex items-center gap-2">
                              <img 
                                src={MENTOR_AVATAR} 
                                alt={s.mentor_name} 
                                className="w-6 h-6 rounded-full object-cover border border-slate-100 shadow-sm"
                              />
                              <span className="text-slate-700 font-bold">{s.mentor_name}</span>
                            </div>
                          )}
                        </td>

                        {/* Progress Circular Circle */}
                        <td className="p-4">
                          <div className="flex items-center justify-center">
                            <div className="relative flex items-center justify-center w-12 h-12">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="24" cy="24" r={radius} stroke="#F1F5F9" strokeWidth="3.5" fill="transparent" />
                                <circle 
                                  cx="24" 
                                  cy="24" 
                                  r={radius} 
                                  stroke="#6366F1" 
                                  strokeWidth="3.5" 
                                  fill="transparent" 
                                  strokeDasharray={circumference}
                                  strokeDashoffset={strokeDashoffset}
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span className="absolute text-[10px] font-black text-slate-700">{s.progress}%</span>
                            </div>
                          </div>
                        </td>

                        {/* Lessons completed */}
                        <td className="p-4 text-left">
                          <div>
                            <span className="font-extrabold text-slate-800 text-sm">{lessonsCompleted} / 20</span>
                            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Lessons</p>
                          </div>
                        </td>

                        {/* Last Activity */}
                        <td className="p-4 text-left">
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <Calendar size={12} className="text-slate-400" />
                            <div>
                              <span>16 Jun 2026</span>
                              <p className="text-[10px] text-slate-400 font-semibold">17:53</p>
                            </div>
                          </div>
                        </td>

                        {/* Status badge capsule */}
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            s.status === 'completed' 
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                              : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${s.status === 'completed' ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
                            {s.status === 'completed' ? 'Completed' : 'In Progress'}
                          </span>
                        </td>

                        {/* Action menu */}
                        <td className="p-4">
                          <button className="p-1 rounded hover:bg-slate-100 text-slate-400 transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Pagination Info */}
        <div className="flex items-center justify-between mt-5 text-xs text-slate-400 font-semibold px-2">
          <span>Showing {filteredStudents.length} of {totalEnrolled} student{totalEnrolled !== 1 ? 's' : ''}</span>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 disabled:opacity-50">‹</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white font-black">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 disabled:opacity-50">›</button>
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default CourseProgress;
