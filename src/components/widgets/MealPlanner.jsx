
import { GlassCard } from '../common/GlassCard';
import { useApp } from '../../context/AppContext';
import { ChefHat, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MealPlanner() {
  const { getActiveProfile, toggleMeal } = useApp();
  const profile = getActiveProfile();
  const meals = profile?.meals || [];

  if (meals.length === 0) return null;

  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ChefHat className="text-amber-500 animate-bounce" size={20} />
          <h3 className="text-lg font-bold text-charcoal-900 dark:text-slate-100">Glycemic Meal Planner</h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-amber-100/50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400">
          Carbs Controlled
        </span>
      </div>

      <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
        <AnimatePresence initial={false}>
          {meals.map((meal) => (
            <motion.div
              key={meal.id}
              layoutId={`meal-card-${meal.id}`}
              onClick={() => toggleMeal(meal.id)}
              whileHover={{ x: 2 }}
              className={`flex items-center justify-between p-3.5 rounded-[18px] cursor-pointer border transition-colors duration-250 ${
                meal.logged
                  ? 'bg-amber-500/5 border-amber-500/20 dark:bg-amber-950/10 dark:border-amber-900/30'
                  : 'bg-white/40 dark:bg-charcoal-900/40 border-slate-200/60 dark:border-charcoal-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {meal.logged ? (
                    <motion.div
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white"
                    >
                      <Check size={12} strokeWidth={3} />
                    </motion.div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-charcoal-700" />
                  )}
                </div>
                <div>
                  <h4 className={`text-sm font-semibold leading-tight ${
                    meal.logged ? 'text-charcoal-400 dark:text-charcoal-600 line-through' : 'text-charcoal-900 dark:text-slate-100'
                  }`}>
                    {meal.type}
                  </h4>
                  <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-0.5 max-w-[180px] truncate sm:max-w-none">
                    {meal.food}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  {meal.carbs} Carbs
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}
