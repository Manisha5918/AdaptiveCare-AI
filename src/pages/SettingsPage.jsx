import { useApp } from '../context/AppContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { GlassCard } from '../components/common/GlassCard';
import { getProfileIcon } from '../utils/icons';
import { Settings, Sliders, Accessibility, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';

export default function SettingsPage() {
  const {
    currentProfileId,
    setCurrentProfileId,
    profileData,
    density,
    setDensity,
    fontScale,
    setFontScale,
    darkMode,
    setDarkMode
  } = useApp();

  const densities = [
    { id: 'simple', label: 'Simple', desc: 'Large tiles, prioritized alerts' },
    { id: 'balanced', label: 'Balanced', desc: 'Moderate detail with sparks' },
    { id: 'detailed', label: 'Detailed', desc: 'Dense grids, deep telemetry' }
  ];

  const fontScales = [
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Standard' },
    { id: 'large', label: 'Large' },
    { id: 'extra-large', label: 'Accessibility (XL)' }
  ];

  const personas = Object.values(profileData);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 dark:bg-charcoal-950 transition-colors duration-300">
      
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* Header bar */}
        <Header />

        {/* Settings view */}
        <main className="flex-1 p-6 overflow-y-auto max-w-4xl w-full mx-auto space-y-6">
          
          <div className="flex items-center gap-2 mb-2">
            <Settings className="text-charcoal-500 animate-spin" style={{ animationDuration: '8s' }} size={24} />
            <h2 className="text-2xl font-black text-charcoal-950 dark:text-white tracking-tight">System Configuration</h2>
          </div>

          {/* Card 1: Active Profile Customization */}
          <GlassCard>
            <div className="flex items-center gap-2.5 mb-4 text-sky-500">
              <Sparkles size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider">User Persona Profiles</h3>
            </div>
            <p className="text-xs text-charcoal-400 dark:text-charcoal-500 font-semibold mb-6">
              Switching profiles swaps theme colors, layout distributions, and metrics widgets configuration automatically.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personas.map((p) => {
                const active = p.id === currentProfileId;
                return (
                  <div
                    key={p.id}
                    onClick={() => setCurrentProfileId(p.id)}
                    className={`p-4 rounded-[20px] cursor-pointer border flex items-center justify-between transition-all ${
                      active
                        ? 'bg-slate-100 dark:bg-charcoal-900 border-slate-300 dark:border-charcoal-800 shadow-sm'
                        : 'bg-white/35 dark:bg-charcoal-900/10 border-slate-200/50 dark:border-charcoal-850 hover:border-slate-300 dark:hover:border-charcoal-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-2.5 bg-slate-100 dark:bg-charcoal-900/50 rounded-xl flex items-center justify-center border border-slate-250/20 dark:border-charcoal-800">
                        {getProfileIcon(p.id, 20)}
                      </span>
                      <div>
                        <h4 className="text-xs font-black text-charcoal-900 dark:text-slate-100">{p.name}</h4>
                        <p className="text-[10px] text-charcoal-400 dark:text-charcoal-500 font-semibold leading-tight mt-0.5">{p.role}</p>
                      </div>
                    </div>
                    {active && (
                      <span className="text-[9px] font-extrabold bg-emerald-500/15 text-emerald-500 px-2 py-0.5 rounded uppercase tracking-wider">
                        Active
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Card 2: Interface Density & Scale */}
          <GlassCard>
            <div className="flex items-center gap-2.5 mb-4 text-emerald-500">
              <Sliders size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider">Canvas Density & Sizing</h3>
            </div>
            
            <div className="space-y-6">
              {/* Density Options */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-widest block">Layout Density</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {densities.map((d) => {
                    const active = d.id === density;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setDensity(d.id)}
                        className={`text-left p-3.5 rounded-[18px] border transition-all ${
                          active
                            ? 'bg-emerald-500/5 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                            : 'bg-white/35 dark:bg-charcoal-900/10 border-slate-200/50 dark:border-charcoal-850 hover:border-slate-300 dark:hover:border-charcoal-800'
                        }`}
                      >
                        <span className="text-xs font-bold block">{d.label}</span>
                        <span className="text-[9px] text-charcoal-450 dark:text-charcoal-500 font-semibold block mt-0.5 leading-tight">{d.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Font Sizing scale */}
              <div className="space-y-3 pt-4 border-t border-slate-200/50 dark:border-charcoal-800/60">
                <span className="text-[11px] font-bold text-charcoal-400 dark:text-charcoal-500 uppercase tracking-widest block">Text Sizing & Accessibility Scale</span>
                <div className="flex flex-wrap gap-2.5">
                  {fontScales.map((fs) => {
                    const active = fs.id === fontScale;
                    return (
                      <button
                        key={fs.id}
                        onClick={() => setFontScale(fs.id)}
                        className={`text-xs font-bold px-4 py-2 rounded-[12px] border transition-all ${
                          active
                            ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-charcoal-900 border-transparent shadow-sm'
                            : 'bg-white/35 dark:bg-charcoal-900/10 border-slate-200/50 dark:border-charcoal-850 hover:border-slate-300 dark:hover:border-charcoal-800'
                        }`}
                      >
                        {fs.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Card 3: System Themes & Notifications */}
          <GlassCard>
            <div className="flex items-center gap-2.5 mb-4 text-violet-500">
              <Accessibility size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider">Visual Themes & General</h3>
            </div>

            <div className="space-y-4">
              {/* Dark mode switcher */}
              <div className="flex items-center justify-between p-3.5 rounded-[18px] border border-slate-200/40 dark:border-charcoal-800/40 bg-white/20 dark:bg-charcoal-900/10">
                <div>
                  <h4 className="text-xs font-bold text-charcoal-900 dark:text-slate-100">Dark Canvas Mode</h4>
                  <p className="text-[10px] text-charcoal-450 dark:text-charcoal-500 font-semibold mt-0.5 leading-none">Toggle dark backdrop templates.</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-charcoal-500 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-white transition-all"
                >
                  {darkMode ? (
                    <ToggleRight className="text-emerald-500" size={32} />
                  ) : (
                    <ToggleLeft className="text-slate-300 dark:text-charcoal-700" size={32} />
                  )}
                </button>
              </div>

              {/* Reset simulator */}
              <div className="flex items-center justify-between p-3.5 rounded-[18px] border border-slate-200/40 dark:border-charcoal-800/40 bg-white/20 dark:bg-charcoal-900/10">
                <div>
                  <h4 className="text-xs font-bold text-charcoal-900 dark:text-slate-100">Simulation Data Reset</h4>
                  <p className="text-[10px] text-charcoal-450 dark:text-charcoal-500 font-semibold mt-0.5 leading-none">Restore mock database to defaults.</p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="text-[10px] font-bold bg-slate-900 dark:bg-slate-100 hover:scale-105 active:scale-95 text-white dark:text-charcoal-900 px-3.5 py-2 rounded-lg transition-all"
                >
                  Reset Vitals Data
                </button>
              </div>
            </div>
          </GlassCard>

        </main>
      </div>
    </div>
  );
}
