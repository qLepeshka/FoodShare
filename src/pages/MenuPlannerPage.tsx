import { useState } from 'react';
import { recipes } from '../data/mockData';
import { ChevronLeft, ChevronRight, Plus, X, ShoppingCart, Trash2 } from 'lucide-react';
import { Recipe, ShoppingListItem } from '../types';

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const;
const mealLabels: Record<string, string> = {
  breakfast: '🌅 Завтрак',
  lunch: '☀️ Обед',
  dinner: '🌙 Ужин',
  snack: '🍪 Перекус',
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
    setWeekPlan((prev) => ({
      ...prev,
      [day]: { ...prev[day], [meal]: recipe },
    }));
    setShowRecipePicker(null);
  };

  const removeRecipe = (day: string, meal: string) => {
    setWeekPlan((prev) => ({
      ...prev,
      [day]: { ...prev[day], [meal]: null },
    }));
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
              items.push({
                id: Math.random().toString(36).substr(2, 9),
                name: ing.name,
                amount: ing.amount,
                unit: ing.unit,
                checked: false,
                recipeId: recipe.id,
              });
            }
          });
        }
      });
    });
    setShoppingList(items);
    setShowShoppingList(true);
  };

  const toggleItem = (id: string) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const totalMeals = Object.values(weekPlan).reduce(
    (acc, day) => acc + Object.values(day).filter(Boolean).length,
    0
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Планировщик меню</h1>
          <p className="text-gray-500 mt-1">Спланируйте питание на неделю • {totalMeals} блюд запланировано</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={generateShoppingList}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl font-medium text-sm hover:bg-green-600 transition-colors"
          >
            <ShoppingCart size={16} />
            Список покупок
          </button>
        </div>
      </div>

      {/* Week grid */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500 w-28">День</th>
                {mealTypes.map((meal) => (
                  <th key={meal} className="px-4 py-3 text-left text-sm font-semibold text-gray-500">
                    {mealLabels[meal]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-800 text-sm">{day}</span>
                  </td>
                  {mealTypes.map((meal) => {
                    const recipe = weekPlan[day]?.[meal];
                    return (
                      <td key={meal} className="px-4 py-3">
                        {recipe ? (
                          <div className="flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2 group">
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              className="w-8 h-8 rounded-md object-cover"
                            />
                            <span className="text-sm font-medium text-gray-700 truncate flex-1">
                              {recipe.title}
                            </span>
                            <button
                              onClick={() => removeRecipe(day, meal)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowRecipePicker({ day, meal })}
                            className="w-full flex items-center justify-center gap-1 py-2 border border-dashed border-gray-200 rounded-lg text-gray-400 hover:border-orange-300 hover:text-orange-500 transition-colors text-sm"
                          >
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

      {/* Recipe picker modal */}
      {showRecipePicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Выберите рецепт</h3>
                <button
                  onClick={() => setShowRecipePicker(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {showRecipePicker.day} — {mealLabels[showRecipePicker.meal]}
              </p>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh] space-y-2">
              {recipes.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => assignRecipe(showRecipePicker.day, showRecipePicker.meal, recipe)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 transition-colors text-left"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{recipe.title}</p>
                    <p className="text-xs text-gray-500">
                      {recipe.cookTime + recipe.prepTime} мин • {recipe.calories} ккал
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shopping list modal */}
      {showShoppingList && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart size={20} className="text-green-500" />
                  Список покупок
                </h3>
                <button
                  onClick={() => setShowShoppingList(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {shoppingList.filter((i) => i.checked).length} из {shoppingList.length} куплено
              </p>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {shoppingList.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">🛒</div>
                  <p className="text-gray-500">Добавьте рецепты в планировщик</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {shoppingList.map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                        item.checked ? 'bg-green-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(item.id)}
                        className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-200"
                      />
                      <span
                        className={`flex-1 ${
                          item.checked ? 'line-through text-gray-400' : 'text-gray-700'
                        }`}
                      >
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">
                        {item.amount} {item.unit}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            {shoppingList.length > 0 && (
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={() => setShoppingList([])}
                  className="w-full py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
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
