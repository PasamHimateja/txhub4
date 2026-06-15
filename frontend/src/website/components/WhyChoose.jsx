import React from "react";
import { Award, Briefcase, BookOpen, Users, Rocket, Shield } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Expert Mentors",
    desc: "Learn from experienced trainers with practical knowledge.",
  },
  {
    icon: BookOpen,
    title: "Real-time Projects",
    desc: "Work on real-world projects to gain practical experience.",
  },
  {
    icon: Users,
    title: "Doubt Support",
    desc: "Get your doubts clarified with mentor support sessions.",
  },
  {
    icon: Rocket,
    title: "Career Guidance",
    desc: "Guidance on how to start and grow your career in IT.",
  },
  {
    icon: Shield,
    title: "Certification",
    desc: "Course completion certificate after training.",
  },
  {
    icon: Briefcase,
    title: "Interview Preparation",
    desc: "Interview questions and resume preparation guidance.",
  },
  {
    icon: Rocket,
    title: "Training & Placement",
    desc: "Comprehensive training with guaranteed internship opportunities and job placement support.",
  },
  {
    icon: Users,
    title: "Alumni Network",
    desc: "Join high-level alumni groups to network and grow together.",
  },
];

const WhyChoose = () => {
  return (
    <section id="about" className="bg-slate-50 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Why Choose TX hub
          </h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100"
              >
                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-100 mb-4">
                  <Icon className="text-blue-600" size={28} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-slate-800">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 mt-2 text-sm">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;