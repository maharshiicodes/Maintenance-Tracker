import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, Plus } from 'lucide-react';

const MaintenanceCalendar = () => {
  const [view, setView] = useState('Week'); // Day, Week, Month

  // Mock Days for "Week 51"
  const weekDays = [
    { day: "Sun", date: 14 },
    { day: "Mon", date: 15 },
    { day: "Tue", date: 16 },
    { day: "Wed", date: 17 },
    { day: "Thu", date: 18, isToday: true },
    { day: "Fri", date: 19 },
    { day: "Sat", date: 20 },
  ];

  // Mock Time Slots (06:00 to 23:00)
  const hours = Array.from({ length: 18 }, (_, i) => i + 6); // 6 to 23

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col bg-black text-slate-100 font-sans">
      
      {/* 1. CALENDAR HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold">Maintenance Calendar</h1>
          
          <div className="flex items-center gap-2 bg-slate-900 rounded-lg p-1 border border-slate-800">
             <button className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
               <ChevronLeft size={20} />
             </button>
             <button className="px-3 text-sm font-medium text-slate-200">Today</button>
             <button className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
               <ChevronRight size={20} />
             </button>
          </div>
          
          <span className="text-lg font-medium text-slate-300">December 2025 <span className="text-slate-500 text-sm ml-2">Week 51</span></span>
        </div>

        <div className="flex items-center gap-3">
           <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
              {['Day', 'Week', 'Month', 'Year'].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                    view === v ? "bg-cyan-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {v}
                </button>
              ))}
           </div>
           <button className="p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors shadow-[0_0_10px_rgba(8,145,178,0.4)]">
             <Plus size={20} />
           </button>
        </div>
      </div>

      {/* 2. MAIN CALENDAR BODY */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT: MAIN GRID */}
        <div className="flex-1 flex flex-col overflow-hidden relative border-r border-slate-800">
           
           {/* Weekday Header */}
           <div className="grid grid-cols-8 border-b border-slate-800 bg-slate-950">
              <div className="col-span-1 border-r border-slate-800 py-4 text-center text-xs text-slate-500 uppercase tracking-wider">
                 Time (GMT)
              </div>
              {weekDays.map((d) => (
                <div key={d.day} className={`col-span-1 border-r border-slate-800 py-4 text-center ${d.isToday ? 'bg-cyan-900/10' : ''}`}>
                   <div className={`text-xs uppercase font-bold mb-1 ${d.isToday ? 'text-cyan-400' : 'text-slate-500'}`}>{d.day}</div>
                   <div className={`text-xl font-light ${d.isToday ? 'text-white' : 'text-slate-400'}`}>{d.date}</div>
                </div>
              ))}
           </div>

           {/* Scrollable Time Grid */}
           <div className="flex-1 overflow-y-auto relative custom-scrollbar">
              {/* The "Current Time" Red Line */}
              <div className="absolute top-[450px] left-0 right-0 border-t-2 border-red-500 z-10 flex items-center">
                 <div className="w-2 h-2 rounded-full bg-red-500 -ml-1"></div>
              </div>

              {hours.map((hour) => (
                 <div key={hour} className="grid grid-cols-8 min-h-[60px]">
                    {/* Time Label */}
                    <div className="col-span-1 border-r border-b border-slate-800/50 text-xs text-slate-500 text-right pr-4 pt-2 relative">
                       <span className="-top-3 relative">{hour.toString().padStart(2, '0')}:00</span>
                    </div>

                    {/* Day Columns */}
                    {weekDays.map((d, index) => (
                       <div key={index} className={`col-span-1 border-r border-b border-slate-800/50 relative group hover:bg-white/5 transition-colors ${d.isToday ? 'bg-cyan-900/5' : ''}`}>
                          {/* Sample Event Card */}
                          {d.day === "Thu" && hour === 14 && (
                            <div className="absolute top-2 left-1 right-1 bg-cyan-600/20 border-l-2 border-cyan-500 p-2 rounded text-xs overflow-hidden cursor-pointer hover:bg-cyan-600/30 transition-colors">
                               <div className="font-bold text-cyan-200">Repair CNC</div>
                               <div className="text-cyan-400/70">14:30 - 16:00</div>
                            </div>
                          )}
                       </div>
                    ))}
                 </div>
              ))}
           </div>
        </div>

        {/* RIGHT: MINI SIDEBAR (Matches mockup right panel) */}
        <div className="w-72 bg-slate-950 border-l border-slate-800 p-6 hidden md:block">
           <div className="mb-6 flex justify-between items-center text-slate-300">
             <span className="font-medium">December 2025</span>
             <div className="flex gap-2 text-slate-500">
               <ChevronLeft size={16} className="hover:text-white cursor-pointer"/>
               <ChevronRight size={16} className="hover:text-white cursor-pointer"/>
             </div>
           </div>

           {/* Mini Grid */}
           <div className="grid grid-cols-7 gap-y-4 text-center text-sm mb-8">
              {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-slate-600 text-xs">{d}</span>)}
              {Array.from({length: 31}, (_, i) => i+1).map(d => (
                 <span 
                   key={d} 
                   className={`
                     w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-slate-800
                     ${d === 18 ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30' : 'text-slate-400'}
                   `}
                 >
                   {d}
                 </span>
              ))}
           </div>

           {/* Filters */}
           <div className="space-y-4 border-t border-slate-800 pt-6">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Calendars</h3>
              <label className="flex items-center gap-3 cursor-pointer group">
                 <input type="checkbox" defaultChecked className="accent-cyan-500 w-4 h-4 rounded border-slate-700 bg-slate-900" />
                 <span className="text-sm text-slate-300 group-hover:text-white">Internal Maintenance</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                 <input type="checkbox" className="accent-cyan-500 w-4 h-4 rounded border-slate-700 bg-slate-900" />
                 <span className="text-sm text-slate-300 group-hover:text-white">Preventive</span>
              </label>
           </div>
        </div>

      </div>
    </div>
  );
};

export default MaintenanceCalendar;