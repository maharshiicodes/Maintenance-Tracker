import React, { createContext, useContext, useState, useEffect } from 'react';

// === 1. USE 'TYPE' INSTEAD OF 'INTERFACE' (SAFER FOR STRICT MODE) ===

export type Request = {
  id: number;
  subject: string;
  maintenanceFor: "Equipment" | "Work Center";
  targetId: string;
  technician: string;
  category: string;
  priority: number;
  stage: string;
  company: string;
  team: string;
  type: string;
  requestDate: string;
  createdBy: string; // Employee name who created the request
};

export type Team = {
  id: number;
  name: string;
  members: string[];
  company: string;
};

export type Equipment = {
  id: number;
  name: string;
  category: string;
  serial: string;
  employee: string;
  department: string;
};

export type WorkCenter = {
  id: number;
  name: string;
  code: string;
  tag: string;
};

type DataContextType = {
  requests: Request[];
  teams: Team[];
  equipments: Equipment[];
  workCenters: WorkCenter[];
  addRequest: (req: Request) => void;
  updateRequest: (id: number, req: Partial<Request>) => void;
  updateRequestStage: (id: number, stage: string) => void;
  getRequest: (id: number) => Request | undefined;
  getEquipment: (id: number) => Equipment | undefined;
  getTeam: (id: number) => Team | undefined;
  getWorkCenter: (id: number) => WorkCenter | undefined;
  addWorkCenter: (wc: WorkCenter) => void;
  updateWorkCenter: (id: number, wc: Partial<WorkCenter>) => void;
};

// === 2. CREATE CONTEXT ===
const DataContext = createContext<DataContextType | undefined>(undefined);

// === 3. PROVIDER FUNCTION ===
export function DataProvider(props: { children: React.ReactNode }) {
  
  // === STATE (Using 'as' casting to avoid Syntax Errors) ===
  
  // Teams
  const [teams] = useState<Team[]>(() => {
    try {
      const saved = localStorage.getItem('gg_teams');
      return saved ? JSON.parse(saved) : [
        { id: 1, name: "Internal Maintenance", members: ["Anas Makari", "Mitchell Admin"], company: "My Company (San Francisco)" },
        { id: 2, name: "Metrology", members: ["Marc Demo"], company: "My Company (San Francisco)" },
      ];
    } catch (e) { return []; }
  });

  // Equipments
  const [equipments] = useState<Equipment[]>(() => {
    try {
      const saved = localStorage.getItem('gg_equipments');
      return saved ? JSON.parse(saved) : [
        { id: 1, name: "Acer Laptop/LP/203/19281928", category: "Computers", serial: "LP203", employee: "Bhaumik P", department: "IT" },
        { id: 2, name: "CNC Machine 01", category: "Machinery", serial: "CNC99", employee: "Operator A", department: "Production" },
      ];
    } catch (e) { return []; }
  });

  // Work Centers
  const [workCenters] = useState<WorkCenter[]>(() => {
    try {
      const saved = localStorage.getItem('gg_workcenters');
      return saved ? JSON.parse(saved) : [
        { id: 1, name: "Assembly 1", code: "WC001", tag: "Main Line" },
        { id: 2, name: "Drill 1", code: "DR001", tag: "Machining" },
      ];
    } catch (e) { return []; }
  });

  // Requests
  const [requests, setRequests] = useState<Request[]>(() => {
    try {
      const saved = localStorage.getItem('gg_requests');
      return saved ? JSON.parse(saved) : [
        { 
          id: 1, subject: "Test activity", maintenanceFor: "Equipment" as const, targetId: "Acer Laptop/LP/203/19281928", 
          technician: "Aka Foster", category: "Computers", priority: 1, stage: "New Request", 
          company: "My Company (San Francisco)", team: "Internal Maintenance", type: "Corrective", requestDate: "2025-12-18",
          createdBy: "Mitchell Admin"
        }
      ];
    } catch (e) { return []; }
  });

  // === PERSISTENCE ===
  useEffect(() => { localStorage.setItem('gg_teams', JSON.stringify(teams)); }, [teams]);
  useEffect(() => { localStorage.setItem('gg_equipments', JSON.stringify(equipments)); }, [equipments]);
  useEffect(() => { localStorage.setItem('gg_workcenters', JSON.stringify(workCenters)); }, [workCenters]);
  useEffect(() => { localStorage.setItem('gg_requests', JSON.stringify(requests)); }, [requests]);

  // === ACTIONS ===
  function addRequest(req: Request) {
    // Generate new ID if id is 0 or doesn't exist
    const maxId = requests.length > 0 ? Math.max(...requests.map((r: Request) => r.id)) : 0;
    const newId = req.id === 0 ? maxId + 1 : req.id;
    const newRequest = { ...req, id: newId };
    setRequests((prev) => [...prev, newRequest]);
  }

  function updateRequest(id: number, updates: Partial<Request>) {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, ...updates } : r));
  }

  function updateRequestStage(id: number, stage: string) {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, stage } : r));
  }

  function getRequest(id: number): Request | undefined {
    return requests.find((r) => r.id === id);
  }

  function getEquipment(id: number): Equipment | undefined {
    return equipments.find((e) => e.id === id);
  }

  function getTeam(id: number): Team | undefined {
    return teams.find((t) => t.id === id);
  }

  function getWorkCenter(id: number): WorkCenter | undefined {
    return workCenters.find((wc) => wc.id === id);
  }

  function addWorkCenter(wc: WorkCenter) {
    const maxId = workCenters.length > 0 ? Math.max(...workCenters.map((w) => w.id)) : 0;
    const newId = wc.id === 0 ? maxId + 1 : wc.id;
    const newWorkCenter = { ...wc, id: newId };
    setWorkCenters((prev) => [...prev, newWorkCenter]);
  }

  function updateWorkCenter(id: number, updates: Partial<WorkCenter>) {
    setWorkCenters((prev) => prev.map((wc) => wc.id === id ? { ...wc, ...updates } : wc));
  }

  return (
    <DataContext.Provider value={{ requests, teams, equipments, workCenters, addRequest, updateRequest, updateRequestStage, getRequest, getEquipment, getTeam, getWorkCenter, addWorkCenter, updateWorkCenter }}>
      {props.children}
    </DataContext.Provider>
  );
}

// === 4. HOOK ===
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

