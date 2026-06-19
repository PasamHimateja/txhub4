import React from 'react';
import { Award } from 'lucide-react';

const SampleCertificates = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Award className="text-blue-600" />
          Sample Certificates
        </h1>
      </div>
      {/* Empty State */}
      <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
        <Award size={48} className="mx-auto text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-slate-700">No Certificates Yet</h3>
        <p className="text-slate-500 mt-2">Complete courses to earn certificates. Your achievements will appear here.</p>
      </div>
    </div>
  );
};

export default SampleCertificates;
