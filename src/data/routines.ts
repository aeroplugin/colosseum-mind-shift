import { Routine } from "../types";

export const routines: Routine[] = [
  {
    id: "precision-reset",
    name: "The Precision Reset",
    purpose: "Sharpen mental clarity + emotional neutrality",
    steps: [
      "Inhale for 4s → hold for 2s → exhale for 8s",
      "At the bottom of the last exhale: relax shoulders, jaw, hands",
      "Eyes fixed forward on one point (reduces mental noise)"
    ],
    duration: "3 breath cycles (~1 min)",
    science: "Activates parasympathetic state, stabilizes HRV, improves cognitive performance under pressure",
    iconName: "target",
    tags: ["focus", "clarity", "calm"],
    detailedInstructions: [
      { text: "Sit up straight and prepare to focus", durationSeconds: 5 },
      { text: "Inhale deeply for 4 seconds", durationSeconds: 4 },
      { text: "Hold your breath for 2 seconds", durationSeconds: 2 },
      { text: "Exhale slowly for 8 seconds", durationSeconds: 8 },
      { text: "Relax your shoulders, jaw, and hands", durationSeconds: 3 },
      { text: "Repeat the breathing cycle", durationSeconds: 14 },
      { text: "Focus your eyes on one point ahead", durationSeconds: 5 },
      { text: "Complete the final breath cycle", durationSeconds: 14 },
      { text: "Notice your improved mental clarity", durationSeconds: 5 }
    ]
  },
  {
    id: "cold-mind",
    name: "The Brain Boosting Cold Mind",
    purpose: "Unlock mental clarity and reset cognitive function",
    steps: [
      "Splash cold water on face or hold ice pack to back of neck for 10s",
      "Focus on the sharpness and alertness it brings",
      "Take 3 deep, invigorating breaths while focusing on clarity"
    ],
    duration: "30 seconds",
    science: "Cold exposure stimulates the sympathetic nervous system and increases mental sharpness (Kohlstadt, 2018)",
    iconName: "snowflake",
    tags: ["clarity", "alertness", "energy"],
    detailedInstructions: [
      { text: "Prepare cold water or ice pack", durationSeconds: 5 },
      { text: "Apply cold to face or neck", durationSeconds: 10 },
      { text: "Focus on the sensation of sharpness", durationSeconds: 5 },
      { text: "Take first deep invigorating breath", durationSeconds: 3 },
      { text: "Take second deep invigorating breath", durationSeconds: 3 },
      { text: "Take final deep invigorating breath", durationSeconds: 3 },
      { text: "Notice the mental clarity flooding in", durationSeconds: 5 }
    ]
  },
  {
    id: "focus-injector",
    name: "Physiological Sigh + Eye Lock",
    purpose: "Neutralize adrenaline spike + refocus attention",
    steps: [
      "2 quick inhales through nose (first deep, second shorter)",
      "Long slow exhale through mouth",
      "Repeat 3x",
      "Lock gaze on one static object for 30s, breathe normally"
    ],
    duration: "1 min",
    science: "Lowers sympathetic tone, activates parasympathetic rebound, backed by Stanford neuroscience (Huberman Lab, 2021)",
    iconName: "eye",
    tags: ["focus", "calm", "attention"],
    detailedInstructions: [
      { text: "Prepare for first breathing cycle", durationSeconds: 3 },
      { text: "Two quick inhales through nose", durationSeconds: 2 },
      { text: "Long slow exhale through mouth", durationSeconds: 4 },
      { text: "Second breathing cycle", durationSeconds: 6 },
      { text: "Third breathing cycle", durationSeconds: 6 },
      { text: "Find a static object to focus on", durationSeconds: 3 },
      { text: "Lock your gaze and breathe normally", durationSeconds: 30 },
      { text: "Notice your improved focus", durationSeconds: 6 }
    ]
  },
  {
    id: "dichotomy-cut",
    name: "The Dichotomy Cut",
    purpose: "Stoic mental model to regain focus and calm",
    steps: [
      "List 3 things currently bothering you",
      "Split them into \"In Your Control\" vs \"Not In Your Control\"",
      "Choose to act on 1 you can control"
    ],
    duration: "1 min",
    science: "Classic Stoic mental model — regains focus and calm through agency",
    iconName: "scissors",
    tags: ["focus", "control", "clarity"],
    detailedInstructions: [
      { text: "Take a deep breath to center yourself", durationSeconds: 5 },
      { text: "Think of your first concern", durationSeconds: 5 },
      { text: "Think of your second concern", durationSeconds: 5 },
      { text: "Think of your third concern", durationSeconds: 5 },
      { text: "Categorize each as controllable or not", durationSeconds: 15 },
      { text: "Focus on one controllable item", durationSeconds: 10 },
      { text: "Plan one specific action to take", durationSeconds: 10 },
      { text: "Commit to your action plan", durationSeconds: 5 }
    ]
  },
  {
    id: "emotional-mask",
    name: "Emotional Mask Drill",
    purpose: "Prepare for social interactions with adaptive strategy",
    steps: [
      "Select a \"social mask\" (charming, neutral, dominant, silent)",
      "Visualize entering a room using that mask effectively"
    ],
    duration: "1 min",
    science: "Teaches adaptive social strategy for confidence in interpersonal situations",
    iconName: "user",
    tags: ["social", "confidence", "preparation"],
    detailedInstructions: [
      { text: "Take a centering breath", durationSeconds: 5 },
      { text: "Choose your social mask", durationSeconds: 10 },
      { text: "Close your eyes and prepare to visualize", durationSeconds: 5 },
      { text: "Imagine entering the room", durationSeconds: 10 },
      { text: "Feel yourself embodying the chosen mask", durationSeconds: 10 },
      { text: "Visualize successful interactions", durationSeconds: 10 },
      { text: "Lock in the feeling of confidence", durationSeconds: 5 },
      { text: "Open your eyes and maintain the feeling", durationSeconds: 5 }
    ]
  },
  {
    id: "inner-sprint",
    name: "Inner Sprint Simulation",
    purpose: "Mobilize energy + focus in seconds",
    steps: [
      "Close eyes, clench fists",
      "Imagine sprinting or dominating a key moment (boardroom or court)",
      "Hold breath for 3s at the \"peak\" of visualization, then exhale sharply",
      "Open eyes and sit/stand tall"
    ],
    duration: "1 min",
    science: "Mental imagery + somatic activation triggers dopamine and primes neural readiness (Guillot & Collet, 2008)",
    iconName: "zap",
    tags: ["energy", "focus", "performance"],
    detailedInstructions: [
      { text: "Take a deep breath to prepare", durationSeconds: 5 },
      { text: "Close your eyes and clench your fists", durationSeconds: 5 },
      { text: "Visualize yourself dominating a key moment", durationSeconds: 15 },
      { text: "Focus on the details - sights, sounds, feelings", durationSeconds: 10 },
      { text: "Visualize reaching the peak moment", durationSeconds: 5 },
      { text: "Hold your breath for 3 seconds at the peak", durationSeconds: 3 },
      { text: "Exhale sharply with force", durationSeconds: 2 },
      { text: "Open your eyes and sit/stand tall", durationSeconds: 5 },
      { text: "Feel the energy and readiness flowing through you", durationSeconds: 10 }
    ]
  },
  {
    id: "strike-clarity",
    name: "Strike from Clarity Protocol",
    purpose: "Transition from reactive to proactive state using visualization + intent anchoring",
    steps: [
      "Name one upcoming challenge today",
      "Define what victory looks like before you act",
      "3-breath visualization of the win + 1 action step"
    ],
    duration: "1 min",
    science: "Combines visualization with action planning to enhance performance and decision-making",
    iconName: "target",
    tags: ["clarity", "focus", "action"],
    detailedInstructions: [
      { text: "Take a moment to center yourself", durationSeconds: 5 },
      { text: "Name your challenge for today", durationSeconds: 10 },
      { text: "First deep breath - See it clearly", durationSeconds: 5 },
      { text: "Second deep breath - Own the moment", durationSeconds: 5 },
      { text: "Third deep breath - Act with power", durationSeconds: 5 },
      { text: "Visualize your victory in detail", durationSeconds: 15 },
      { text: "Define one bold action step", durationSeconds: 10 },
      { text: "Lock in your commitment to act", durationSeconds: 5 }
    ]
  },
  {
    id: "cool-head",
    name: "Cool Head in Chaos Challenge",
    purpose: "Train composed breathing and stillness under simulated pressure",
    steps: [
      "Maintain stillness as chaos sounds play",
      "Keep breath smooth and controlled",
      "Stay composed for full duration"
    ],
    duration: "1 min",
    science: "Trains nervous system regulation and emotional control under stress",
    iconName: "brain",
    tags: ["composure", "focus", "stress-management"],
    detailedInstructions: [
      { text: "Find a comfortable position", durationSeconds: 5 },
      { text: "Begin focusing on your breath", durationSeconds: 5 },
      { text: "Maintain stillness (first phase)", durationSeconds: 15 },
      { text: "Continue steady breathing", durationSeconds: 15 },
      { text: "Stay composed (middle phase)", durationSeconds: 15 },
      { text: "Final phase - maintain control", durationSeconds: 15 },
      { text: "Prepare to complete the challenge", durationSeconds: 5 }
    ]
  },
  {
    id: "nothingness-reset",
    name: "Nothingness Reset",
    purpose: "Clear mental clutter by doing absolutely nothing—pure stillness and emptiness",
    steps: [
      "Set timer for 60 seconds and close your eyes",
      "Focus on the emptiness of your mind",
      "When timer ends, note what truth emerged in stillness"
    ],
    duration: "1 min",
    science: "Zen meditation practices shown to reduce default mode network activity and boost creativity",
    iconName: "moon",
    tags: ["meditation", "clarity", "stillness"],
    detailedInstructions: [
      { text: "Find a quiet space", durationSeconds: 5 },
      { text: "Close your eyes and settle in", durationSeconds: 5 },
      { text: "Begin period of stillness", durationSeconds: 15 },
      { text: "Continue in silence", durationSeconds: 15 },
      { text: "Maintain emptiness (midpoint chime)", durationSeconds: 15 },
      { text: "Final phase of stillness", durationSeconds: 15 },
      { text: "Prepare to return", durationSeconds: 5 }
    ]
  }
];