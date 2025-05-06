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
    id: "micro-win",
    name: "Micro-Win Celebration",
    purpose: "Boost confidence and positive reinforcement",
    steps: [
      "Pick one tiny thing you did well today (even waking up)",
      "Smile wide, raise arms overhead for 3 seconds",
      "Say: \"I stack wins.\""
    ],
    duration: "30 seconds",
    science: "Celebratory gesture increases reward circuitry activation (BJ Fogg, 2019)",
    iconName: "award",
    tags: ["confidence", "positivity"],
    detailedInstructions: [
      { text: "Think about your day so far", durationSeconds: 5 },
      { text: "Identify one small thing you did well today", durationSeconds: 10 },
      { text: "Focus on this achievement, however small", durationSeconds: 5 },
      { text: "Smile wide and feel genuine pride", durationSeconds: 3 },
      { text: "Raise your arms overhead in celebration", durationSeconds: 3 },
      { text: "Say out loud: 'I stack wins!'", durationSeconds: 2 },
      { text: "Hold this feeling of accomplishment", durationSeconds: 5 },
      { text: "Lower your arms and continue smiling", durationSeconds: 2 },
      { text: "Notice the boost in your confidence", durationSeconds: 5 }
    ]
  },
  {
    id: "jaw-unlock",
    name: "Jaw Unlock Protocol",
    purpose: "Release hidden physical tension that blocks flow",
    steps: [
      "Place tongue on roof of mouth",
      "Slowly clench and unclench jaw 3x",
      "Massage masseter with thumb for 10 seconds each side"
    ],
    duration: "45 seconds",
    science: "Unblocks facial-muscle-induced limbic tension, backed by TMJ-relaxation studies (Fujisawa, 2012)",
    iconName: "smile",
    tags: ["relaxation", "tension-release"],
    detailedInstructions: [
      { text: "Sit comfortably and take a deep breath", durationSeconds: 5 },
      { text: "Place your tongue on the roof of your mouth", durationSeconds: 3 },
      { text: "Slowly clench your jaw", durationSeconds: 2 },
      { text: "Now unclench and relax", durationSeconds: 2 },
      { text: "Repeat the clench and release 2 more times", durationSeconds: 8 },
      { text: "Find your masseter muscle (side of jaw)", durationSeconds: 3 },
      { text: "Massage the right side with your thumb", durationSeconds: 10 },
      { text: "Now massage the left side with your thumb", durationSeconds: 10 },
      { text: "Notice the release of tension in your face", durationSeconds: 5 }
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
    tags: ["clarity", "alertness", "energy"]
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
    tags: ["focus", "calm", "attention"]
  },
  {
    id: "sutra-selector",
    name: "AI Sutra-Selector",
    purpose: "Entrains brain rhythms and anchors emotional states",
    steps: [
      "AI asks how you want to feel: calm, fearless, whole, etc.",
      "Generates personalized 1-word mantra",
      "Repeat as breath-anchored micro-meditation"
    ],
    duration: "1 min",
    science: "Mantra repetition engages theta rhythm and suppresses DMN (default mode network)",
    iconName: "brain",
    tags: ["meditation", "focus", "calm"]
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
    tags: ["focus", "control", "clarity"]
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
    tags: ["social", "confidence", "preparation"]
  },
  {
    id: "strike-clarity",
    name: "Strike from Clarity Protocol",
    purpose: "Trigger clarity-driven action, not panic reaction",
    steps: [
      "Name one upcoming challenge today",
      "Define what victory looks like before you act",
      "3-breath visualization of the win + 1 action step"
    ],
    duration: "1 min",
    science: "Inspired by Sun Tzu — \"Victorious warriors win first and then go to war.\"",
    iconName: "target",
    tags: ["clarity", "preparation", "confidence"]
  },
  {
    id: "nothingness-reset",
    name: "Nothingness Reset",
    purpose: "Clear mental clutter and find clarity in stillness",
    steps: [
      "Set timer for 60 seconds and close your eyes",
      "Focus on the emptiness of your mind",
      "When the timer ends, note what truth emerged in stillness"
    ],
    duration: "1 min",
    science: "Zen meditation practices shown to reduce default mode network activity and boost creativity",
    iconName: "moon",
    tags: ["meditation", "clarity", "stillness"]
  }
];
