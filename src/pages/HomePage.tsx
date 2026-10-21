import { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { recipes } from '../data/mockData';
import { TrendingUp, Sparkles, Clock, Flame } from 'lucide-react';

const filterTabs = [
  { id: 'all', label: 'Все', icon: Sparkles },
  { id: 'popular', label: 'Популярные', icon: TrendingUp },
  { id: 'quick', label: 'Быстрые', icon: Clock },
  { id: 'trending', label: 'В тренде', icon: Flame },
];

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [recipeList, setRecipeList] = useState(recipes);

  const handleLike = (id: string) => {
    setRecipeList((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, isLiked: !r.isLiked, likes: r.isLiked ? r.likes - 1 : r.likes + 1 }
          : r
      )
    );
  };

  const handleSave = (id: string) => {
    setRecipeList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isSaved: !r.isSaved } : r))
    );
  };

  const filteredRecipes = () => {
    switch (activeFilter) {
      case 'popular':
        return [...recipeList].sort((a, b) => b.likes - a.likes);
      case 'quick':
        return recipeList.filter((r) => r.cookTime + r.prepTime <= 30);
      case 'trending':
        return recipeList.filter((r) => r.tags.includes('Популярное'));
      default:
        return recipeList;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="mb-8 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 text-6xl">🍕</div>
          <div className="absolute bottom-4 right-24 text-5xl">🥗</div>
          <div className="absolute top-8 right-48 text-4xl">🍰</div>
          <div className="absolute bottom-8 left-8 text-5xl">🍝</div>
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Добро пожаловать в FoodShare! 👋
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            Делитесь рецептами, планируйте меню на неделю и открывайте новые блюда вместе с сообществом
          </p>
          <div className="flex gap-3 mt-5">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <div className="text-2xl font-bold">{recipeList.length}</div>
              <div className="text-xs text-white/70">Рецептов</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <div className="text-2xl font-bold">4</div>
              <div className="text-xs text-white/70">Авторов</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-white/70">Комментариев</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === tab.id
                ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes().map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onLike={handleLike}
            onSave={handleSave}
          />
        ))}
      </div>

      {filteredRecipes().length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Ничего не найдено</h3>
          <p className="text-gray-500">Попробуйте изменить фильтры</p>
        </div>
      )}
    </div>
  );
}
