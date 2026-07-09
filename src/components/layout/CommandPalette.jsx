import { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Command, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandPalette({ isOpen, onClose, onOpenSettings }) {
  const { 
    setCurrentProfileId, 
    darkMode, 
    setDarkMode, 
    processAICommand,
    getActiveProfile 
  } = useApp();

  const activeProfile = getActiveProfile();
  const accent = activeProfile?.theme?.accent || '#3b82f6';

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Core actions available in the command palette
  const allActions = [
    { id: 'switch-senior', title: 'Switch to Senior Citizen mode', subtitle: 'Enlarged targets and emergency cards', category: 'Profiles', shortcut: 'S', action: () => setCurrentProfileId('senior') },
    { id: 'switch-diabetic', title: 'Switch to Diabetic Patient mode', subtitle: 'Area charts and insulin metrics', category: 'Profiles', shortcut: 'D', action: () => setCurrentProfileId('diabetic') },
    { id: 'switch-fitness', title: 'Switch to Fitness Enthusiast mode', subtitle: 'High density calorie rings and cardio zones', category: 'Profiles', shortcut: 'F', action: () => setCurrentProfileId('fitness') },
    { id: 'switch-caregiver', title: 'Switch to Family Caregiver mode', subtitle: 'Patient monitoring and calendar logs', category: 'Profiles', shortcut: 'C', action: () => setCurrentProfileId('caregiver') },
    
    { id: 'toggle-theme', title: 'Toggle Light / Dark mode', subtitle: `Inverts system themes (Currently: ${darkMode ? 'Dark' : 'Light'})`, category: 'Appearance', shortcut: 'T', action: () => setDarkMode(!darkMode) },
    { id: 'open-settings', title: 'Open Dashboard Settings', subtitle: 'Customize active widget nodes', category: 'System', shortcut: ',', action: () => { onClose(); onOpenSettings(); } },
    
    { id: 'sos-trigger', title: 'Trigger Emergency SOS Alert', subtitle: 'Simulated dispatch coordinates broadcast', category: 'Safety', shortcut: 'E', action: () => processAICommand('emergency') },
    { id: 'log-glucose-opt', title: 'Log Optimal Glucose (98 mg/dL)', subtitle: 'Sync standard vitals test value', category: 'Vitals Log', shortcut: 'G', action: () => processAICommand('log glucose 98') },
    { id: 'log-glucose-high', title: 'Log High Glucose (155 mg/dL)', subtitle: 'Sync high vital test value', category: 'Vitals Log', shortcut: 'H', action: () => processAICommand('log glucose 155') }
  ];

  // Filter actions based on search query
  const filteredActions = allActions.filter(action =>
    action.title.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  );

  // Auto-focus input when menu launches
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Handle arrow key and enter keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredActions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredActions, onClose]);

  // Keep selected item visible in list
  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      const selectedElement = listElement.childNodes[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50"
          />

          {/* Centered Command Menu Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 240 }}
            className="fixed left-1/2 top-[15%] -translate-x-1/2 w-full max-w-[560px] p-0 overflow-hidden glass-panel border border-slate-200 dark:border-charcoal-800 shadow-2xl rounded-[24px] z-50 flex flex-col h-[400px] text-charcoal-900 dark:text-slate-100"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4.5 py-4 border-b border-slate-200 dark:border-charcoal-800 bg-white/20 dark:bg-charcoal-950/20">
              <Command size={18} className="text-charcoal-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type command search or shortcut..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="flex-1 text-sm bg-transparent border-none outline-none text-charcoal-950 dark:text-slate-100 placeholder-charcoal-400"
              />
              <span className="text-[10px] font-bold text-charcoal-400 border border-slate-200 dark:border-charcoal-800 px-1.5 py-0.5 rounded-md">ESC</span>
            </div>

            {/* Actions List Grid */}
            <div 
              ref={listRef}
              className="flex-1 overflow-y-auto p-2.5 space-y-1.5"
            >
              {filteredActions.length === 0 ? (
                <div className="py-12 text-center text-charcoal-400 flex flex-col items-center justify-center gap-2">
                  <Search size={24} className="text-slate-300 dark:text-charcoal-800" />
                  <p className="text-sm font-semibold">No commands found for "{query}"</p>
                </div>
              ) : (
                filteredActions.map((act, idx) => {
                  const active = idx === selectedIndex;
                  return (
                    <div
                      key={act.id}
                      onClick={() => {
                        act.action();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-[16px] cursor-pointer transition-all ${
                        active
                          ? 'bg-slate-100 dark:bg-charcoal-900 border-l-[3.5px]'
                          : 'bg-transparent border-l-[3.5px] border-transparent'
                      }`}
                      style={{ borderLeftColor: active ? accent : 'transparent' }}
                    >
                      <div className="flex flex-col">
                        <span className={`text-xs font-black transition-colors ${
                          active ? 'text-charcoal-950 dark:text-white' : 'text-charcoal-800 dark:text-slate-200'
                        }`}>
                          {act.title}
                        </span>
                        <span className="text-[10px] text-charcoal-450 dark:text-charcoal-550 mt-0.5 leading-none">
                          {act.subtitle}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-charcoal-400 bg-slate-200/50 dark:bg-charcoal-800 px-1.5 py-0.5 rounded">
                          {act.category}
                        </span>
                        {active && (
                          <CornerDownLeft size={10} className="text-charcoal-400" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Status bar */}
            <div className="px-4 py-2.5 border-t border-slate-200 dark:border-charcoal-800 bg-slate-50/50 dark:bg-charcoal-900/50 text-[10px] font-semibold text-charcoal-400 flex items-center justify-between">
              <span>Use ↑↓ arrow keys to navigate, enter to select</span>
              <span className="flex items-center gap-1">
                <Command size={10} /> + K to search
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
