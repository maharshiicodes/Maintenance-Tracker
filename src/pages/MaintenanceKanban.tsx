import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MoreHorizontal, Clock, User } from 'lucide-react';

const MaintenanceKanban = () => {
  const navigate = useNavigate();

  // Mock Kanban Data
  const columns = [
    {
      id: "new",
      title: "New Request",
      color: "border-t-4 border-t-purple-500",
      items: [
        { id: 101, title: "Screen Flicker", equipment: "Monitor Dell", priority: "High", user: "Mitchel Admin" },
        { id: 102, title: "Calibration Needed", equipment: "Drill Press", priority: "Medium", user: "Marc Demo" }
      ]
    },
    {
      id: "progress",
      title: "In Progress",
      color: "border-t-4 border-t-blue-500",
      items: [
        { id: 103, title: "Leaking Oil", equipment: "CNC Machine 01", priority: "Critical", user: "Mitchel Admin" }
      ]
    },
    {
      id: "repaired",
      title: "Repaired",
      color: "border-t-4 border-t-emerald-500",
      items: [
        { id: 104, title: "Broken Hinge", equipment: "Laptop HP", priority: "Low", user: "Sarah Smith" }
      ]
    },
    {
      id: "scrap",
      title: "Scrap",
      color: "border-t-4 border-t-red-500",
      items: []
    }
  ];

  return (
    <div className="min-h-screen bg-black text-slate-100 p-8 font-sans overflow-x-auto">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Maintenance Pipeline</h1>
          <p className="text-slate-500 text-sm">Drag and drop requests to change status</p>
        </div>
        <button 
           onClick={() => navigate('/maintenance/new')}
           className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]"
        >
          <Plus size={18} />
          <span>New Request</span>
        </button>
      </div>

      {/* KANBAN BOARD */}
      <div className="flex gap-6 min-w-[1000px]">
        {columns.map((col) => (
          <div key={col.id} className="w-80 flex-shrink-0">
            {/* Column Header */}
            <div className={`bg-slate-900 border border-slate-800 p-3 rounded-t-lg flex justify-between items-center ${col.color}`}>
               <h3 className="font-semibold text-slate-200">{col.title}</h3>
               <span className="bg-slate-800 text-xs px-2 py-0.5 rounded text-slate-400">{col.items.length}</span>
            </div>

            {/* Column Body */}
            <div className="bg-slate-900/50 border-x border-b border-slate-800 p-3 min-h-[500px] rounded-b-lg space-y-3">
               {col.items.map((item) => (
                 <div 
                   key={item.id}
                   onClick={() => navigate(`/maintenance/${item.id}`)}
                   className="bg-slate-800 p-4 rounded border border-slate-700 hover:border-cyan-500/50 cursor-pointer shadow-sm hover:shadow-md transition-all group"
                 >
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-medium text-cyan-400 group-hover:underline">{item.title}</h4>
                       <MoreHorizontal size={16} className="text-slate-500 hover:text-white"/>
                    </div>
                    <p className="text-sm text-slate-300 mb-3">{item.equipment}</p>
                    
                    <div className="flex justify-between items-center border-t border-slate-700/50 pt-3">
                       {/* Priority Tag */}
                       <span className={`text-xs px-2 py-1 rounded border ${
                          item.priority === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                          item.priority === 'High' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                          'bg-slate-700 text-slate-300 border-slate-600'
                       }`}>
                         {item.priority}
                       </span>
                       
                       {/* User Avatar */}
                       <div className="flex items-center gap-1 text-xs text-slate-500">
                          <User size={12} />
                          {item.user.split(' ')[0]}
                       </div>
                    </div>
                 </div>
               ))}
               
               {/* Add Button per column */}
               <button 
                 onClick={() => navigate('/maintenance/new')}
                 className="w-full py-2 text-sm text-slate-500 hover:bg-slate-800 rounded border border-dashed border-slate-700 hover:text-cyan-400 transition-colors"
               >
                 + Add
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceKanban;