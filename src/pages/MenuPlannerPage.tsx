import { useState } from 'react';
import { recipes } from '../data/mockData';
import { Plus, X, ShoppingCart } from 'lucide-react';
import { Recipe, ShoppingListItem } from '../types';

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const;
const mealLabels: Record<string, string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
  snack: 'Перекус',
};

interface DayPlan {
  [key: string]: Recipe | null;
}

export default function MenuPlannerPage() {
  const [weekPlan, setWeekPlan] = useState<Record<string, DayPlan>>(
    Object.fromEntries(days.map((day) => [day, { breakfast: null, lunch: null, dinner: null, snack: null }]))
  );
  const [showRecipePicker, setShowRecipePicker] = useState<{ day: string; meal: string } | null>(null);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);

  const assignRecipe = (day: string, meal: string, recipe: Recipe) => {
    setWeekPlan((prev) => ({ ...prev, [day]: { ...prev[day], [meal]: recipe } }));
    setShowRecipePicker(null);
  };

  const removeRecipe = (day: string, meal: string) => {
    setWeekPlan((prev) => ({ ...prev, [day]: { ...prev[day], [meal]: null } }));
  };

  const generateShoppingList = () => {
    const items: ShoppingListItem[] = [];
    Object.values(weekPlan).forEach((dayPlan) => {
      Object.values(dayPlan).forEach((recipe) => {
        if (recipe) {
          recipe.ingredients.forEach((ing) => {
            const existing = items.find((item) => item.name === ing.name);
            if (existing) {
              existing.amount = `${parseFloat(existing.amount) + parseFloat(ing.amount)} ${ing.unit}`;
            } else {
              items.push({ id: Math.random().toString(36).substr(2, 9), name: ing.name, amount: ing.amount, unit: ing.unit, checked: false, recipeId: recipe.id });
            }
          });
        }
      });
    });
    setShoppingList(items);
    setShowShoppingList(true);
  };

  const toggleItem = (id: string) => {
    setShoppingList((prev) => prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const totalMeals = Object.values(weekPlan).reduce((acc, day) => acc + Object.values(day).filter(Boolean).length, 0);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#6A795D]" style={{ fontFamily: 'Playfair Display, serif' }}>Планировщик меню</h1>
          <p className="text-[#8E9162] mt-1" style={{ fontFamily: 'Old Standard TT, serif' }}>Спланируйте питание на неделю — {totalMeals} блюд запланировано</p>
        </div>
        <button onClick={generateShoppingList} className="flex items-center gap-2 px-4 py-2 bg-[#D4764E] text-white rounded-xl font-medium text-sm hover:bg-[#B85A35] transition-colors shadow-sm" style={{ fontFamily: 'Old Standard TT, serif' }}>
          <ShoppingCart size={16} />
          Список покупок
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#D9D28B]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-[#D9D28B]/15 border-b border-[#D9D28B]/20">
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#6A795D] w-28" style={{ fontFamily: 'Playfair Display, serif' }}>День</th>
                {mealTypes.map((meal) => (
                  <th key={meal} className="px-4 py-3 text-left text-sm font-semibold text-[#6A795D]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {mealLabels[meal]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day} className="border-b border-[#D9D28B]/10 hover:bg-[#D9D28B]/5">
                  <td className="px-4 py-3">
                    <span className="font-medium text-[#3A3A2A] text-sm" style={{ fontFamily: 'Old Standard TT, serif' }}>{day}</span>
                  </td>
                  {mealTypes.map((meal) => {
                    const recipe = weekPlan[day]?.[meal];
                    return (
                      <td key={meal} className="px-4 py-3">
                        {recipe ? (
                          <div className="flex items-center gap-2 bg-[#B2BD7E]/15 rounded-lg px-3 py-2 group border border-[#B2BD7E]/20">
                            <img src={recipe.image} alt={recipe.title} className="w-8 h-8 rounded-md object-cover" />
                            <span className="text-sm font-medium text-[#6A795D] truncate flex-1" style={{ fontFamily: 'Old Standard TT, serif' }}>{recipe.title}</span>
                            <button onClick={() => removeRecipe(day, meal)} className="opacity-0 group-hover:opacity-100 p-1 text-[#8E9162] hover:text-[#6A795D] transition-all">
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setShowRecipePicker({ day, meal })} className="w-full flex items-center justify-center gap-1 py-2 border border-dashed border-[#D9D28B]/40 rounded-lg text-[#8E9162] hover:border-[#8E9162] hover:text-[#6A795D] transition-colors text-sm" style={{ fontFamily: 'Old Standard TT, serif' }}>
                            <Plus size={14} />
                            <span className="hidden sm:inline">Добавить</span>
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showRecipePicker && (
        <div className="fixed inset-0 bg-[#6A795D]/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden animate-scale-in border border-[#D9D28B]/20">
            <div className="p-6 border-b border-[#D9D28B]/20">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#6A795D]" style={{ fontFamily: 'Playfair Display, serif' }}>Выберите рецепт</h3>
                <button onClick={() => setShowRecipePicker(null)} className="p-2 hover:bg-[#D9D28B]/15 rounded-lg transition-colors">
                  <X size={18} className="text-[#8E9162]" />
                </button>
              </div>
              <p className="text-sm text-[#8E9162] mt-1" style={{ fontFamily: 'Old Standard TT, serif' }}>
                {showRecipePicker.day} — {mealLabels[showRecipePicker.meal]}
              </p>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh] space-y-2">
              {recipes.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => assignRecipe(showRecipePicker.day, showRecipePicker.meal, recipe)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#D9D28B]/15 transition-colors text-left"
                >
                  <img src={recipe.image} alt={recipe.title} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#3A3A2A] truncate" style={{ fontFamily: 'Playfair Display, serif' }}>{recipe.title}</p>
                    <p className="text-xs text-[#8E9162]" style={{ fontFamily: 'Old Standard TT, serif' }}>
                      {recipe.cookTime + recipe.prepTime} мин — {recipe.calories} ккал
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showShoppingList && (
        <div className="fixed inset-0 bg-[#6A795D]/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden animate-scale-in border border-[#D9D28B]/20">
            <div className="p-6 border-b border-[#D9D28B]/20">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#6A795D] flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <ShoppingCart size={18} className="text-[#8E9162]" />
                  Список покупок
                </h3>
                <button onClick={() => setShowShoppingList(false)} className="p-2 hover:bg-[#D9D28B]/15 rounded-lg transition-colors">
                  <X size={18} className="text-[#8E9162]" />
                </button>
              </div>
              <p className="text-sm text-[#8E9162] mt-1" style={{ fontFamily: 'Old Standard TT, serif' }}>
                {shoppingList.filter((i) => i.checked).length} из {shoppingList.length} куплено
              </p>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {shoppingList.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#D9D28B]/20 flex items-center justify-center">
                    <ShoppingCart size={20} className="text-[#8E9162]" />
                  </div>
                  <p className="text-[#8E9162]" style={{ fontFamily: 'Old Standard TT, serif' }}>Добавьте рецепты в планировщик</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {shoppingList.map((item) => (
                    <label key={item.id} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${item.checked ? 'bg-[#B2BD7E]/15' : 'hover:bg-[#D9D28B]/10'}`}>
                      <input type="checkbox" checked={item.checked} onChange={() => toggleItem(item.id)} className="w-5 h-5 rounded border-[#B2BD7E] text-[#6A795D] focus:ring-[#B2BD7E]/20" />
                      <span className={`flex-1 ${item.checked ? 'line-through text-[#8E9162]/60' : 'text-[#3A3A2A]'}`} style={{ fontFamily: 'Old Standard TT, serif' }}>
                        {item.name}
                      </span>
                      <span className="text-sm text-[#8E9162] font-medium" style={{ fontFamily: 'Old Standard TT, serif' }}>
                        {item.amount} {item.unit}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            {shoppingList.length > 0 && (
              <div className="p-4 border-t border-[#D9D28B]/20">
                <button onClick={() => setShoppingList([])} className="w-full py-2 text-sm text-[#8E9162] hover:bg-[#D9D28B]/10 rounded-xl transition-colors" style={{ fontFamily: 'Old Standard TT, serif' }}>
                  Очистить список
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
