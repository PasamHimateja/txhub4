import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Calendar,
  MapPin,
  Clock,
  Users,
  Video,
  Ticket,
  ArrowRight,
  Star,
  MonitorPlay
} from "lucide-react";
import eventsBg from "../assets/Events.png.png";

const upcomingEvents = [
  {
    id: 1,
    title: "Java Full Stack Enterprise Hackathon",
    type: "Java Full Stack",
    mode: "Hybrid",
    date: "July 15 - 16, 2025",
    time: "48 Hours",
    location: "Hyderabad & Online",
    price: "Free",
    spotsLeft: 85,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    id: 2,
    title: "Python & React Web Buildathon",
    type: "Python Full Stack",
    mode: "Online",
    date: "August 10 - 12, 2025",
    time: "72 Hours",
    location: "Virtual (Discord)",
    price: "Free",
    spotsLeft: 150,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    title: "AI & ML Innovation Challenge",
    type: "AI/ML",
    mode: "Offline",
    date: "September 5 - 6, 2025",
    time: "36 Hours",
    location: "T-Hub, Hyderabad",
    price: "₹500",
    spotsLeft: 50,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: 4,
    title: "Cloud & DevOps Scalability Challenge",
    type: "Cloud & DevOps",
    mode: "Online",
    date: "October 1 - 2, 2025",
    time: "48 Hours",
    location: "Online",
    price: "Free",
    spotsLeft: 200,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gradient: "from-orange-500 to-red-500",
  }
];

const EventsPage = () => {
  const [filter, setFilter] = useState("All");

  const filteredEvents = upcomingEvents.filter(
    (event) => filter === "All" || event.type === filter
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative pt-36 pb-24 px-6 overflow-hidden bg-slate-900">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0">
          <img 
            src={eventsBg} 
            alt="Tech Event Hackathon" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/90 to-purple-900/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent opacity-10" />
        </div>

        {/* Decorative Blurs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-2 text-indigo-200 text-sm mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="text-white font-bold">Hackathons</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/90 text-xs font-bold uppercase tracking-widest mb-6">
            <Star size={12} className="text-yellow-300 fill-yellow-300" />
            Build & Compete
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
            Student <span className="text-[#8ab4f8]">Hackathons</span>
          </h1>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Join our intense, expert-led hackathons to solve real-world problems, build amazing projects, and win exciting prizes while connecting with industry leaders.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["All", "Java Full Stack", "Python Full Stack", "AI/ML", "Cloud & DevOps"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                filter === type
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "bg-white text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-200/30 transition-all duration-500 flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-black text-slate-800 shadow-lg">
                  {event.price}
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest text-white bg-gradient-to-r ${event.gradient} shadow-lg`}>
                    {event.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-black text-slate-800 leading-snug mb-4 group-hover:text-indigo-600 transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Calendar size={16} className="text-indigo-500" />
                    </div>
                    {event.date}
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      <Clock size={16} className="text-orange-500" />
                    </div>
                    {event.time}
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                      {event.mode === "Online" ? (
                        <Video size={16} className="text-emerald-500" />
                      ) : (
                        <MapPin size={16} className="text-pink-500" />
                      )}
                    </div>
                    {event.location}
                  </div>
                </div>

              
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-700 mb-2">No Events Found</h3>
            <p className="text-slate-500 font-medium">There are currently no upcoming events in this category.</p>
          </div>
        )}

        {/* Host an event CTA */}
   <div className="mt-16 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 text-center shadow-lg shadow-indigo-500/5 relative overflow-hidden max-w-3xl mx-auto">
  
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500" />

  <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
    <MonitorPlay size={24} className="text-indigo-600" />
  </div>

  <h2 className="text-2xl font-extrabold text-slate-800 mb-3">
    Want to Host a Hackathon?
  </h2>

  <p className="text-slate-500 text-sm max-w-lg mx-auto mb-5 leading-relaxed">
    Partner with TXHub to organize coding competitions, engage developers,
    and discover top tech talent.
  </p>

  <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all">
    Partner With Us
  </button>

</div>
      </div>
    </div>
  );
};

export default EventsPage;
