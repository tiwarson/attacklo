// Attacklo Core Types - Attack Path Visualization & Defense Decision Platform

export type StageType =
  | "reconnaissance"
  | "initial_access"
  | "execution"
  | "persistence"
  | "privilege_escalation"
  | "defense_evasion"
  | "credential_access"
  | "discovery"
  | "lateral_movement"
  | "collection"
  | "command_and_control"
  | "exfiltration"
  | "impact";

export interface Technique {
  id: string;
  name: string;
  mitreId?: string;
  description: string;
  difficulty: "low" | "medium" | "high";
  detectionDifficulty: "low" | "medium" | "high";
}

export interface Defense {
  id: string;
  name: string;
  description: string;
  effectiveness: number; // 0-100
  cost: "low" | "medium" | "high";
  stageIds: StageType[]; // which stages this defense can be applied to
  breaksPath: boolean; // completely stops the path if applied
}

export interface AttackNode {
  id: string;
  type: "stage" | "technique" | "defense" | "asset";
  stage: StageType;
  label: string;
  description: string;
  techniques?: Technique[];
  position: { x: number; y: number };
  status: "pending" | "active" | "completed" | "blocked" | "skipped";
  appliedDefenses?: string[]; // defense ids
}

export interface AttackEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  style?: Record<string, any>;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  category: "ransomware" | "bec" | "insider" | "web_intrusion" | "custom";
  difficulty: "beginner" | "intermediate" | "advanced";
  nodes: AttackNode[];
  edges: AttackEdge[];
  defenses: Defense[];
  initialNodeId: string;
  goalNodeId: string;
  tags: string[];
}

export interface SimulationState {
  currentNodeId: string | null;
  pathTaken: string[];
  appliedDefenses: Record<string, string[]>; // nodeId -> defenseIds
  isRunning: boolean;
  isComplete: boolean;
  score: number;
  blocked: boolean;
  logs: SimulationLog[];
}

export interface SimulationLog {
  timestamp: number;
  type: "info" | "attack" | "defense" | "success" | "blocked";
  message: string;
  nodeId?: string;
}
