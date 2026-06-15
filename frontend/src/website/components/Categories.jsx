import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Code,
  Bug,
  Database,
  Brain,
  Server,
  Users
} from "lucide-react";

import reactFullImg from '../assets/react_full.jpg';

import mlImg from '../assets/ml.jpg';
import awsImg from '../assets/aws.jpg';
import dataScienceImg from '../assets/dataScience.jpg';
import softImg from "../assets/soft.jpg"

const categories = [
  {
    name: "Software Development",
    icon: Code,
    img: softImg,
  },
  {
    name: "Testing",
    icon: Bug,
    img: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&q=80",
  },
  {
    name: "Data Science",
    icon: Database,
    img: dataScienceImg,
  },
  {
    name: "AI / ML",
    icon: Brain,
    img: mlImg,
  },
  {
    name: "DevOps",
    icon: Server,
    img: awsImg,
  },
  {
    name: "Soft Skills",
    icon: Users,
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
  },
];

const Categories = () => {
  const navigate = useNavigate();
  return (
    <section id="categories" className="bg-slate-50 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* Title Section */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Course Categories
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-600 mt-4 text-lg max-w-2xl mx-auto">
            Advance your career with specialized paths designed by industry experts.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div
                key={index}
                onClick={() => {
                  navigate("/explore", { state: { category: cat.name } });
                  window.scrollTo(0, 0);
                }}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col border border-slate-100"
              >
                {/* Image Container with Zoom Effect */}
                <div className="relative h-52 overflow-hidden bg-slate-200">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    // Adding error handling just in case
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" }}
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-8 relative">
                  {/* Floating Icon Box */}
                  <div className="absolute -top-7 left-8 bg-blue-600 w-14 h-14 flex items-center justify-center rounded-xl shadow-lg border-4 border-white">
                    <Icon className="text-white" size={24} />
                  </div>

                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-slate-500 mt-3 text-sm leading-relaxed">
                      Master {cat.name} through hands-on labs, real-world projects, and personalized mentorship.
                    </p>
                  </div>

                  {/* "Learn More" Link */}
                  <div className="mt-6 flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Explore Path <span className="ml-2">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;