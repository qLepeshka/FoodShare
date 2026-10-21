import { useState } from 'react';
import { recipes } from '../data/mockData';
import RecipeCard from '../components/RecipeCard';
import { Bookmark, Trash2 } from 'lucide-react';

export default function SavedPage() {
  const [savedRecipes, setSavedRecipes] = useState(
    recipes.filter((r) => r.isSaved)
  );

  const handleSave = (id: string) => {
    setSavedRecipes((prev) => {
      const recipe = prev.find((r) => r.id === id);
      if (recipe) {
        return prev.filter((r) => r.id !== id);
      }
      return prev;
    });
  };

  const handleRemoveAll = () => {
    setSavedRecipes([]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bookmark size={28} className="text-orange-500" />
            Сохранённые рецепты
          </h1>
          <p className="text-gray-500 mt-1">{savedRecipes.length} рецептов в закладках</p>
        </div>
        {savedRecipes.length > 0 && (
          <button
            onClick={handleRemoveAll}
            className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl text-sm font-medium transition-colors"
          >
            <Trash2 size={16} />
            Очистить все
          </button>
        )}
      </div>

      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onSave={handleSave}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="text-6xl mb-4">🔖</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Нет сохранённых рецептов</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Сохраняйте понравившиеся рецепты, чтобы быстро находить их позже. 
            Нажмите на закладку на карточке рецепта.
          </p>
        </div>
      )}
    </div>
  );
}
