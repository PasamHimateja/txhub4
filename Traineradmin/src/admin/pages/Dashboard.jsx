import React, { useEffect, useState } from 'react';
import {
  Mail,
  Phone,
  Users,
  BookOpen,
  Layers,
  Award,
  PenTool,
  Cpu,
  Settings,
  Database
} from 'lucide-react';

const Dashboard = () => {

  // ✅ STATE
  const [stats, setStats] = useState({
    total_users: 0,
    course_counts: {}
  });

  // ✅ FETCH DATA FROM BACKEND
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard-counts/")
      .then(res => res.json())
      .then(data => {
        console.log("Dashboard Data:", data);
        setStats(data);
      })
      .catch(err => console.error("Error:", err));
  }, []);

  // ✅ COURSE CONFIG (STATIC DESIGN + DYNAMIC COUNT)
  const courseStats = [
    { name: 'React Full Stack', key: 'React Full Stack Development', icon: <Layers size={18} />, color: 'bg-blue-600' },
    { name: 'Java Full Stack', key: 'Java Full Stack', icon: <Layers size={18} />, color: 'bg-orange-500' },
    { name: 'Python Dev', key: 'Python Development', icon: <Cpu size={18} />, color: 'bg-yellow-500' },
    { name: 'UI/UX Design', key: 'UI/UX Design', icon: <PenTool size={18} />, color: 'bg-pink-500' },
    { name: 'AI/ML', key: 'AI/ML', icon: <Cpu size={18} />, color: 'bg-purple-600' },
    { name: 'Testing', key: 'Testing', icon: <Settings size={18} />, color: 'bg-green-500' },
    { name: 'DevOps', key: 'Devops', icon: <Database size={18} />, color: 'bg-slate-600' },
    { name: 'Data Science', key: 'Data Science', icon: <Award size={18} />, color: 'bg-cyan-600' },
    { name: 'Soft Skills', key: 'Soft Skills', icon: <BookOpen size={18} />, color: 'bg-yellow-400' },
  ];

  const trainers = [
    { id: 1, name: 'Vasavi', role: 'Full Stack', photo: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'Jayanth', role: 'QA', photo: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Hima Teja', role: 'QA', photo: 'https://i.pravatar.cc/150?u=3' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FE] pt-10 lg:pt-20 px-4 md:px-10 pb-20 space-y-10">

      {/* ================= SYSTEM OVERVIEW ================= */}
      <section>
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
          System Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* ✅ TOTAL USERS */}
          <div className="bg-blue-600 p-6 rounded-[2rem] text-white shadow-xl flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-[10px] font-bold uppercase mb-1">
                Total Users
              </p>
              <h3 className="text-3xl font-black">
                {stats.total_users}
              </h3>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl">
              <Users size={24} />
            </div>
          </div>

          {/* ✅ COURSE CARDS */}
          {courseStats.map((course, index) => (
            <div key={index} className="bg-white p-6 rounded-[2rem] border border-blue-100 shadow-sm flex items-center gap-4">

              <div className={`${course.color} text-white p-3 rounded-2xl`}>
                {course.icon}
              </div>

              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase">
                  {course.name}
                </p>

                <h3 className="text-xl font-bold text-slate-800">
                  {stats.course_counts?.[course.key] || 0}
                  <span className="text-xs text-slate-400 ml-1">
                    students
                  </span>
                </h3>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ================= TRAINERS ================= */}
      {/* <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
            Available Trainers
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm text-center">

              <img
                src={t.photo}
                className="w-24 h-24 rounded-2xl mx-auto mb-4"
                alt={t.name}
              />

              <h3 className="font-bold text-xl">{t.name}</h3>
              <p className="text-blue-500 text-sm">{t.role}</p>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-blue-50 py-3 rounded-xl flex justify-center">
                  <Mail size={18} />
                </button>
                <button className="flex-1 bg-blue-50 py-3 rounded-xl flex justify-center">
                  <Phone size={18} />
                </button>
              </div>

            </div>
          ))}
        </div>
      </section> */}

    </div>
  );
};

export default Dashboard;
