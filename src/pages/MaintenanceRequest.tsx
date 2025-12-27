import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, FileText, Star, User, ExternalLink 
} from 'lucide-react';
import { useData, type Request, type WorkCenter } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const MaintenanceRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addRequest, updateRequest, getRequest, workCenters } = useData();
  const { currentUser } = useAuth();

  // 1. Define the default "Blank" state (form state)
  const emptyRequest = {
    id: 0,
    subject: "",
    createdBy: currentUser?.name || "",
    maintenanceFor: "Equipment" as "Equipment" | "Work Center",
    selectedEquipment: "",
    selectedWorkCenter: "",
    category: "",
    requestDate: new Date().toISOString().split('T')[0],
    type: "Corrective",
    team: "Internal Maintenance",
    technician: "",
    scheduledDate: "",
    duration: 0,
    priority: 0,
    company: "My Company (San Francisco)",
    stage: "New Request",
    notes: ""
  };

  const [request, setRequest] = useState(() => ({
    ...emptyRequest,
    createdBy: currentUser?.name || ""
  }));
  const stages = ["New Request", "In Progress", "Repaired", "Scrap"];

  // 2. Convert Request type to form state
  const requestToForm = (req: Request) => {
    const isEquipment = req.maintenanceFor === "Equipment";
    return {
      id: req.id,
      subject: req.subject,
      createdBy: req.createdBy || currentUser?.name || "",
      maintenanceFor: req.maintenanceFor,
      selectedEquipment: isEquipment ? req.targetId : "",
      selectedWorkCenter: !isEquipment ? req.targetId : "",
      category: req.category,
      requestDate: req.requestDate,
      type: req.type,
      team: req.team,
      technician: req.technician,
      scheduledDate: "",
      duration: 0,
      priority: req.priority,
      company: req.company,
      stage: req.stage,
      notes: ""
    };
  };

  // 3. Convert form state to Request type
  const formToRequest = (form: typeof emptyRequest): Request => {
    return {
      id: form.id,
      subject: form.subject,
      maintenanceFor: form.maintenanceFor,
      targetId: form.maintenanceFor === "Equipment" ? form.selectedEquipment : form.selectedWorkCenter,
      technician: form.technician,
      category: form.category,
      priority: form.priority,
      stage: form.stage,
      company: form.company,
      team: form.team,
      type: form.type,
      requestDate: form.requestDate,
      createdBy: form.createdBy || currentUser?.name || "Unknown"
    };
  };

  // 4. EFFECT: Load data from context or initialize new form
  useEffect(() => {
    if (id === 'new') {
      // Set createdBy from current user for new requests
      setRequest({ 
        ...emptyRequest, 
        createdBy: currentUser?.name || "",
        requestDate: new Date().toISOString().split('T')[0]
      });
    } else {
      const requestId = parseInt(id || '0', 10);
      const existingRequest = getRequest(requestId);
      if (existingRequest) {
        setRequest(requestToForm(existingRequest));
      }
    }
  }, [id, getRequest, currentUser]);

  // 5. Handle Save button click
  const handleSave = () => {
    if (!request.subject.trim()) {
      alert('Please enter a subject');
      return;
    }

    const requestData = formToRequest(request);
    // Ensure createdBy is set from current user for new requests
    if (id === 'new' && currentUser) {
      requestData.createdBy = currentUser.name;
    }
    
    if (id === 'new') {
      // Add new request
      addRequest({ ...requestData, id: 0 });
      navigate('/');
    } else {
      // Update existing request (don't change createdBy on update)
      const requestId = parseInt(id || '0', 10);
      const existingRequest = getRequest(requestId);
      if (existingRequest) {
        // Preserve the original createdBy when updating
        updateRequest(requestId, { ...requestData, createdBy: existingRequest.createdBy });
      }
      navigate('/');
    }
  };

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
             {/* Dynamic Title */}
             <span className="text-slate-100 font-medium">
               {id === 'new' ? 'New' : request.subject}
             </span>
           </div>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 rounded hover:bg-slate-700 transition-colors text-sm">
             <FileText size={16} /> Worksheet
           </button>
           <button 
             onClick={handleSave}
             className="px-4 py-1.5 bg-cyan-600 text-white rounded hover:bg-cyan-500 transition-colors text-sm font-medium shadow-[0_0_10px_rgba(8,145,178,0.4)]"
           >
             Save
           </button>
        </div>
      </div>

      {/* STATUS PIPELINE (Only show if not new, or keep for all) */}
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
             placeholder="e.g. Broken Monitor"
             className="w-full text-4xl bg-transparent outline-none text-slate-100 placeholder-slate-700 font-light"
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
           {/* LEFT COLUMN */}
           <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Created By</label>
                 <div className="w-2/3 flex items-center gap-2 text-slate-200">
                    <User size={16} className="text-cyan-500"/>
                    {request.createdBy || currentUser?.name || 'N/A'}
                 </div>
              </div>

              {/* Maintenance For Selection */}
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

              {/* CONDITIONAL RENDER */}
              {request.maintenanceFor === "Equipment" ? (
                <div className="flex items-center justify-between border-b border-slate-800 py-1">
                   <label className="text-slate-400 w-1/3">Equipment</label>
                   <div className="w-2/3 flex items-center gap-2">
                       <select 
                          value={request.selectedEquipment}
                          onChange={(e) => setRequest({...request, selectedEquipment: e.target.value})}
                          className="bg-transparent outline-none text-slate-200 flex-1"
                       >
                          <option value="">Select Equipment...</option>
                          <option>Acer Laptop/LP/203/19281928</option>
                          <option>CNC Machine 01</option>
                       </select>
                       <button onClick={() => navigate('/equipment/1')} className="text-cyan-500 p-1">
                         <ExternalLink size={16} />
                       </button>
                   </div>
                </div>
              ) : (
                <div className="flex items-center justify-between border-b border-slate-800 py-1">
                   <label className="text-slate-400 w-1/3">Work Center</label>
                   <div className="w-2/3 flex items-center gap-2">
                       <select 
                          value={request.selectedWorkCenter}
                          onChange={(e) => setRequest({...request, selectedWorkCenter: e.target.value})}
                          className="bg-transparent outline-none text-slate-200 flex-1"
                       >
                          <option value="">Select Work Center...</option>
                          {workCenters.map((wc) => (
                            <option key={wc.id} value={wc.name}>{wc.name}</option>
                          ))}
                       </select>
                       <button 
                         onClick={() => {
                           const selectedWC = workCenters.find(wc => wc.name === request.selectedWorkCenter);
                           if (selectedWC) {
                             navigate(`/work-centers/${selectedWC.id}`);
                           } else {
                             navigate('/work-centers');
                           }
                         }} 
                         className="text-cyan-500 p-1 hover:text-cyan-400"
                         disabled={!request.selectedWorkCenter}
                       >
                         <ExternalLink size={16} />
                       </button>
                   </div>
                </div>
              )}

              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Category</label>
                 <input 
                   type="text" 
                   value={request.category} 
                   onChange={(e) => setRequest({...request, category: e.target.value})}
                   className="w-2/3 bg-transparent outline-none text-slate-200"
                 />
              </div>

              <div className="flex items-start justify-between py-2">
                 <label className="text-slate-400 w-1/3">Maintenance Type</label>
                 <div className="w-2/3 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                       <input 
                         type="radio" 
                         checked={request.type === "Corrective"} 
                         onChange={() => setRequest({...request, type: "Corrective"})}
                         className="accent-cyan-500"
                       />
                       <span className="text-slate-200">Corrective</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                       <input 
                         type="radio" 
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
                 <div className="w-2/3 flex items-center gap-2">
                     <select 
                        value={request.team}
                        onChange={(e) => setRequest({...request, team: e.target.value})}
                        className="bg-transparent outline-none text-slate-200 flex-1"
                     >
                        <option>Internal Maintenance</option>
                        <option>External Support</option>
                     </select>
                     <button onClick={() => navigate('/teams/1')} className="text-cyan-500 p-1">
                       <ExternalLink size={16} />
                     </button>
                 </div>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Technician</label>
                 <input 
                   type="text" 
                   value={request.technician} 
                   onChange={(e) => setRequest({...request, technician: e.target.value})}
                   className="w-2/3 bg-transparent outline-none text-slate-200"
                 />
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 py-1">
                 <label className="text-slate-400 w-1/3">Priority</label>
                 <div className="w-2/3 flex items-center gap-1">
                    {[1, 2, 3].map((star) => (
                       <Star 
                         key={star}
                         size={20}
                         className={`cursor-pointer ${star <= request.priority ? "fill-cyan-400 text-cyan-400" : "text-slate-700"}`}
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