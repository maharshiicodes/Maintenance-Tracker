import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import MaintenanceRequest from "./pages/MaintenanceRequest";
import WorkCenters from "./pages/WorkCenters";
import Equipment from "./pages/Equipment";
import EquipmentForm from "./pages/EquipmentForm";
import TeamForm from "./pages/TeamForm";
import Teams from "./pages/Teams";
import MaintenanceCalendar from "./pages/MaintenanceCalendar";

// Dummy placeholder


function App() {
  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-cyan-500/30">
      <BrowserRouter>
        <Routes>
          
          {/* PUBLIC ROUTES (Login/Signup) */}
          {/* These will now just have the plain black background from the div above */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* DASHBOARD ROUTES (With Sidebar) */}
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/equipment" element={<Equipment />} />
    <Route path="/equipment/:id" element={<EquipmentForm />} />
            <Route path="/work-centers" element={<WorkCenters />} />
            <Route path="/maintenance/:id" element={<MaintenanceRequest />} />
            <Route path="/teams/:id" element={<TeamForm />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/calendar" element={<MaintenanceCalendar />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;