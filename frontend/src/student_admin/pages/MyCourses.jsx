import React, { useState, useEffect, useContext } from 'react';
import { BookOpen, AlertCircle, ArrowRight, Award, Lock } from 'lucide-react';
import { AuthContext } from '../../website/context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Asset Images
import awsImg from "../../website/assets/aws.jpg";
import javaImg from "../../website/assets/java_full.jpg";
import reactImg from "../../website/assets/react_full.jpg";
import mlImg from "../../website/assets/ml.jpg";
import uiImg from "../../website/assets/ui_ux.jpg";
import pythonImg from "../../website/assets/python full stack.jpg";
import dataImg from "../../website/assets/Data Analytics.jpg";
import mernImg from "../../website/assets/mern stack development.jpg";
import softImg from "../../website/assets/soft.jpg";

// 90-day course duration
const COURSE_DAYS = 90;

const getDaysElapsed = (enrolledAt) => {
  if (!enrolledAt) return 0;
  const enrolled = new Date(enrolledAt);
  const now = new Date();
  return Math.max(0, Math.floor((now - enrolled) / (1000 * 60 * 60 * 24)));
};

const getAssetImage = (title) => {
  const t = (title || "").toLowerCase();
  if (t.includes("react") || t.includes("mern")) return reactImg;
  if (t.includes("java")) return javaImg;
  if (t.includes("python")) return pythonImg;
  if (t.includes("aws") || t.includes("devops")) return awsImg;
  if (t.includes("ml") || t.includes("machine")) return mlImg;
  if (t.includes("ui") || t.includes("ux") || t.includes("figma")) return uiImg;
  if (t.includes("data") || t.includes("analytics")) return dataImg;
  if (t.includes("soft")) return softImg;
  return null;
};

const CATEGORY_IMAGES = {
  'software development': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&h=300&fit=crop',
  'testing': 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&h=300&fit=crop',
  'ui/ux design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&h=300&fit=crop',
  'ai/ml': 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&h=300&fit=crop',
  'devops': 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=600&h=300&fit=crop',
  'data science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=300&fit=crop',
  'soft skills': 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&h=300&fit=crop',
  'default': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&h=300&fit=crop'
};

const getCourseFallbackImage = (title, category) => {
  const t = (title || '').toLowerCase();
  const c = (category || '').toLowerCase();
  
  if (t.includes('react') || t.includes('mern') || t.includes('mongodb') || t.includes('frontend')) {
    return 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&h=300&fit=crop';
  }
  if (t.includes('java')) {
    return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&h=300&fit=crop';
  }
  if (t.includes('python')) {
    return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&h=300&fit=crop';
  }
  if (t.includes('aws') || t.includes('devops') || t.includes('docker') || t.includes('cloud')) {
    return 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=600&h=300&fit=crop';
  }
  if (t.includes('testing') || t.includes('selenium') || t.includes('automation') || t.includes('qa')) {
    return 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&h=300&fit=crop';
  }
  if (t.includes('figma') || t.includes('ui') || t.includes('ux') || t.includes('design')) {
    return 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&h=300&fit=crop';
  }
  if (t.includes('machine') || t.includes('ai') || t.includes('ml')) {
    return 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&h=300&fit=crop';
  }
  if (t.includes('data science') || t.includes('analytics')) {
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=300&fit=crop';
  }
  return CATEGORY_IMAGES[c] || CATEGORY_IMAGES['default'];
};

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user?.email) { setLoading(false); return; }
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/enrollments/?email=${user.email}`);
        const data = await response.json();
        if (response.ok) {
          setEnrollments(data.data || []);
        } else {
          setError(data.error || "Failed to fetch courses");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Something went wrong while loading your courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="text-blue-600" />
          My Courses
        </h1>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {!error && enrollments.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
          <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-700">No Courses Yet</h3>
          <p className="text-slate-500 mt-2 mb-6">You haven't enrolled in any courses yet. Explore our catalog to get started!</p>
          <button
            onClick={() => navigate("/explore")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
          >
            Browse Courses <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((course, idx) => {
            const isFullyPaid = course.payment_status?.toLowerCase() === 'completed';
            const progress = course.progress !== undefined ? course.progress : 0;
            const daysElapsed = getDaysElapsed(course.created_at);
            const withinWindow = daysElapsed <= COURSE_DAYS;
            const certEligible = progress >= 100 && withinWindow;

            return (
              <div key={course.id || idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col">
                <div className="h-40 bg-blue-50 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden group">
                  {(() => {
                    const fallbackImg = getCourseFallbackImage(course.title, course.category);
                    
                    // 1. Check matching assets saved image
                    const assetImg = getAssetImage(course.title);
                    if (assetImg) {
                      return (
                        <img 
                          src={assetImg} 
                          alt={course.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      );
                    }

                    // 2. Check uploaded image URL
                    let imgSrc = '';
                    if (course.imageUrl) {
                      imgSrc = course.imageUrl.startsWith('http') ? course.imageUrl : `http://127.0.0.1:8000${course.imageUrl}`;
                    } else if (course.items && course.items[0] && course.items[0].img) {
                      const itemImg = course.items[0].img;
                      imgSrc = itemImg.startsWith('http') ? itemImg : `http://127.0.0.1:8000${itemImg}`;
                    }

                    if (imgSrc) {
                      return (
                        <img 
                          src={imgSrc} 
                          alt={course.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={e => { e.target.src = fallbackImg; }}
                        />
                      );
                    }
                    return (
                      <img 
                        src={fallbackImg} 
                        alt={course.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    );
                  })()}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-lg ${isFullyPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {course.payment_status || "Pending"}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-lg text-slate-800 line-clamp-2">{course.title}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-xs mt-2">
                    <span>Enrolled: {new Date(course.created_at).toLocaleDateString()}</span>
                    <span className="text-slate-300">·</span>
                    <span className={withinWindow ? 'text-blue-600' : 'text-rose-500'}>
                      Day {Math.min(daysElapsed, COURSE_DAYS)}/{COURSE_DAYS}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 pt-4 border-t border-slate-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-500">
                      {progress >= 100 ? "Completed" : progress > 0 ? "In Progress" : "Not Started"}
                    </span>
                    <span className={`text-xs font-bold ${progress >= 100 ? 'text-emerald-600' : 'text-blue-600'}`}>{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${progress >= 100 ? 'bg-emerald-500' : 'bg-blue-600'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Certificate Section */}
                <div className="mt-4">
                  {certEligible ? (
                    <button
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all"
                      onClick={() => alert('Certificate generation coming soon!')}
                    >
                      <Award size={14} /> Generate Certificate
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-500">
                      <Lock size={13} className="text-slate-400 shrink-0" />
                      <span>
                        {!withinWindow
                          ? 'Certificate locked — 90-day window expired'
                          : `Complete course to unlock (${progress}% done)`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
