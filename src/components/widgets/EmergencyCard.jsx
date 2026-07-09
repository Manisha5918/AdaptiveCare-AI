import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, Phone, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmergencyCard() {
  const { getActiveProfile, setEmergencyActive, emergencyActive, addNotification } = useApp();
  const profile = getActiveProfile();
  const contacts = profile?.emergencyContacts || [];

  const handleSOS = () => {
    setEmergencyActive(true);
    addNotification('SOS EMERGENCY INITIATED', 'All designated safety contacts have been notified of your location.', 'danger');
  };

  const handleDial = (name, phone) => {
    addNotification('Dialing Contact', `Simulating direct phone line connection to ${name} (${phone})...`, 'info');
  };

  return (
    <GlassCard className={`h-full border-2 ${
      emergencyActive 
        ? 'border-rose-500 bg-rose-500/10 dark:bg-rose-950/20' 
        : 'border-rose-500/40 bg-rose-500/5 dark:bg-rose-950/5'
    } flex flex-col justify-between`}>
      <div>
        <div className="flex items-center gap-2 mb-3 text-rose-500 dark:text-rose-400">
          <ShieldAlert size={22} className="animate-bounce" />
          <h3 className="text-lg font-bold">Emergency & Safety Hub</h3>
        </div>

        <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mb-4 font-medium leading-relaxed">
          Need immediate support? Pressing the SOS button broadcasts your real-time medical profile and coordinates to dispatchers and family.
        </p>

        {/* Contacts section */}
        {contacts.length > 0 && (
          <div className="space-y-2 mb-4">
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block mb-1">
              Primary Contacts
            </span>
            {contacts.map((con) => (
              <div 
                key={con.id}
                className="flex items-center justify-between p-2.5 rounded-[14px] bg-white/40 dark:bg-charcoal-900/40 border border-rose-500/10 hover:border-rose-500/30 transition-colors"
              >
                <div>
                  <h4 className="text-xs font-bold text-charcoal-900 dark:text-slate-100">{con.name}</h4>
                  <p className="text-[10px] text-charcoal-500 dark:text-charcoal-400 font-semibold">{con.relation}</p>
                </div>
                <button
                  onClick={() => handleDial(con.name, con.phone)}
                  className="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-xl active:scale-95 transition-all"
                >
                  <Phone size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-rose-500/10 mt-auto">
        {emergencyActive ? (
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-bold bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-[14px] mb-2"
          >
            <AlertTriangle size={16} className="animate-spin" />
            <span>Broadcasting coordinates & patient file...</span>
          </motion.div>
        ) : null}
        
        <button
          onClick={handleSOS}
          className="w-full bg-rose-600 hover:bg-rose-700 active:scale-95 text-white py-3 rounded-[16px] text-sm font-black flex items-center justify-center gap-2.5 shadow-md shadow-rose-900/20 hover:shadow-lg transition-all"
        >
          <ShieldAlert size={16} /> TRIGGER EMERGENCY SOS
        </button>
      </div>
    </GlassCard>
  );
}
