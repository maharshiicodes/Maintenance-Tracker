import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Wrench, User, Building2, QrCode } from 'lucide-react';

const EquipmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock State
  const [equipment, setEquipment] = useState({
    name: "Samsung Monitor 15\"",
    category: "Monitors",
    serial: "MT/125/22778837",
    model: "S-15-LED-2024",
    employee: "Tejas Modi",
    department: "Admin",
    technician: "Mitchell Admin",
    warranty: "2026-12-31",
    cost: 150.00,
    company: "My Company (San Francisco)",
    description: "Standard office monitor provided to admin staff.",
    maintenanceCount: 3 // For the Smart Button
  });

  return (
    <div className="min-h-screen bg-black text-slate-100 p-8 font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white">
             <ArrowLeft size={20} />
           </button>
           <div className="text-sm text-slate-400">
             Equipment <span className="mx-2 text-slate-600">/</span> 
             <span className="text-slate-100 font-medium">{id === 'new' ? 'New' : equipment.name}</span>
           </div>
        </div>
        <button className="px-4 py-1.5 bg-cyan-600 text-white rounded hover:bg-cyan-500 transition-colors text-sm font-medium shadow-[0_0_10px_rgba(8,145,178,0.4)]">
          Save
        </button>
      </div>

      {/* SMART BUTTON (Top Right) */}
      <div className="flex justify-end mb-8">
        <button className="flex flex-col items-center justify-center bg-slate-900 border border-slate-700 hover:bg-slate-800 w-32 h-16 rounded transition-colors relative overflow-hidden group">
           <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg z-10">
             <Wrench size={18} />
             <span>{equipment.maintenanceCount}</span>
           </div>
           <span className="text-xs text-slate-400 z-10">Maintenance</span>
           {/* Hover Effect */}
           <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>

      {/* MAIN FORM */}
      <div className="max-w-5xl mx-auto">
        
        {/* Title / Name */}
        <div className="mb-8 border-b border-slate-800 pb-2">
           <label className="text-cyan-500 text-sm font-semibold block mb-1">Equipment Name</label>
           <input 
             type="text" 
             value={equipment.name}
             onChange={(e) => setEquipment({...equipment, name: e.target.value})}
             className="w-full text-4xl bg-transparent outline-none text-slate-100 placeholder-slate-600 font-light"
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
           
           {/* LEFT COLUMN */}
           <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Category</label>
                 <select className="w-2/3 bg-transparent outline-none text-slate-200">
                    <option>Monitors</option>
                    <option>Computers</option>
                    <option>Printers</option>
                 </select>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Company</label>
                 <input type="text" value={equipment.company} readOnly className="w-2/3 bg-transparent outline-none text-slate-400" />
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Assigned Employee</label>
                 <div className="w-2/3 flex items-center gap-2">
                    <User size={16} className="text-cyan-500"/>
                    <input type="text" value={equipment.employee} className="bg-transparent outline-none text-slate-200 flex-1" />
                 </div>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Department</label>
                 <div className="w-2/3 flex items-center gap-2">
                    <Building2 size={16} className="text-cyan-500"/>
                    <input type="text" value={equipment.department} className="bg-transparent outline-none text-slate-200 flex-1" />
                 </div>
              </div>
           </div>

           {/* RIGHT COLUMN */}
           <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Technician</label>
                 <input type="text" value={equipment.technician} className="w-2/3 bg-transparent outline-none text-slate-200" />
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Serial Number</label>
                 <div className="w-2/3 flex items-center gap-2">
                    <QrCode size={16} className="text-cyan-500"/>
                    <input type="text" value={equipment.serial} className="bg-transparent outline-none text-slate-200 font-mono flex-1" />
                 </div>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Model</label>
                 <input type="text" value={equipment.model} className="w-2/3 bg-transparent outline-none text-slate-200" />
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Warranty Expiry</label>
                 <input type="date" value={equipment.warranty} className="w-2/3 bg-transparent outline-none text-slate-200" />
              </div>
           </div>
        </div>

        {/* Description Tabs */}
        <div className="mt-12">
            <h3 className="text-sm font-semibold text-cyan-400 mb-2">Description</h3>
            <textarea 
               value={equipment.description}
               className="w-full h-32 bg-slate-900/50 border border-slate-800 rounded p-4 text-slate-300 outline-none focus:border-cyan-500/50"
            />
        </div>

      </div>
    </div>
  );
};

export default EquipmentForm;