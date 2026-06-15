import React, { useState, useEffect } from 'react';
import {
  Download, IndianRupee, ShieldCheck, Users as UsersIcon,
  Wallet, Activity, Cpu, Globe
} from 'lucide-react';

import { useAdmin } from '../context/AdminContext';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { markAsSeen } = useAdmin();

  useEffect(() => {
    markAsSeen();
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/enrollments/');
        const result = await response.json();
        const dataArray = Array.isArray(result) ? result : result.data;

        const formatted = (dataArray || []).map(u => {
          let itemsArray = [];

          if (Array.isArray(u.items)) {
            itemsArray = u.items;
          } else if (typeof u.items === "string") {
            try {
              const parsed = JSON.parse(u.items);
              itemsArray = Array.isArray(parsed) ? parsed : [parsed];
            } catch {
              itemsArray = [];
            }
          } else if (u.items && typeof u.items === "object") {
            itemsArray = [u.items];
          }

          if (!Array.isArray(itemsArray)) itemsArray = [];

          const totalFee = Number(u.total_fee) || 0;
          const paidAmount = Number(u.amount_paid) || 0;

          return {
            id: u.id,
            name: u.full_name || "New Student", // Assuming full_name exists, fallback to firstItem title
            courses: itemsArray,
            type: u.enrollment_type || "Course",
            mode: u.mode || "Offline",
            totalFee,
            paidAmount,
            assigned_batch: u.assigned_batch || "",
            assigned_mentor: u.assigned_mentor || "",
          };
        });

        setUsers(formatted);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchBatchesAndMentors = async () => {
      try {
        const [batchesRes, mentorsRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/batches/'),
          fetch('http://127.0.0.1:8000/api/mentors/')
        ]);
        if (batchesRes.ok) setBatches(await batchesRes.json());
        if (mentorsRes.ok) setMentors(await mentorsRes.json());
      } catch (err) {
        console.error("Fetch Error for batches/mentors:", err);
      }
    };

    fetchUsers();
    fetchBatchesAndMentors();
  }, []);

  const handleAssign = async (userId, batchId, mentorId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/enrollments/${userId}/assign/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ batch_id: batchId, mentor_id: mentorId }),
      });
      if (response.ok) {
        setUsers(prev => prev.map(u => {
          if (u.id === userId) {
            return { ...u, assigned_batch: batchId, assigned_mentor: mentorId };
          }
          return u;
        }));
      } else {
        alert("Failed to assign batch/mentor.");
      }
    } catch (err) {
      console.error("Error assigning:", err);
      alert("Failed to assign batch/mentor.");
    }
  };

  const totalReceived = users.reduce((a, b) => a + b.paidAmount, 0);
  const totalPending = users.reduce((a, b) => a + (b.totalFee - b.paidAmount), 0);

  const downloadReport = () => window.print();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F7FE]">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Syncing Registry...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FE] font-sans text-slate-900 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print { 
          .print-hidden { display: none !important; } 
          .print-area { border: none !important; box-shadow: none !important; width: 100% !important; }
          body { background: white !important; }
        }
      `}} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-10 mt-10">

        {/* HEADER SECTION */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-6 print-hidden">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="bg-indigo-600 p-4 rounded-2xl shadow-xl shadow-indigo-100 shrink-0">
              <ShieldCheck className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
                TX <span className="text-indigo-600">HUB</span>
              </h1>
              <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em] mt-1">
                Live Management Portal
              </p>
            </div>
          </div>

          <button
            onClick={downloadReport}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-bold shadow-2xl active:scale-95 text-xs uppercase tracking-widest transition-all hover:bg-slate-800"
          >
            <Download size={18} /> Generate PDF Report
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10 print-hidden">
          {[
            { label: 'Total Students', val: users.length, icon: <UsersIcon />, bg: 'bg-blue-50', text: 'text-blue-600' },
            { label: 'Revenue Received', val: `₹${totalReceived.toLocaleString()}`, icon: <Wallet />, bg: 'bg-emerald-50', text: 'text-emerald-600' },
            { label: 'Outstanding Balance', val: `₹${totalPending.toLocaleString()}`, icon: <Activity />, bg: 'bg-amber-50', text: 'text-amber-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-blue-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex items-center gap-5">
              <div className={`${stat.bg} p-4 rounded-2xl ${stat.text} shrink-0`}>
                {React.cloneElement(stat.icon, { size: 24 })}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-800 leading-none mt-1">{stat.val}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* DATA TABLE (DESKTOP) */}
        <div className="hidden lg:block bg-white rounded-[2.5rem] border border-blue-100 shadow-2xl shadow-blue-900/5 overflow-hidden print-area">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-blue-50">
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Profile</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Course / Specialization</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Mentor&Batches</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Payment Progress</th>
                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Financials</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50/50">
              {users.map((u) => {
                const balance = u.totalFee - u.paidAmount;
                const progress = u.totalFee > 0 ? (u.paidAmount / u.totalFee) * 100 : 0;

                return (
                  <tr key={u.id} className="hover:bg-indigo-50/5 transition-colors">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-base border border-indigo-100">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-sm">{u.name}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">REF: {u.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-wrap gap-2">
                        {u.courses.map((course, i) => (
                          <div
                            key={i}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase border border-blue-100"
                          >
                            <Cpu size={12} /> {course.title}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-2">
                        <select
                          className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500"
                          value={u.assigned_batch}
                          onChange={(e) => handleAssign(u.id, e.target.value, u.assigned_mentor)}
                        >
                          <option value="">Select Batch...</option>
                          {batches
                            .filter(b => { const norm = s => s.toLowerCase().replace(/\s+/g,'').replace(/[^a-z0-9]/g,''); return u.courses.length === 0 || u.courses.some(c => c.title && b.course && (norm(c.title).includes(norm(b.course)) || norm(b.course).includes(norm(c.title)))); })
                            .map(b => (
                              <option key={b.id} value={b.id}>{b.name}</option>
                            ))
                          }
                        </select>
                        
                        <select
                          className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500"
                          value={u.assigned_mentor}
                          onChange={(e) => handleAssign(u.id, u.assigned_batch, e.target.value)}
                        >
                          <option value="">Select Mentor...</option>
                          {mentors
                            .filter(m => { const norm = s => s.toLowerCase().replace(/\s+/g,'').replace(/[^a-z0-9]/g,''); return m.assigned_course === 'All Courses' || u.courses.length === 0 || u.courses.some(c => c.title && m.assigned_course && (norm(c.title).includes(norm(m.assigned_course)) || norm(m.assigned_course).includes(norm(c.title)))); })
                            .map(m => (
                              <option key={m.id} value={m.id}>{m.name}</option>
                            ))
                          }
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex justify-center">
                        <div className="relative w-10 h-10">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="4" />
                            <circle
                              cx="18" cy="18" r="16" fill="none"
                              className={balance <= 0 ? "stroke-emerald-400" : "stroke-indigo-500"}
                              strokeWidth="4"
                              strokeDasharray={`${progress}, 100`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black">{Math.round(progress)}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex items-center justify-end font-black text-slate-800 text-sm">
                        <IndianRupee size={12} />{u.paidAmount.toLocaleString()}
                      </div>
                      <div className={`text-[9px] font-black uppercase mt-1 ${balance > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {balance > 0 ? `Due: ₹${balance.toLocaleString()}` : 'Full Cleared'}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* MOBILE VIEW (CARDS) */}
        <div className="grid grid-cols-1 gap-5 lg:hidden px-1 pb-10">
          {users.map((u) => {
            const balance = u.totalFee - u.paidAmount;
            const progress = u.totalFee > 0 ? (u.paidAmount / u.totalFee) * 100 : 0;
            return (
              <div key={u.id} className="bg-white rounded-[2.5rem] p-6 shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-blue-50">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xl border border-indigo-100">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 text-base leading-tight">{u.name}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">ID: {u.id}</p>
                    </div>
                  </div>
                  <div className="relative w-11 h-11">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="4" />
                      <circle cx="18" cy="18" r="16" fill="none" className={balance <= 0 ? "stroke-emerald-400" : "stroke-indigo-500"} strokeWidth="4" strokeDasharray={`${progress}, 100`} strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-slate-700">{Math.round(progress)}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100/50">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Specialization</p>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
                      <Cpu size={14} className="text-indigo-400 shrink-0" />
                      <span className="truncate">{u.courses[0]?.title || "N/A"}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100/50">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Assignment</p>
                    <div className="flex flex-col gap-2">
                      <select
                        className="w-full bg-white border border-slate-200 text-slate-700 text-xs rounded-lg px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500"
                        value={u.assigned_batch}
                        onChange={(e) => handleAssign(u.id, e.target.value, u.assigned_mentor)}
                      >
                        <option value="">Select Batch...</option>
                        {batches
                          .filter(b => { const norm = s => s.toLowerCase().replace(/\s+/g,'').replace(/[^a-z0-9]/g,''); return u.courses.length === 0 || u.courses.some(c => c.title && b.course && (norm(c.title).includes(norm(b.course)) || norm(b.course).includes(norm(c.title)))); })
                          .map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                          ))
                        }
                      </select>
                      
                      <select
                        className="w-full bg-white border border-slate-200 text-slate-700 text-xs rounded-lg px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500"
                        value={u.assigned_mentor}
                        onChange={(e) => handleAssign(u.id, u.assigned_batch, e.target.value)}
                      >
                        <option value="">Select Mentor...</option>
                        {mentors
                          .filter(m => { const norm = s => s.toLowerCase().replace(/\s+/g,'').replace(/[^a-z0-9]/g,''); return m.assigned_course === 'All Courses' || u.courses.length === 0 || u.courses.some(c => c.title && m.assigned_course && (norm(c.title).includes(norm(m.assigned_course)) || norm(m.assigned_course).includes(norm(c.title)))); })
                          .map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-5 border-t border-dashed border-slate-100">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Paid Amount</p>
                    <div className="flex items-center font-black text-slate-800 text-lg">
                      <IndianRupee size={14} /> {u.paidAmount.toLocaleString()}
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase border ${balance > 0 ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                    {balance > 0 ? `Due: ₹${balance.toLocaleString()}` : 'Fully Paid'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Users;
