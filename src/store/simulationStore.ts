import { create } from "zustand";
import { Scenario, SimulationState, SimulationLog, AttackNode } from "@/types/attack";
import { ransomwareScenario } from "@/data/scenarios";

interface SimulationStore {
  scenario: Scenario;
  simulation: SimulationState;
  selectedNodeId: string | null;
  setScenario: (scenario: Scenario) => void;
  selectNode: (nodeId: string | null) => void;
  startSimulation: () => void;
  advanceToNode: (nodeId: string) => void;
  applyDefense: (nodeId: string, defenseId: string) => void;
  resetSimulation: () => void;
  addLog: (log: Omit<SimulationLog, "timestamp">) => void;
}

const initialSimulation: SimulationState = {
  currentNodeId: null,
  pathTaken: [],
  appliedDefenses: {},
  isRunning: false,
  isComplete: false,
  score: 100,
  blocked: false,
  logs: [],
};

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  scenario: ransomwareScenario,
  simulation: initialSimulation,
  selectedNodeId: null,

  setScenario: (scenario) =>
    set({
      scenario,
      simulation: { ...initialSimulation },
      selectedNodeId: null,
    }),

  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

  startSimulation: () => {
    const { scenario } = get();
    set({
      simulation: {
        ...initialSimulation,
        isRunning: true,
        currentNodeId: scenario.initialNodeId,
        pathTaken: [scenario.initialNodeId],
        logs: [
          {
            timestamp: Date.now(),
            type: "info",
            message: `Simulation started: ${scenario.name}`,
          },
        ],
      },
    });
  },

  advanceToNode: (nodeId) => {
    const { simulation, scenario } = get();
    if (simulation.blocked || simulation.isComplete) return;

    const node = scenario.nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const newPath = [...simulation.pathTaken, nodeId];
    const isGoal = nodeId === scenario.goalNodeId;

    set({
      simulation: {
        ...simulation,
        currentNodeId: nodeId,
        pathTaken: newPath,
        isComplete: isGoal,
        logs: [
          ...simulation.logs,
          {
            timestamp: Date.now(),
            type: isGoal ? "success" : "attack",
            message: isGoal
              ? `Attacker reached final impact: ${node.label}`
              : `Attacker progressed to: ${node.label}`,
            nodeId,
          },
        ],
      },
    });
  },

  applyDefense: (nodeId, defenseId) => {
    const { simulation, scenario } = get();
    const defense = scenario.defenses.find((d) => d.id === defenseId);
    if (!defense) return;

    const currentApplied = simulation.appliedDefenses[nodeId] || [];
    if (currentApplied.includes(defenseId)) return;

    const newApplied = {
      ...simulation.appliedDefenses,
      [nodeId]: [...currentApplied, defenseId],
    };

    const breaks = defense.breaksPath;
    const newScore = Math.max(0, simulation.score - (breaks ? 0 : 5) + (breaks ? 15 : 8));

    set({
      simulation: {
        ...simulation,
        appliedDefenses: newApplied,
        blocked: breaks,
        score: Math.min(100, newScore),
        isComplete: breaks ? true : simulation.isComplete,
        logs: [
          ...simulation.logs,
          {
            timestamp: Date.now(),
            type: breaks ? "blocked" : "defense",
            message: breaks
              ? `DEFENSE SUCCESS: ${defense.name} completely stopped the attack at this stage!`
              : `Defense applied: ${defense.name} (Effectiveness: ${defense.effectiveness}%)`,
            nodeId,
          },
        ],
      },
    });
  },

  resetSimulation: () =>
    set({
      simulation: { ...initialSimulation },
      selectedNodeId: null,
    }),

  addLog: (log) =>
    set((state) => ({
      simulation: {
        ...state.simulation,
        logs: [...state.simulation.logs, { ...log, timestamp: Date.now() }],
      },
    })),
}));
