// import React, { useState } from 'react';
// import { User, Lock, Bell, Save, Camera, ShieldCheck, Mail, Phone, Globe, ChevronRight } from 'lucide-react';

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [profile, setProfile] = useState({
//     name: 'Admin User',
//     email: 'admin@learningplatform.com',
//     role: 'Super Admin',
//     phone: '+91 98765 43210',
//     location: 'Hyderabad, India'
//   });

//   return (
//     // <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-8">
//       <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-10 pb-10 mt-[40px] md:mt-[40px]">
//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Settings</h1>
//           <p className="text-blue-500 font-bold text-sm uppercase tracking-widest mt-1">Configure your workspace</p>
//         </div>
//         <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-white px-4 py-2 rounded-full border border-blue-100 shadow-sm">
//           <Globe size={14} className="text-blue-400" />
//           Last sync: Just now
//         </div>
//       </div>

//       <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-100/50 border border-blue-50 overflow-hidden flex flex-col lg:flex-row min-h-[650px]">
        
//         {/* LEFT NAVIGATION: GLASS SIDEBAR */}
//         <div className="w-full lg:w-80 bg-gradient-to-b from-blue-50/50 to-white border-r border-blue-50 p-8 space-y-3">
//           <div className="mb-8 px-2">
//             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Account Menu</h3>
//             <div className="space-y-1">
//               <TabButton 
//                 active={activeTab === 'profile'} 
//                 onClick={() => setActiveTab('profile')}
//                 icon={<User size={18} />}
//                 label="Profile Details"
//               />
//               <TabButton 
//                 active={activeTab === 'security'} 
//                 onClick={() => setActiveTab('security')}
//                 icon={<Lock size={18} />}
//                 label="Password & Security"
//               />
//               {/* <TabButton 
//                 active={activeTab === 'notifications'} 
//                 onClick={() => setActiveTab('notifications')}
//                 icon={<Bell size={18} />}
//                 label="Notifications"
//               /> */}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT CONTENT: DYNAMIC AREA */}
//         <div className="flex-1 p-8 lg:p-12 bg-white">
//           {activeTab === 'profile' ? (
//             <div className="max-w-3xl space-y-10">
//               {/* AVATAR UPLOAD SECTION */}
//               <div className="flex flex-col sm:flex-row items-center gap-8 p-6 rounded-[2.5rem] bg-blue-50/30 border border-blue-100/50">
//                 <div className="relative group">
//                   <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-200">
//                     {profile.name.charAt(0)}
//                   </div>
//                   <button className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-2xl shadow-xl border border-blue-50 text-blue-600 hover:scale-110 hover:bg-blue-600 hover:text-white transition-all">
//                     <Camera size={18} />
//                   </button>
//                 </div>
//                 <div className="text-center sm:text-left">
//                   <h2 className="text-2xl font-black text-slate-800 tracking-tight">{profile.name}</h2>
//                   <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
//                     <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase rounded-full tracking-widest shadow-lg shadow-blue-100 flex items-center gap-1.5">
//                       <ShieldCheck size={12} /> {profile.role}
//                     </span>
//                     <span className="px-3 py-1 bg-white text-slate-500 text-[10px] font-black uppercase rounded-full border border-blue-100 tracking-widest">
//                       ID: #ADM-2026
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* PROFILE FORM */}
//               <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
//                 <InputGroup label="Display Name" icon={<User size={16}/>} value={profile.name} placeholder="Name" />
//                 <InputGroup label="Email Address" icon={<Mail size={16}/>} value={profile.email} placeholder="Email" disabled />
//                 <InputGroup label="Contact Number" icon={<Phone size={16}/>} value={profile.phone} placeholder="Phone" />
//                 <InputGroup label="Office Location" icon={<Globe size={16}/>} value={profile.location} placeholder="Location" />
                
//                 <div className="md:col-span-2 pt-6">
//                   <button className="group flex items-center justify-center gap-3 bg-blue-600 text-white w-full sm:w-auto px-10 py-4 rounded-2xl font-bold shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:translate-y-[-2px] transition-all active:scale-95">
//                     <Save size={20} /> 
//                     Update All Settings
//                     <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                   </button>
//                 </div>
//               </form>
//             </div>
//           ) : (
//             <div className="max-w-xl space-y-10">
//               <div>
//                 <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Security Guardrails</h2>
//                 <p className="text-slate-400 text-sm">Keep your administrative account protected with a strong password.</p>
//               </div>
              
//               <div className="space-y-6">
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
//                   <input type="password" placeholder="••••••••••••" className="w-full p-4 rounded-2xl bg-slate-50 border border-blue-50 outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all font-mono" />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
//                   <input type="password"  placeholder="••••••••••••" className="w-full p-4 rounded-2xl bg-slate-50 border border-blue-50 outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all font-mono" />
//                 </div>
//                 <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl active:scale-95">
//                   Confirm Password Update
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // COMPONENT: MODERN INPUT GROUP
// const InputGroup = ({ label, icon, value, placeholder, disabled = false }) => (
//   <div className="space-y-2 group">
//     <label className="text-[10px] font-black text-slate-400 group-focus-within:text-blue-500 uppercase tracking-widest ml-1 transition-colors">
//       {label}
//     </label>
//     <div className="relative">
//       <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${disabled ? 'text-slate-300' : 'text-blue-400 group-focus-within:text-blue-600'}`}>
//         {icon}
//       </div>
//       <input 
//         type="text" 
//         defaultValue={value}
//         disabled={disabled}
//         placeholder={placeholder}
//         className={`w-full p-4 pl-12 rounded-2xl border transition-all outline-none ${
//           disabled 
//           ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed italic' 
//           : 'bg-white border-blue-50 hover:border-blue-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 font-semibold text-slate-700 shadow-sm hover:shadow-md'
//         }`}
//       />
//     </div>
//   </div>
// );

// // COMPONENT: SIDEBAR TAB BUTTON
// const TabButton = ({ active, onClick, icon, label }) => (
//   <button 
//     onClick={onClick}
//     className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all group ${
//       active 
//       ? 'bg-white text-blue-600 shadow-xl shadow-blue-100/50 scale-[1.03] border border-blue-50' 
//       : 'text-slate-400 hover:bg-white hover:text-slate-600 hover:shadow-md'
//     }`}
//   >
//     <div className="flex items-center gap-4">
//       <span className={`${active ? 'text-blue-600' : 'text-slate-300 group-hover:text-blue-400'} transition-colors`}>{icon}</span>
//       {label}
//     </div>
//     {active && <ChevronRight size={16} className="text-blue-200" />}
//   </button>
// );

// export default Settings;


import React, { useState } from 'react';
import { User, Lock, Bell, Save, Camera, ShieldCheck, Mail, Phone, Globe, ChevronRight, Eye, EyeOff } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@learningplatform.com',
    role: 'Super Admin',
    phone: '+91 98765 43210',
    location: 'Hyderabad, India'
  });

  return (
    <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-10 pb-10 mt-[40px] md:mt-[40px]">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Settings</h1>
          <p className="text-blue-500 font-bold text-sm uppercase tracking-widest mt-1">Configure your workspace</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-white px-4 py-2 rounded-full border border-blue-100 shadow-sm">
          <Globe size={14} className="text-blue-400" />
          Last sync: Just now
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-100/50 border border-blue-50 overflow-hidden flex flex-col lg:flex-row min-h-[650px]">
        
        {/* LEFT NAVIGATION */}
        <div className="w-full lg:w-80 bg-gradient-to-b from-blue-50/50 to-white border-r border-blue-50 p-8 space-y-3">
          <div className="mb-8 px-2">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Account Menu</h3>
            <div className="space-y-1">
              <TabButton 
                active={activeTab === 'profile'} 
                onClick={() => setActiveTab('profile')}
                icon={<User size={18} />}
                label="Profile Details"
              />
              <TabButton 
                active={activeTab === 'security'} 
                onClick={() => setActiveTab('security')}
                icon={<Lock size={18} />}
                label="Password & Security"
              />
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-8 lg:p-12 bg-white">
          {activeTab === 'profile' ? (
            <div className="max-w-3xl space-y-10">

              {/* AVATAR */}
              <div className="flex flex-col sm:flex-row items-center gap-8 p-6 rounded-[2.5rem] bg-blue-50/30 border border-blue-100/50">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-200">
                    {profile.name.charAt(0)}
                  </div>
                  <button className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-2xl shadow-xl border border-blue-50 text-blue-600 hover:scale-110 hover:bg-blue-600 hover:text-white transition-all">
                    <Camera size={18} />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">{profile.name}</h2>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase rounded-full tracking-widest shadow-lg shadow-blue-100 flex items-center gap-1.5">
                      <ShieldCheck size={12} /> {profile.role}
                    </span>
                    <span className="px-3 py-1 bg-white text-slate-500 text-[10px] font-black uppercase rounded-full border border-blue-100 tracking-widest">
                      ID: #ADM-2026
                    </span>
                  </div>
                </div>
              </div>

              {/* FORM */}
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InputGroup label="Display Name" icon={<User size={16}/>} value={profile.name} placeholder="Name" />
                <InputGroup label="Email Address" icon={<Mail size={16}/>} value={profile.email} placeholder="Email" disabled />
                <InputGroup label="Contact Number" icon={<Phone size={16}/>} value={profile.phone} placeholder="Phone" />
                <InputGroup label="Office Location" icon={<Globe size={16}/>} value={profile.location} placeholder="Location" />
                
                <div className="md:col-span-2 pt-6">
                  <button className="group flex items-center justify-center gap-3 bg-blue-600 text-white w-full sm:w-auto px-10 py-4 rounded-2xl font-bold shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:translate-y-[-2px] transition-all active:scale-95">
                    <Save size={20} /> 
                    Update All Settings
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          ) : (

            <div className="max-w-xl space-y-10">
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Update Password</h2>
                <p className="text-slate-400 text-sm">Keep your administrative account protected with a strong password.</p>
              </div>
              
              <div className="space-y-6">

                {/* PASSWORD */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      className="w-full p-4 pr-12 rounded-2xl bg-slate-50 border border-blue-50 outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      className="w-full p-4 pr-12 rounded-2xl bg-slate-50 border border-blue-50 outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                    >
                      {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </div>

                <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl active:scale-95">
                  Confirm Password Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// INPUT GROUP
const InputGroup = ({ label, icon, value, placeholder, disabled = false }) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-black text-slate-400 group-focus-within:text-blue-500 uppercase tracking-widest ml-1 transition-colors">
      {label}
    </label>
    <div className="relative">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${disabled ? 'text-slate-300' : 'text-blue-400'}`}>
        {icon}
      </div>
      <input 
        type="text" 
        defaultValue={value}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full p-4 pl-12 rounded-2xl border outline-none ${
          disabled 
          ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed italic' 
          : 'bg-white border-blue-50'
        }`}
      />
    </div>
  </div>
);

// TAB BUTTON
const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl font-bold text-sm ${
      active ? 'bg-white text-blue-600 shadow-xl' : 'text-slate-400'
    }`}
  >
    <div className="flex items-center gap-4">
      {icon}
      {label}
    </div>
    {active && <ChevronRight size={16} />}
  </button>
);

export default Settings;