
import { useApp } from '../../context/AppContext';
import { X, CheckCheck, Trash2, BellRing, Info, AlertTriangle, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationCenter({ isOpen, onClose }) {
  const { notifications, clearNotifications, markAllRead, getActiveProfile } = useApp();
  const profile = getActiveProfile();
  const accent = profile?.theme?.accent || '#3b82f6';

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCheck className="text-emerald-500" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-amber-500" size={16} />;
      case 'danger':
        return <ShieldAlert className="text-rose-500" size={16} />;
      default:
        return <Info className="text-sky-500" size={16} />;
    }
  };

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

          {/* Slide-out drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[380px] bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-2xl border-l border-slate-200 dark:border-charcoal-800 shadow-2xl p-6 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-charcoal-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <BellRing style={{ color: accent }} size={20} />
                <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Notifications</h3>
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="text-[10px] bg-rose-500 text-white font-extrabold px-1.5 py-0.5 rounded-full">
                    {notifications.filter(n => !n.read).length} new
                  </span>
                )}
              </div>
              <button 
                onClick={onClose}
                className="text-charcoal-400 hover:text-charcoal-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-charcoal-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Actions */}
            {notifications.length > 0 && (
              <div className="flex gap-2 justify-end mb-4">
                <button
                  onClick={markAllRead}
                  className="text-[10px] font-bold text-charcoal-500 dark:text-charcoal-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 bg-slate-100 dark:bg-charcoal-800 py-1 px-2.5 rounded-md transition-all"
                >
                  <CheckCheck size={10} /> Mark all read
                </button>
                <button
                  onClick={clearNotifications}
                  className="text-[10px] font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 bg-rose-500/5 py-1 px-2.5 rounded-md transition-all"
                >
                  <Trash2 size={10} /> Clear
                </button>
              </div>
            )}

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {notifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-charcoal-400">
                  <BellRing size={32} className="text-slate-300 dark:text-charcoal-800 mb-2" />
                  <p className="text-sm font-medium">All caught up!</p>
                  <p className="text-xs text-charcoal-500 mt-0.5">No alerts or logs pending inspection.</p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {notifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`p-3.5 rounded-[18px] border flex gap-3 transition-colors ${
                        notif.read 
                          ? 'bg-slate-50/50 dark:bg-charcoal-900/20 border-slate-100 dark:border-charcoal-800/40' 
                          : 'bg-white border-slate-200 dark:bg-charcoal-900 dark:border-charcoal-800 shadow-sm'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className={`text-xs font-bold leading-tight ${
                            notif.read ? 'text-charcoal-400 dark:text-charcoal-500' : 'text-charcoal-900 dark:text-slate-100'
                          }`}>
                            {notif.title}
                          </h4>
                          <span className="text-[9px] font-semibold text-charcoal-400 dark:text-charcoal-500 whitespace-nowrap">
                            {notif.time}
                          </span>
                        </div>
                        <p className={`text-[11px] mt-1 leading-relaxed ${
                          notif.read ? 'text-charcoal-500 dark:text-charcoal-500' : 'text-charcoal-600 dark:text-charcoal-300'
                        }`}>
                          {notif.message}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
