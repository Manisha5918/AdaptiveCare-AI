import React, { createContext, useContext, useState, useEffect } from 'react';
import profilesConfig from '../data/profiles.json';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentProfileId, setCurrentProfileId] = useState('senior');
  const [profileData, setProfileData] = useState(profilesConfig);
  const [density, setDensity] = useState('balanced');
  const [fontScale, setFontScale] = useState('medium');
  const [darkMode, setDarkMode] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);
  
  // Onboarding data validated by Zod
  const [onboardingData, setOnboardingData] = useState({
    name: 'Eleanor Vance',
    age: 68,
    weight: 64,
    bloodType: 'A+'
  });

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'MorphUI OS Booted', message: 'Personalized adaptive canvas ready.', time: 'Just now', type: 'info', read: false },
    { id: 2, title: 'Health Index: Good Balance', message: 'Compliance metrics are above average today.', time: '12 mins ago', type: 'success', read: false }
  ]);

  // Widget visibility toggling list
  const [visibleWidgets, setVisibleWidgets] = useState([]);

  // Mock database history arrays for Recharts
  const [vitalsHistory, setVitalsHistory] = useState({
    glucose: [
      { name: 'Mon', level: 128, min: 80, max: 130 },
      { name: 'Tue', level: 142, min: 80, max: 130 },
      { name: 'Wed', level: 115, min: 80, max: 130 },
      { name: 'Thu', level: 95,  min: 80, max: 130 },
      { name: 'Fri', level: 102, min: 80, max: 130 },
      { name: 'Sat', level: 120, min: 80, max: 130 },
      { name: 'Sun', level: 108, min: 80, max: 130 }
    ],
    heartRate: [
      { name: '08:00', bpm: 62, resting: 58, threshold: 120 },
      { name: '10:00', bpm: 68, resting: 58, threshold: 120 },
      { name: '12:00', bpm: 75, resting: 58, threshold: 120 },
      { name: '14:00', bpm: 125, resting: 58, threshold: 120 }, // workout simulation peak
      { name: '16:00', bpm: 95, resting: 58, threshold: 120 },
      { name: '18:00', bpm: 72, resting: 58, threshold: 120 }
    ],
    calories: [
      { name: 'Mon', burned: 510, consumed: 1750 },
      { name: 'Tue', burned: 640, consumed: 1980 },
      { name: 'Wed', burned: 420, consumed: 1650 },
      { name: 'Thu', burned: 810, consumed: 2150 },
      { name: 'Fri', burned: 690, consumed: 1850 },
      { name: 'Sat', burned: 580, consumed: 1920 },
      { name: 'Sun', burned: 620, consumed: 1850 }
    ]
  });

  // Sync widgets when profile changes
  useEffect(() => {
    const profile = profileData[currentProfileId];
    if (profile) {
      setDensity(profile.theme.density);
      setFontScale(profile.theme.fontScale);
      
      // Auto-show all default widgets for profile
      setVisibleWidgets(profile.widgets.map(w => w.id));

      const freshNotifs = [
        {
          id: Date.now(),
          title: `Canvas Adapted to ${profile.name}`,
          message: `Grid restructured to "${profile.theme.density}" style and layout colorways synchronized.`,
          time: 'Just now',
          type: 'success',
          read: false
        }
      ];
      setNotifications(prev => [freshNotifs[0], ...prev.slice(0, 8)]);
    }
  }, [currentProfileId]);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle visible widgets dynamically (via Settings Drawer)
  const toggleWidgetVisibility = (widgetId) => {
    setVisibleWidgets(prev => 
      prev.includes(widgetId)
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  // Toggle Medications
  const toggleMedication = (profileId, medId) => {
    setProfileData(prev => {
      const updated = { ...prev };
      const meds = updated[profileId].medications || [];
      updated[profileId].medications = meds.map(m =>
        m.id === medId ? { ...m, taken: !m.taken } : m
      );

      const total = updated[profileId].medications.length;
      const taken = updated[profileId].medications.filter(m => m.taken).length;
      const progress = Math.round((taken / total) * 15);
      updated[profileId].healthScore = Math.min(100, Math.max(70, 85 + progress));
      return updated;
    });

    const medName = profileData[profileId].medications.find(m => m.id === medId)?.name;
    const isTaken = !profileData[profileId].medications.find(m => m.id === medId)?.taken;
    addNotification(
      isTaken ? 'Medication Logged' : 'Schedule Revoked',
      `Pill intake logged: ${medName}.`,
      isTaken ? 'success' : 'info'
    );
  };

  // Toggle Meals
  const toggleMeal = (mealId) => {
    setProfileData(prev => {
      const updated = { ...prev };
      updated.diabetic.meals = updated.diabetic.meals.map(m =>
        m.id === mealId ? { ...m, logged: !m.logged } : m
      );
      return updated;
    });
  };

  // Log Glucose reading
  const addGlucoseReading = (value) => {
    const valNum = Number(value);
    if (isNaN(valNum) || valNum <= 0) return;

    setProfileData(prev => {
      const updated = { ...prev };
      const prevHist = updated.diabetic.glucoseData.history;
      updated.diabetic.glucoseData = {
        current: valNum,
        unit: 'mg/dL',
        status: valNum > 140 ? 'high' : valNum < 70 ? 'low' : 'in-range',
        history: [...prevHist.slice(1), valNum]
      };
      updated.diabetic.healthScore = valNum > 140 || valNum < 70 ? 82 : 95;
      return updated;
    });

    // Also push to Recharts telemetry
    setVitalsHistory(prev => {
      const currentList = prev.glucose;
      const updatedList = [...currentList.slice(1), { name: 'New', level: valNum, min: 80, max: 130 }];
      return { ...prev, glucose: updatedList };
    });

    addNotification(
      'Vitals Synced',
      `Logged blood sugar: ${valNum} mg/dL. Status: ${valNum > 140 ? 'High Range' : valNum < 70 ? 'Low Range' : 'Optimal'}`,
      valNum > 140 || valNum < 70 ? 'warning' : 'success'
    );
  };

  // Calorie Burn & Water Logs
  const logWaterCup = () => {
    setProfileData(prev => {
      const updated = { ...prev };
      const current = updated.fitness.calories.water;
      const target = updated.fitness.calories.targetWater;
      updated.fitness.calories.water = Math.min(target + 3, current + 1);
      return updated;
    });
    addNotification('Hydration Added', 'Synced 1 cup of water.', 'success');
  };

  const addBurnedCalories = (amount) => {
    setProfileData(prev => {
      const updated = { ...prev };
      const current = updated.fitness.calories.burned;
      const target = updated.fitness.calories.targetBurned;
      updated.fitness.calories.burned = Math.min(target + 200, current + amount);
      return updated;
    });
  };

  // Notification center utils
  const addNotification = (title, message, type = 'info') => {
    setNotifications(prev => [
      { id: Date.now(), title, message, time: 'Just now', type, read: false },
      ...prev.slice(0, 10)
    ]);
  };

  const clearNotifications = () => setNotifications([]);
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  // simulated natural language copilot logic
  const processAICommand = (prompt) => {
    const p = prompt.toLowerCase();
    
    if (p.includes('senior') || p.includes('elderly') || p.includes('grandma') || p.includes('grandpa')) {
      setCurrentProfileId('senior');
      return 'Restructuring canvas parameters for Senior Citizen mode. Enlarging action buttons, optimizing color contrast, and pinning emergency contacts.';
    }
    if (p.includes('diabetic') || p.includes('sugar') || p.includes('insulin')) {
      setCurrentProfileId('diabetic');
      return 'Activating Diabetic workspace layout. Loading glucose range analytics, custom Recharts area graphs, and glycemic carb checklist.';
    }
    if (p.includes('fitness') || p.includes('workout') || p.includes('gym') || p.includes('sport')) {
      setCurrentProfileId('fitness');
      return 'Assembling athletic dashboard. Displaying high-density calorie rings, active cardiac zone bars, and hydration telemetry.';
    }
    if (p.includes('caregiver') || p.includes('family') || p.includes('mom') || p.includes('dad')) {
      setCurrentProfileId('caregiver');
      return 'Opening Caregiver supervision portal. Rendering patient overview monitors, calendar schedules, and SOS alerts dispatch.';
    }

    // layout density
    if (p.includes('simple') || p.includes('clean') || p.includes('minimal')) {
      setDensity('simple');
      return 'Layout streamlined: packing density modified to Simple.';
    }
    if (p.includes('balanced') || p.includes('normal') || p.includes('standard')) {
      setDensity('balanced');
      return 'Restored default: layout density modified to Balanced.';
    }
    if (p.includes('detailed') || p.includes('hud') || p.includes('dense') || p.includes('everything')) {
      setDensity('detailed');
      return 'Maximizing canvas detail: packing density modified to Detailed.';
    }

    // Font scales
    if (p.includes('large text') || p.includes('bigger buttons') || p.includes('make text bigger') || p.includes('large font')) {
      setFontScale('large');
      return 'Accessibility layout synced: font scales increased to Large.';
    }
    if (p.includes('huge text') || p.includes('giant text') || p.includes('accessibility text') || p.includes('extra large font')) {
      setFontScale('extra-large');
      return 'Accessibility layout synced: font scales maximized to Extra Large.';
    }
    if (p.includes('medium font') || p.includes('normal text') || p.includes('reset text')) {
      setFontScale('medium');
      return 'Accessibility scale restored to Standard.';
    }

    // Toggle dark/light theme
    if (p.includes('dark mode') || p.includes('night mode') || p.includes('dark theme')) {
      setDarkMode(true);
      return 'System colors inverted to dark theme.';
    }
    if (p.includes('light mode') || p.includes('day mode') || p.includes('light theme')) {
      setDarkMode(false);
      return 'System colors inverted to light theme.';
    }

    // Vitals logger
    if (p.includes('log glucose') || p.includes('blood sugar')) {
      const match = p.match(/\d+/);
      if (match) {
        const val = Number(match[0]);
        addGlucoseReading(val);
        return `Reading of ${val} mg/dL successfully logged to glucose dataset.`;
      }
      addGlucoseReading(112);
      return 'Logged standard glucose level: 112 mg/dL.';
    }

    if (p.includes('emergency') || p.includes('sos') || p.includes('panic')) {
      setEmergencyActive(true);
      return 'DANGER: Emergency medical alert triggered. Dispatching telemetry to safety grids.';
    }

    if (p.includes('safe') || p.includes('cancel emergency') || p.includes('clear emergency')) {
      setEmergencyActive(false);
      return 'Emergency state canceled. All responder grids notified of safety status.';
    }

    return "Instruction processed. Grid parameters aligned to adapt to your request.";
  };

  const getActiveProfile = () => profileData[currentProfileId];

  return (
    <AppContext.Provider value={{
      currentProfileId,
      setCurrentProfileId,
      profileData,
      setProfileData,
      density,
      setDensity,
      fontScale,
      setFontScale,
      darkMode,
      setDarkMode,
      isOnboarded,
      setIsOnboarded,
      emergencyActive,
      setEmergencyActive,
      onboardingData,
      setOnboardingData,
      notifications,
      visibleWidgets,
      setVisibleWidgets,
      toggleWidgetVisibility,
      vitalsHistory,
      setVitalsHistory,
      toggleMedication,
      toggleMeal,
      addGlucoseReading,
      logWaterCup,
      addBurnedCalories,
      addNotification,
      clearNotifications,
      markAllRead,
      processAICommand,
      getActiveProfile
    }}>
      {children}
    </AppContext.Provider>
  );
};
