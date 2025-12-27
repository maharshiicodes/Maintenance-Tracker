import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, MoreHorizontal } from 'lucide-react';
import { useData } from '../context/DataContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { requests } = useData();

  return (
    <div className="min-h-screen bg-black text-slate-100 p-8 font-sans">
      
      {/* HEADER ACTIONS */}
      <div className="flex justify-between items-center mb-8">
        
        {/* === 3. THE FIX: New Button === */}
        <button 
          onClick={() => navigate('/maintenance/new')} // <--- This makes it CLICKABLE
          className="flex items-center gap-2 bg-cyan-600 text-white px-6 py-2.5 rounded hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)] font-medium"
        >
          <Plus size={20} />
          <span>New</span>
        </button>

        {/* Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative group w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-slate-900 border border-slate-700 rounded pl-10 pr-4 py-2 outline-none focus:border-cyan-500/50 transition-all text-slate-200"
            />
          </div>
          <button className="p-2 border border-slate-700 rounded text-slate-400 hover:text-cyan-400 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* KPI CARDS (Static for visual) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-slate-900/50 border border-red-500/20 p-6 rounded-xl relative overflow-hidden">
            <h3 className="text-red-400 font-medium mb-1">Critical Equipment</h3>
            <div className="text-3xl font-bold text-slate-100">5 Units</div>
            <div className="text-xs text-red-500 mt-1">(Health &lt; 30%)</div>
         </div>
         <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-blue-400 font-medium mb-1">Technician Load</h3>
            <div className="text-3xl font-bold text-slate-100">85% Utilized</div>
            <div className="text-xs text-blue-500 mt-1">(Assign Carefully)</div>
         </div>
         <div className="bg-slate-900/50 border border-emerald-500/20 p-6 rounded-xl">
            <h3 className="text-emerald-400 font-medium mb-1">Open Requests</h3>
            <div className="text-3xl font-bold text-slate-100">12 Pending</div>
            <div className="text-xs text-emerald-500 mt-1">3 Overdue</div>
         </div>
      </div>

      {/* MAIN TABLE */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Subject</th>
              <th className="p-4 font-semibold">Employee</th>
              <th className="p-4 font-semibold">Technician</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Stage</th>
              <th className="p-4 font-semibold">Company</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {requests.map((req) => (
              <tr 
                key={req.id} 
                onClick={() => navigate(`/maintenance/${req.id}`)} // <--- This makes ROWS CLICKABLE
                className="hover:bg-slate-800/50 transition-colors cursor-pointer group text-sm"
              >
                <td className="p-4 font-medium text-cyan-400">{req.subject}</td>
                <td className="p-4 text-slate-300">{req.createdBy || 'N/A'}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300">
                      {req.technician.charAt(0) || '?'}
                    </div>
                    <span className="text-slate-300">{req.technician || 'Unassigned'}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-400">
                    {req.category || 'Uncategorized'}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs border ${
                    req.stage === 'New Request' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                    req.stage === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {req.stage}
                  </span>
                </td>
                <td className="p-4 text-slate-400">{req.company}</td>
                <td className="p-4 text-right">
                  <MoreHorizontal size={16} className="text-slate-600 group-hover:text-white transition-colors" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;