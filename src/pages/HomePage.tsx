import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { recipes, categories } from '../data/mockData';
import { TrendingUp, Sparkles, Clock, Flame } from 'lucide-react';

const filterTabs = [
  { id: 'all', label: 'Все', icon: Sparkles },
  { id: 'popular', label: 'Популярные', icon: TrendingUp },
  { id: 'quick', label: 'Быстрые', icon: Clock },
  { id: 'trending', label: 'В тренде', icon: Flame },
];

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [recipeList, setRecipeList] = useState(recipes);
  const [showCategories, setShowCategories] = useState(!!categoryParam);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setShowCategories(true);
    }
  }, [categoryParam]);

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

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setShowCategories(false);
      setSearchParams({});
    } else {
      setSelectedCategory(categoryId);
      setShowCategories(true);
      setSearchParams({ category: categoryId });
    }
  };

  const filteredRecipes = () => {
    let result = recipeList;

    if (selectedCategory) {
      const categoryMap: Record<string, string[]> = {
        italian: ['Итальянская'],
        japanese: ['Японская'],
        healthy: ['Здоровое питание', 'ПП', 'Боул'],
        desserts: ['Десерт', 'Без выпечки'],
        meat: ['Мясные блюда', 'Гриль'],
        fish: ['Рыба', 'Морепродукты'],
        breakfast: ['Завтрак'],
        soups: ['Суп'],
      };
      const categoryTags = categoryMap[selectedCategory] || [];
      result = result.filter((r) => r.tags.some((tag) => categoryTags.includes(tag)));
    }

    switch (activeFilter) {
      case 'popular':
        return [...result].sort((a, b) => b.likes - a.likes);
      case 'quick':
        return result.filter((r) => r.cookTime + r.prepTime <= 30);
      case 'trending':
        return [...result].sort((a, b) => b.likes - a.likes).slice(0, 6);
      default:
        return result;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="mb-8 bg-[#E8DCC4]/40 border border-[#D4A574]/30 rounded-3xl p-8 md:p-10 relative overflow-hidden animate-fade-in-up shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#B8C5A0]/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D4A574]/15 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#D4764E] via-[#D4A574] to-transparent"></div>
        
        <div className="relative z-10">
          <h1 
            className="text-3xl md:text-4xl font-bold text-[#7A8B6F] mb-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Добро пожаловать в FoodShare
          </h1>
          <p 
            className="text-[#9BA87D] text-lg max-w-xl mb-6"
            style={{ fontFamily: 'Old Standard TT, serif' }}
          >
            Делитесь рецептами, планируйте меню на неделю и открывайте новые блюда вместе с сообществом
          </p>
          <div className="flex gap-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl px-5 py-3 border border-[#D4A574]/20">
              <div className="text-2xl font-bold text-[#D4764E]" style={{ fontFamily: 'Playfair Display, serif' }}>{recipeList.length}</div>
              <div className="text-xs text-[#9BA87D]" style={{ fontFamily: 'Old Standard TT, serif' }}>Рецептов</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl px-5 py-3 border border-[#D4A574]/20">
              <div className="text-2xl font-bold text-[#D4A574]" style={{ fontFamily: 'Playfair Display, serif' }}>5</div>
              <div className="text-xs text-[#9BA87D]" style={{ fontFamily: 'Old Standard TT, serif' }}>Авторов</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl px-5 py-3 border border-[#D4A574]/20">
              <div className="text-2xl font-bold text-[#7A8B6F]" style={{ fontFamily: 'Playfair Display, serif' }}>14</div>
              <div className="text-xs text-[#9BA87D]" style={{ fontFamily: 'Old Standard TT, serif' }}>Комментариев</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 
            className="text-xl font-bold text-[#7A8B6F]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Категории
          </h2>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="text-sm text-[#9BA87D] hover:text-[#7A8B6F] transition-colors"
            style={{ fontFamily: 'Old Standard TT, serif' }}
          >
            {showCategories ? 'Скрыть' : 'Показать все'}
          </button>
        </div>
        
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 transition-all duration-500 ${showCategories ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`relative rounded-xl overflow-hidden group transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'ring-2 ring-[#D4764E] ring-offset-2'
                  : 'hover:ring-2 hover:ring-[#D4A574] hover:ring-offset-2'
              }`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="aspect-[3/2] relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#7A8B6F]/40 group-hover:bg-[#7A8B6F]/30 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className="text-white font-medium text-sm text-center px-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {cat.name}
                  </span>
                </div>
              </div>
            </button>
          ))}
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
                ? 'bg-[#D4764E] text-white shadow-sm'
                : 'bg-white text-[#9BA87D] hover:bg-[#E8DCC4]/40 border border-[#D4A574]/30'
            }`}
            style={{ fontFamily: 'Old Standard TT, serif' }}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Selected category indicator */}
      {selectedCategory && (
        <div className="mb-4 flex items-center gap-2 animate-fade-in">
          <span className="text-sm text-[#9BA87D]" style={{ fontFamily: 'Old Standard TT, serif' }}>
            Категория:
          </span>
          <span className="px-3 py-1 bg-[#D4A574]/15 text-[#7A8B6F] rounded-full text-sm border border-[#D4A574]/25" style={{ fontFamily: 'Old Standard TT, serif' }}>
            {categories.find(c => c.id === selectedCategory)?.name}
          </span>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setShowCategories(false);
              setSearchParams({});
            }}
            className="text-xs text-[#9BA87D] hover:text-[#7A8B6F] ml-2"
          >
            Сбросить
          </button>
        </div>
      )}

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes().map((recipe, idx) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onLike={handleLike}
            onSave={handleSave}
            index={idx}
          />
        ))}
      </div>

      {filteredRecipes().length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E8DCC4]/40 flex items-center justify-center">
            <Flame size={24} className="text-[#9BA87D]" />
          </div>
          <h3 
            className="text-xl font-semibold text-[#7A8B6F] mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Ничего не найдено
          </h3>
          <p className="text-[#9BA87D]" style={{ fontFamily: 'Old Standard TT, serif' }}>
            Попробуйте изменить фильтры или выбрать другую категорию
          </p>
        </div>
      )}
    </div>
  );
}
