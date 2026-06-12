import React, { useState, useEffect } from 'react';
import { UserCheck, Trash2, Plus, Shield, Mail, BookOpen } from 'lucide-react';

const courses = [
  'All Courses',
  'React',
  'Java Full Stack',
  'MERN Stack ',
  'Python Full Stack',
  'Web Development',
  'Manual Testing',
  'Advanced Software Testing',
  'API Testing with Postman',
  'Mobile App Automation',
  'Figma UI/UX Design',
  'AWS & Devops',
  'Machine Learning',
  'Data Science',
  'Data Analytics',
  'Leadership & Team MAnagement',
  'Public Speaking',
  "Critical Thinking & Problem Solving"
];

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    assigned_course: courses[0]
  });

  const fetchMentors = () => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/api/mentors/')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setMentors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch mentors:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill out all fields');
      return;
    }

    fetch('http://127.0.0.1:8000/api/mentors/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.ok) {
          fetchMentors();
          setFormData({ name: '', email: '', password: '', assigned_course: courses[0] });
          setShowForm(false);
        } else {
          res.json().then(data => {
            alert('Failed to register mentor: ' + JSON.stringify(data));
          });
        }
      })
      .catch(err => console.error('Error creating mentor:', err));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this mentor?')) return;
    fetch(`http://127.0.0.1:8000/api/mentors/${id}/`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          fetchMentors();
        } else {
          alert('Failed to delete mentor');
        }
      })
      .catch(err => console.error('Error deleting mentor:', err));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <UserCheck className="text-blue-600" />
          Mentor Management
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-100 hover:shadow-blue-200 active:scale-95 text-sm"
        >
          {showForm ? 'Cancel' : <><Plus size={18} /> Register Mentor</>}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm max-w-lg space-y-4 transition-all animate-fadeIn">
          <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">New Mentor Registration</h2>
          
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter a secure password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase">Assigned Course</label>
            <select
              name="assigned_course"
              value={formData.assigned_course}
              onChange={handleChange}
              className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white"
            >
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition-all active:scale-95"
          >
            Register Mentor
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-bold text-lg text-slate-800">Active Mentors / Trainers</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading mentors...</div>
        ) : mentors.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No mentors registered yet. Click "Register Mentor" to start.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-black text-slate-400 uppercase tracking-wider">
                  <th className="p-4">Name</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Assigned Course</th>
                  <th className="p-4">Assigned Students</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {mentors.map((mentor) => (
                  <tr key={mentor.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-800">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-blue-500" />
                        {mentor.name}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-slate-500 text-xs">
                        <Mail size={13} />
                        {mentor.email}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <BookOpen size={14} className="text-slate-400" />
                        <span className="font-semibold text-slate-700">{mentor.assigned_course || 'All Courses'}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {mentor.students && mentor.students.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {mentor.students.slice(0, 3).map(s => (
                              <span key={s.id} className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded text-[9px] font-bold" title={s.email}>{s.name}</span>
                          ))}
                          {mentor.students.length > 3 && <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-[9px] font-bold">+{mentor.students.length - 3} more</span>}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">None</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded ${mentor.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        {mentor.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(mentor.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors active:scale-95 inline-flex items-center"
                        title="Delete Mentor"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentors;
