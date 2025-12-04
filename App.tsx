import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Home, 
  ShieldCheck, 
  Activity, 
  Clock, 
  Users, 
  DollarSign, 
  PieChart, 
  Layers, 
  ArrowRight,
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertCircle,
  Sun,
  Moon
} from 'lucide-react';

// --- Theme Context ---
const ThemeContext = createContext({ isDark: true });

const useTheme = () => useContext(ThemeContext);

// --- Data: Slide Content ---
const slides = [
  {
    id: 'hero',
    layout: 'hero',
    title: "HomeVisor",
    subtitle: "Your Home, Managed",
    content: "A 24/7 home manager that tracks assets, coordinates contractors, and makes homeownership feel like a managed portfolio instead of a never‑ending to‑do list.",
    tags: ["Time-poor homeowners", "Home Operating System", "No more chaos"],
  },
  {
    id: 'challenge',
    layout: 'split',
    title: "The Challenge",
    subtitle: "Homeownership feels like running a small company—with no COO.",
    points: [
      "No single source of truth for property history.",
      "Dozens of uncoordinated contractors.",
      "Emergencies arrive when cash is tight.",
      "Discovery calls sound the same: frustration."
    ],
    highlight: "HomeVisor gives every homeowner one manager who knows the home as an asset.",
  },
  {
    id: 'problem1',
    layout: 'grid-problem',
    title: "Problem #1: Fragmentation",
    headline: "Too many contractors. Zero coordination.",
    description: "Homeowners act as their own general contractors with no persistent memory of the property.",
    comparison: {
      left: { label: "Today", items: ["12+ Vendors (SMS/Email)", "No Shared History", "Cold Starts Every Time"] },
      right: { label: "With HomeVisor", items: ["One Concierge", "Vetted Network", "Shared Asset Model"] }
    }
  },
  {
    id: 'problem2',
    layout: 'feature-highlight',
    title: "Problem #2: Financial Trap",
    headline: "Failures happen on random Tuesdays.",
    description: "Roofs and HVACs don't fail on spreadsheets. Homeowners lack a predictable cash flow model.",
    stat: "$8–20k",
    statLabel: "Unexpected events with 0 days notice",
  },
  {
    id: 'solution',
    layout: 'columns-3',
    title: "The Solution",
    headline: "Home Operating System",
    description: "One concierge, one interface, one financial brain.",
    columns: [
      { icon: Activity, title: "Source of Truth", text: "Every system tracked: age, condition, cost." },
      { icon: TrendingUp, title: "Proactive Planning", text: "3–5 year roadmaps. Replacements felt expected." },
      { icon: Users, title: "Managed Execution", text: "Concierge coordinates vetted pros & schedules." }
    ]
  },
  {
    id: 'proactive',
    layout: 'visual-dashboard',
    title: "Proactive Asset Management",
    headline: "From Surprise to Strategy",
    content: "We track the age, health, and cost profile of every major system—translating it into a monthly plan.",
    features: ["Track Age & Lifespan", "Predict Replacements", "Smart Sinking Fund"]
  },
  {
    id: 'marketplace',
    layout: 'split-graphic',
    title: "Managed Services Marketplace",
    headline: "Not a Directory. A Managed Network.",
    description: "HomeVisor owns the relationship. Full service coordination, centralized billing, and quality control.",
    points: ["Full Service Coordination", "Vetted Professionals", "Annual Inspections Feed Model"]
  },
  {
    id: 'comparison',
    layout: 'comparison-table',
    title: "Why HomeVisor Wins",
    headline: "Category-Defining Position",
    table: [
      { feature: "User Role", legacy: "DIY Manager", hv: "Delegator" },
      { feature: "Model", legacy: "Lead Directory", hv: "Managed Service + Marketplace" },
      { feature: "Pricing", legacy: "Unpredictable", hv: "Predictable & Centralized" },
      { feature: "Approach", legacy: "Fix when broken", hv: "Plan, Save, Maintain" }
    ]
  },
  {
    id: 'revenue',
    layout: 'big-number',
    title: "Revenue Model",
    headline: "Hybrid Recurring + Transactional",
    description: "High-margin SaaS subscription layered with service commissions and high-intent lead deals.",
  },
  {
    id: 'streams',
    layout: 'columns-3',
    title: "Three Revenue Streams",
    columns: [
      { icon: Layers, title: "Subscription (SaaS)", text: "Access to Home Manager & Lifecycle Planning." },
      { icon: DollarSign, title: "Service Commission", text: "30–40% take rate on coordinated jobs." },
      { icon: Users, title: "High-Intent Leads", text: "Verified leads for Roofing, HVAC, Remodels." }
    ]
  },
  {
    id: 'roadmap',
    layout: 'timeline',
    title: "Roadmap",
    steps: [
      { time: "Phase 1 (Xmas)", title: "MVP", desc: "Urban Company-style interface. Manual concierge." },
      { time: "Phase 2 (Launch)", title: "Pilot", desc: "Local launch with trusted networks." },
      { time: "Phase 3 (Scale)", title: "National", desc: "AI-driven asset ingestion. Auto-planning." }
    ]
  },
  {
    id: 'cta',
    layout: 'hero',
    title: "Join Early Access",
    subtitle: "Bring peace of mind to homeownership.",
    content: "We're assembling the first managed homeownership platform. Join the list to help shape the product.",
    isCTA: true
  }
];

// --- Components ---

const Button = ({ children, primary = false, className = "" }) => {
  const { isDark } = useTheme();
  return (
    <button className={`
      relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 group overflow-hidden
      ${primary 
        ? (isDark ? "bg-white text-black hover:scale-105" : "bg-zinc-900 text-white hover:scale-105")
        : (isDark ? "bg-zinc-900 text-white border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800" : "bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 shadow-sm")}
      ${className}
    `}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {primary && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      )}
    </button>
  );
};

const Badge = ({ text }) => {
  const { isDark } = useTheme();
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
      isDark 
        ? "bg-zinc-900 border-zinc-800 text-zinc-400" 
        : "bg-purple-50 border-purple-100 text-purple-700"
    }`}>
      {text}
    </span>
  );
};

// --- Slide Layouts ---

const HeroLayout = ({ slide }) => {
  const { isDark } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <div className="flex gap-2 justify-center mb-6">
          {slide.tags?.map((tag, i) => <Badge key={i} text={tag} />)}
        </div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text mb-6 ${
          isDark 
            ? "bg-gradient-to-b from-white via-white to-zinc-500" 
            : "bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-500"
        }`}
      >
        {slide.title}
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`text-2xl md:text-3xl font-light mb-8 max-w-2xl ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
      >
        {slide.subtitle}
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`max-w-xl text-lg leading-relaxed mb-10 ${isDark ? "text-zinc-500" : "text-zinc-600"}`}
      >
        {slide.content}
      </motion.p>

      {slide.isCTA && (
         <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6 }}
           className="flex gap-4"
         >
           <input 
              type="email" 
              placeholder="Enter your email..." 
              className={`px-4 py-3 border rounded-full focus:outline-none w-64 transition-colors ${
                isDark 
                  ? "bg-zinc-900 border-zinc-800 text-white focus:border-zinc-600" 
                  : "bg-white border-zinc-200 text-black focus:border-purple-500 shadow-sm"
              }`}
           />
           <Button primary>Get Early Access</Button>
         </motion.div>
      )}
    </div>
  );
};

const SplitLayout = ({ slide }) => {
  const { isDark } = useTheme();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-full items-center px-12">
      <div>
        <h2 className={`text-4xl font-bold tracking-tight mb-4 ${isDark ? "text-white" : "text-zinc-900"}`}>{slide.title}</h2>
        <h3 className={`text-xl mb-8 ${isDark ? "text-zinc-400" : "text-purple-700"}`}>{slide.subtitle}</h3>
        <p className={`text-lg leading-relaxed mb-8 ${isDark ? "text-zinc-500" : "text-zinc-600"}`}>{slide.highlight}</p>
      </div>
      <div className={`p-8 rounded-3xl border backdrop-blur-sm ${
        isDark 
          ? "bg-zinc-900/50 border-zinc-800" 
          : "bg-white/50 border-zinc-200 shadow-xl shadow-purple-900/5"
      }`}>
        <ul className="space-y-4">
          {slide.points.map((point, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className={`flex items-start gap-3 ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
            >
              <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isDark ? "text-purple-500" : "text-purple-600"}`} />
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const GridProblemLayout = ({ slide }) => {
  const { isDark } = useTheme();
  return (
    <div className="h-full flex flex-col justify-center px-12">
      <div className="text-center mb-12">
        <h2 className={`text-sm font-mono mb-2 uppercase tracking-widest ${isDark ? "text-purple-400" : "text-purple-600"}`}>{slide.title}</h2>
        <h3 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-zinc-900"}`}>{slide.headline}</h3>
        <p className={`max-w-2xl mx-auto ${isDark ? "text-zinc-500" : "text-zinc-600"}`}>{slide.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        {/* Left Card */}
        <div className={`border rounded-2xl p-8 relative overflow-hidden group ${
          isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
        }`}>
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50" />
          <h4 className={`text-xl font-semibold mb-6 ${isDark ? "text-zinc-300" : "text-zinc-800"}`}>{slide.comparison.left.label}</h4>
          <ul className="space-y-4">
            {slide.comparison.left.items.map((item, i) => (
               <li key={i} className={`flex items-center gap-3 ${isDark ? "text-zinc-500" : "text-zinc-600"}`}>
                 <XCircle className="w-5 h-5 text-red-500/70" />
                 {item}
               </li>
            ))}
          </ul>
        </div>

        {/* Right Card */}
        <div className={`border rounded-2xl p-8 relative overflow-hidden group ${
          isDark ? "bg-zinc-900 border-zinc-700" : "bg-white border-purple-200 shadow-xl shadow-purple-900/5"
        }`}>
           <div className={`absolute top-0 left-0 w-1 h-full ${isDark ? "bg-purple-500" : "bg-purple-600"}`} />
           <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
             isDark ? "bg-purple-500/10" : "bg-purple-500/5"
           }`} />
           <h4 className={`text-xl font-semibold mb-6 ${isDark ? "text-white" : "text-zinc-900"}`}>{slide.comparison.right.label}</h4>
           <ul className="space-y-4">
            {slide.comparison.right.items.map((item, i) => (
               <li key={i} className={`flex items-center gap-3 ${isDark ? "text-zinc-200" : "text-zinc-700"}`}>
                 <CheckCircle2 className={`w-5 h-5 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                 {item}
               </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Columns3Layout = ({ slide }) => {
  const { isDark } = useTheme();
  return (
    <div className="h-full flex flex-col justify-center px-12">
      <div className="text-center mb-16">
         <h2 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-zinc-900"}`}>{slide.title}</h2>
         {slide.headline && <h3 className={`text-xl mb-2 ${isDark ? "text-purple-400" : "text-purple-600"}`}>{slide.headline}</h3>}
         <p className={`max-w-2xl mx-auto ${isDark ? "text-zinc-500" : "text-zinc-600"}`}>{slide.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {slide.columns.map((col, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`border p-8 rounded-2xl transition-all ${
              isDark 
                ? "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900" 
                : "bg-white border-zinc-200 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-900/5"
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
              isDark ? "bg-zinc-800 text-white" : "bg-purple-50 text-purple-600"
            }`}>
              <col.icon size={24} strokeWidth={1.5} />
            </div>
            <h4 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-zinc-900"}`}>{col.title}</h4>
            <p className={`text-sm leading-relaxed ${isDark ? "text-zinc-500" : "text-zinc-600"}`}>{col.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ComparisonTableLayout = ({ slide }) => {
  const { isDark } = useTheme();
  return (
    <div className="h-full flex flex-col justify-center px-12 max-w-5xl mx-auto w-full">
      <h2 className={`text-3xl font-bold mb-2 text-center ${isDark ? "text-white" : "text-zinc-900"}`}>{slide.title}</h2>
      <p className={`text-center mb-12 ${isDark ? "text-zinc-500" : "text-zinc-600"}`}>{slide.headline}</p>

      <div className={`rounded-2xl border overflow-hidden ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"}`}>
        <div className={`grid grid-cols-3 p-4 border-b text-sm font-medium uppercase tracking-wider ${
          isDark 
            ? "bg-zinc-950 border-zinc-800 text-zinc-500" 
            : "bg-zinc-50 border-zinc-200 text-zinc-500"
        }`}>
          <div className="pl-4">Dimension</div>
          <div>Legacy Platforms</div>
          <div className={`${isDark ? "text-purple-400" : "text-purple-600"}`}>HomeVisor</div>
        </div>
        {slide.table.map((row, i) => (
          <div key={i} className={`grid grid-cols-3 p-6 border-b last:border-0 transition-colors items-center ${
            isDark 
              ? "border-zinc-800/50 hover:bg-zinc-800/30" 
              : "border-zinc-100 hover:bg-zinc-50"
          }`}>
            <div className={`pl-4 font-medium ${isDark ? "text-zinc-300" : "text-zinc-900"}`}>{row.feature}</div>
            <div className={`text-sm ${isDark ? "text-zinc-500" : "text-zinc-600"}`}>{row.legacy}</div>
            <div className={`text-sm font-medium flex items-center gap-2 ${isDark ? "text-white" : "text-purple-900"}`}>
              {row.hv}
              {i === 1 && <Badge text="Managed" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VisualDashboardLayout = ({ slide }) => {
  const { isDark } = useTheme();
  return (
    <div className="h-full flex flex-col md:flex-row items-center gap-12 px-12">
      <div className="flex-1">
        <h2 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-zinc-900"}`}>{slide.title}</h2>
        <h3 className={`text-xl mb-6 ${isDark ? "text-purple-400" : "text-purple-600"}`}>{slide.headline}</h3>
        <p className={`text-lg mb-8 ${isDark ? "text-zinc-500" : "text-zinc-600"}`}>{slide.content}</p>
        <ul className="space-y-3">
          {slide.features.map((feat, i) => (
            <li key={i} className={`flex items-center gap-3 ${isDark ? "text-zinc-300" : "text-zinc-700"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                isDark 
                  ? "bg-purple-500/20 text-purple-400" 
                  : "bg-purple-100 text-purple-700"
              }`}>
                {i + 1}
              </div>
              {feat}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Mock Dashboard Visual */}
      <div className={`flex-1 w-full aspect-video rounded-xl border p-6 relative overflow-hidden shadow-2xl ${
        isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className={`h-4 w-32 rounded animate-pulse ${isDark ? "bg-zinc-800" : "bg-zinc-100"}`} />
          <div className="flex gap-2">
            <div className={`h-8 w-8 rounded-full ${isDark ? "bg-zinc-800" : "bg-zinc-100"}`} />
            <div className={`h-8 w-8 rounded-full ${isDark ? "bg-zinc-800" : "bg-zinc-100"}`} />
          </div>
        </div>
        
        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`p-4 rounded-lg border ${
            isDark ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-100"
          }`}>
            <div className="text-xs text-zinc-500 mb-1">Total Asset Value</div>
            <div className={`text-xl font-mono ${isDark ? "text-white" : "text-zinc-900"}`}>$450,200</div>
            <div className={`h-1 w-full mt-3 rounded-full overflow-hidden ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}>
              <div className="h-full w-3/4 bg-emerald-500" />
            </div>
          </div>
          <div className={`p-4 rounded-lg border ${
            isDark ? "bg-zinc-950 border-zinc-800" : "bg-zinc-50 border-zinc-100"
          }`}>
            <div className="text-xs text-zinc-500 mb-1">Maintenance Fund</div>
            <div className={`text-xl font-mono ${isDark ? "text-white" : "text-zinc-900"}`}>$12,450</div>
            <div className={`h-1 w-full mt-3 rounded-full overflow-hidden ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}>
               <div className={`h-full w-1/2 ${isDark ? "bg-purple-500" : "bg-purple-600"}`} />
            </div>
          </div>
        </div>
  
        {/* List */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded border ${
              isDark 
                ? "bg-zinc-800/30 border-zinc-800/50" 
                : "bg-zinc-50 border-zinc-100"
            }`}>
               <div className="flex items-center gap-3">
                 <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-red-500' : 'bg-emerald-500'}`} />
                 <div className={`h-3 w-24 rounded ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`} />
               </div>
               <div className={`h-3 w-12 rounded ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`} />
            </div>
          ))}
        </div>
        
        {/* Decorative Glow */}
        <div className={`absolute bottom-0 right-0 w-64 h-64 blur-[100px] pointer-events-none ${
          isDark ? "bg-purple-600/20" : "bg-purple-400/20"
        }`} />
      </div>
    </div>
  );
};

const TimelineLayout = ({ slide }) => {
  const { isDark } = useTheme();
  return (
    <div className="h-full flex flex-col justify-center px-12">
      <h2 className={`text-4xl font-bold mb-16 text-center ${isDark ? "text-white" : "text-zinc-900"}`}>{slide.title}</h2>
      
      <div className="relative">
        {/* Line */}
        <div className={`absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 hidden md:block ${
          isDark ? "bg-zinc-800" : "bg-zinc-200"
        }`} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {slide.steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`relative border p-6 rounded-xl z-10 ${
                isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
              }`}
            >
              <div className={`absolute -top-3 left-6 px-2 text-xs font-mono border rounded ${
                isDark 
                  ? "bg-zinc-950 text-purple-400 border-zinc-800" 
                  : "bg-white text-purple-600 border-zinc-200"
              }`}>
                {step.time}
              </div>
              <h3 className={`text-xl font-bold mb-2 mt-2 ${isDark ? "text-white" : "text-zinc-900"}`}>{step.title}</h3>
              <p className={`text-sm ${isDark ? "text-zinc-500" : "text-zinc-600"}`}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DefaultLayout = ({ slide }) => {
  const { isDark } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <h2 className={`text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-zinc-900"}`}>{slide.title}</h2>
      {slide.headline && <h3 className={`text-2xl mb-6 ${isDark ? "text-purple-400" : "text-purple-600"}`}>{slide.headline}</h3>}
      <p className={`text-xl max-w-3xl ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>{slide.description || slide.content}</p>
      {slide.stat && (
        <div className={`mt-12 border p-8 rounded-2xl ${
          isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200 shadow-sm"
        }`}>
          <div className={`text-6xl font-mono font-bold mb-2 ${isDark ? "text-white" : "text-zinc-900"}`}>{slide.stat}</div>
          <div className={`uppercase tracking-widest text-sm ${isDark ? "text-zinc-500" : "text-zinc-600"}`}>{slide.statLabel}</div>
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---

export default function HomeVisorDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  const nextSlide = useCallback(() => {
    setCurrentSlide(curr => (curr + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(curr => (curr - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const SlideComponent = () => {
    const slide = slides[currentSlide];
    switch (slide.layout) {
      case 'hero': return <HeroLayout slide={slide} />;
      case 'split': return <SplitLayout slide={slide} />;
      case 'grid-problem': return <GridProblemLayout slide={slide} />;
      case 'columns-3': return <Columns3Layout slide={slide} />;
      case 'visual-dashboard': return <VisualDashboardLayout slide={slide} />;
      case 'comparison-table': return <ComparisonTableLayout slide={slide} />;
      case 'timeline': return <TimelineLayout slide={slide} />;
      case 'split-graphic': return <VisualDashboardLayout slide={{...slide, features: slide.points, content: slide.description}} />;
      default: return <DefaultLayout slide={slide} />;
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark }}>
      <div className={`fixed inset-0 font-sans overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-zinc-950 selection:bg-purple-500/30" : "bg-zinc-50 selection:bg-purple-200"
      }`}>
        
        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-700">
          <div className={`absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${
            isDark 
              ? "from-purple-900/10 via-zinc-950 to-zinc-950" 
              : "from-purple-100/50 via-zinc-50 to-zinc-50"
          }`} />
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] blur-[120px] rounded-full mix-blend-screen ${
            isDark ? "bg-purple-500/5" : "bg-purple-300/20"
          }`} />
          {/* Grid Pattern */}
          <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay ${
            isDark ? "brightness-100 contrast-150" : "brightness-100 contrast-100 invert"
          }`}></div>
        </div>

        {/* Header / Logo */}
        <div className="absolute top-8 left-8 z-50 flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isDark ? "bg-white text-black" : "bg-zinc-900 text-white"
          }`}>
            <Home className="w-5 h-5" />
          </div>
          <span className={`font-bold text-lg tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}>HomeVisor</span>
        </div>

        {/* Theme Toggle (Top Right) */}
        <div className="absolute top-8 right-8 z-50">
          <button 
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all duration-300 ${
              isDark 
                ? "bg-zinc-900 text-purple-400 border border-zinc-800 hover:bg-zinc-800" 
                : "bg-white text-purple-600 border border-zinc-200 hover:bg-zinc-50 shadow-sm"
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Slide Content Area */}
        <main className="w-full h-full relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full max-w-7xl mx-auto relative"
            >
              <SlideComponent />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-50 px-8 flex justify-between items-end">
          
          {/* Progress Bar */}
          <div className="flex gap-1">
            {slides.map((_, i) => (
              <div 
                key={i} 
                onClick={() => setCurrentSlide(i)}
                className={`h-1 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                  i === currentSlide 
                    ? (isDark ? 'bg-white w-12' : 'bg-zinc-900 w-12') 
                    : (isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-300 hover:bg-zinc-400')
                }`}
              />
            ))}
          </div>

          {/* Slide Counter & Arrows */}
          <div className="flex items-center gap-6">
            <span className={`font-mono text-sm ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
              {String(currentSlide + 1).padStart(2, '0')} / {slides.length}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={prevSlide}
                className={`p-3 rounded-full border transition-all ${
                  isDark 
                    ? "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600" 
                    : "bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 shadow-sm"
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className={`p-3 rounded-full transition-all ${
                  isDark 
                    ? "bg-white text-black hover:bg-zinc-200" 
                    : "bg-zinc-900 text-white hover:bg-zinc-700 shadow-md"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </ThemeContext.Provider>
  );
}
