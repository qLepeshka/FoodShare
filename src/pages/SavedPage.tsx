import { useState } from 'react';
import { recipes } from '../data/mockData';
import RecipeCard from '../components/RecipeCard';
import { Bookmark, Trash2 } from 'lucide-react';

export default function SavedPage() {
  const [savedRecipes, setSavedRecipes] = useState(recipes.filter((r) => r.isSaved));

  const handleSave = (id: string) => {
    setSavedRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleRemoveAll = () => setSavedRecipes([]);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#6A795D] flex items-center gap-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            <Bookmark size={24} className="text-[#8E9162]" />
            Сохранённые рецепты
          </h1>
          <p className="text-[#8E9162] mt-1" style={{ fontFamily: 'Old Standard TT, serif' }}>{savedRecipes.length} рецептов в закладках</p>
        </div>
        {savedRecipes.length > 0 && (
          <button onClick={handleRemoveAll} className="flex items-center gap-2 px-4 py-2 text-[#8E9162] hover:bg-[#D9D28B]/10 rounded-xl text-sm font-medium transition-colors" style={{ fontFamily: 'Old Standard TT, serif' }}>
            <Trash2 size={14} />
            Очистить все
          </button>
        )}
      </div>

      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map((recipe, idx) => (
            <RecipeCard key={recipe.id} recipe={recipe} onSave={handleSave} index={idx} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#D9D28B]/20 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D9D28B]/20 flex items-center justify-center">
            <Bookmark size={24} className="text-[#8E9162]" />
          </div>
          <h3 className="text-xl font-semibold text-[#6A795D] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Нет сохранённых рецептов</h3>
          <p className="text-[#8E9162] max-w-md mx-auto" style={{ fontFamily: 'Old Standard TT, serif' }}>
            Сохраняйте понравившиеся рецепты, чтобы быстро находить их позже. Нажмите на закладку на карточке рецепта.
          </p>
        </div>
      )}
    </div>
  );
}
