import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Activity, CheckCircle2, ChevronRight, Eye, ShieldAlert, Pill, Calendar, Zap, Flame, ClipboardList, Users, Cpu, Trophy } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GlassCard } from '../components/common/GlassCard';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('senior');

  // Stats Counters
  const [loggerCount, setLoggerCount] = useState(12800);
  const [satisfactionRate, setSatisfactionRate] = useState(96.2);

  // Parallax Pointer Tracking for the 3D Stage
  const stageRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Smooth springs for 3D stage tilting
  const stageRotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [15, -15]), { stiffness: 120, damping: 25 });
  const stageRotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-15, 15]), { stiffness: 120, damping: 25 });

  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    pointerX.set(x);
    pointerY.set(y);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  // Stats Counters simulation on load
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

  // Adaptive widgets list inside our floating 3D cascade
  const getCascadeCards = (profileId) => {
    switch (profileId) {
      case 'senior':
        return [
          {
            id: 'cas-sos',
            title: '🚨 EMERGENCY SOS ALERT',
            desc: 'Siren Protocol Sync Active',
            color: 'border-l-4 border-l-red-500 bg-red-500/5',
            offset: 'top-0 left-[-40px] z-30',
            floatDelay: 0,
            content: (
              <div className="space-y-4 mt-2">
                <div className="flex items-center justify-between text-red-500 text-[11px] font-black">
                  <span className="tracking-widest uppercase">Emergency System</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                </div>
                <button className="w-full py-4 rounded-[16px] bg-red-500 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-red-900/20 active:scale-95 transition-transform">
                  TRIGGER SOS SIGNAL
                </button>
              </div>
            )
          },
          {
            id: 'cas-meds',
            title: '💊 Prescription Scheduler',
            desc: 'Daily Dosage Records',
            color: 'border-l-4 border-l-rose-500 bg-rose-500/5',
            offset: 'top-40 left-12 z-20',
            floatDelay: 1,
            content: (
              <div className="space-y-3 mt-3">
                <div className="flex justify-between items-center text-xs p-3 bg-slate-100 dark:bg-charcoal-900 rounded-[14px]">
                  <span className="font-bold">Amlodipine (BP)</span>
                  <span className="text-[11px] text-amber-500 font-extrabold">8:00 AM</span>
                </div>
                <div className="flex justify-between items-center text-xs p-3 bg-emerald-500/10 rounded-[14px]">
                  <span className="font-bold text-emerald-600">Atorvastatin</span>
                  <span className="text-[11px] text-emerald-500 font-extrabold">Taken</span>
                </div>
              </div>
            )
          },
          {
            id: 'cas-vitals',
            title: '❤️ Rest Cardiac Rate',
            desc: 'Continuous Wearable Tracker',
            color: 'border-l-4 border-l-sky-500 bg-sky-500/5',
            offset: 'top-[310px] left-[-30px] z-10',
            floatDelay: 2,
            content: (
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <span className="text-3xl font-black block">62 BPM</span>
                  <span className="text-[10px] text-charcoal-450 font-bold block mt-0.5">Average: 65 BPM</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-sky-550 bg-sky-500/10 px-2 py-0.5 rounded">Stable</span>
                </div>
              </div>
            )
          }
        ];
      case 'diabetic':
        return [
          {
            id: 'cas-glucose',
            title: '📈 Blood Sugar Monitor',
            desc: 'Live Glucometer Logs',
            color: 'border-l-4 border-l-sky-500 bg-sky-500/5',
            offset: 'top-0 left-[-40px] z-30',
            floatDelay: 0,
            content: (
              <div className="space-y-2 mt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black">108</span>
                  <span className="text-xs font-bold text-charcoal-450">mg/dL</span>
                  <span className="text-[10px] font-bold text-sky-550 bg-sky-500/10 px-2.5 py-0.5 rounded ml-auto">Optimal</span>
                </div>
                {/* SVG spline line graph */}
                <svg className="w-full h-12 stroke-sky-500 fill-none" viewBox="0 0 100 20">
                  <path d="M 0,15 Q 20,4 40,13 T 80,6 T 100,12" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            )
          },
          {
            id: 'cas-diet',
            title: '🥗 Meal Carb Planner',
            desc: 'Dietary Intake Targets',
            color: 'border-l-4 border-l-blue-500 bg-blue-500/5',
            offset: 'top-40 left-12 z-20',
            floatDelay: 1,
            content: (
              <div className="space-y-3 mt-3">
                <div className="flex justify-between items-center text-xs p-3 bg-slate-100 dark:bg-charcoal-900 rounded-[14px]">
                  <span className="font-bold">Chicken Salad</span>
                  <span className="text-[11px] text-sky-555 font-bold">12g Carbs</span>
                </div>
                <div className="flex justify-between items-center text-xs p-3 bg-slate-100 dark:bg-charcoal-900 rounded-[14px]">
                  <span className="font-bold">Quinoa Meal</span>
                  <span className="text-[11px] text-charcoal-400 font-bold">28g Carbs</span>
                </div>
              </div>
            )
          },
          {
            id: 'cas-score',
            title: '🏆 Clinical Health Rating',
            desc: 'Diagnostic Vitals Index',
            color: 'border-l-4 border-l-violet-500 bg-violet-500/5',
            offset: 'top-[310px] left-[-30px] z-10',
            floatDelay: 2,
            content: (
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <span className="text-3xl font-black block">92 / 100</span>
                  <span className="text-[10px] text-charcoal-450 font-bold block mt-0.5">Excellent Rating</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Syncing</span>
              </div>
            )
          }
        ];
      case 'fitness':
        return [
          {
            id: 'cas-burn',
            title: '🔥 Active Burn Index',
            desc: 'Daily Exercise Summary',
            color: 'border-l-4 border-l-emerald-500 bg-emerald-500/5',
            offset: 'top-0 left-[-40px] z-30',
            floatDelay: 0,
            content: (
              <div className="space-y-4 mt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black">620</span>
                  <span className="text-xs font-bold text-charcoal-450">/ 800 kcal</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-charcoal-900 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[78%]" />
                </div>
              </div>
            )
          },
          {
            id: 'cas-pulse',
            title: '❤️ Cardiac Pulse Stream',
            desc: 'Active Sensor Sync',
            color: 'border-l-4 border-l-teal-500 bg-teal-500/5',
            offset: 'top-40 left-12 z-20',
            floatDelay: 1,
            content: (
              <div className="space-y-3 mt-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 animate-pulse">
                    <Heart size={18} className="fill-emerald-500" />
                  </div>
                  <div>
                    <span className="text-xl font-black block">72 BPM</span>
                    <span className="text-[10px] text-charcoal-400 block -mt-0.5">Peak Rest: 58 BPM</span>
                  </div>
                </div>
              </div>
            )
          },
          {
            id: 'cas-badges',
            title: '🏆 Fitness Achievements',
            desc: 'Milestones Sync',
            color: 'border-l-4 border-l-amber-500 bg-amber-500/5',
            offset: 'top-[310px] left-[-30px] z-10',
            floatDelay: 2,
            content: (
              <div className="mt-3 flex items-center justify-between text-xs font-bold text-amber-600">
                <div className="flex items-center gap-1.5">
                  <Trophy size={14} />
                  <span>Calorie Crusher Badge</span>
                </div>
                <span className="text-[10px] bg-amber-500/10 px-2 py-0.5 rounded">Unlocked</span>
              </div>
            )
          }
        ];
      default:
        return [];
    }
  };

  const currentCards = getCascadeCards(activeTab);

  return (
    <div className="min-h-screen relative bg-slate-50 dark:bg-charcoal-950 overflow-hidden font-sans text-charcoal-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Ambient background glow fields */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-400/10 dark:bg-indigo-950/15 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-400/5 dark:bg-emerald-950/10 blur-[130px] pointer-events-none" />

      {/* Floating particles background stream */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -80, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.15, 0.4, 0.15]
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 6 + 6,
              ease: 'easeInOut',
              delay: Math.random() * 4
            }}
            className="absolute w-2 h-2 rounded-full bg-sky-400/30 dark:bg-sky-500/25"
            style={{
              top: `${Math.random() * 85 + 5}%`,
              left: `${Math.random() * 85 + 5}%`
            }}
          />
        ))}
      </div>

      {/* Navbar navigation */}
      <nav className="relative max-w-7xl mx-auto px-10 py-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-sky-500/20">
            M
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-sm text-charcoal-900 dark:text-white block">MorphUI</span>
            <span className="text-[9px] font-extrabold text-sky-500 uppercase tracking-widest block -mt-1">Adaptive OS</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-sm font-extrabold text-charcoal-550 dark:text-charcoal-400 hover:text-charcoal-950 dark:hover:text-white transition-colors"
          >
            Launch Dashboard
          </button>
          <button
            onClick={() => navigate('/onboarding')}
            className="text-xs font-black bg-slate-900 dark:bg-slate-100 text-white dark:text-charcoal-950 px-6 py-3.5 rounded-[18px] hover:scale-105 active:scale-95 transition-all shadow-md shadow-slate-900/10"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Spacious Hero Showcase with floating 3D Cascade */}
      <section className="relative max-w-7xl mx-auto px-10 pt-20 pb-36 md:pt-32 md:pb-48 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center z-10">
        
        {/* Left Column Text (Spacious & Scaled Up) */}
        <div className="lg:col-span-6 space-y-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/10 text-xs font-black uppercase tracking-wider">
            <Sparkles size={12} className="animate-spin" style={{ animationDuration: '4s' }} />
            <span>3D Adaptive Layout Compiler</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-tight text-charcoal-950 dark:text-white leading-[1.03]">
            Your Healthcare <br/>
            Dashboard Should <br/>
            <span className="hero-gradient-text">
              Understand You.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-charcoal-500 dark:text-charcoal-450 font-semibold leading-relaxed max-w-xl mx-auto lg:mx-0">
            A medical dashboard that shifts density, swaps layout columns, adjusts sizing targets, and reprioritizes vital logs in real-time based on your user profile.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
            <button
              onClick={() => navigate('/onboarding')}
              className="bg-slate-900 dark:bg-slate-100 text-white dark:text-charcoal-950 px-10 py-5.5 rounded-[22px] font-black text-base hover:scale-105 active:scale-95 shadow-lg shadow-slate-950/15 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
            >
              Get Started Onboarding 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white/60 dark:bg-charcoal-900/60 hover:bg-white dark:hover:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 px-10 py-5.5 rounded-[22px] font-black text-base hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Eye size={16} /> Fast-pass Demo
            </button>
          </div>
        </div>

        {/* Right Column: 3D Floating Dashboard Cascade */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[500px]">
          
          {/* Concentric Telemetry rings in background */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
            <div className="w-[500px] h-[500px] rounded-full border border-dashed border-sky-500/20 animate-spin absolute" style={{ animationDuration: '24s' }} />
            <div className="w-[400px] h-[400px] rounded-full border border-dashed border-emerald-500/10 animate-spin absolute" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />
          </div>

          {/* Interactive stage wrapper */}
          <div 
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-[460px] h-[480px] relative cursor-grab active:cursor-grabbing z-10"
            style={{ perspective: 1200 }}
          >
            {/* 3D Perspective Layout Container */}
            <motion.div
              style={{
                rotateX: stageRotateX,
                rotateY: stageRotateY,
                transformStyle: 'preserve-3d'
              }}
              className="w-full h-full relative"
            >
              {/* Profile swapper controllers rendered directly in 3D */}
              <div className="absolute top-[-50px] right-2 flex gap-1.5 bg-white/60 dark:bg-charcoal-900/60 p-1 rounded-xl border border-slate-250/20 dark:border-charcoal-800 z-40 shadow-sm">
                {['senior', 'diabetic', 'fitness'].map((p) => (
                  <button
                    key={p}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab(p);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase transition-all ${
                      activeTab === p 
                        ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-charcoal-950 shadow-sm' 
                        : 'text-charcoal-450 hover:text-charcoal-900'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Cascade elements */}
              <AnimatePresence mode="popLayout">
                {currentCards.map((w) => (
                  <motion.div
                    key={w.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, translateZ: -60, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, translateZ: 0, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, translateZ: -60, rotateY: -10 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                    className={`absolute ${w.offset} w-[300px] shadow-2xl rounded-[24px] glass-panel border border-white dark:border-charcoal-800 p-6 flex flex-col justify-between bg-white/80 dark:bg-charcoal-900/80 transition-all duration-300`}
                  >
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-charcoal-400 dark:text-charcoal-500 block">
                        {w.title}
                      </span>
                      <span className="text-xs text-charcoal-455 dark:text-charcoal-550 font-black block mt-0.5 leading-none">
                        {w.desc}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-end mt-4">
                      {w.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

            </motion.div>
          </div>

        </div>
      </section>

      {/* Spacious Statistics 3D HUD Console (Overhauled) */}
      <section className="relative py-28 px-10 border-t border-b border-slate-200/50 dark:border-charcoal-850 bg-white/10 dark:bg-charcoal-900/10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase text-sky-500 tracking-widest block">Simulation Telemetry Matrix</span>
            <h2 className="text-3xl font-black text-charcoal-950 dark:text-white tracking-tight">Active Platform Sync Vitals</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Stat Card 1: Users Sync */}
            <GlassCard className="border-t-[4px] border-t-sky-500">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-charcoal-400">Loggers Online</span>
                <div className="p-2 bg-sky-500/10 rounded-lg text-sky-500"><Users size={16} /></div>
              </div>
              <span className="text-3xl font-black text-charcoal-950 dark:text-white block tracking-tight">
                {loggerCount.toLocaleString()}+
              </span>
              <p className="text-xs text-charcoal-450 dark:text-charcoal-500 mt-1 font-semibold">Active Patients Syncing</p>
              {/* Telemetry wave */}
              <div className="h-6 mt-5 flex items-end gap-1.5">
                {[4, 8, 5, 9, 6, 8, 12, 6, 9].map((val, idx) => (
                  <div key={idx} style={{ height: `${val * 8}%` }} className="flex-1 bg-sky-500/25 dark:bg-sky-500/40 rounded-sm" />
                ))}
              </div>
            </GlassCard>

            {/* Stat Card 2: Precision Index */}
            <GlassCard className="border-t-[4px] border-t-emerald-500">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-charcoal-400">Precision Rating</span>
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><ShieldCheck size={16} /></div>
              </div>
              <span className="text-3xl font-black text-charcoal-950 dark:text-white block tracking-tight">
                {satisfactionRate}%
              </span>
              <p className="text-xs text-charcoal-450 dark:text-charcoal-500 mt-1 font-semibold">AI Diagnoses Compliance</p>
              {/* Telemetry trend curve */}
              <div className="h-6 mt-5 flex items-end gap-1.5">
                {[6, 6, 7, 7, 8, 8, 9, 10, 12].map((val, idx) => (
                  <div key={idx} style={{ height: `${val * 8}%` }} className="flex-1 bg-emerald-500/25 dark:bg-emerald-500/40 rounded-sm" />
                ))}
              </div>
            </GlassCard>

            {/* Stat Card 3: Personas channels */}
            <GlassCard className="border-t-[4px] border-t-violet-500">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-charcoal-400">Design Profiles</span>
                <div className="p-2 bg-violet-50/10 dark:bg-violet-950/20 rounded-lg text-violet-500"><Zap size={16} /></div>
              </div>
              <span className="text-3xl font-black text-charcoal-950 dark:text-white block tracking-tight">
                4 Channels
              </span>
              <p className="text-xs text-charcoal-450 dark:text-charcoal-500 mt-1 font-semibold">Morphing Interface Adaptations</p>
              {/* Step trend */}
              <div className="h-6 mt-5 flex items-end gap-1.5">
                {[2, 2, 6, 6, 10, 10, 8, 12, 12].map((val, idx) => (
                  <div key={idx} style={{ height: `${val * 8}%` }} className="flex-1 bg-violet-500/25 dark:bg-violet-500/40 rounded-sm" />
                ))}
              </div>
            </GlassCard>

            {/* Stat Card 4: Compile Speed */}
            <GlassCard className="border-t-[4px] border-t-rose-500">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-charcoal-400">Compile Latency</span>
                <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500"><Cpu size={16} /></div>
              </div>
              <span className="text-3xl font-black text-charcoal-950 dark:text-white block tracking-tight">
                100ms
              </span>
              <p className="text-xs text-charcoal-450 dark:text-charcoal-500 mt-1 font-semibold">Interface Render Recompiles</p>
              {/* Telemetry heartbeat wave */}
              <div className="h-6 mt-5 flex items-end gap-1.5">
                {[3, 3, 12, 3, 3, 10, 3, 3, 4].map((val, idx) => (
                  <div key={idx} style={{ height: `${val * 8}%` }} className="flex-1 bg-rose-500/25 dark:bg-rose-500/40 rounded-sm" />
                ))}
              </div>
            </GlassCard>

          </div>
        </div>
      </section>

      {/* Why Adaptive Section */}
      <section className="relative max-w-7xl mx-auto px-10 py-28 md:py-36">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-charcoal-950 dark:text-white">
            Why Adaptive UI Architecture?
          </h2>
          <p className="text-base font-semibold text-charcoal-455 dark:text-charcoal-500 leading-relaxed">
            Generic layouts force every patient to traverse clutter. MorphUI dynamically restructures card densities, font weights, and navigation nodes to serve specific medical journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/30 dark:bg-charcoal-900/30 border border-slate-200/60 dark:border-charcoal-800/80 rounded-[28px] p-8 space-y-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center shadow-inner">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Elderly Accessibility First</h3>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 leading-relaxed font-semibold">
              Forces larger fonts, massive clickable grids, and persistent emergency panel visibility. Minimizes visual clutter to prioritize critical safety shortcuts.
            </p>
          </div>

          <div className="bg-white/30 dark:bg-charcoal-900/30 border border-slate-200/60 dark:border-charcoal-800/80 rounded-[28px] p-8 space-y-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center shadow-inner">
              <Activity size={24} />
            </div>
            <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Chronic Vitals Sync</h3>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 leading-relaxed font-semibold">
              Integrates glucose tracking, meal planning, and metabolic data. Highlights current status metrics (high/low alarms) with immediate interactive shortcuts.
            </p>
          </div>

          <div className="bg-white/30 dark:bg-charcoal-900/30 border border-slate-200/60 dark:border-charcoal-800/80 rounded-[28px] p-8 space-y-6 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-inner">
              <Heart size={24} />
            </div>
            <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">High-Density Athletic HUD</h3>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 leading-relaxed font-semibold">
              Maximizes data packing. Renders active burning indicators, heart rate cardiac zones, water consumption checklists, and milestone badge cabinets.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-200 dark:border-charcoal-900 bg-white/10 dark:bg-charcoal-950/10 py-16 px-8 text-center z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-charcoal-950 flex items-center justify-center font-black text-sm">
              M
            </div>
            <span className="font-extrabold text-sm text-charcoal-950 dark:text-slate-300">MorphUI AI</span>
          </div>
          
          <p className="text-[11px] font-bold text-charcoal-400 dark:text-charcoal-500 tracking-wider">
            &copy; 2026 MorphUI Inc. Designed for Next-Gen Adaptive Care. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
