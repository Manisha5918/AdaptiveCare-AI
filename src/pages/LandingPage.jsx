import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Activity, Eye, ShieldAlert, Pill, Zap, Flame, Users, Cpu, Trophy, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { GlassCard } from '../components/common/GlassCard';

function useMousePosition() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const handleMouse = useCallback((e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  }, [x, y]);
  return { x, y, handleMouse };
}

function ParallaxLayer({ speed, mouseX, mouseY, className = '' }) {
  const x = useTransform(mouseX, [0, 1920], [-speed, speed]);
  const y = useTransform(mouseY, [0, 1080], [-speed, speed]);
  return (
    <motion.div style={{ x, y }} className={className} />
  );
}

function MagneticButton({ children, className = '', onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 12 });
  const springY = useSpring(y, { stiffness: 250, damping: 12 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.2);
    y.set((e.clientY - cy) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((py - 0.5) * -12);
    rotateY.set((px - 0.5) * 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      <div style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
}

function FadeInSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const heroWords = ['Your', 'Healthcare', 'Dashboard', 'Should', 'Understand', 'You.'];

const statCards = [
  {
    key: 'loggers',
    color: 'sky',
    icon: <Users size={16} />,
    label: 'Loggers Online',
    sub: 'Active Patients Syncing',
    bars: [4, 8, 5, 9, 6, 8, 12, 6, 9],
    borderClass: 'border-t-sky-500',
    iconBgClass: 'bg-sky-500/10 text-sky-500',
    barClass: 'bg-sky-500/25 dark:bg-sky-500/40',
  },
  {
    key: 'precision',
    color: 'emerald',
    icon: <ShieldCheck size={16} />,
    label: 'Precision Rating',
    sub: 'AI Diagnoses Compliance',
    bars: [6, 6, 7, 7, 8, 8, 9, 10, 12],
    borderClass: 'border-t-emerald-500',
    iconBgClass: 'bg-emerald-500/10 text-emerald-500',
    barClass: 'bg-emerald-500/25 dark:bg-emerald-500/40',
  },
  {
    key: 'profiles',
    color: 'violet',
    icon: <Zap size={16} />,
    label: 'Design Profiles',
    sub: 'Morphing Interface Adaptations',
    bars: [2, 2, 6, 6, 10, 10, 8, 12, 12],
    borderClass: 'border-t-violet-500',
    iconBgClass: 'bg-violet-500/10 text-violet-500',
    barClass: 'bg-violet-500/25 dark:bg-violet-500/40',
  },
  {
    key: 'latency',
    color: 'rose',
    icon: <Cpu size={16} />,
    label: 'Compile Latency',
    sub: 'Interface Render Recompiles',
    bars: [3, 3, 12, 3, 3, 10, 3, 3, 4],
    borderClass: 'border-t-rose-500',
    iconBgClass: 'bg-rose-500/10 text-rose-500',
    barClass: 'bg-rose-500/25 dark:bg-rose-500/40',
  },
];

const whyCards = [
  {
    icon: <ShieldCheck size={24} />,
    iconBgClass: 'bg-rose-500/10 text-rose-500',
    accentBarClass: 'bg-rose-500/30',
    title: 'Elderly Accessibility First',
    desc: 'Forces larger fonts, massive clickable grids, and persistent emergency panel visibility. Minimizes visual clutter to prioritize critical safety shortcuts.',
  },
  {
    icon: <Activity size={24} />,
    iconBgClass: 'bg-sky-500/10 text-sky-500',
    accentBarClass: 'bg-sky-500/30',
    title: 'Chronic Vitals Sync',
    desc: 'Integrates glucose tracking, meal planning, and metabolic data. Highlights current status metrics (high/low alarms) with immediate interactive shortcuts.',
  },
  {
    icon: <Heart size={24} />,
    iconBgClass: 'bg-emerald-500/10 text-emerald-500',
    accentBarClass: 'bg-emerald-500/30',
    title: 'High-Density Athletic HUD',
    desc: 'Maximizes data packing. Renders active burning indicators, heart rate cardiac zones, water consumption checklists, and milestone badge cabinets.',
  },
];

const features = [
  {
    icon: <Activity size={22} />,
    color: 'text-sky-500',
    bgClass: 'bg-sky-500/10',
    title: 'Real-Time Vitals Sync',
    desc: 'Continuous glucose, heart rate, and calorie monitoring with instant alert thresholds and historical trend analysis.',
  },
  {
    icon: <ShieldAlert size={22} />,
    color: 'text-red-500',
    bgClass: 'bg-red-500/10',
    title: 'Emergency SOS Protocol',
    desc: 'One-tap emergency alert system that notifies caregivers and dispatches your location with medical history attached.',
  },
  {
    icon: <Zap size={22} />,
    color: 'text-emerald-500',
    bgClass: 'bg-emerald-500/10',
    title: 'Adaptive Layout Engine',
    desc: 'Interface morphs between Senior, Diabetic, Fitness, and Caregiver profiles — density, fonts, and widgets adjust automatically.',
  },
  {
    icon: <Pill size={22} />,
    color: 'text-rose-500',
    bgClass: 'bg-rose-500/10',
    title: 'Medication Management',
    desc: 'Smart prescription scheduler with dosage reminders, drug interaction checks, and compliance tracking across profiles.',
  },
  {
    icon: <Users size={22} />,
    color: 'text-violet-500',
    bgClass: 'bg-violet-500/10',
    title: 'Multi-Profile Caregiver Hub',
    desc: 'Manage family health from one dashboard. Switch between seniors, diabetics, and fitness enthusiasts seamlessly.',
  },
  {
    icon: <Cpu size={22} />,
    color: 'text-indigo-500',
    bgClass: 'bg-indigo-500/10',
    title: 'AI-Powered Insights',
    desc: 'Natural language command interface for layout changes, vitals logging, and emergency actions via text or voice.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Choose Your Profile',
    desc: 'Select from Senior, Diabetic, Fitness, or Caregiver — each unlocks a tailored layout and widget set.',
    color: 'bg-sky-500',
  },
  {
    num: '02',
    title: 'Sync Your Devices',
    desc: 'Connect wearables and health monitors. Glucose trackers, heart rate sensors, and activity bands stream live data.',
    color: 'bg-emerald-500',
  },
  {
    num: '03',
    title: 'Dashboard Adapts',
    desc: 'MorphUI restructures cards, fonts, and priorities instantly. Vital alerts rise, clutter falls away.',
    color: 'bg-violet-500',
  },
  {
    num: '04',
    title: 'Monitor & Act',
    desc: 'Track trends, log medications, trigger SOS, or ask the AI assistant — all from your personalized grid.',
    color: 'bg-rose-500',
  },
];

const testimonials = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Geriatric Specialist',
    avatar: 'SC',
    color: 'bg-gradient-to-br from-sky-400 to-indigo-500',
    quote: 'MorphUI transformed how I monitor my elderly patients. The Senior profile gives me everything I need — emergency alerts, medication logs, and vitals — in a layout they can actually read.',
  },
  {
    name: 'Mark Rivera',
    role: 'Fitness Coach',
    avatar: 'MR',
    color: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    quote: 'The athletic HUD is incredible. I track calorie burn, heart zones, and hydration for my whole team in one place. The AI command feature saves me hours of manual logging.',
  },
  {
    name: 'Emily Torres',
    role: 'Family Caregiver',
    avatar: 'ET',
    color: 'bg-gradient-to-br from-rose-400 to-amber-500',
    quote: 'Managing my dad\'s diabetes and my mom\'s medications used to mean three different apps. MorphUI brings it all together — and the emergency alert gives me peace of mind.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('senior');
  const [loggerCount, setLoggerCount] = useState(12800);
  const [satisfactionRate, setSatisfactionRate] = useState(96.2);
  const [heroWordsVisible, setHeroWordsVisible] = useState(false);

  const { x: mouseX, y: mouseY, handleMouse } = useMousePosition();

  useEffect(() => {
    const timer = setTimeout(() => setHeroWordsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loggerTimer = setInterval(() => {
      setLoggerCount((prev) => (prev < 14500 ? prev + 19 : 14500));
    }, 30);
    const satTimer = setInterval(() => {
      setSatisfactionRate((prev) => (prev < 98.7 ? Number((prev + 0.1).toFixed(1)) : 98.7));
    }, 60);
    return () => {
      clearInterval(loggerTimer);
      clearInterval(satTimer);
    };
  }, []);

  const profileConfigs = {
    senior: {
      label: 'Senior',
      color: 'rose',
      gradient: 'from-rose-500/20 to-amber-500/10',
      badgeClass: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
      cards: [
        {
          id: 'cas-sos',
          icon: <ShieldAlert size={16} className="text-red-500" />,
          title: 'Emergency SOS Alert',
          desc: 'Siren Protocol Sync Active',
          accent: 'border-l-red-500 bg-red-500/5',
        },
        {
          id: 'cas-meds',
          icon: <Pill size={16} className="text-rose-500" />,
          title: 'Prescription Scheduler',
          desc: 'Daily Dosage Records',
          accent: 'border-l-rose-500 bg-rose-500/5',
        },
        {
          id: 'cas-vitals',
          icon: <Heart size={16} className="text-sky-500" />,
          title: 'Rest Cardiac Rate',
          desc: 'Continuous Wearable Tracker',
          accent: 'border-l-sky-500 bg-sky-500/5',
        },
      ],
    },
    diabetic: {
      label: 'Diabetic',
      color: 'sky',
      gradient: 'from-sky-500/20 to-indigo-500/10',
      badgeClass: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
      cards: [
        {
          id: 'cas-glucose',
          icon: <Activity size={16} className="text-sky-500" />,
          title: 'Blood Sugar Monitor',
          desc: 'Live Glucometer Logs',
          accent: 'border-l-sky-500 bg-sky-500/5',
        },
        {
          id: 'cas-diet',
          icon: <UtensilsCrossed size={16} className="text-blue-500" />,
          title: 'Meal Carb Planner',
          desc: 'Dietary Intake Targets',
          accent: 'border-l-blue-500 bg-blue-500/5',
        },
        {
          id: 'cas-score',
          icon: <Trophy size={16} className="text-violet-500" />,
          title: 'Clinical Health Rating',
          desc: 'Diagnostic Vitals Index',
          accent: 'border-l-violet-500 bg-violet-500/5',
        },
      ],
    },
    fitness: {
      label: 'Fitness',
      color: 'emerald',
      gradient: 'from-emerald-500/20 to-teal-500/10',
      badgeClass: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      cards: [
        {
          id: 'cas-burn',
          icon: <Flame size={16} className="text-emerald-500" />,
          title: 'Active Burn Index',
          desc: 'Daily Exercise Summary',
          accent: 'border-l-emerald-500 bg-emerald-500/5',
        },
        {
          id: 'cas-pulse',
          icon: <Heart size={16} className="text-teal-500" />,
          title: 'Cardiac Pulse Stream',
          desc: 'Active Sensor Sync',
          accent: 'border-l-teal-500 bg-teal-500/5',
        },
        {
          id: 'cas-badges',
          icon: <Trophy size={16} className="text-amber-500" />,
          title: 'Fitness Achievements',
          desc: 'Milestones Sync',
          accent: 'border-l-amber-500 bg-amber-500/5',
        },
      ],
    },
  };

  const currentProfile = profileConfigs[activeTab];
  const currentCards = currentProfile?.cards || [];
  const profileKeys = Object.keys(profileConfigs);

  // Auto-cycle through profiles every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const idx = profileKeys.indexOf(prev);
        return profileKeys[(idx + 1) % profileKeys.length];
      });
    }, 5000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [particles] = useState(() => {
    const types = ['dot', 'glow', 'ring'];
    const colors = ['bg-sky-400/30', 'bg-emerald-400/25', 'bg-violet-400/20', 'bg-rose-400/20'];
    return Array.from({ length: 30 }, (_, i) => ({
      size: Math.random() * 6 + 1.5,
      type: types[i % 3],
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 6,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      color: colors[i % 4],
      driftX: (Math.random() - 0.5) * 60,
      driftY: -Math.random() * 120 - 40,
    }));
  });

  // Particle positions for connecting web lines
  const particlePositions = particles.slice(0, 12).map((p) => ({
    top: parseFloat(p.top),
    left: parseFloat(p.left),
  }));

  const tickerItems = [
    { label: 'Active Patients', value: '14,283' },
    { label: 'Avg Glucose', value: '108 mg/dL' },
    { label: 'Heart Rate', value: '72 BPM' },
    { label: 'Satisfaction', value: '98.7%' },
    { label: 'SOS Alerts', value: '0 Active' },
    { label: 'Compile Latency', value: '100ms' },
    { label: 'Active Profiles', value: '4 Channels' },
    { label: 'Widgets Rendered', value: '24' },
  ];

  const [floatingShapes] = useState(() => {
    return [
      { type: 'cube', size: 60, top: 20, left: 12, duration: 12, delay: 0, color: 'border-sky-400/20' },
      { type: 'sphere', size: 80, top: 55, left: 85, duration: 16, delay: 2, color: 'bg-emerald-400/8' },
      { type: 'torus', size: 50, top: 70, left: 25, duration: 14, delay: 1, color: 'border-violet-400/20' },
      { type: 'cube', size: 45, top: 10, left: 80, duration: 18, delay: 3, color: 'border-rose-400/15' },
    ];
  });

  return (
    <div className="min-h-screen relative bg-slate-50 dark:bg-charcoal-950 overflow-x-hidden font-sans text-charcoal-900 dark:text-slate-100 transition-colors duration-300">
      <div onMouseMove={handleMouse}>
        
        {/* Animated gradient mesh background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {/* Tech Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_65%,transparent_100%)] pointer-events-none" />
          <motion.div
            animate={{
              scale: [1, 1.1, 0.95, 1.05, 1],
              rotate: [0, 3, -2, 1, 0],
            }}
            transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
            className="absolute top-[-20%] left-[-15%] w-[80vw] h-[80vw] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)' }}
          />
          <motion.div
            animate={{
              scale: [1, 0.9, 1.05, 0.95, 1],
              rotate: [0, -2, 3, -1, 0],
            }}
            transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
            className="absolute bottom-[-20%] right-[-15%] w-[80vw] h-[80vw] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, rgba(45,212,191,0.05) 40%, transparent 70%)' }}
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 0.9, 1.1, 1],
              opacity: [0.4, 0.6, 0.3, 0.5, 0.4],
            }}
            transition={{ repeat: Infinity, duration: 30, ease: 'easeInOut' }}
            className="absolute top-[40%] left-[40%] w-[50vw] h-[50vw] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 60%)' }}
          />
        </div>

        {/* Floating 3D geometric shapes */}
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0, 20, 0],
              rotate: shape.type === 'cube' ? [0, 45, 90, 45, 0] : [0, 30, 60, 30, 0],
              scale: [1, 1.05, 0.95, 1.02, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: shape.duration,
              ease: 'easeInOut',
              delay: shape.delay,
            }}
            className="fixed pointer-events-none z-0 hidden lg:block"
            style={{
              top: `${shape.top}%`,
              left: `${shape.left}%`,
              width: shape.size,
              height: shape.size,
              borderRadius: shape.type === 'sphere' ? '50%' : '16px',
              border: shape.type !== 'sphere' ? '1px solid rgba(56,189,248,0.15)' : 'none',
              backdropFilter: shape.type !== 'sphere' ? 'blur(8px)' : 'none',
              background: shape.type === 'sphere' ? 'rgba(16,185,129,0.06)' : 'transparent',
              transformStyle: 'preserve-3d',
              perspective: 800,
            }}
          >
            {shape.type === 'torus' && (
              <div className="w-full h-full rounded-full border-2 border-dashed border-violet-400/20 opacity-60" />
            )}
          </motion.div>
        ))}

        {/* Deep 3D parallax floating orbs */}
        <ParallaxLayer speed={30} mouseX={mouseX} mouseY={mouseY} className="fixed top-[15%] left-[8%] pointer-events-none z-0 hidden lg:block">
          <div className="w-16 h-16 rounded-full bg-sky-400/10 blur-xl" />
        </ParallaxLayer>
        <ParallaxLayer speed={-20} mouseX={mouseX} mouseY={mouseY} className="fixed top-[60%] right-[12%] pointer-events-none z-0 hidden lg:block">
          <div className="w-24 h-24 rounded-full bg-emerald-400/10 blur-2xl" />
        </ParallaxLayer>
        <ParallaxLayer speed={40} mouseX={mouseX} mouseY={mouseY} className="fixed bottom-[20%] left-[20%] pointer-events-none z-0 hidden lg:block">
          <div className="w-12 h-12 rounded-full bg-violet-400/10 blur-lg" />
        </ParallaxLayer>

        {/* Floating particles background stream */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, p.driftY, 0],
                x: [0, p.driftX, 0],
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.3, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: p.duration,
                ease: 'easeInOut',
                delay: p.delay,
              }}
              className={`absolute rounded-full ${p.color} ${p.type === 'ring' ? 'border border-sky-400/20 bg-transparent' : ''}`}
              style={{
                width: p.type === 'ring' ? p.size * 4 : p.size,
                height: p.type === 'ring' ? p.size * 4 : p.size,
                top: p.top,
                left: p.left,
              }}
            />
          ))}
        </div>

        {/* Connecting particle web */}
        <svg className="fixed inset-0 w-full h-full pointer-events-none z-0 hidden lg:block">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(56,189,248,0.08)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0.08)" />
            </linearGradient>
          </defs>
          {particlePositions.map((a, i) =>
            particlePositions.slice(i + 1).map((b, j) => {
              const dx = a.left - b.left;
              const dy = a.top - b.top;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist > 30) return null;
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={`${a.left}vw`}
                  y1={`${a.top}vh`}
                  x2={`${b.left}vw`}
                  y2={`${b.top}vh`}
                  stroke="url(#lineGrad)"
                  strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ repeat: Infinity, duration: 4, delay: (i + j) * 0.2 }}
                />
              );
            })
          )}
        </svg>

        {/* Navbar navigation */}
        <FadeInSection>
          <nav className="relative max-w-7xl mx-auto px-5 sm:px-10 py-3 flex items-center justify-between z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: -10 }}
                className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-sky-500/20"
              >
                M
              </motion.div>
              <div>
                <span className="font-extrabold tracking-tight text-sm text-charcoal-900 dark:text-white block">MorphUI</span>
                <span className="text-[9px] font-extrabold text-sky-500 uppercase tracking-widest block -mt-1">Adaptive OS</span>
              </div>
            </motion.div>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-sm font-extrabold text-charcoal-550 dark:text-charcoal-400 hover:text-charcoal-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                Launch Dashboard
              </button>
              <MagneticButton
                onClick={() => navigate('/onboarding')}
                className="text-xs font-black bg-slate-900 dark:bg-slate-100 text-white dark:text-charcoal-950 px-6 py-3.5 rounded-[18px] hover:scale-105 active:scale-95 transition-all shadow-md shadow-slate-900/10 cursor-pointer"
              >
                Get Started
              </MagneticButton>
            </div>
          </nav>
        </FadeInSection>

        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-5 sm:px-10 pt-2 pb-8 md:pt-4 md:pb-12 min-h-[calc(100vh-68px)] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center z-10">
          
          {/* Left Column Text */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="lg:col-span-6 space-y-5 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-500/10 to-indigo-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-black uppercase tracking-wider shadow-sm backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="text-sky-500"
              >
                <Sparkles size={12} />
              </motion.div>
              <span>✨ Next-Gen Adaptive OS</span>
            </motion.div>

            <h1 className="text-[2.2rem] sm:text-4xl md:text-5xl lg:text-[62px] font-black tracking-tight text-charcoal-950 dark:text-white leading-[1.05]">
              {heroWords.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 40, rotateX: -20 }}
                  animate={heroWordsVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="inline-block mr-[0.3em]"
                  style={{ transformStyle: 'preserve-3d', perspective: 800 }}
                >
                  {word === 'You.' ? (
                    <span className="hero-gradient-text">{word}</span>
                  ) : word === 'Should' ? (
                    <><br/>{word}</>
                  ) : word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroWordsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-sm sm:text-base text-charcoal-550 dark:text-charcoal-450 font-semibold leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              A medical dashboard that shifts density, swaps layout columns, adjusts sizing targets, and reprioritizes vital logs in real-time based on your user profile.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroWordsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2"
            >
              <MagneticButton
                onClick={() => navigate('/onboarding')}
                className="bg-slate-900 dark:bg-slate-100 text-white dark:text-charcoal-950 px-7 py-3.5 rounded-[16px] font-black text-sm hover:scale-105 active:scale-95 shadow-lg shadow-slate-950/15 hover:shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                Get Started Onboarding 
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  <ArrowRight size={14} />
                </motion.div>
              </MagneticButton>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="bg-white/60 dark:bg-charcoal-900/60 hover:bg-white dark:hover:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 px-7 py-3.5 rounded-[16px] font-black text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Eye size={14} /> Fast-pass Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column: Unified Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[380px] sm:min-h-[400px]"
          >
            {/* Concentric telemetry rings background */}
            <div className="hidden sm:block absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
                className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full border border-dashed border-sky-500/20 absolute"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                className="w-[260px] sm:w-[340px] h-[260px] sm:h-[340px] rounded-full border border-dashed border-emerald-500/10 absolute"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
                className="w-[200px] sm:w-[260px] h-[200px] sm:h-[260px] rounded-full border border-dashed border-violet-500/8 absolute"
              />
            </div>

            {/* Dashboard Preview Card with gentle 3D float */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotateY: [0, 5, 0, -5, 0],
                rotateX: [0, 2, 0, -2, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: 'easeInOut',
              }}
              className="w-full max-w-[320px] sm:max-w-[350px] relative z-10"
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            >
              <div style={{ transformStyle: 'preserve-3d' }}>
                {/* Profile tabs */}
                <div className="flex gap-1.5 mb-2.5 bg-white/60 dark:bg-charcoal-900/60 p-1 rounded-xl border border-slate-250/20 dark:border-charcoal-800 shadow-sm backdrop-blur-md w-fit mx-auto">
                  {Object.entries(profileConfigs).map(([key, cfg]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setActiveTab(key)}
                      className={`px-3.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-black uppercase transition-all cursor-pointer ${
                        activeTab === key
                          ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-charcoal-950 shadow-sm'
                          : 'text-charcoal-500 hover:text-charcoal-900'
                      }`}
                    >
                      {cfg.label}
                    </motion.button>
                  ))}
                </div>

                {/* Dashboard mockup body */}
                <div className="rounded-[28px] glass-panel border border-white dark:border-charcoal-800 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-xl overflow-hidden shadow-2xl">
                  {/* Mockup status bar */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 dark:border-charcoal-800/60">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                        className="w-6 h-6 rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white font-black text-[10px]"
                      >
                        M
                      </motion.div>
                      <span className="text-xs font-bold text-charcoal-600 dark:text-charcoal-400">{currentProfile?.label || 'Profile'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">Live</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      {[1,2,3].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-charcoal-300 dark:bg-charcoal-600" />)}
                    </div>
                                {/* Card stack within the mockup */}
                    <div className="p-3 sm:p-4 min-h-[200px] flex flex-col justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, scale: 0.95, y: 15 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -15 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {activeTab === 'senior' && (
                            <div className="grid grid-cols-2 gap-2.5">
                              {/* SOS Panel */}
                              <div className="col-span-2 bg-red-500/10 dark:bg-red-500/15 border border-red-500/20 rounded-[14px] p-2 flex items-center justify-between shadow-sm animate-soft-pulse">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center animate-pulse">
                                    <ShieldAlert size={15} />
                                  </div>
                                  <div>
                                    <div className="text-[9px] font-black text-red-500 uppercase tracking-wider">SOS Active</div>
                                    <div className="text-[10px] font-bold text-charcoal-900 dark:text-red-100">Caregiver notified</div>
                                  </div>
                                </div>
                                <span className="text-[8px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded uppercase tracking-wider">SOS</span>
                              </div>

                              {/* Meds Tracker */}
                              <div className="bg-slate-50 dark:bg-charcoal-800/50 border border-slate-200/50 dark:border-charcoal-700/50 rounded-[14px] p-2 flex flex-col justify-between">
                                <div>
                                  <span className="text-[8px] font-bold text-charcoal-400 uppercase tracking-wider block">Prescriptions</span>
                                  <div className="space-y-1 mt-1">
                                    <div className="flex items-center gap-1">
                                      <input type="checkbox" checked readOnly className="w-3 h-3 accent-emerald-500 rounded pointer-events-none" />
                                      <span className="text-[9px] font-bold line-through text-charcoal-400 dark:text-charcoal-500">Meds - 8 AM</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <input type="checkbox" readOnly className="w-3 h-3 accent-indigo-500 rounded pointer-events-none" />
                                      <span className="text-[9px] font-bold text-charcoal-700 dark:text-slate-200">Meds - 8 PM</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2 flex items-center gap-1">
                                  <div className="w-6 h-6 rounded-full border border-emerald-500/20 border-t-emerald-500 flex items-center justify-center text-[8px] font-black text-emerald-500">50%</div>
                                  <span className="text-[8px] font-bold text-charcoal-500">Done</span>
                                </div>
                              </div>

                              {/* Resting HR Tracker */}
                              <div className="bg-slate-50 dark:bg-charcoal-800/50 border border-slate-200/50 dark:border-charcoal-700/50 rounded-[14px] p-2 flex flex-col justify-between">
                                <div>
                                  <span className="text-[8px] font-bold text-charcoal-400 uppercase tracking-wider block">Heart Rate</span>
                                  <div className="flex items-baseline gap-0.5 mt-0.5">
                                    <span className="text-lg font-black text-charcoal-900 dark:text-white">72</span>
                                    <span className="text-[8px] font-bold text-charcoal-500">BPM</span>
                                  </div>
                                </div>
                                <div className="mt-1 h-5 w-full flex items-end">
                                  <svg className="w-full h-full text-rose-500 fill-none stroke-current stroke-1.5" viewBox="0 0 100 20">
                                    <path d="M0,10 L20,10 L25,3 L30,17 L35,10 L50,10 L55,0 L60,20 L65,10 L100,10" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeTab === 'diabetic' && (
                            <div className="grid grid-cols-2 gap-2.5">
                              {/* Glucose Graph */}
                              <div className="col-span-2 bg-slate-50 dark:bg-charcoal-800/50 border border-slate-200/50 dark:border-charcoal-700/50 rounded-[14px] p-2">
                                <div className="flex justify-between items-center mb-0.5">
                                  <div>
                                    <span className="text-[8px] font-bold text-charcoal-400 uppercase tracking-wider block">Blood Glucose</span>
                                    <div className="flex items-baseline gap-0.5">
                                      <span className="text-lg font-black text-sky-500">108</span>
                                      <span className="text-[8px] font-bold text-charcoal-550">mg/dL</span>
                                    </div>
                                  </div>
                                  <span className="text-[8px] font-black bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded-full">Optimal</span>
                                </div>
                                <div className="h-10 w-full mt-1">
                                  <svg className="w-full h-full fill-none stroke-1.5" viewBox="0 0 200 40">
                                    <path d="M0,30 Q25,23 50,28 T100,18 T150,22 T200,15" className="stroke-sky-500" />
                                    <line x1="0" y1="10" x2="200" y2="10" stroke="rgba(239, 68, 68, 0.15)" strokeDasharray="2,2" />
                                    <line x1="0" y1="35" x2="200" y2="35" stroke="rgba(59, 130, 246, 0.15)" strokeDasharray="2,2" />
                                  </svg>
                                </div>
                              </div>

                              {/* Carb Planner */}
                              <div className="bg-slate-50 dark:bg-charcoal-800/50 border border-slate-200/50 dark:border-charcoal-700/50 rounded-[14px] p-2 flex flex-col justify-between">
                                <div>
                                  <span className="text-[8px] font-bold text-charcoal-400 uppercase tracking-wider block">Carbs</span>
                                  <div className="flex items-baseline gap-0.5 mt-0.5">
                                    <span className="text-sm font-black text-charcoal-900 dark:text-white">45g</span>
                                    <span className="text-[8px] font-bold text-charcoal-550">/120g</span>
                                  </div>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-charcoal-700 h-1 rounded-full overflow-hidden mt-2">
                                  <div className="bg-sky-500 h-full rounded-full w-[37.5%]" />
                                </div>
                              </div>

                              {/* Health Score */}
                              <div className="bg-slate-50 dark:bg-charcoal-800/50 border border-slate-200/50 dark:border-charcoal-700/50 rounded-[14px] p-2 flex flex-col justify-between">
                                <div>
                                  <span className="text-[8px] font-bold text-charcoal-400 uppercase tracking-wider block">Health Rating</span>
                                  <div className="text-lg font-black text-emerald-500 mt-0.5">94%</div>
                                </div>
                                <span className="text-[8px] font-bold text-charcoal-500 mt-1 block leading-tight">Stable Index</span>
                              </div>
                            </div>
                          )}

                          {activeTab === 'fitness' && (
                            <div className="grid grid-cols-2 gap-2.5">
                              {/* Calories Burn */}
                              <div className="bg-slate-50 dark:bg-charcoal-800/50 border border-slate-200/50 dark:border-charcoal-700/50 rounded-[14px] p-2 flex flex-col justify-between">
                                <div>
                                  <span className="text-[8px] font-bold text-charcoal-400 uppercase tracking-wider block">Active Burn</span>
                                  <div className="flex items-baseline gap-0.5 mt-0.5">
                                    <span className="text-lg font-black text-orange-500">650</span>
                                    <span className="text-[8px] font-bold text-charcoal-500">kcal</span>
                                  </div>
                                </div>
                                <div className="relative w-9 h-9 mx-auto mt-1 flex items-center justify-center">
                                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <path className="text-slate-200 dark:text-charcoal-700 stroke-[2.5]" fill="none" stroke="currentColor" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path className="text-orange-500 stroke-[2.5]" fill="none" stroke="currentColor" strokeDasharray="81, 100" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                  </svg>
                                  <div className="absolute text-orange-500 animate-bounce">
                                    <Flame size={10} />
                                  </div>
                                </div>
                              </div>

                              {/* Cardiac Zone */}
                              <div className="bg-slate-50 dark:bg-charcoal-800/50 border border-slate-200/50 dark:border-charcoal-700/50 rounded-[14px] p-2 flex flex-col justify-between">
                                <div>
                                  <span className="text-[8px] font-bold text-charcoal-400 uppercase tracking-wider block">Heart Rate</span>
                                  <div className="flex items-baseline gap-0.5 mt-0.5">
                                    <span className="text-lg font-black text-rose-500">142</span>
                                    <span className="text-[8px] font-bold text-charcoal-550">BPM</span>
                                  </div>
                                </div>
                                <span className="text-[8px] font-black bg-rose-500/10 text-rose-500 px-1.5 py-0.5 rounded-full w-fit mt-2">Aerobic</span>
                              </div>

                              {/* Achievements Locker */}
                              <div className="col-span-2 bg-slate-50 dark:bg-charcoal-800/50 border border-slate-200/50 dark:border-charcoal-700/50 rounded-[14px] p-2">
                                <span className="text-[8px] font-bold text-charcoal-400 uppercase tracking-wider block mb-1.5">Milestones</span>
                                <div className="flex gap-1.5">
                                  <div className="flex-1 bg-amber-500/10 border border-amber-500/20 rounded-lg p-1 text-center">
                                    <Trophy size={11} className="text-amber-500 mx-auto" />
                                    <div className="text-[7px] font-bold mt-0.5 text-charcoal-800 dark:text-slate-200">5K Run</div>
                                  </div>
                                  <div className="flex-1 bg-teal-500/10 border border-teal-500/20 rounded-lg p-1 text-center">
                                    <Zap size={11} className="text-teal-500 mx-auto" />
                                    <div className="text-[7px] font-bold mt-0.5 text-charcoal-800 dark:text-slate-200">Streak x7</div>
                                  </div>
                                  <div className="flex-1 bg-violet-500/10 border border-violet-500/20 rounded-lg p-1 text-center">
                                    <Flame size={11} className="text-violet-500 mx-auto" />
                                    <div className="text-[7px] font-bold mt-0.5 text-charcoal-800 dark:text-slate-200">900 Cal</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>        </div>

                    {/* Mockup pagination dots */}
                    <div className="flex justify-center gap-2 pb-4">
                      {['senior', 'diabetic', 'fitness'].map((tab) => (
                        <motion.div
                          key={tab}
                          animate={{ scale: activeTab === tab ? 1.3 : 1 }}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            activeTab === tab ? 'bg-sky-500 w-3.5' : 'bg-sky-400/30'
                          }`}
                        />
                      ))}
                    </div>
                </div>

                {/* Floating secondary element */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 1, ease: 'easeInOut' }}
                  className="absolute -bottom-6 -right-4 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-500/10 border border-sky-500/10 backdrop-blur-sm flex items-center justify-center shadow-lg"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <div className="text-center">
                    <div className="text-xs font-black text-sky-500">{currentProfile?.cards?.length || 0}</div>
                    <div className="text-[7px] font-bold text-charcoal-400 uppercase tracking-wider">Widgets</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Scrolling health data ticker */}
        <div className="relative z-10 overflow-hidden border-t border-b border-slate-200/30 dark:border-charcoal-800/30 bg-slate-100/30 dark:bg-charcoal-900/30 py-3 backdrop-blur-sm">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
            className="flex whitespace-nowrap gap-16 text-[11px] font-bold text-charcoal-500 dark:text-charcoal-400 uppercase tracking-wider"
          >
            {[0, 1].map((outerIdx) =>
              tickerItems.map((item, i) => (
                <span key={`${outerIdx}-${i}`} className="flex items-center gap-2">
                  <span className="text-charcoal-400">{item.label}:</span>
                  <span className="text-sky-500 dark:text-sky-400">{item.value}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                </span>
              ))
            )}
          </motion.div>
        </div>

        {/* Animated Section Divider */}
        <div className="relative z-10">
          <svg className="w-full h-16 sm:h-24 text-slate-50 dark:text-charcoal-950 fill-current" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,50 C360,0 720,100 1080,50 C1260,25 1350,75 1440,50 L1440,0 L0,0 Z" opacity="0.4" />
            <path d="M0,60 C300,20 600,80 900,50 C1100,30 1250,70 1440,55 L1440,0 L0,0 Z" opacity="0.2" />
          </svg>
        </div>

        {/* Statistics 3D HUD Console */}
        <FadeInSection>
          <section className="relative py-16 sm:py-28 px-5 sm:px-10 border-t border-b border-slate-200/50 dark:border-charcoal-850 bg-white/10 dark:bg-charcoal-900/10">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-xs font-black uppercase text-sky-500 tracking-widest block"
                >
                  Simulation Telemetry Matrix
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="text-3xl font-black text-charcoal-950 dark:text-white tracking-tight"
                >
                  Active Platform Sync Vitals
                </motion.h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {statCards.map((stat, idx) => (
                  <motion.div
                    key={stat.key}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12, duration: 0.6 }}
                  >
                    <TiltCard>
                      <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-slate-200/50 to-transparent dark:from-charcoal-800/50 hover:from-sky-500/50 hover:to-indigo-500/50 transition-all duration-300 shadow-lg">
                        <div className="rounded-[23px] bg-white/70 dark:bg-charcoal-950/80 backdrop-blur-xl p-6 h-full flex flex-col justify-between border border-slate-200/40 dark:border-charcoal-900/60">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-charcoal-500 dark:text-charcoal-400">{stat.label}</span>
                            <motion.div
                              whileHover={{ scale: 1.15, rotate: 5 }}
                              className={`p-2 rounded-xl ${stat.iconBgClass}`}
                            >
                              {stat.icon}
                            </motion.div>
                          </div>
                          <div>
                            <motion.span
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              className="text-3xl font-black text-charcoal-950 dark:text-white block tracking-tight"
                            >
                              {stat.key === 'loggers' ? `${loggerCount.toLocaleString()}+` :
                               stat.key === 'precision' ? `${satisfactionRate}%` :
                               stat.key === 'profiles' ? '4 Channels' : '100ms'}
                            </motion.span>
                            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1 font-semibold leading-snug">{stat.sub}</p>
                          </div>

                          {/* Upgrade static bars to diagnostic SVGs */}
                          {stat.key === 'loggers' && (
                            <div className="h-8 mt-5 w-full">
                              <svg className="w-full h-full text-sky-500/30 stroke-current fill-none stroke-[1.5]" viewBox="0 0 100 30">
                                <path d="M0,20 L15,10 L30,22 L45,8 L60,18 L75,5 L90,25 L100,10" />
                                <circle cx="75" cy="5" r="3" className="fill-sky-400 animate-ping" />
                                <circle cx="75" cy="5" r="2" className="fill-sky-500" />
                              </svg>
                            </div>
                          )}

                          {stat.key === 'precision' && (
                            <div className="h-8 mt-5 flex items-center justify-start gap-2">
                              <svg className="w-6 h-6 text-emerald-500 transform -rotate-90 shrink-0" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" />
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="98.7, 100" strokeLinecap="round" />
                              </svg>
                              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">AI Verified compliant</span>
                            </div>
                          )}

                          {stat.key === 'profiles' && (
                            <div className="h-8 mt-5 flex items-center justify-start gap-2">
                              <div className="grid grid-cols-2 gap-0.5 w-5 h-5 shrink-0 animate-pulse">
                                <div className="bg-violet-500 rounded-sm" />
                                <div className="bg-violet-500/40 rounded-sm" />
                                <div className="bg-violet-500/70 rounded-sm" />
                                <div className="bg-violet-500/20 rounded-sm" />
                              </div>
                              <span className="text-[10px] font-black text-violet-600 dark:text-violet-400 uppercase tracking-wider">Dynamic Layout Grid</span>
                            </div>
                          )}

                          {stat.key === 'latency' && (
                            <div className="h-8 mt-5 w-full flex items-center">
                              <svg className="w-full h-full text-rose-500 fill-none stroke-current stroke-1.5" viewBox="0 0 100 20">
                                <path d="M0,10 H20 L25,2 L30,18 L35,10 H50 L53,4 L56,16 L59,10 H80 L84,2 L88,18 L92,10 H100" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Animated Section Divider */}
        <div className="relative z-10">
          <svg className="w-full h-16 sm:h-24 text-white/50 dark:text-charcoal-950/50 fill-current" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,50 C360,100 720,0 1080,50 C1260,75 1350,25 1440,50 L1440,0 L0,0 Z" opacity="0.5" />
          </svg>
        </div>

        {/* Why Adaptive Section */}
        <FadeInSection>
          <section className="relative max-w-7xl mx-auto px-5 sm:px-10 py-16 sm:py-28 md:py-36">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black tracking-tight text-charcoal-950 dark:text-white"
              >
                Why Adaptive UI Architecture?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-base font-semibold text-charcoal-455 dark:text-charcoal-500 leading-relaxed"
              >
                Generic layouts force every patient to traverse clutter. MorphUI dynamically restructures card densities, font weights, and navigation nodes to serve specific medical journeys.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyCards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                >
                  <TiltCard>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/30 dark:bg-charcoal-900/30 border border-slate-200/60 dark:border-charcoal-800/80 rounded-[28px] p-8 space-y-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-default backdrop-blur-sm"
                    >
                      <motion.div
                        whileHover={{ rotate: -10, scale: 1.1 }}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${card.iconBgClass}`}
                      >
                        {card.icon}
                      </motion.div>
                      <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">{card.title}</h3>
                      <p className="text-sm text-charcoal-500 dark:text-charcoal-400 leading-relaxed font-semibold">
                        {card.desc}
                      </p>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '40%' }}
                        viewport={{ once: true }}
                        className={`h-0.5 rounded-full ${card.accentBarClass}`}
                      />
                    </motion.div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeInSection>

        {/* How It Works Section */}
        <FadeInSection>
          <section className="relative max-w-7xl mx-auto px-5 sm:px-10 py-24 sm:py-32">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-black uppercase text-sky-500 tracking-widest block"
              >
                How It Works
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black tracking-tight text-charcoal-950 dark:text-white"
              >
                From Setup to Sync in Four Steps
              </motion.h2>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
              {/* Connecting line with active running light */}
              <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[3px] bg-slate-200 dark:bg-charcoal-850 rounded-full overflow-hidden">
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="w-1/3 h-full bg-gradient-to-r from-sky-400 via-emerald-400 to-rose-400"
                />
              </div>

              {steps.map((step, idx) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="relative flex flex-col items-center text-center p-6 rounded-3xl bg-white/30 dark:bg-charcoal-900/20 border border-slate-200/40 dark:border-charcoal-800/40 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-charcoal-900/60 transition-all duration-300 shadow-sm hover:shadow-lg h-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`relative z-10 w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center text-white font-black text-sm shadow-md mb-6`}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ repeat: Infinity, duration: 2.5, delay: idx * 0.4 }}
                      >
                        {step.num}
                      </motion.span>
                    </motion.div>
                    <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100 mb-3">{step.title}</h3>
                    <p className="text-sm text-charcoal-500 dark:text-charcoal-400 leading-relaxed font-semibold max-w-xs">
                      {step.desc}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeInSection>

        {/* Animated Section Divider */}
        <div className="relative z-10">
          <svg className="w-full h-16 sm:h-24 text-slate-50 dark:text-charcoal-950 fill-current rotate-180" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,50 C360,100 720,0 1080,50 C1260,75 1350,25 1440,50 L1440,0 L0,0 Z" opacity="0.3" />
          </svg>
        </div>

        {/* Key Features Section */}
        <FadeInSection>
          <section className="relative py-16 sm:py-28 px-5 sm:px-10 bg-white/10 dark:bg-charcoal-900/10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-xs font-black uppercase text-sky-500 tracking-widest block"
                >
                  Platform Capabilities
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-black tracking-tight text-charcoal-950 dark:text-white"
                >
                  Everything You Need in One Place
                </motion.h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                  >
                    <div className="relative group rounded-3xl p-[1px] bg-gradient-to-b from-slate-200/50 to-transparent dark:from-charcoal-800/50 hover:from-sky-500/30 hover:to-indigo-500/30 transition-all duration-300 h-full">
                      <div className="rounded-[23px] bg-white/40 dark:bg-charcoal-900/40 backdrop-blur-xl p-7 h-full flex flex-col justify-between border border-white/40 dark:border-charcoal-900/40 group-hover:bg-white/80 dark:group-hover:bg-charcoal-900/70 transition-all duration-300">
                        <div>
                          <div className="flex items-center justify-between mb-5">
                            <motion.div
                              whileHover={{ rotate: 10, scale: 1.1 }}
                              className={`w-11 h-11 rounded-xl ${feature.bgClass} ${feature.color} flex items-center justify-center shadow-sm`}
                            >
                              {feature.icon}
                            </motion.div>
                            <span className="text-[10px] font-black text-sky-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Active Node</span>
                          </div>
                          <h3 className="text-base font-bold text-charcoal-900 dark:text-slate-100 mb-2">{feature.title}</h3>
                          <p className="text-sm text-charcoal-550 dark:text-charcoal-400 leading-relaxed font-semibold">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Testimonials Section */}
        <FadeInSection>
          <section className="relative max-w-7xl mx-auto px-5 sm:px-10 py-24 sm:py-32">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-black uppercase text-sky-500 tracking-widest block"
              >
                Testimonials
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-black tracking-tight text-charcoal-950 dark:text-white"
              >
                Trusted by Healthcare Professionals
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                >
                  <TiltCard>
                    <div className="bg-white/40 dark:bg-charcoal-900/45 border border-slate-200/60 dark:border-charcoal-800/80 rounded-[32px] p-8 h-full flex flex-col justify-between shadow-sm hover:shadow-xl hover:bg-white/70 dark:hover:bg-charcoal-900/60 transition-all duration-300 backdrop-blur-xl">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-12 h-12 rounded-2xl ${t.color} flex items-center justify-center text-white font-black text-sm shadow-md shrink-0`}>
                            {t.avatar}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-charcoal-900 dark:text-slate-100">{t.name}</div>
                            <div className="text-[11px] font-bold text-charcoal-400 dark:text-charcoal-500">{t.role}</div>
                          </div>
                        </div>
                        <div className="relative">
                          <svg className="w-8 h-8 text-sky-500/10 dark:text-sky-500/5 absolute -top-4 -left-3 pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                          <p className="text-sm text-charcoal-550 dark:text-charcoal-400 leading-relaxed font-semibold italic pl-4">
                            &ldquo;{t.quote}&rdquo;
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 mt-6 border-t border-slate-100 dark:border-charcoal-800/60 pt-4">
                        {[1,2,3,4,5].map((star) => (
                          <motion.svg
                            key={star}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </motion.svg>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeInSection>

        {/* Final CTA */}
        <FadeInSection>
          <section className="relative py-24 sm:py-32 px-5 sm:px-10 overflow-hidden">
            {/* Ambient background glow circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[300px] bg-gradient-to-r from-sky-400/10 via-indigo-500/10 to-emerald-400/10 rounded-full blur-[110px] pointer-events-none" />

            <div className="relative max-w-5xl mx-auto rounded-[40px] border border-slate-200/50 dark:border-charcoal-800/80 bg-white/40 dark:bg-charcoal-900/40 backdrop-blur-2xl p-12 sm:p-20 text-center space-y-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-black tracking-tight text-charcoal-950 dark:text-white leading-[1.1]"
              >
                Ready to Transform Your<br />
                <span className="hero-gradient-text">Healthcare Dashboard?</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-base sm:text-lg text-charcoal-550 dark:text-charcoal-400 font-semibold max-w-xl mx-auto leading-relaxed"
              >
                Join 14,000+ patients and caregivers who have personalized their health monitoring experience with MorphUI&apos;s adaptive interface.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4 relative z-10"
              >
                <MagneticButton
                  onClick={() => navigate('/onboarding')}
                  className="bg-slate-900 dark:bg-slate-100 text-white dark:text-charcoal-950 px-10 py-5 rounded-[22px] font-black text-base hover:scale-105 active:scale-95 shadow-xl shadow-slate-950/20 hover:shadow-2xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Get Started Free
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </MagneticButton>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/dashboard')}
                  className="bg-white/80 dark:bg-charcoal-900/60 hover:bg-white dark:hover:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 px-10 py-5 rounded-[22px] font-black text-base transition-all shadow-md cursor-pointer"
                >
                  View Live Demo
                </motion.button>
              </motion.div>
            </div>
          </section>
        </FadeInSection>

        {/* Footer */}
        <FadeInSection>
          <footer className="relative border-t border-slate-200 dark:border-charcoal-900 bg-white/10 dark:bg-charcoal-950/10 py-12 sm:py-16 px-5 sm:px-8 text-center z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2.5"
              >
                <motion.div
                  whileHover={{ rotate: -5 }}
                  className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-charcoal-950 flex items-center justify-center font-black text-sm"
                >
                  M
                </motion.div>
                <span className="font-extrabold text-sm text-charcoal-950 dark:text-slate-300">MorphUI AI</span>
              </motion.div>
              
              <p className="text-[11px] font-bold text-charcoal-400 dark:text-charcoal-500 tracking-wider">
                &copy; 2026 MorphUI Inc. Designed for Next-Gen Adaptive Care. All rights reserved.
              </p>
            </div>
          </footer>
        </FadeInSection>
      </div>
    </div>
  );
}
