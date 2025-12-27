import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, UserCircle } from "lucide-react";

export default function DashboardLayout() {
  const location = useLocation();

  // Exact menu items from your image
  const navItems = [
    { label: "Maintenance", path: "/maintenance" }, // Acts as the App Title/Root
    { label: "Dashboard", path: "/" },
    { label: "Maintenance Calendar", path: "/calendar" },
    { label: "Equipment", path: "/equipment" },
    { label: "Reporting", path: "/reporting" },
    { label: "Teams", path: "/teams" },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-slate-100 font-sans selection:bg-cyan-500/30">
      
      {/* TOP NAVIGATION BAR */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="px-6 w-full">
          <div className="flex items-center justify-between h-14">
            
            {/* LEFT: Navigation Tabs */}
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
               {navItems.map((item) => {
                 const isActive = location.pathname === item.path;
                 
                 return (
                   <Link 
                     key={item.path} 
                     to={item.path} 
                     className={`relative text-sm font-medium transition-colors py-4 px-1 ${
                       isActive ? "text-slate-100" : "text-slate-400 hover:text-slate-200"
                     }`}
                   >
                     {item.label}
                     
                     {/* ANIMATED UNDERLINE (The "Motion" part) */}
                     {isActive && (
                       <motion.div
                         layoutId="nav-underline"
                         className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                         transition={{ type: "spring", stiffness: 300, damping: 30 }}
                       />
                     )}
                   </Link>
                 );
               })}
            </div>

            {/* RIGHT: User Profile / Logout */}
            <div className="flex items-center gap-4 pl-6 border-l border-slate-800 ml-4">
               <div className="flex items-center gap-2 text-sm text-slate-400">
                  <UserCircle size={18} />
                  <span className="hidden sm:block">Mitchell Admin</span>
               </div>
               <button className="text-slate-500 hover:text-red-400 transition-colors">
                 <LogOut size={18} />
               </button>
            </div>

          </div>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="p-6 md:p-8 max-w-[1920px] mx-auto w-full">
        {/* The Dashboard/Equipment page renders here */}
        <Outlet />
      </main>
    </div>
  );
}