import { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';
import { ClipboardList, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UpcomingTasks() {
  const { currentProfileId, addNotification } = useApp();
  
  // Custom checklist state depending on profile
  const [tasks, setTasks] = useState([]);

  const getProfileTasks = (profId) => {
    switch (profId) {
      case 'senior':
        return [
          { id: 't-1', text: '15-min light stretch in garden', completed: false },
          { id: 't-2', text: 'Check hearing aid battery levels', completed: true },
          { id: 't-3', text: 'Call daughter (Sarah) check-in', completed: false }
        ];
      case 'diabetic':
        return [
          { id: 't-1', text: 'Check skin and feet for scratches', completed: true },
          { id: 't-2', text: 'Prepare high-protein afternoon snack', completed: false },
          { id: 't-3', text: 'Pre-dinner insulin check-in', completed: false }
        ];
      case 'fitness':
        return [
          { id: 't-1', text: 'High Intensity Interval Training (HIIT)', completed: false },
          { id: 't-2', text: 'Stretch hamstrings and back', completed: true },
          { id: 't-3', text: 'Log macro balance in health app', completed: false }
        ];
      case 'caregiver':
        return [
          { id: 't-1', text: 'Verify Evelyn took blood pressure medication', completed: false },
          { id: 't-2', text: 'Review Tommy\'s glucose reading reports', completed: true },
          { id: 't-3', text: 'Call pharmacy for medication refills', completed: false }
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTasks(getProfileTasks(currentProfileId));
  }, [currentProfileId]);

  const toggleTask = (id) => {
    setTasks(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
      const isNowCompleted = updated.find(t => t.id === id)?.completed;
      const taskText = updated.find(t => t.id === id)?.text;
      
      addNotification(
        isNowCompleted ? 'Task Completed' : 'Task Incomplete',
        `"${taskText}" marked as ${isNowCompleted ? 'complete' : 'incomplete'}.`,
        isNowCompleted ? 'success' : 'info'
      );
      
      return updated;
    });
  };

  return (
    <GlassCard className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="text-teal-500 animate-soft-pulse" size={20} />
            <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Tasks Checklist</h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100/50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded">
            To-Do
          </span>
        </div>

        <div className="space-y-2.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`flex items-center gap-3 p-3 rounded-[16px] cursor-pointer border transition-all ${
                task.completed
                  ? 'bg-teal-500/5 border-teal-500/10 dark:bg-teal-950/10 dark:border-teal-900/20'
                  : 'bg-white/40 dark:bg-charcoal-900/40 border-slate-200/60 dark:border-charcoal-800'
              }`}
            >
              <div className="flex-shrink-0">
                {task.completed ? (
                  <motion.div
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center text-white"
                  >
                    <Check size={12} strokeWidth={3} />
                  </motion.div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-charcoal-700" />
                )}
              </div>
              <span className={`text-xs font-semibold leading-snug transition-colors ${
                task.completed ? 'text-charcoal-400 dark:text-charcoal-600 line-through' : 'text-charcoal-900 dark:text-slate-100'
              }`}>
                {task.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
