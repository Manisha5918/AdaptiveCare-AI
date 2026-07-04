import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Compass, Sparkles, ChevronRight, ChevronLeft, Check, Cpu, AlertCircle } from 'lucide-react';
import { getProfileIcon, getDensityIcon } from '../utils/icons';
import { motion, AnimatePresence } from 'framer-motion';

// Zod Validation Schema for step 2 demographics
const demographicsSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.coerce.number().min(10, { message: 'Age must be at least 10.' }).max(120, { message: 'Age must be valid.' }),
  weight: z.coerce.number().min(30, { message: 'Weight must be at least 30 kg.' }).max(300, { message: 'Weight must be valid.' }),
  bloodType: z.string().min(1, { message: 'Please select a blood type.' })
});

export default function Onboarding() {
  const navigate = useNavigate();
  const { setCurrentProfileId, setIsOnboarded, setDensity, setOnboardingData } = useApp();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadText, setLoadText] = useState('Analyzing preferences...');

  // Step 1 & 3 standard state choice selectors
  const [persona, setPersona] = useState('senior');
  const [densityPref, setDensityPref] = useState('balanced');

  // React Hook Form initialization with Zod resolver for Step 2
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(demographicsSchema),
    defaultValues: {
      name: 'Eleanor Vance',
      age: 68,
      weight: 64,
      bloodType: 'A+'
    }
  });

  const loadingTexts = [
    'Analyzing your preferences...',
    'Understanding your healthcare goals...',
    'Creating your personalized experience...',
    'Building your adaptive interface...',
    'Optimizing experience...'
  ];

  // Increment load progress bar when final loading triggers
  useEffect(() => {
    let progressTimer;
    let textTimer;

    if (loading) {
      progressTimer = setInterval(() => {
        setLoadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            handleFinish();
            return 100;
          }
          return prev + 1;
        });
      }, 35);

      let idx = 0;
      textTimer = setInterval(() => {
        idx = (idx + 1) % loadingTexts.length;
        setLoadText(loadingTexts[idx]);
      }, 950);
    }

    return () => {
      clearInterval(progressTimer);
      clearInterval(textTimer);
    };
  }, [loading]);

  const handleFormSubmit = (data) => {
    setOnboardingData(data);
    setStep(3);
  };

  const handleFinish = () => {
    setCurrentProfileId(persona);
    setDensity(densityPref);
    setIsOnboarded(true);
    navigate('/dashboard');
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 3) {
      setLoading(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const personas = [
    { id: 'senior', label: 'Senior Citizen', desc: 'Prioritize visibility and safety' },
    { id: 'diabetic', label: 'Diabetic Patient', desc: 'Focus on glucose and meal controls' },
    { id: 'fitness', label: 'Fitness User', desc: 'Optimize active calorie and sensor metrics' },
    { id: 'caregiver', label: 'Family Caregiver', desc: 'Supervise stats for multiple patients' }
  ];

  const densities = [
    { id: 'simple', label: 'Simple Layout', desc: 'Clean, large card buttons, minimal charts' },
    { id: 'balanced', label: 'Balanced Layout', desc: 'Standard arrangement with sparklines' },
    { id: 'detailed', label: 'Detailed HUD', desc: 'High packing density, statistics charts' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-charcoal-950 font-sans p-6 text-charcoal-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-indigo-500/5 dark:bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-teal-500/5 dark:bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!loading ? (
          <motion.div
            key="wizard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-[540px] glass-panel border border-slate-200 dark:border-charcoal-800 rounded-[28px] p-8 shadow-2xl relative z-10"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-500">
                <Compass size={14} className="animate-spin" style={{ animationDuration: '8s' }} />
                <span>Configuration Console</span>
              </div>
              <span className="text-[10px] font-black uppercase text-charcoal-400 dark:text-charcoal-500 tracking-wider">
                Step {step} of 3
              </span>
            </div>

            {/* Progress indicator */}
            <div className="w-full bg-slate-100 dark:bg-charcoal-950 h-1.5 rounded-full overflow-hidden mb-8">
              <motion.div 
                className="bg-sky-500 h-full rounded-full"
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Form body */}
            <div className="min-h-[300px]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <h2 className="text-2xl font-black text-charcoal-950 dark:text-white tracking-tight">Who are you?</h2>
                      <p className="text-xs text-charcoal-400 dark:text-charcoal-500 mt-1 font-semibold">Choose the profile that matches your daily routine.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                      {personas.map((p) => {
                        const active = persona === p.id;
                        return (
                          <div
                            key={p.id}
                            onClick={() => setPersona(p.id)}
                            className={`p-4 rounded-[20px] cursor-pointer border flex flex-col justify-between h-[115px] transition-all select-none ${
                              active
                                ? 'bg-sky-500/10 border-sky-500/80 shadow-md shadow-sky-500/5'
                                : 'bg-white/40 dark:bg-charcoal-900/40 border-slate-200 dark:border-charcoal-800 hover:border-slate-300 dark:hover:border-charcoal-700'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="p-2 bg-slate-100 dark:bg-charcoal-900 rounded-xl flex items-center justify-center border border-slate-250/20 dark:border-charcoal-800">
                                {getProfileIcon(p.id, 20)}
                              </span>
                              {active && <div className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center text-white"><Check size={10} strokeWidth={4} /></div>}
                            </div>
                            <div className="pt-3">
                              <h3 className="text-xs font-black text-charcoal-900 dark:text-slate-100">{p.label}</h3>
                              <p className="text-[10px] text-charcoal-400 dark:text-charcoal-500 font-semibold mt-0.5 leading-tight">{p.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <h2 className="text-2xl font-black text-charcoal-950 dark:text-white tracking-tight">Vitals Metrics Definition</h2>
                      <p className="text-xs text-charcoal-400 dark:text-charcoal-500 mt-1 font-semibold">Inputs are validated dynamically using Zod schemas.</p>
                    </div>

                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-2">
                      {/* Name input */}
                      <div>
                        <label className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block mb-1">Full Name</label>
                        <input
                          type="text"
                          {...register('name')}
                          className="w-full px-4 py-2.5 text-xs bg-white/40 dark:bg-charcoal-900/40 border border-slate-255 dark:border-charcoal-800 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-sky-500 text-charcoal-950 dark:text-slate-100 placeholder-charcoal-400 font-medium"
                          placeholder="Your full name..."
                        />
                        {errors.name && (
                          <span className="text-[10px] text-rose-500 font-bold flex items-center gap-1 mt-1">
                            <AlertCircle size={10} /> {errors.name.message}
                          </span>
                        )}
                      </div>

                      {/* Age & Weight Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block mb-1">Age</label>
                          <input
                            type="number"
                            {...register('age')}
                            className="w-full px-4 py-2.5 text-xs bg-white/40 dark:bg-charcoal-900/40 border border-slate-255 dark:border-charcoal-800 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-sky-500 text-charcoal-950 dark:text-slate-100 font-medium"
                          />
                          {errors.age && (
                            <span className="text-[10px] text-rose-500 font-bold flex items-center gap-1 mt-1">
                              <AlertCircle size={10} /> {errors.age.message}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block mb-1">Weight (KG)</label>
                          <input
                            type="number"
                            {...register('weight')}
                            className="w-full px-4 py-2.5 text-xs bg-white/40 dark:bg-charcoal-900/40 border border-slate-255 dark:border-charcoal-800 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-sky-500 text-charcoal-950 dark:text-slate-100 font-medium"
                          />
                          {errors.weight && (
                            <span className="text-[10px] text-rose-500 font-bold flex items-center gap-1 mt-1">
                              <AlertCircle size={10} /> {errors.weight.message}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Blood type drop down selector */}
                      <div>
                        <label className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block mb-1">Blood Group</label>
                        <select
                          {...register('bloodType')}
                          className="w-full px-4 py-2.5 text-xs bg-white/40 dark:bg-charcoal-900/40 border border-slate-255 dark:border-charcoal-800 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-sky-500 text-charcoal-950 dark:text-slate-100 font-bold"
                        >
                          <option value="A+">A+ Positive</option>
                          <option value="B+">B+ Positive</option>
                          <option value="O+">O+ Positive</option>
                          <option value="AB+">AB+ Positive</option>
                          <option value="A-">A- Negative</option>
                          <option value="B-">B- Negative</option>
                          <option value="O-">O- Negative</option>
                          <option value="AB-">AB- Negative</option>
                        </select>
                        {errors.bloodType && (
                          <span className="text-[10px] text-rose-500 font-bold flex items-center gap-1 mt-1">
                            <AlertCircle size={10} /> {errors.bloodType.message}
                          </span>
                        )}
                      </div>

                      <button id="form-submit-trigger" type="submit" className="hidden" />
                    </form>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <h2 className="text-2xl font-black text-charcoal-950 dark:text-white tracking-tight">Preferred Layout</h2>
                      <p className="text-xs text-charcoal-400 dark:text-charcoal-500 mt-1 font-semibold">Decide the widget configuration complexity.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      {densities.map((d) => {
                        const active = densityPref === d.id;
                        return (
                          <div
                            key={d.id}
                            onClick={() => setDensityPref(d.id)}
                            className={`p-4 rounded-[20px] cursor-pointer border flex flex-col justify-between h-[135px] transition-all select-none ${
                              active
                                ? 'bg-sky-500/10 border-sky-500/80 shadow-md shadow-sky-500/5'
                                : 'bg-white/40 dark:bg-charcoal-900/40 border-slate-200 dark:border-charcoal-800 hover:border-slate-300 dark:hover:border-charcoal-700'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="p-2 bg-slate-100 dark:bg-charcoal-900 rounded-xl flex items-center justify-center border border-slate-250/20 dark:border-charcoal-800">
                                {getDensityIcon(d.id, 18)}
                              </span>
                              {active && <div className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center text-white"><Check size={10} strokeWidth={4} /></div>}
                            </div>
                            <div className="pt-2">
                              <h3 className="text-xs font-black text-charcoal-900 dark:text-slate-100">{d.label}</h3>
                              <p className="text-[9px] text-charcoal-400 dark:text-charcoal-500 font-semibold mt-0.5 leading-tight">{d.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between border-t border-slate-200/60 dark:border-charcoal-800 pt-5 mt-6">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className={`text-xs font-bold px-4 py-2.5 rounded-[12px] transition-all flex items-center gap-1 border border-slate-200 dark:border-charcoal-800 ${
                  step === 1
                    ? 'opacity-45 cursor-not-allowed text-charcoal-450'
                    : 'bg-white/50 dark:bg-charcoal-900 hover:bg-white text-charcoal-700 dark:text-slate-300 active:scale-95'
                }`}
              >
                <ChevronLeft size={14} /> Back
              </button>

              <button
                onClick={() => {
                  if (step === 2) {
                    document.getElementById('form-submit-trigger')?.click();
                  } else {
                    handleNext();
                  }
                }}
                className="bg-slate-900 dark:bg-slate-100 hover:scale-105 active:scale-95 text-white dark:text-charcoal-950 font-extrabold text-xs px-5 py-2.5 rounded-[12px] flex items-center gap-1 transition-all shadow-md shadow-slate-900/10"
              >
                {step === 3 ? 'Generate Workspace' : 'Continue'}
                <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Glowing AI Loading Animation */
          <motion.div
            key="loader"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-[420px] text-center glass-panel border border-slate-200 dark:border-charcoal-800 rounded-[28px] p-8 shadow-2xl relative"
          >
            {/* Custom Spinning Glowing Orb */}
            <div className="relative w-36 h-36 mx-auto mb-8 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-sky-500/35"
              />
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: -360 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-650 dark:from-sky-500 dark:via-blue-600 dark:to-indigo-750 blur-[8px] opacity-75 shadow-lg shadow-blue-500/20"
              />
              <div className="relative z-10 w-16 h-16 rounded-full bg-white dark:bg-charcoal-900 border border-slate-200 dark:border-charcoal-800 flex items-center justify-center">
                <Cpu className="text-sky-500 animate-spin" style={{ animationDuration: '5s' }} size={24} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase text-charcoal-400 dark:text-charcoal-500 tracking-widest flex items-center justify-center gap-1.5">
                <Sparkles size={14} className="text-sky-500" /> Morphing Interface Canvas
              </h3>
              
              {/* Dynamic optimization text log */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-base font-bold text-charcoal-900 dark:text-slate-100 min-h-[24px]"
                >
                  {loadText}
                </motion.p>
              </AnimatePresence>

              {/* Progress Bar loader */}
              <div className="w-full bg-slate-100 dark:bg-charcoal-950 h-2 rounded-full overflow-hidden relative">
                <div 
                  className="bg-gradient-to-r from-sky-400 to-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              
              <span className="text-[10px] text-charcoal-400 dark:text-charcoal-500 font-extrabold block">
                COMPILING DESIGN TOKENS ({loadProgress}%)
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
