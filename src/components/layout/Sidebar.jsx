
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Grid, Settings, ShieldAlert,
  Calendar, Flame, Activity, Users, ClipboardList, Trophy, Pill, ChevronLeft
} from 'lucide-react';
import { getProfileIcon } from '../../utils/icons';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const { currentProfileId, getActiveProfile, density } = useApp();
  const profile = getActiveProfile();
  const accent = profile?.theme?.accent || '#3b82f6';
  
  const navigate = useNavigate();
  const location = useLocation();

  // Smooth scroll and highlight focus element
  const handleScrollToWidget = (e, targetHash) => {
    e.preventDefault();
    const cleanId = targetHash.replace('#', '');
    const element = document.getElementById(cleanId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Apply neon visual focus highlights
      element.classList.add('glow-highlight');
      setTimeout(() => {
        element.classList.remove('glow-highlight');
      }, 1500);
    }
  };

  // Determine navigation tabs based on profile type
  const getProfileSpecificTabs = (profId) => {
    switch (profId) {
      case 'senior':
        return [
          { name: 'Emergency SOS', icon: <ShieldAlert size={18} />, action: '#emergency' },
          { name: 'Medications', icon: <Pill size={18} />, action: '#medications' },
          { name: 'Appointments', icon: <Calendar size={18} />, action: '#appointments' }
        ];
      case 'diabetic':
        return [
          { name: 'Glucose Level', icon: <Activity size={18} />, action: '#glucose' },
          { name: 'Meal Planner', icon: <ClipboardList size={18} />, action: '#meal-planner' },
          { name: 'Appointments', icon: <Calendar size={18} />, action: '#appointments' }
        ];
      case 'fitness':
        return [
          { name: 'Calorie Balance', icon: <Flame size={18} />, action: '#calories' },
          { name: 'Heart Rate', icon: <Activity size={18} />, action: '#heart-rate' },
          { name: 'Milestones', icon: <Trophy size={18} />, action: '#achievements' }
        ];
      case 'caregiver':
        return [
          { name: 'Oversight Hub', icon: <Users size={18} />, action: '#family-overview' },
          { name: 'Patient Schedules', icon: <Calendar size={18} />, action: '#appointments' },
          { name: 'SOS Contacts', icon: <ShieldAlert size={18} />, action: '#emergency' }
        ];
      default:
        return [];
    }
  };

  const adaptiveTabs = getProfileSpecificTabs(currentProfileId);

  // Global static pages
  const globalPages = [
    { name: 'Dashboard', icon: <Grid size={18} />, path: '/dashboard' },
    { name: 'Settings', icon: <Settings size={18} />, path: '/settings' }
  ];

  return (
    <aside className="w-full lg:w-[260px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-charcoal-800 bg-white/40 dark:bg-charcoal-950/40 backdrop-blur-md flex flex-col justify-between p-6 z-20 transition-all duration-300">
      <div className="space-y-6">
        {/* Brand Logo */}
        <div className="flex items-center justify-between">
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-all select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white font-extrabold text-sm shadow-sm shadow-sky-500/30">
              M
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-sm text-charcoal-900 dark:text-slate-100 block">MorphUI</span>
              <span className="text-[9px] font-extrabold text-sky-500 uppercase tracking-widest block -mt-1">Adaptive OS</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-charcoal-900 text-charcoal-400 hover:text-charcoal-600 dark:hover:text-slate-200 transition-colors flex items-center gap-1 text-[10px] font-bold"
          >
            <ChevronLeft size={12} /> Exit
          </button>
        </div>

        {/* Global Navigation Links */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-charcoal-400 dark:text-charcoal-500 block px-2.5 mb-2">
            Main Portal
          </span>
          {globalPages.map((page) => {
            const isActive = location.pathname === page.path;
            return (
              <NavLink
                key={page.path}
                to={page.path}
                className={({ isActive }) => `
                  relative flex items-center gap-3 px-3.5 py-2.5 rounded-[16px] text-xs font-bold transition-all duration-200 overflow-hidden group
                  ${isActive 
                    ? 'text-charcoal-950 dark:text-slate-100 bg-slate-100 dark:bg-charcoal-900' 
                    : 'text-charcoal-500 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-charcoal-900/40'
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                )}
                
                <span className="text-charcoal-500 dark:text-charcoal-400 transition-colors group-hover:text-inherit">
                  {page.icon}
                </span>
                <span>{page.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Adaptive Section: Morphing Menu Options */}
        <div className="space-y-1.5 pt-4 border-t border-slate-200/50 dark:border-charcoal-800/60">
          <div className="flex items-center justify-between px-2.5 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-charcoal-400 dark:text-charcoal-500">
              Vitals & Shortcuts
            </span>
            <span className="text-[8px] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 px-1.5 rounded uppercase tracking-wide">
              {density}
            </span>
          </div>

          {adaptiveTabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.action}
              onClick={(e) => handleScrollToWidget(e, tab.action)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-[16px] text-xs font-bold text-charcoal-500 hover:text-charcoal-950 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-charcoal-900/40 transition-all group"
            >
              <span className="text-charcoal-400 group-hover:text-charcoal-800 dark:group-hover:text-slate-200 transition-colors">
                {tab.icon}
              </span>
              <span className="truncate">{tab.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Sidebar Footer: Medical Profile Badge */}
      <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-charcoal-800/60 flex items-center gap-3">
        <div className="p-2.5 bg-slate-100 dark:bg-charcoal-900 rounded-xl border border-slate-250/20 dark:border-charcoal-800 flex items-center justify-center">
          {getProfileIcon(currentProfileId, 18)}
        </div>
        <div>
          <span className="text-xs font-bold text-charcoal-900 dark:text-slate-100 block">{profile?.name}</span>
          <span className="text-[9px] font-bold text-charcoal-400 dark:text-charcoal-500 block uppercase tracking-widest mt-0.5">Active Persona</span>
        </div>
      </div>
    </aside>
  );
}
