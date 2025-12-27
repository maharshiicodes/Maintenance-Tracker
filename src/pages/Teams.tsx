import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, Users } from 'lucide-react';

const Teams = () => {
  const navigate = useNavigate();

  // Mock Data matching your image
  const teams = [
    { 
      id: 1, 
      name: "Internal Maintenance", 
      members: ["Anas Makari", "Mitchell Admin"], 
      company: "My Company (San Francisco)" 
    },
    { 
      id: 2, 
      name: "Metrology", 
      members: ["Marc Demo"], 
      company: "My Company (San Francisco)" 
    },
    { 
      id: 3, 
      name: "Subcontractor", 
      members: ["Maggie Davidson"], 
      company: "My Company (San Francisco)" 
    },
  ];

  return (
    <div className="min-h-screen bg-black text-slate-100 p-8 font-sans">
      
      {/* HEADER Actions */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Teams</h1>
          <p className="text-slate-500 text-sm">Manage maintenance crews and subcontractors</p>
        </div>
        
        {/* New Team Button */}
        <button 
          onClick={() => navigate('/teams/new')}
          className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]"
        >
          <Plus size={18} />
          <span>New</span>
        </button>
      </div>

      {/* TEAMS TABLE */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-700 text-slate-400 text-sm uppercase">
              <th className="p-4 font-semibold">Team Name</th>
              <th className="p-4 font-semibold">Team Members</th>
              <th className="p-4 font-semibold">Company</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {teams.map((team) => (
              <tr 
                key={team.id} 
                onClick={() => navigate(`/teams/${team.id}`)} // This opens the TeamForm
                className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
              >
                <td className="p-4 font-medium text-cyan-400">{team.name}</td>
                <td className="p-4 text-slate-300 flex flex-wrap gap-2">
                  {team.members.map((member, idx) => (
                    <span key={idx} className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-full text-xs border border-slate-700">
                      <Users size={12} className="text-slate-500"/>
                      {member}
                    </span>
                  ))}
                </td>
                <td className="p-4 text-slate-400">{team.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;