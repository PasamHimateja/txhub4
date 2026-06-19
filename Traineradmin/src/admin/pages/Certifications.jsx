import React from 'react';
import { Award } from 'lucide-react';

export default function Certifications() {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
          <Award className="w-8 h-8 text-blue-600" />
          Certifications
        </h1>
        <p className="text-slate-500 mt-2">Manage student certifications and issuing.</p>
      </div>
      
      <div className="bg-white rounded-3xl p-10 flex-1 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <Award className="w-12 h-12 text-blue-300" />
        </div>
        <h2 className="text-xl font-bold text-slate-700 mb-2">Certifications Module</h2>
        <p className="text-slate-400 max-w-md">
          This section is ready for development. You can start adding certification issuance and tracking features here.
        </p>
      </div>
    </div>
  );
}
