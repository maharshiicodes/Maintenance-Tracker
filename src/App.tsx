import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import MaintenanceRequest from "./pages/MaintenanceRequest";
import WorkCenters from "./pages/WorkCenters";
import WorkCenterForm from "./pages/WorkCenterForm";
import Equipment from "./pages/Equipment";
import EquipmentForm from "./pages/EquipmentForm";
import TeamForm from "./pages/TeamForm";
import Teams from "./pages/Teams";
import MaintenanceCalendar from "./pages/MaintenanceCalendar";
import MaintenanceKanban from "./pages/MaintenanceKanban";
import Reporting from "./pages/Reporting";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-cyan-500/30">
      <BrowserRouter>
        <Routes>
          
          {/* PUBLIC ROUTES (Login/Signup) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* DASHBOARD ROUTES (With Sidebar) - Protected */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/equipment/:id" element={<EquipmentForm />} />
            <Route path="/work-centers" element={<WorkCenters />} />
            <Route path="/work-centers/:id" element={<WorkCenterForm />} />
            <Route path="/maintenance/:id" element={<MaintenanceRequest />} />
            <Route path="/teams/:id" element={<TeamForm />} />
            <Route path="/maintenance" element={<MaintenanceKanban />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/calendar" element={<MaintenanceCalendar />} />
            <Route path="/reporting" element={<Reporting />} />
          </Route>

          {/* Redirect root to login if not authenticated, or to dashboard if authenticated */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;