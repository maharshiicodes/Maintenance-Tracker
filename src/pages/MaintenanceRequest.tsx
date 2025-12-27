import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, FileText, Star, User
} from 'lucide-react';

const MaintenanceRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState({
    id: 1,
    subject: "Test activity",
    createdBy: "Mitchell Admin",
    
    // NEW: Logic field
    maintenanceFor: "Equipment", // Options: "Equipment" | "Work Center"
    
    selectedEquipment: "Acer Laptop/LP/203/19281928",
    selectedWorkCenter: "",
    
    category: "Computers",
    requestDate: "2025-12-18",
    type: "Corrective",
    team: "Internal Maintenance",
    technician: "Aka Foster",
    scheduledDate: "2025-12-28T14:30",
    duration: 0,
    priority: 1,
    company: "My Company (San Francisco)",
    stage: "New Request",
    notes: ""
  });

  const [activeTab, setActiveTab] = useState("Notes");
  const stages = ["New Request", "In Progress", "Repaired", "Scrap"];

  return (
    <div className="min-h-screen bg-black text-slate-100 p-8 font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white">
             <ArrowLeft size={20} />
           </button>
           <div className="text-sm text-slate-400">
             Maintenance Requests <span className="mx-2 text-slate-600">/</span> 
             <span className="text-slate-100 font-medium">{request.subject}</span>
           </div>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 rounded hover:bg-slate-700 transition-colors text-sm">
             <FileText size={16} /> Worksheet
           </button>
           <button className="px-4 py-1.5 bg-cyan-600 text-white rounded hover:bg-cyan-500 transition-colors text-sm font-medium shadow-[0_0_10px_rgba(8,145,178,0.4)]">
             Save
           </button>
        </div>
      </div>

      {/* STATUS PIPELINE */}
      <div className="flex justify-end mb-8 bg-slate-900/50 p-2 rounded-lg border border-slate-800">
         <div className="flex items-center">
            {stages.map((stage, index) => {
              const isActive = request.stage === stage;
              return (
                <div 
                  key={stage}
                  onClick={() => setRequest({...request, stage})}
                  className={`
                    relative px-4 py-1.5 text-sm font-medium cursor-pointer transition-colors
                    ${isActive ? "bg-cyan-700 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}
                    ${index !== 0 ? "ml-1" : ""} 
                    clip-path-arrow 
                  `}
                  style={{ clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%, 10% 50%)", paddingLeft: "20px" }}
                >
                  {stage}
                </div>
              );
            })}
         </div>
      </div>

      {/* MAIN FORM */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 border-b border-slate-800 pb-2">
           <label className="text-cyan-500 text-sm font-semibold block mb-1">Subject</label>
           <input 
             type="text" 
             value={request.subject}
             onChange={(e) => setRequest({...request, subject: e.target.value})}
             className="w-full text-4xl bg-transparent outline-none text-slate-100 placeholder-slate-600 font-light"
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
           {/* LEFT COLUMN */}
           <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Created By</label>
                 <div className="w-2/3 flex items-center gap-2 text-slate-200">
                    <User size={16} className="text-cyan-500"/>
                    {request.createdBy}
                 </div>
              </div>

              {/* === THE LOGIC CHANGE: Maintenance For === */}
              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Maintenance For</label>
                 <select 
                    value={request.maintenanceFor}
                    onChange={(e) => setRequest({...request, maintenanceFor: e.target.value})}
                    className="w-2/3 bg-transparent outline-none text-cyan-400 font-medium cursor-pointer"
                 >
                    <option value="Equipment">Equipment</option>
                    <option value="Work Center">Work Center</option>
                 </select>
              </div>

              {/* === CONDITIONAL RENDER === */}
              {request.maintenanceFor === "Equipment" ? (
                <div className="flex items-center justify-between border-b border-slate-800 py-1">
                   <label className="text-slate-400 w-1/3">Equipment</label>
                   <select 
                      value={request.selectedEquipment}
                      onChange={(e) => setRequest({...request, selectedEquipment: e.target.value})}
                      className="w-2/3 bg-transparent outline-none text-slate-200"
                   >
                      <option>Acer Laptop/LP/203/19281928</option>
                      <option>CNC Machine 01</option>
                      <option>Drill Press</option>
                   </select>
                </div>
              ) : (
                <div className="flex items-center justify-between border-b border-slate-800 py-1">
                   <label className="text-slate-400 w-1/3">Work Center</label>
                   <select 
                      value={request.selectedWorkCenter}
                      onChange={(e) => setRequest({...request, selectedWorkCenter: e.target.value})}
                      className="w-2/3 bg-transparent outline-none text-slate-200"
                   >
                      <option value="">Select Work Center...</option>
                      <option>Assembly 1</option>
                      <option>Drill 1</option>
                      <option>Packaging Unit</option>
                   </select>
                </div>
              )}

              {/* Category */}
              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Category</label>
                 <input 
                   type="text" 
                   value={request.category} 
                   className="w-2/3 bg-transparent outline-none text-slate-200"
                 />
              </div>

              {/* Maintenance Type */}
              <div className="flex items-start justify-between py-2">
                 <label className="text-slate-400 w-1/3">Maintenance Type</label>
                 <div className="w-2/3 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                       <input 
                         type="radio" 
                         name="type" 
                         checked={request.type === "Corrective"}
                         onChange={() => setRequest({...request, type: "Corrective"})}
                         className="accent-cyan-500"
                       />
                       <span className="text-slate-200">Corrective</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                       <input 
                         type="radio" 
                         name="type" 
                         checked={request.type === "Preventive"}
                         onChange={() => setRequest({...request, type: "Preventive"})}
                         className="accent-cyan-500"
                       />
                       <span className="text-slate-200">Preventive</span>
                    </label>
                 </div>
              </div>
           </div>

           {/* RIGHT COLUMN */}
           <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Team</label>
                 <select className="w-2/3 bg-transparent outline-none text-slate-200">
                    <option>Internal Maintenance</option>
                    <option>External Support</option>
                 </select>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Technician</label>
                 <input type="text" value={request.technician} className="w-2/3 bg-transparent outline-none text-slate-200"/>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Priority</label>
                 <div className="w-2/3 flex items-center gap-1">
                    {[1, 2, 3].map((star) => (
                       <Star 
                         key={star}
                         size={20}
                         className={`cursor-pointer transition-colors ${
                            star <= request.priority ? "fill-cyan-400 text-cyan-400" : "text-slate-700"
                         }`}
                         onClick={() => setRequest({...request, priority: star})}
                       />
                    ))}
                 </div>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Company</label>
                 <input type="text" value={request.company} readOnly className="w-2/3 bg-transparent outline-none text-slate-400"/>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceRequest;