import { useState } from 'react';
import { currentUser, recipes } from '../data/mockData';
import RecipeCard from '../components/RecipeCard';
import { Settings, Edit3, Grid, Bookmark, Heart, Award, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'recipes' | 'saved' | 'liked'>('recipes');
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(currentUser.bio);

  const myRecipes = recipes.filter((r) => r.author.id === currentUser.id);
  const savedRecipes = recipes.filter((r) => r.isSaved);
  const likedRecipes = recipes.filter((r) => r.isLiked);

  const displayRecipes = activeTab === 'recipes' ? myRecipes : activeTab === 'saved' ? savedRecipes : likedRecipes;

  return (
    <div>
      {/* Profile Header */}
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 mb-8">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-2 left-10 text-4xl">🍳</div>
            <div className="absolute top-4 right-20 text-3xl">🥗</div>
            <div className="absolute bottom-2 left-1/3 text-3xl">🍰</div>
          </div>
        </div>

        {/* Info */}
        <div className="px-6 pb-6 -mt-12 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-4xl">
                {currentUser.avatar}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit3 size={16} className="text-gray-400" />
                </button>
              </div>
              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-2 w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-200 outline-none resize-none"
                  rows={2}
                />
              ) : (
                <p className="text-gray-500 mt-1">{bio}</p>
              )}
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Settings size={16} />
              Настройки
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{currentUser.recipesCount}</div>
              <div className="text-xs text-gray-500">Рецептов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{currentUser.followersCount}</div>
              <div className="text-xs text-gray-500">Подписчиков</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{currentUser.followingCount}</div>
              <div className="text-xs text-gray-500">Подписок</div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2 mt-4 flex-wrap">
            <span className="flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium">
              <Award size={12} /> Топ автор
            </span>
            <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
              <Calendar size={12} /> 1 год на сайте
            </span>
            <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              ❤️ 500+ лайков
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 mb-6 border border-gray-100">
        <button
          onClick={() => setActiveTab('recipes')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'recipes' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Grid size={16} />
          Мои рецепты
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'saved' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Bookmark size={16} />
          Сохранённые
        </button>
        <button
          onClick={() => setActiveTab('liked')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'liked' ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Heart size={16} />
          Понравившиеся
        </button>
      </div>

      {/* Recipe Grid */}
      {displayRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-4">
            {activeTab === 'recipes' ? '📝' : activeTab === 'saved' ? '🔖' : '❤️'}
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {activeTab === 'recipes'
              ? 'У вас пока нет рецептов'
              : activeTab === 'saved'
              ? 'Нет сохранённых рецептов'
              : 'Нет понравившихся рецептов'}
          </h3>
          <p className="text-gray-500">
            {activeTab === 'recipes'
              ? 'Создайте свой первый рецепт!'
              : 'Сохраняйте рецепты, чтобы не потерять'}
          </p>
        </div>
      )}
    </div>
  );
}
