import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sliders, Layout, Eye, EyeOff, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsDrawer({ isOpen, onClose }) {
  const { 
    currentProfileId, 
    getActiveProfile, 
    visibleWidgets, 
    toggleWidgetVisibility,
    density,
    setDensity
  } = useApp();

  const profile = getActiveProfile();
  const allWidgets = profile?.widgets || [];
  const accent = profile?.theme?.accent || '#3b82f6';

  const densities = [
    { id: 'simple', label: 'Simple' },
    { id: 'balanced', label: 'Balanced' },
    { id: 'detailed', label: 'Detailed HUD' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[360px] bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-2xl border-l border-slate-200 dark:border-charcoal-800 shadow-2xl p-6 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-charcoal-800 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <Sliders style={{ color: accent }} size={20} />
                <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Layout Settings</h3>
              </div>
              <button 
                onClick={onClose}
                className="text-charcoal-400 hover:text-charcoal-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-charcoal-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Density setting */}
            <div className="space-y-3 mb-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-charcoal-400 dark:text-charcoal-500 flex items-center gap-1.5">
                <LayoutGrid size={12} /> Dashboard Density
              </span>
              <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-charcoal-950 p-1 rounded-xl">
                {densities.map((d) => {
                  const active = d.id === density;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setDensity(d.id)}
                      className={`text-center py-2 rounded-lg text-xs font-bold transition-all ${
                        active
                          ? 'bg-white dark:bg-charcoal-800 text-charcoal-950 dark:text-white shadow-sm'
                          : 'text-charcoal-400 dark:text-charcoal-500 hover:text-charcoal-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Widget Toggles */}
            <div className="flex-1 flex flex-col min-h-0">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-charcoal-400 dark:text-charcoal-500 block mb-3">
                Visible Dashboard Widgets
              </span>
              
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {allWidgets.map((wid) => {
                  const isVisible = visibleWidgets.includes(wid.id);
                  return (
                    <div
                      key={wid.id}
                      onClick={() => toggleWidgetVisibility(wid.id)}
                      className={`flex items-center justify-between p-3 rounded-[16px] cursor-pointer border transition-all ${
                        isVisible
                          ? 'bg-slate-50 dark:bg-charcoal-950/40 border-slate-200 dark:border-charcoal-800/80'
                          : 'bg-slate-50/20 dark:bg-charcoal-950/10 border-slate-100 dark:border-charcoal-900/40 opacity-50'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-black text-charcoal-900 dark:text-slate-200 block">
                          {wid.type.replace(/Tracker|Card/g, '')} Metric
                        </span>
                        <span className="text-[9px] text-charcoal-450 dark:text-charcoal-550 block font-semibold mt-0.5 uppercase tracking-wide">
                          Size: {wid.size.includes('md:col-span-8') ? 'Large' : wid.size.includes('md:col-span-4') ? 'Small' : 'Medium'}
                        </span>
                      </div>
                      
                      <button 
                        className={`p-1.5 rounded-lg transition-colors ${
                          isVisible 
                            ? 'text-emerald-500 bg-emerald-500/10' 
                            : 'text-charcoal-400 bg-slate-100 dark:bg-charcoal-800'
                        }`}
                      >
                        {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
