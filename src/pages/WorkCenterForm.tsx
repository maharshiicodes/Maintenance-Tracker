import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { useData, type WorkCenter } from '../context/DataContext';

const WorkCenterForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getWorkCenter, addWorkCenter, updateWorkCenter, requests } = useData();

  // Default empty work center
  const emptyWorkCenter = {
    name: "",
    code: "",
    tag: ""
  };

  const [workCenter, setWorkCenter] = useState(emptyWorkCenter);

  useEffect(() => {
    if (id && id !== 'new') {
      const workCenterId = parseInt(id, 10);
      const existingWorkCenter = getWorkCenter(workCenterId);
      if (existingWorkCenter) {
        setWorkCenter(existingWorkCenter);
      }
    } else {
      setWorkCenter(emptyWorkCenter);
    }
  }, [id, getWorkCenter]);

  // Get related maintenance requests for this work center
  const relatedRequests = requests.filter(req => 
    req.maintenanceFor === "Work Center" && req.targetId === workCenter.name
  );

  const handleSave = () => {
    if (!workCenter.name.trim()) {
      alert('Please enter a work center name');
      return;
    }

    if (id === 'new') {
      addWorkCenter({ ...workCenter, id: 0 });
      navigate('/work-centers');
    } else {
      const workCenterId = parseInt(id || '0', 10);
      updateWorkCenter(workCenterId, workCenter);
      navigate('/work-centers');
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
             Work Centers <span className="mx-2 text-slate-600">/</span> 
             <span className="text-slate-100 font-medium">{id === 'new' ? 'New' : workCenter.name}</span>
           </div>
        </div>
        <button 
          onClick={handleSave}
          className="px-4 py-1.5 bg-cyan-600 text-white rounded hover:bg-cyan-500 transition-colors text-sm font-medium shadow-[0_0_10px_rgba(8,145,178,0.4)]"
        >
          <Save size={16} className="inline mr-2" />
          Save
        </button>
      </div>

      {/* MAIN FORM */}
      <div className="max-w-5xl mx-auto">
        
        {/* Work Center Name Header */}
        <div className="mb-8 border-b border-slate-800 pb-2">
           <label className="text-cyan-500 text-sm font-semibold block mb-1">Work Center Name</label>
           <input 
             type="text" 
             value={workCenter.name}
             onChange={(e) => setWorkCenter({...workCenter, name: e.target.value})}
             placeholder="e.g. Assembly 1"
             className="w-full text-4xl bg-transparent outline-none text-slate-100 placeholder-slate-600 font-light"
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mb-12">
           <div className="flex items-center justify-between border-b border-slate-800 py-1">
              <label className="text-slate-400 w-1/3">Code</label>
              <input 
                type="text" 
                value={workCenter.code} 
                onChange={(e) => setWorkCenter({...workCenter, code: e.target.value})}
                placeholder="e.g. WC001"
                className="bg-transparent outline-none text-slate-200 w-2/3"
              />
           </div>
           <div className="flex items-center justify-between border-b border-slate-800 py-1">
              <label className="text-slate-400 w-1/3">Tag</label>
              <input 
                type="text" 
                value={workCenter.tag} 
                onChange={(e) => setWorkCenter({...workCenter, tag: e.target.value})}
                placeholder="e.g. Main Line"
                className="bg-transparent outline-none text-slate-200 w-2/3"
              />
           </div>
        </div>

        {/* Related Maintenance Requests */}
        {id !== 'new' && relatedRequests.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">Related Maintenance Requests</h3>
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-700 text-slate-400 text-sm uppercase">
                    <th className="p-4 font-semibold">Subject</th>
                    <th className="p-4 font-semibold">Stage</th>
                    <th className="p-4 font-semibold">Created By</th>
                    <th className="p-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {relatedRequests.map((req) => (
                    <tr 
                      key={req.id}
                      onClick={() => navigate(`/maintenance/${req.id}`)}
                      className="hover:bg-slate-800/50 transition-colors cursor-pointer"
                    >
                      <td className="p-4 font-medium text-cyan-400">{req.subject}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs border ${
                          req.stage === 'New Request' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                          req.stage === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {req.stage}
                        </span>
                      </td>
                      <td className="p-4 text-slate-300">{req.createdBy || 'N/A'}</td>
                      <td className="p-4 text-slate-400">{req.requestDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkCenterForm;

