# attacklo

**Interactive Cyber Attack Path Visualization, Simulation & Defense Decision Platform**

## What it is
attacklo lets you visually explore complete cyber attack paths, simulate attacker decisions stage-by-stage, apply defenses in real time, and instantly see how the path is broken or weakened.

Built for students, junior blue-teamers, and anyone who wants a clear mental model of how attacks actually progress and where defenses matter most.

## Features (Current)
- Interactive graph-based attack path (React Flow)
- Classic Ransomware scenario with full Kill Chain stages
- Stage-by-stage simulation controls
- Real-time defense application with impact visualization
- Defense effectiveness scoring
- Live simulation log
- Clean, modern UI

## Tech Stack
- Next.js 15+ (App Router) + TypeScript
- Tailwind CSS
- @xyflow/react (React Flow)
- Zustand (state)
- Framer Motion
- Lucide icons

## Quick Start

```bash
git clone https://github.com/tiwarson/attacklo.git
cd attacklo
npm install
npm run dev
```

Open http://localhost:3000

## How to use
1. Click **Start Simulation**
2. Follow the attacker through stages by choosing next steps
3. At any stage, select the node and **Apply** relevant defenses from the left panel
4. Watch the path get blocked (red) when a strong defense is applied
5. Reset and try different defense combinations

## Project Structure
```
src/
  app/           # Next.js pages
  components/    # AttackGraph, ControlPanel, SimulationLog
  data/          # Scenarios & defenses
  store/         # Zustand simulation store
  types/         # TypeScript definitions
```

## Next Steps you can add
- More scenarios (BEC, Insider, Web intrusion)
- Custom scenario builder
- Side-by-side comparison mode
- Export graph as PNG / JSON
- User accounts + saved simulations

---
Made for academic excellence and real utility.
