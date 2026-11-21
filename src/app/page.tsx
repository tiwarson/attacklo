"use client";

import AttackGraph from "@/components/AttackGraph";
import ControlPanel from "@/components/ControlPanel";
import SimulationLog from "@/components/SimulationLog";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-slate-100 flex flex-col overflow-hidden">
      <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-none">attacklo</h1>
            <p className="text-[11px] text-slate-500 leading-none mt-0.5">
              Interactive Cyber Attack Path Visualization & Defense Decision Platform
            </p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3 text-xs text-slate-500">
          <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full font-medium">
            Ransomware Scenario
          </span>
          <span>MITRE ATT&CK aligned</span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-[360px] shrink-0 p-4 flex flex-col gap-4 overflow-y-auto border-r border-slate-200 bg-slate-50">
          <ControlPanel />
        </aside>

        <main className="flex-1 p-4 flex flex-col gap-4 min-w-0">
          <div className="flex-1 min-h-0">
            <AttackGraph />
          </div>
          <SimulationLog />
        </main>
      </div>
    </div>
  );
}
