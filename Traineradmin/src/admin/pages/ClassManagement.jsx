import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Star, Users, Clock, Plus, Trash2, X, Layers, UserCheck } from 'lucide-react';

const INITIAL_COURSES = [
  {
    id: 'java-full-stack',
    title: 'Java Full Stack',
    category: 'Development',
    students: 0,
    batches: 0,
    mentorAssignments: 0,
    rating: '4.8',
    progress: 0,
    banner: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&h=300&fit=crop'
  },
  {
    id: 'react-full-stack-development',
    title: 'MERN Stack',
    category: 'Development',
    students: 0,
    batches: 0,
    mentorAssignments: 0,
    rating: '4.9',
    progress: 0,
    banner: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&h=300&fit=crop'
  },
  {
    id: 'testing',
    title: 'Testing',
    category: 'Testing',
    students: 0,
    batches: 0,
    mentorAssignments: 0,
    rating: '4.9',
    progress: 0,
    banner: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&h=300&fit=crop'
  }
];

const mapCourseId = (title) => {
  if (!title) return 'other';
  const t = title.toLowerCase();
  if (t.includes('react') || t.includes('mern') || t.includes('mongodb')) return 'react-full-stack-development';
  if (t.includes('java')) return 'java-full-stack';
  if (t.includes('testing') || t.includes('qa') || t.includes('selenium')) return 'testing';
  return 'other';
};

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

const ClassManagement = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [selectedCourse, setSelectedCourse] = useState(null); // Course for modal display
  const [loading, setLoading] = useState(true);

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const [enrollRes, batchRes] = await Promise.all([
        fetch('http://127.0.0.1:8000/api/enrollments/'),
        fetch('http://127.0.0.1:8000/api/batches/')
      ]);

      const enrollResult = await enrollRes.json();
      const enrollData = Array.isArray(enrollResult) ? enrollResult : enrollResult.data || [];
      const batchesData = await batchRes.json();

      setCourses(prevCourses => {
        return prevCourses.map(course => {
          // Filter enrollments for this course
          const courseEnrollments = enrollData.filter(e => {
            const courseId = mapCourseId(e.title || (e.items && e.items[0]?.title));
            return courseId === course.id;
          });

          // Filter batches for this course
          const courseBatches = batchesData.filter(b => {
            const courseId = mapCourseId(b.course);
            return courseId === course.id;
          });

          // Calculate mentor assignments
          const mentorAssignments = courseEnrollments.filter(e => e.assigned_mentor !== null).length;

          // Calculate average progress (amount_paid / total_fee) * 100
          let totalProgress = 0;
          let studentsWithFee = 0;
          courseEnrollments.forEach(e => {
            const totalFee = parseFloat(e.total_fee) || 0;
            const paid = parseFloat(e.amount_paid) || 0;
            if (totalFee > 0) {
              totalProgress += (paid / totalFee) * 100;
              studentsWithFee++;
            }
          });
          const avgProgress = studentsWithFee > 0 ? Math.round(totalProgress / studentsWithFee) : 0;

          return {
            ...course,
            students: courseEnrollments.length,
            batches: courseBatches.length,
            mentorAssignments,
            progress: avgProgress,
            banner: getCourseImage(course.title)
          };
        });
      });
    } catch (err) {
      console.error("Error fetching course metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleAddCourse = () => {
    const title = prompt("Enter course title:");
    if (!title) return;
    const newCourse = {
      id: title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      title,
      category: 'General',
      students: 0,
      batches: 0,
      mentorAssignments: 0,
      rating: '5.0',
      progress: 0,
      banner: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&h=300&fit=crop'
    };
    setCourses(prev => [...prev, newCourse]);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 lg:px-8 pt-6 relative">
      
      {/* Header with Title and New Course Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">My Courses</h2>
        <button 
          onClick={handleAddCourse}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95"
        >
          <Plus size={16} /> New Course
        </button>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col group"
          >
            {/* Banner Image with dark gradient and text alignment */}
            <div className="h-44 overflow-hidden relative">
              <img
                src={course.banner}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              
              {/* Course Title aligned to bottom-left */}
              <div className="absolute bottom-4 left-4 text-white space-y-1.5">
                <h4 className="font-bold text-lg leading-tight drop-shadow-sm">
                  {course.title}
                </h4>
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="p-5 space-y-4">
              
              {/* Students Count and Progress Percentage */}
              <div className="flex justify-between text-xs text-slate-500 font-bold">
                <span className="flex items-center gap-1">
                  <Users size={14} className="text-slate-400" /> {course.students} Students
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} className="text-slate-400" /> {course.progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500" 
                  style={{ width: `${course.progress}%` }} 
                />
              </div>

              {/* Action Buttons: Manage (Full width) and Trash icon */}
              <div className="flex gap-3 pt-1">
                <button 
                  onClick={() => navigate(`/admin/courses/${course.id}/progress`)}
                  className="flex-1 py-2.5 bg-indigo-50 hover:bg-indigo-100/80 text-indigo-600 rounded-xl text-xs font-black tracking-wide uppercase transition-colors active:scale-95 text-center"
                >
                  Manage
                </button>
                <button 
                  onClick={() => handleDelete(course.id, course.title)}
                  className="px-3 py-2.5 border border-rose-100 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors active:scale-95 flex items-center justify-center shrink-0" 
                  title="Delete Course"
                >
                  <Trash2 size={16} />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ── COURSE DETAILS MODAL ── */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100/80 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-800">Course Details</h3>
              <button 
                onClick={() => setSelectedCourse(null)} 
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Rounded Course Image */}
              <div className="h-44 w-full rounded-2xl overflow-hidden shadow-sm">
                <img 
                  src={selectedCourse.banner} 
                  alt={selectedCourse.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Course Title */}
              <h2 className="text-xl font-black text-slate-800 tracking-tight leading-none">
                {selectedCourse.title}
              </h2>
              
              {/* Stats row inside rounded grey/blue containers */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-50 border border-slate-100/50 rounded-2xl p-3">
                  <p className="text-[10px] font-black uppercase text-slate-400">Students</p>
                  <p className="text-lg font-black text-slate-700 mt-1">{selectedCourse.students}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100/50 rounded-2xl p-3">
                  <p className="text-[10px] font-black uppercase text-slate-400">Batches</p>
                  <p className="text-lg font-black text-slate-700 mt-1">{selectedCourse.batches}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100/50 rounded-2xl p-3">
                  <p className="text-[10px] font-black uppercase text-slate-400">Mentors</p>
                  <p className="text-lg font-black text-slate-700 mt-1">{selectedCourse.mentorAssignments}</p>
                </div>
                <div className="bg-slate-50 border border-slate-100/50 rounded-2xl p-3">
                  <p className="text-[10px] font-black uppercase text-slate-400">Progress</p>
                  <p className="text-lg font-black text-slate-700 mt-1">{selectedCourse.progress}%</p>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button 
                onClick={() => navigate(`/admin/courses/${selectedCourse.id}`)}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-colors active:scale-95 shadow-md"
              >
                Open Course Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ClassManagement;