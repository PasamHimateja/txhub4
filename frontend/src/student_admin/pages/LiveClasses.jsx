import React, { useState, useEffect, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Calendar, Clock, ExternalLink, Radio, UserCheck, Layers, RefreshCw } from 'lucide-react';
import { AuthContext } from '../../website/context/AuthContext';

const API_BASE = 'http://127.0.0.1:8000/api';

const LiveClasses = () => {
  const { user } = useContext(AuthContext);
  const [onlineClasses, setOnlineClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  // Derive batch from user's enrollment info stored in localStorage / context
  const studentBatch = user?.batch_date || user?.batchMonth || null;
  const studentName = user?.full_name || user?.name || 'Student';

  const fetchClasses = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (studentBatch) params.append('batch', studentBatch);

      const res = await fetch(`${API_BASE}/online-classes/?${params.toString()}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.results || []);
      // Show only LIVE and SCHEDULED classes; hide ENDED
      const active = list.filter(c => c.status === 'LIVE' || c.status === 'SCHEDULED');
      setOnlineClasses(active);
    } catch (err) {
      console.error('Failed to fetch online classes:', err);
    } finally {
      setLoading(false);
    }
  }, [user, studentBatch]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses, lastRefresh]);

  // Poll every 15 seconds for real-time updates
  useEffect(() => {
    const timer = setInterval(() => setLastRefresh(Date.now()), 15000);
    return () => clearInterval(timer);
  }, []);

  const handleJoin = async (cls) => {
    setJoiningId(cls.id);
    try {
      const res = await fetch(`${API_BASE}/online-classes/${cls.id}/join/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_name: studentName }),
      });
      const data = await res.json();
      if (data.join_url) {
        window.open(data.join_url, '_blank');
      } else {
        alert(data.error || 'Could not join class at this time.');
      }
    } catch (e) {
      alert('Network error. Please try again.');
    } finally {
      setJoiningId(null);
    }
  };

  const StatusBadge = ({ status }) => {
    if (status === 'LIVE') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-700 border border-red-200 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          LIVE
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100">
        Scheduled
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Video className="text-indigo-600" />
          Live Classes
        </h1>
        <button
          onClick={() => setLastRefresh(Date.now())}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* Live banner — shown when any class is LIVE */}
      <AnimatePresence>
        {onlineClasses.some(c => c.status === 'LIVE') && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl p-4 text-white flex items-center gap-3 shadow-lg shadow-red-200"
          >
            <Radio className="w-5 h-5 animate-pulse flex-shrink-0" />
            <div>
              <p className="font-black text-sm">A class is happening RIGHT NOW!</p>
              <p className="text-red-200 text-xs mt-0.5">Scroll down and click Join to enter.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Class list */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-lg text-slate-800">Your Batch Classes</h2>
          <span className="text-xs text-slate-400">Auto-refreshes every 15s</span>
        </div>

        {loading ? (
          <div className="p-8 flex flex-col items-center gap-3 text-slate-400">
            <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium">Loading classes…</p>
          </div>
        ) : onlineClasses.length === 0 ? (
          <div className="p-10 text-center text-slate-400 flex flex-col items-center gap-3">
            <Video className="w-12 h-12 opacity-20" />
            <p className="font-semibold text-slate-500">No live or upcoming classes for your batch</p>
            <p className="text-sm">Your mentor hasn't started a class yet. Check back soon!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            <AnimatePresence>
              {onlineClasses.map((cls) => (
                <motion.div
                  key={cls.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className={`p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors ${cls.status === 'LIVE' ? 'bg-red-50/40 hover:bg-red-50/70' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl flex-shrink-0 ${cls.status === 'LIVE' ? 'bg-red-100' : 'bg-indigo-100'}`}>
                      <Video className={`w-5 h-5 ${cls.status === 'LIVE' ? 'text-red-600' : 'text-indigo-600'}`} />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center flex-wrap gap-2">
                        <h3 className="font-bold text-slate-800 text-base">{cls.title}</h3>
                        <StatusBadge status={cls.status} />
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                          {cls.mentor_name || 'Your Mentor'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-slate-400" />
                          {cls.batch}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {cls.start_time
                            ? new Date(cls.start_time).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
                            : 'Time TBD'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {cls.status === 'LIVE' ? (
                    <button
                      onClick={() => handleJoin(cls)}
                      disabled={joiningId === cls.id}
                      className="flex-shrink-0 flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-200 shadow-md shadow-red-200 active:scale-95 text-sm disabled:opacity-60"
                    >
                      {joiningId === cls.id
                        ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        : <ExternalLink className="w-4 h-4" />}
                      Join Now
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-shrink-0 px-5 py-3 bg-slate-100 text-slate-400 font-bold rounded-xl text-sm cursor-not-allowed"
                    >
                      Not Started
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveClasses;
