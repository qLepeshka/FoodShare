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
    <div className="animate-fade-in">
      <div className="bg-white rounded-3xl overflow-hidden border border-[#D9D28B]/20 mb-8">
        <div className="h-32 bg-[#B2BD7E]/30 relative">
          <div className="absolute inset-0 bg-[#6A795D]/10"></div>
        </div>

        <div className="px-6 pb-6 -mt-12 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-[#6A795D] flex items-center justify-center text-3xl text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                {currentUser.name.charAt(0)}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-[#6A795D]" style={{ fontFamily: 'Playfair Display, serif' }}>{currentUser.name}</h1>
                <button onClick={() => setIsEditing(!isEditing)} className="p-2 hover:bg-[#D9D28B]/15 rounded-lg transition-colors">
                  <Edit3 size={14} className="text-[#8E9162]" />
                </button>
              </div>
              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-2 w-full px-3 py-2 border border-[#D9D28B]/30 rounded-xl text-sm focus:ring-2 focus:ring-[#B2BD7E]/20 outline-none resize-none"
                  rows={2}
                  style={{ fontFamily: 'Old Standard TT, serif' }}
                />
              ) : (
                <p className="text-[#8E9162] mt-1" style={{ fontFamily: 'Old Standard TT, serif' }}>{bio}</p>
              )}
            </div>
            <button className="px-4 py-2 bg-[#D9D28B]/15 text-[#8E9162] rounded-xl text-sm font-medium hover:bg-[#D9D28B]/25 transition-colors flex items-center gap-2 border border-[#D9D28B]/20" style={{ fontFamily: 'Old Standard TT, serif' }}>
              <Settings size={14} />
              Настройки
            </button>
          </div>

          <div className="flex gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#6A795D]" style={{ fontFamily: 'Playfair Display, serif' }}>{currentUser.recipesCount}</div>
              <div className="text-xs text-[#8E9162]" style={{ fontFamily: 'Old Standard TT, serif' }}>Рецептов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#6A795D]" style={{ fontFamily: 'Playfair Display, serif' }}>{currentUser.followersCount}</div>
              <div className="text-xs text-[#8E9162]" style={{ fontFamily: 'Old Standard TT, serif' }}>Подписчиков</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#6A795D]" style={{ fontFamily: 'Playfair Display, serif' }}>{currentUser.followingCount}</div>
              <div className="text-xs text-[#8E9162]" style={{ fontFamily: 'Old Standard TT, serif' }}>Подписок</div>
            </div>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-[#D4A574]/15 text-[#C8553D] rounded-full text-xs font-medium border border-[#D4A574]/30" style={{ fontFamily: 'Old Standard TT, serif' }}>
              <Award size={12} /> Топ автор
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-[#B2BD7E]/15 text-[#6A795D] rounded-full text-xs font-medium border border-[#B2BD7E]/20" style={{ fontFamily: 'Old Standard TT, serif' }}>
              <Calendar size={12} /> 1 год на сайте
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-[#C8553D]/10 text-[#C8553D] rounded-full text-xs font-medium border border-[#C8553D]/20" style={{ fontFamily: 'Old Standard TT, serif' }}>
              <Heart size={12} /> 500+ лайков
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-1 bg-white rounded-xl p-1 mb-6 border border-[#D9D28B]/20">
        <button
          onClick={() => setActiveTab('recipes')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'recipes' ? 'bg-[#6A795D] text-white' : 'text-[#8E9162] hover:text-[#6A795D]'
          }`}
          style={{ fontFamily: 'Old Standard TT, serif' }}
        >
          <Grid size={14} />
          Мои рецепты
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'saved' ? 'bg-[#6A795D] text-white' : 'text-[#8E9162] hover:text-[#6A795D]'
          }`}
          style={{ fontFamily: 'Old Standard TT, serif' }}
        >
          <Bookmark size={14} />
          Сохранённые
        </button>
        <button
          onClick={() => setActiveTab('liked')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'liked' ? 'bg-[#6A795D] text-white' : 'text-[#8E9162] hover:text-[#6A795D]'
          }`}
          style={{ fontFamily: 'Old Standard TT, serif' }}
        >
          <Heart size={14} />
          Понравившиеся
        </button>
      </div>

      {displayRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRecipes.map((recipe, idx) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={idx} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#D9D28B]/20 animate-fade-in">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#D9D28B]/20 flex items-center justify-center">
            {activeTab === 'recipes' ? <Grid size={20} className="text-[#8E9162]" /> : activeTab === 'saved' ? <Bookmark size={20} className="text-[#8E9162]" /> : <Heart size={20} className="text-[#8E9162]" />}
          </div>
          <h3 className="text-lg font-semibold text-[#6A795D] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            {activeTab === 'recipes' ? 'У вас пока нет рецептов' : activeTab === 'saved' ? 'Нет сохранённых рецептов' : 'Нет понравившихся рецептов'}
          </h3>
          <p className="text-[#8E9162]" style={{ fontFamily: 'Old Standard TT, serif' }}>
            {activeTab === 'recipes' ? 'Создайте свой первый рецепт' : 'Сохраняйте рецепты, чтобы не потерять'}
          </p>
        </div>
      )}
    </div>
  );
}
