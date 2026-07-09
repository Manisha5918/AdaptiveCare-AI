import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Moon, Sun, Command, Sliders } from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import { getProfileIcon } from '../../utils/icons';


export default function Header({ onOpenSettings, onOpenCommandPalette }) {
  const { 
    currentProfileId, 
    setCurrentProfileId, 
    profileData, 
    darkMode, 
    setDarkMode, 
    notifications
  } = useApp();

  const [notifOpen, setNotifOpen] = useState(false);

  const activeProfile = profileData[currentProfileId];
  const accent = activeProfile?.theme?.accent || '#3b82f6';
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const profileOptions = [
    { id: 'senior', name: 'Senior' },
    { id: 'diabetic', name: 'Diabetic' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'caregiver', name: 'Caregiver' }
  ];

  return (
    <>
      <header className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-6 border-b border-slate-200 dark:border-charcoal-800 bg-white/45 dark:bg-charcoal-900/35 backdrop-blur-md z-30 transition-all duration-300">
        
        {/* Left Section: Welcome Info */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-100 dark:bg-charcoal-900/50 rounded-2xl flex items-center justify-center border border-slate-200/40 dark:border-charcoal-800/40">
            {getProfileIcon(currentProfileId, 22)}
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-charcoal-900 dark:text-slate-100 flex items-center gap-2">
              Hello, User 
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-charcoal-900 text-charcoal-500 border border-slate-200/55 dark:border-charcoal-800">
                {activeProfile?.name} Mode
              </span>
            </h1>
            <p className="text-[11px] font-semibold text-charcoal-455 dark:text-charcoal-500 mt-0.5">
              Interface customized for: {activeProfile?.role}
            </p>
          </div>
        </div>

        {/* Middle Section: Profile Swapper */}
        <div className="bg-slate-100/80 dark:bg-charcoal-950/80 p-1.5 rounded-[18px] flex items-center gap-1 overflow-x-auto self-start md:self-center max-w-full border border-slate-200/40 dark:border-charcoal-850">
          {profileOptions.map(opt => {
            const isSelected = opt.id === currentProfileId;
            return (
              <button
                key={opt.id}
                onClick={() => setCurrentProfileId(opt.id)}
                className={`relative px-4 py-1.5 rounded-[12px] text-xs font-bold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isSelected 
                    ? 'text-white shadow-sm shadow-black/10' 
                    : 'text-charcoal-555 dark:text-charcoal-400 hover:text-charcoal-900 dark:hover:text-slate-100'
                }`}
                style={{ backgroundColor: isSelected ? accent : 'transparent' }}
              >
                <span>{getProfileIcon(opt.id, 12, isSelected ? 'text-white' : '')}</span>
                <span>{opt.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right Section: Core Utility Actions */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Ctrl+K Search button */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-charcoal-950 text-charcoal-400 dark:text-charcoal-500 rounded-xl hover:bg-slate-200 dark:hover:bg-charcoal-900 border border-slate-200/50 dark:border-charcoal-800 transition-colors text-xs font-bold cursor-pointer"
          >
            <Command size={12} />
            <span>Search</span>
            <span className="text-[9px] bg-slate-200 dark:bg-charcoal-850 px-1 rounded">⌘K</span>
          </button>

          {/* Settings Drawer Button */}
          <button
            onClick={onOpenSettings}
            className="p-2.5 bg-slate-100 dark:bg-charcoal-950 hover:bg-slate-200 dark:hover:bg-charcoal-900 text-charcoal-500 dark:text-charcoal-400 rounded-xl transition-all border border-slate-200/50 dark:border-charcoal-800 cursor-pointer"
          >
            <Sliders size={16} />
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 bg-slate-100 dark:bg-charcoal-950 hover:bg-slate-200 dark:hover:bg-charcoal-900 text-charcoal-500 dark:text-charcoal-400 rounded-xl transition-all border border-slate-200/50 dark:border-charcoal-800 cursor-pointer"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Bell Icon & Notification Trigger */}
          <button
            onClick={() => setNotifOpen(true)}
            className="p-2.5 bg-slate-100 dark:bg-charcoal-950 hover:bg-slate-200 dark:hover:bg-charcoal-900 text-charcoal-500 dark:text-charcoal-400 rounded-xl transition-all relative border border-slate-200/50 dark:border-charcoal-800 cursor-pointer"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white dark:border-charcoal-900 flex items-center justify-center text-[8px] font-black text-white">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Slide-out notification drawer */}
      <NotificationCenter isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
}
