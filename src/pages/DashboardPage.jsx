import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import AIAssistant from '../components/layout/AIAssistant';
import CommandPalette from '../components/layout/CommandPalette';
import SettingsDrawer from '../components/layout/SettingsDrawer';

// Import widgets dynamically
import HealthScore from '../components/widgets/HealthScore';
import MedicationTracker from '../components/widgets/MedicationTracker';
import GlucoseTracker from '../components/widgets/GlucoseTracker';
import HeartRateTracker from '../components/widgets/HeartRateTracker';
import CaloriesTracker from '../components/widgets/CaloriesTracker';
import MealPlanner from '../components/widgets/MealPlanner';
import Appointments from '../components/widgets/Appointments';
import EmergencyCard from '../components/widgets/EmergencyCard';
import FamilyOverview from '../components/widgets/FamilyOverview';
import Achievements from '../components/widgets/Achievements';
import ActivityTimeline from '../components/widgets/ActivityTimeline';
import UpcomingTasks from '../components/widgets/UpcomingTasks';
import AIRecommendationCard from '../components/widgets/AIRecommendationCard';
import ProgressTimeline from '../components/widgets/ProgressTimeline';
import WeeklySummary from '../components/widgets/WeeklySummary';

import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const { 
    currentProfileId, 
    getActiveProfile, 
    fontScale, 
    density,
    emergencyActive, 
    setEmergencyActive, 
    addNotification,
    visibleWidgets
  } = useApp();

  const profile = getActiveProfile();
  const widgets = profile?.widgets || [];

  // Toggle States
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  // Ctrl + K Event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Map widget component string references to react tags
  const widgetComponentMap = {
    HealthScore: <HealthScore />,
    MedicationTracker: <MedicationTracker />,
    GlucoseTracker: <GlucoseTracker />,
    HeartRateTracker: <HeartRateTracker />,
    CaloriesTracker: <CaloriesTracker />,
    MealPlanner: <MealPlanner />,
    Appointments: <Appointments />,
    EmergencyCard: <EmergencyCard />,
    FamilyOverview: <FamilyOverview />,
    Achievements: <Achievements />,
    ActivityTimeline: <ActivityTimeline />,
    UpcomingTasks: <UpcomingTasks />,
    AIRecommendationCard: <AIRecommendationCard />,
    ProgressTimeline: <ProgressTimeline />,
    WeeklySummary: <WeeklySummary />
  };

  // Convert font scale config strings to CSS layers
  const getFontScaleClass = (scale) => {
    switch (scale) {
      case 'large': return 'font-scale-large';
      case 'extra-large': return 'font-scale-extra-large';
      case 'small': return 'font-scale-small';
      default: return 'font-scale-medium';
    }
  };

  const handleCancelSOS = () => {
    setEmergencyActive(false);
    addNotification('SOS Deactivated', 'Emergency broadcast terminated. Safety status acknowledged.', 'success');
  };

  // Dynamically include specialized widgets in available sets if they are not in defaults!
  const getCombinedWidgets = () => {
    const baseList = [...widgets];
    
    // Inject AI Recommendation Card for every profile
    if (!baseList.some(w => w.id === 'ai-rec')) {
      baseList.push({ id: 'ai-rec', type: 'AIRecommendationCard', size: 'col-span-12 md:col-span-4', priority: 1.5 });
    }
    // Inject Progress Timeline for Senior and Diabetic
    if ((currentProfileId === 'senior' || currentProfileId === 'diabetic') && !baseList.some(w => w.id === 'prog-time')) {
      baseList.push({ id: 'prog-time', type: 'ProgressTimeline', size: 'col-span-12 md:col-span-6', priority: 3.5 });
    }
    // Inject Weekly Summary Area Graph for Fitness and Diabetic
    if ((currentProfileId === 'fitness' || currentProfileId === 'diabetic') && !baseList.some(w => w.id === 'week-sum')) {
      baseList.push({ id: 'week-sum', type: 'WeeklySummary', size: 'col-span-12 md:col-span-7', priority: 2.5 });
    }

    // Filter to only render widgets toggled active in the settings drawer list
    return baseList
      .filter(w => visibleWidgets.includes(w.id))
      .sort((a, b) => a.priority - b.priority);
  };

  const renderedWidgets = getCombinedWidgets();

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row bg-slate-50 dark:bg-charcoal-950 transition-all duration-300 relative overflow-hidden ${getFontScaleClass(fontScale)}`}>
      
      {/* Radial neon glow circles */}
      <div className="absolute top-1/3 left-1/4 w-[35vw] h-[35vw] rounded-full glowing-orb bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full glowing-orb bg-sky-500/10 dark:bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Main sidebar console */}
      <Sidebar />

      {/* Primary Workspace */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        
        {/* Main top header with settings/cmd callbacks */}
        <Header 
          onOpenSettings={() => setSettingsOpen(true)} 
          onOpenCommandPalette={() => setCmdOpen(true)} 
        />

        {/* Dynamic widgets grid space */}
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${
          density === 'simple' ? 'p-8 md:p-10' : density === 'detailed' ? 'p-4 md:p-6' : 'p-6 md:p-8'
        }`}>
          <motion.div 
            layout
            className={`grid grid-cols-12 items-stretch transition-all duration-300 ${
              density === 'simple' ? 'gap-10' : density === 'detailed' ? 'gap-4' : 'gap-6 md:gap-8'
            }`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {renderedWidgets.map((w) => (
                <motion.div
                  key={w.id}
                  layout
                  id={w.id}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -15 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 30,
                    layout: { duration: 0.55, type: "spring", stiffness: 200, damping: 28 }
                  }}
                  className={`${w.size} flex flex-col`}
                >
                  {widgetComponentMap[w.type] || (
                    <div className="p-4 bg-red-100 rounded-xl">Widget {w.type} not configured</div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>

      {/* Copilot assistant float */}
      <AIAssistant />

      {/* Command Palette Overlay */}
      <CommandPalette 
        isOpen={cmdOpen} 
        onClose={() => setCmdOpen(false)} 
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Settings Drawer Overlay */}
      <SettingsDrawer 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
      />

      {/* Fullscreen Emergency SOS Overlay */}
      <AnimatePresence>
        {emergencyActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-rose-950/95 dark:bg-rose-950/98 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white text-center"
          >
            <div className="max-w-md w-full space-y-8">
              {/* Beating Warning Indicator */}
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-rose-500 blur-sm"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  className="w-20 h-20 rounded-full bg-rose-600 border-2 border-white flex items-center justify-center relative shadow-lg shadow-rose-500/50"
                >
                  <ShieldAlert size={40} className="text-white" />
                </motion.div>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-black uppercase tracking-tight">ACTIVE MEDICAL EMERGENCY</h2>
                <p className="text-xs text-rose-300 font-semibold uppercase tracking-wider">
                  Siren Dispatch & Local First Responder Protocol Triggered
                </p>
              </div>

              {/* Data payload display */}
              <div className="bg-rose-900/50 border border-rose-500/20 rounded-[24px] p-5 text-left space-y-3.5 text-xs">
                <div className="flex justify-between border-b border-rose-500/25 pb-2">
                  <span className="font-bold text-rose-300">BROADCAST SIGNAL:</span>
                  <span className="font-mono bg-rose-600/35 px-2 py-0.5 rounded text-[10px]">ENCRYPTED METADATA</span>
                </div>
                <div>
                  <span className="font-semibold text-rose-400 block uppercase tracking-wider text-[9px] mb-0.5">Assigned Persona</span>
                  <span className="font-bold text-sm block">{profile?.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-rose-400 block uppercase tracking-wider text-[9px] mb-0.5">Live Coordinates</span>
                  <span className="font-mono text-sm block">Lat: 37.774929, Lon: -122.419416</span>
                </div>
                <div className="flex items-center gap-2 text-rose-300 font-medium">
                  <AlertTriangle size={14} className="animate-bounce" />
                  <span>Notifying safety response contacts...</span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleCancelSOS}
                  className="flex-1 bg-white hover:bg-slate-100 active:scale-95 text-rose-950 font-black py-4 rounded-[18px] text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  I'm Safe - Cancel Alert
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
