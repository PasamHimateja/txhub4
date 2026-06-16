import { Loader2 } from 'lucide-react';

const Loader = () => (
  <div className="flex flex-col items-center justify-center p-20 space-y-4">
    <Loader2 className="animate-spin text-blue-600" size={48} />
    <p className="text-slate-500 font-medium animate-pulse">Fetching platform data...</p>
  </div>
);

export default Loader;