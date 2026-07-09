import { 
  UserRound, HeartPulse, Zap, ShieldCheck, 
  Pill, Activity, Flame, Calendar,
  Layout, Grid, Cpu
} from 'lucide-react';

// Maps profile personas to Lucide Icons
export const getProfileIcon = (profileId, size = 18, className = '') => {
  switch (profileId) {
    case 'senior':
      return <UserRound size={size} className={`text-rose-500 ${className}`} />;
    case 'diabetic':
      return <HeartPulse size={size} className={`text-sky-500 ${className}`} />;
    case 'fitness':
      return <Zap size={size} className={`text-emerald-500 ${className}`} />;
    case 'caregiver':
      return <ShieldCheck size={size} className={`text-purple-500 ${className}`} />;
    default:
      return <UserRound size={size} className={className} />;
  }
};

// Maps onboarding choice goals to Lucide Icons
export const getGoalIcon = (goalId, size = 18, className = '') => {
  switch (goalId) {
    case 'meds':
      return <Pill size={size} className={`text-rose-500 ${className}`} />;
    case 'vitals':
      return <Activity size={size} className={`text-sky-500 ${className}`} />;
    case 'activity':
      return <Flame size={size} className={`text-emerald-500 ${className}`} />;
    case 'visits':
      return <Calendar size={size} className={`text-purple-500 ${className}`} />;
    default:
      return <Activity size={size} className={className} />;
  }
};

// Maps density choice options to Lucide Icons
export const getDensityIcon = (densityId, size = 18, className = '') => {
  switch (densityId) {
    case 'simple':
      return <Layout size={size} className={className} />;
    case 'balanced':
      return <Grid size={size} className={className} />;
    case 'detailed':
      return <Cpu size={size} className={className} />;
    default:
      return <Grid size={size} className={className} />;
  }
};
