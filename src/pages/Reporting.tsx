import React from 'react';
import { PieChart, BarChart3, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const Reporting = () => {
  return (
    <div className="min-h-screen bg-black text-slate-100 p-8 font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Maintenance Analysis</h1>
          <p className="text-slate-500 text-sm">Performance metrics and KPI reporting</p>
        </div>
        <div className="flex gap-2">
           <select className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm text-slate-300 outline-none">
             <option>Last 30 Days</option>
             <option>Last Quarter</option>
             <option>Year to Date</option>
           </select>
           <button className="bg-cyan-600 text-white px-4 py-1.5 rounded text-sm hover:bg-cyan-500">Export PDF</button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Mean Time to Repair", value: "2h 15m", trend: "-12%", icon: Clock, color: "text-cyan-400" },
          { label: "Equipment Availability", value: "98.5%", trend: "+2.1%", icon: CheckCircle2, color: "text-emerald-400" },
          { label: "Total Costs", value: "$4,250", trend: "+5%", icon: TrendingUp, color: "text-blue-400" },
          { label: "Critical Failures", value: "3", trend: "0%", icon: AlertCircle, color: "text-red-400" },
        ].map((kpi, i) => (
           <div key={i} className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                 <span className="text-slate-500 text-sm">{kpi.label}</span>
                 <kpi.icon size={18} className={kpi.color} />
              </div>
              <div className="text-2xl font-bold text-slate-100 mb-1">{kpi.value}</div>
              <div className={`text-xs ${kpi.trend.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'}`}>
                 <span className="font-medium">{kpi.trend}</span> from last month
              </div>
           </div>
        ))}
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CHART 1: Failures by Category (Mock Bar Chart) */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
           <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
             <BarChart3 size={18} className="text-cyan-500" />
             Failures by Category
           </h3>
           <div className="space-y-4">
              {[
                { label: "Computers", pct: "75%", val: "12" },
                { label: "Machinery", pct: "45%", val: "8" },
                { label: "Printers", pct: "30%", val: "5" },
                { label: "Vehicles", pct: "20%", val: "3" },
              ].map((item) => (
                <div key={item.label}>
                   <div className="flex justify-between text-sm text-slate-400 mb-1">
                      <span>{item.label}</span>
                      <span>{item.val} Incidents</span>
                   </div>
                   <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full" style={{ width: item.pct }}></div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* CHART 2: Request Status (Mock Pie/Donut) */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
           <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
             <PieChart size={18} className="text-purple-500" />
             Current Request Status
           </h3>
           <div className="flex items-center justify-center gap-8">
              {/* CSS Circle Chart */}
              <div className="relative w-40 h-40 rounded-full border-[12px] border-slate-800 flex items-center justify-center">
                 <div className="absolute inset-0 rounded-full border-[12px] border-transparent border-t-purple-500 border-r-purple-500 rotate-45"></div>
                 <div className="text-center">
                    <div className="text-3xl font-bold text-white">42</div>
                    <div className="text-xs text-slate-500">Total</div>
                 </div>
              </div>
              
              {/* Legend */}
              <div className="space-y-3 text-sm">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-slate-300">New Request (40%)</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-slate-300">In Progress (35%)</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-slate-300">Repaired (25%)</span>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// Simple Mock Icon component just for the KPI array
import { Clock } from 'lucide-react'; 

export default Reporting;