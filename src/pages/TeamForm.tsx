import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, Users, Trash2, Plus, Save } from 'lucide-react';

const TeamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Data based on "Internal Maintenance"
  const [team, setTeam] = useState({
    name: "Internal Maintenance",
    company: "My Company (San Francisco)",
    members: [
      { id: 1, name: "Anas Makari", role: "Technician" },
      { id: 2, name: "Mitchell Admin", role: "Manager" },
      { id: 3, name: "Aka Foster", role: "Technician" }
    ]
  });

  const addMember = () => {
    const newMember = { id: Date.now(), name: "New Member", role: "Technician" };
    setTeam({ ...team, members: [...team.members, newMember] });
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 p-8 font-sans">
      
      {/* 1. TOP HEADER (Breadcrumbs & Actions) */}
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white">
             <ArrowLeft size={20} />
           </button>
           <div className="text-sm text-slate-400">
             Teams <span className="mx-2 text-slate-600">/</span> 
             <span className="text-slate-100 font-medium">{id === 'new' ? 'New' : team.name}</span>
           </div>
        </div>
        <button className="px-4 py-1.5 bg-cyan-600 text-white rounded hover:bg-cyan-500 transition-colors text-sm font-medium shadow-[0_0_10px_rgba(8,145,178,0.4)]">
          Save
        </button>
      </div>

      {/* 2. MAIN FORM BODY */}
      <div className="max-w-5xl mx-auto">
        
        {/* Team Name Header */}
        <div className="mb-8 border-b border-slate-800 pb-2">
           <label className="text-cyan-500 text-sm font-semibold block mb-1">Team Name</label>
           <input 
             type="text" 
             value={team.name}
             onChange={(e) => setTeam({...team, name: e.target.value})}
             className="w-full text-4xl bg-transparent outline-none text-slate-100 placeholder-slate-600 font-light"
           />
        </div>

        {/* Company Field */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 mb-12">
           <div className="flex items-center justify-between border-b border-slate-800 py-1">
              <label className="text-slate-400 w-1/3">Company</label>
              <div className="w-2/3 flex items-center gap-2">
                 <Building size={16} className="text-slate-500"/>
                 <input 
                   type="text" 
                   value={team.company} 
                   readOnly
                   className="bg-transparent outline-none text-slate-400 w-full"
                 />
              </div>
           </div>
        </div>

        {/* 3. TEAM MEMBERS TAB */}
        <div>
          <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
            <h3 className="text-sm font-semibold text-cyan-400">Team Members</h3>
            <button 
              onClick={addMember}
              className="text-xs flex items-center gap-1 text-cyan-400 hover:text-cyan-300 border border-cyan-900/50 px-2 py-1 rounded bg-cyan-900/10"
            >
              <Plus size={14} /> Add
            </button>
          </div>

          <div className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-800">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-3 bg-slate-950 border-b border-slate-800 text-xs uppercase text-slate-500 font-semibold">
               <div className="col-span-1"></div>
               <div className="col-span-5">Name</div>
               <div className="col-span-5">Role</div>
               <div className="col-span-1"></div>
            </div>

            {/* Members List */}
            {team.members.map((member) => (
              <div key={member.id} className="grid grid-cols-12 gap-4 p-3 items-center border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors text-sm">
                <div className="col-span-1 flex justify-center">
                   <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-cyan-500">
                     <Users size={14} />
                   </div>
                </div>
                <div className="col-span-5">
                   <input 
                      value={member.name}
                      onChange={(e) => {
                         const updated = team.members.map(m => m.id === member.id ? {...m, name: e.target.value} : m);
                         setTeam({...team, members: updated});
                      }}
                      className="bg-transparent outline-none text-slate-200 w-full focus:text-cyan-400 transition-colors"
                   />
                </div>
                <div className="col-span-5">
                   <input 
                      value={member.role}
                      onChange={(e) => {
                         const updated = team.members.map(m => m.id === member.id ? {...m, role: e.target.value} : m);
                         setTeam({...team, members: updated});
                      }}
                      className="bg-transparent outline-none text-slate-400 w-full"
                   />
                </div>
                <div className="col-span-1 text-right">
                  <button 
                    onClick={() => setTeam({...team, members: team.members.filter(m => m.id !== member.id)})}
                    className="text-slate-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeamForm;