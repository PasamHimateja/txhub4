import React, { useState, useEffect, useContext } from 'react';
import { Video, Calendar, Clock, ExternalLink } from 'lucide-react';
import { AuthContext } from '../../website/context/AuthContext';

const LiveClasses = () => {
  const { user } = useContext(AuthContext);
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const idParam = user.id ? `student_id=${user.id}` : '';
    const emailParam = user.email ? `email=${encodeURIComponent(user.email)}` : '';
    const queryParams = [idParam, emailParam].filter(Boolean).join('&');
    
    if (!queryParams) {
        setLoading(false);
        return;
    }

    fetch(`http://127.0.0.1:8000/api/student/live-classes/?${queryParams}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setLiveClasses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch live classes:', err);
        setLoading(false);
      });
  }, [user]);

  // Format time (e.g., "14:30:00" to "2:30 PM")
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    try {
      const [hours, minutes] = timeStr.split(':');
      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return timeStr;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Video className="text-indigo-600 animate-pulse" />
          Live Classes
        </h1>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-lg text-slate-800">Scheduled Sessions</h2>
        </div>
        
        {loading ? (
          <div className="p-6 text-center text-slate-500">Loading live classes...</div>
        ) : liveClasses.length === 0 ? (
          <div className="p-6 text-center text-slate-500">No live classes scheduled for your course at the moment.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {liveClasses.map((session) => (
              <div key={session.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-slate-50 transition-colors gap-4">
                <div className="space-y-2">
                  <span className="inline-block text-[10px] font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {session.targetCourse}
                  </span>
                  <h3 className="font-bold text-slate-800 text-lg">{session.topic}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={15} className="text-slate-400" />
                      {session.date ? new Date(session.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : 'Date TBD'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={15} className="text-slate-400" />
                      {session.time ? formatTime(session.time) : 'Time TBD'}
                    </span>
                    {session.batchMonth && (
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-semibold">
                        {session.batchMonth}
                      </span>
                    )}
                  </div>
                </div>
                {session.link ? (
                  <a href={session.link} target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all duration-300 shadow-md shadow-indigo-100 hover:shadow-indigo-200 text-sm whitespace-nowrap flex items-center gap-2 active:scale-95">
                    <ExternalLink size={16} /> Join Class
                  </a>
                ) : (
                  <button disabled className="px-5 py-3 bg-slate-100 text-slate-400 font-bold rounded-xl text-sm whitespace-nowrap cursor-not-allowed">
                    Link Unavailable
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveClasses;
