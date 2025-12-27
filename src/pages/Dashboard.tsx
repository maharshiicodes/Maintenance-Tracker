import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, MoreHorizontal, AlertTriangle, Users, Activity } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
  // Mock Data for the table matches your image
  const requests = [
    { id: 1, subject: "Test activity", employee: "Mitchell Admin", technician: "Aka Foster", category: "Computer", stage: "New Request", company: "My Company" },
    { id: 2, subject: "Leaking Oil", employee: "John Doe", technician: "Marc Demo", category: "Machine", stage: "In Progress", company: "My Company" },
    { id: 3, subject: "Screen Flicker", employee: "Sarah Smith", technician: "Aka Foster", category: "Monitor", stage: "Repaired", company: "My Company" },
  ];

  return (
    <div className="space-y-8">
      
      {/* HEADER ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button className="flex items-center gap-2 bg-cyan-500 text-black font-semibold px-6 py-2.5 rounded-lg hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <Plus size={20} />
          <span>New</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative group w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:border-cyan-500/50 focus:bg-slate-900/80 transition-all text-slate-200"
            />
          </div>
          <button className="p-2.5 border border-slate-700 rounded-lg text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* STATUS CARDS (The Red, Blue, Green cards from image) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: Critical Equipment (Red) */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-red-500/40 transition-all">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertTriangle size={64} className="text-red-500" />
          </div>
          <h3 className="text-red-400 font-medium mb-2">Critical Equipment</h3>
          <div className="text-3xl font-bold text-slate-100 mb-1">5 Units</div>
          <p className="text-sm text-red-400/80">(Health &lt; 30%)</p>
        </div>

        {/* CARD 2: Technician Load (Blue) */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/40 transition-all">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={64} className="text-blue-500" />
          </div>
          <h3 className="text-blue-400 font-medium mb-2">Technician Load</h3>
          <div className="text-3xl font-bold text-slate-100 mb-1">85% Utilized</div>
          <p className="text-sm text-blue-400/80">(Assign Carefully)</p>
        </div>

        {/* CARD 3: Open Requests (Green) */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity size={64} className="text-emerald-500" />
          </div>
          <h3 className="text-emerald-400 font-medium mb-2">Open Requests</h3>
          <div className="text-3xl font-bold text-slate-100 mb-1">12 Pending</div>
          <p className="text-sm text-emerald-400/80">3 Overdue</p>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 text-sm uppercase tracking-wider bg-slate-800/30">
                <th className="p-4 font-medium">Subject</th>
                <th className="p-4 font-medium">Employee</th>
                <th className="p-4 font-medium">Technician</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Stage</th>
                <th className="p-4 font-medium">Company</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {requests.map((req) => (
                <tr key={req.id} 
                onClick={() => navigate(`/maintenance/${req.id}`)}
                className="text-slate-200 hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-medium text-cyan-400">{req.subject}</td>
                  <td className="p-4">{req.employee}</td>
                  <td className="p-4 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300">
                      {req.technician.charAt(0)}
                    </div>
                    {req.technician}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs text-slate-300">
                      {req.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${
                      req.stage === 'New Request' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                      req.stage === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {req.stage}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{req.company}</td>
                  <td className="p-4 text-right">
                    <button className="text-slate-500 hover:text-slate-200">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;