import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, Settings } from 'lucide-react';

const Equipment = () => {
  const navigate = useNavigate();

  // Mock Data matching your image
  const equipmentList = [
    { 
      id: 1, 
      name: "Samsung Monitor 15\"", 
      employee: "Tejas Modi", 
      department: "Admin", 
      serial: "MT/125/22778837", 
      technician: "Mitchell Admin", 
      category: "Monitors", 
      company: "My Company (San Francisco)" 
    },
    { 
      id: 2, 
      name: "Acer Laptop", 
      employee: "Bhaumik P", 
      department: "Technician", 
      serial: "MT/122/11112222", 
      technician: "Marc Demo", 
      category: "Computers", 
      company: "My Company (San Francisco)" 
    },
    { 
      id: 3, 
      name: "HP Printer LaserJet", 
      employee: "Sarah Smith", 
      department: "Sales", 
      serial: "HP/999/888777", 
      technician: "Mitchell Admin", 
      category: "Printers", 
      company: "My Company (San Francisco)" 
    },
  ];

  return (
    <div className="min-h-screen bg-black text-slate-100 p-8 font-sans">
      
      {/* HEADER ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Equipment</h1>
          <p className="text-slate-500 text-sm">Manage assets and machinery</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
           {/* NEW BUTTON */}
          <button 
            onClick={() => navigate('/equipment/new')}
            className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]"
          >
            <Plus size={18} />
            <span>New</span>
          </button>

          {/* SEARCH BAR */}
          <div className="relative group w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-slate-900 border border-slate-700 rounded pl-10 pr-4 py-2 outline-none focus:border-cyan-500/50 focus:bg-slate-900/80 transition-all text-slate-200"
            />
          </div>
          
          <button className="p-2 border border-slate-700 rounded text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden backdrop-blur-sm shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-700 text-slate-400 text-sm uppercase font-semibold">
                <th className="p-4">Equipment Name</th>
                <th className="p-4">Employee</th>
                <th className="p-4">Department</th>
                <th className="p-4">Serial Number</th>
                <th className="p-4">Technician</th>
                <th className="p-4">Equipment Category</th>
                <th className="p-4">Company</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {equipmentList.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => navigate(`/equipment/${item.id}`)} // CLICK TO OPEN FORM
                  className="hover:bg-slate-800/50 transition-colors cursor-pointer text-sm group"
                >
                  <td className="p-4 font-medium text-cyan-400">{item.name}</td>
                  <td className="p-4 text-slate-300">{item.employee}</td>
                  <td className="p-4 text-slate-300">{item.department}</td>
                  <td className="p-4 text-slate-400 font-mono">{item.serial}</td>
                  <td className="p-4 text-slate-300">{item.technician}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{item.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Equipment;