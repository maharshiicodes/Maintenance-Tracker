import React from 'react';
import { Search, Plus, Filter, MoreHorizontal, Settings } from 'lucide-react';

const WorkCenters = () => {
  // Mock Data based on your image
  const workCenters = [
    { 
      id: 1, 
      name: "Assembly 1", 
      code: "WC001", 
      tag: "Main Line", 
      alternative: "Assembly 2", 
      cost: 15.00, 
      capacity: 100, 
      efficiency: 100, 
      oee: 84.59 
    },
    { 
      id: 2, 
      name: "Drill 1", 
      code: "DR001", 
      tag: "Machining", 
      alternative: "Drill 2", 
      cost: 12.50, 
      capacity: 100, 
      efficiency: 95, 
      oee: 90.00 
    },
  ];

  return (
    <div className="min-h-screen bg-black text-slate-100 p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Work Centers</h1>
          <p className="text-slate-500 text-sm">Manage production lines and stations</p>
        </div>
        <button className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]">
          <Plus size={18} />
          <span>New Work Center</span>
        </button>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 border-b border-slate-700 text-slate-400 text-sm uppercase">
              <th className="p-4 font-semibold">Work Center</th>
              <th className="p-4 font-semibold">Code</th>
              <th className="p-4 font-semibold">Tag</th>
              <th className="p-4 font-semibold">Alternative Workcenters</th>
              <th className="p-4 font-semibold text-right">Cost per hour</th>
              <th className="p-4 font-semibold text-right">Capacity</th>
              <th className="p-4 font-semibold text-right">Time Efficiency</th>
              <th className="p-4 font-semibold text-right">OEE Target</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {workCenters.map((wc) => (
              <tr key={wc.id} className="hover:bg-slate-800/50 transition-colors group text-sm">
                <td className="p-4 font-medium text-cyan-400">{wc.name}</td>
                <td className="p-4 text-slate-300">{wc.code}</td>
                <td className="p-4">
                  <span className="bg-slate-800 border border-slate-700 px-2 py-1 rounded text-xs text-slate-400">
                    {wc.tag}
                  </span>
                </td>
                <td className="p-4 text-slate-300">{wc.alternative}</td>
                <td className="p-4 text-right text-slate-300">${wc.cost.toFixed(2)}</td>
                <td className="p-4 text-right text-slate-300">{wc.capacity}.00</td>
                <td className="p-4 text-right text-slate-300">{wc.efficiency}.00</td>
                <td className="p-4 text-right font-semibold text-emerald-400">{wc.oee}</td>
                <td className="p-4 text-right">
                  <button className="text-slate-600 hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all">
                    <Settings size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkCenters;