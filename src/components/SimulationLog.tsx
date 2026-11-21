"use client";

import { useSimulationStore } from "@/store/simulationStore";
import { useEffect, useRef } from "react";

export default function SimulationLog() {
  const logs = useSimulationStore((s) => s.simulation.logs);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const typeStyles = {
    info: "text-slate-600 bg-slate-100",
    attack: "text-orange-700 bg-orange-50",
    defense: "text-emerald-700 bg-emerald-50",
    success: "text-red-700 bg-red-50",
    blocked: "text-white bg-red-600 font-semibold",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-48">
      <div className="px-4 py-2 border-b border-slate-100 font-semibold text-sm text-slate-700">
        Simulation Log
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1.5 text-xs font-mono">
        {logs.length === 0 && (
          <div className="text-slate-400 italic">Start the simulation to see events...</div>
        )}
        {logs.map((log, i) => (
          <div
            key={i}
            className={`px-2 py-1 rounded ${typeStyles[log.type] || typeStyles.info}`}
          >
            <span className="opacity-60 mr-2">
              {new Date(log.timestamp).toLocaleTimeString()}
            </span>
            {log.message}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
