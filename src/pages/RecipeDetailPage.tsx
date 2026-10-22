import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { recipes } from '../data/mockData';
import {
  Clock,
  Users,
  Flame,
  Heart,
  Bookmark,
  Share2,
  ChefHat,
  ArrowLeft,
  Send,
  ThumbsUp,
} from 'lucide-react';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);
  const [liked, setLiked] = useState(recipe?.isLiked || false);
  const [saved, setSaved] = useState(recipe?.isSaved || false);
  const [commentText, setCommentText] = useState('');
  const [activeTab, setActiveTab] = useState<'ingredients' | 'steps'>('ingredients');

  if (!recipe) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#E8DCC4]/40 flex items-center justify-center">
          <ChefHat size={24} className="text-[#9BA87D]" />
        </div>
        <h2 
          className="text-2xl font-bold text-[#7A8B6F] mb-2"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Рецепт не найден
        </h2>
        <Link to="/" className="text-[#9BA87D] hover:text-[#7A8B6F] transition-colors" style={{ fontFamily: 'Old Standard TT, serif' }}>
          Вернуться на главную
        </Link>
      </div>
    );
  }

  const difficultyLabel = { easy: 'Легко', medium: 'Средне', hard: 'Сложно' };
  const difficultyColor = {
    easy: 'bg-[#B8C5A0]/25 text-[#7A8B6F] border-[#B8C5A0]/40',
    medium: 'bg-[#D4A574]/20 text-[#8B6F47] border-[#D4A574]/35',
    hard: 'bg-[#D4764E]/15 text-[#B85A35] border-[#D4764E]/30',
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[#9BA87D] hover:text-[#7A8B6F] mb-4 transition-colors"
        style={{ fontFamily: 'Old Standard TT, serif' }}
      >
        <ArrowLeft size={16} />
        <span>Назад к рецептам</span>
      </Link>

      <div className="relative rounded-3xl overflow-hidden mb-6 aspect-[16/9] shadow-md">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#7A8B6F]/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4764E] via-[#D4A574] to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyColor[recipe.difficulty]}`} style={{ fontFamily: 'Old Standard TT, serif' }}>
              {difficultyLabel[recipe.difficulty]}
            </span>
            {recipe.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs border border-white/20" style={{ fontFamily: 'Old Standard TT, serif' }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {recipe.title}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 bg-[#D4A574]/12 px-4 py-2.5 rounded-xl border border-[#D4A574]/25">
              <Clock size={16} className="text-[#7A8B6F]" />
              <div>
                <div className="text-xs text-[#9BA87D]" style={{ fontFamily: 'Old Standard TT, serif' }}>Общее время</div>
                <div className="font-semibold text-[#7A8B6F]" style={{ fontFamily: 'Playfair Display, serif' }}>{recipe.cookTime + recipe.prepTime} мин</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#B8C5A0]/15 px-4 py-2.5 rounded-xl border border-[#B8C5A0]/30">
              <Users size={16} className="text-[#7A8B6F]" />
              <div>
                <div className="text-xs text-[#9BA87D]" style={{ fontFamily: 'Old Standard TT, serif' }}>Порции</div>
                <div className="font-semibold text-[#7A8B6F]" style={{ fontFamily: 'Playfair Display, serif' }}>{recipe.servings}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#D4764E]/10 px-4 py-2.5 rounded-xl border border-[#D4764E]/20">
              <Flame size={16} className="text-[#D4764E]" />
              <div>
                <div className="text-xs text-[#9BA87D]" style={{ fontFamily: 'Old Standard TT, serif' }}>Калории</div>
                <div className="font-semibold text-[#7A8B6F]" style={{ fontFamily: 'Playfair Display, serif' }}>{recipe.calories} ккал</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-6 border border-[#D4A574]/15 shadow-sm">
            <p 
              className="text-[#3A3A2A] leading-relaxed text-lg"
              style={{ fontFamily: 'Old Standard TT, serif' }}
            >
              {recipe.description}
            </p>
          </div>

          <div className="flex gap-1 bg-[#E8DCC4]/30 rounded-xl p-1 mb-6">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'ingredients' ? 'bg-white shadow-sm text-[#7A8B6F]' : 'text-[#9BA87D]'
              }`}
              style={{ fontFamily: 'Old Standard TT, serif' }}
            >
              Ингредиенты ({recipe.ingredients.length})
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'steps' ? 'bg-white shadow-sm text-[#7A8B6F]' : 'text-[#9BA87D]'
              }`}
              style={{ fontFamily: 'Old Standard TT, serif' }}
            >
              Приготовление ({recipe.steps.length})
            </button>
          </div>

          {activeTab === 'ingredients' && (
            <div className="bg-white rounded-2xl p-6 border border-[#D4A574]/15 shadow-sm animate-fade-in">
              <h3 
                className="text-lg font-bold text-[#7A8B6F] mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Ингредиенты
              </h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-[#B8C5A0] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#B8C5A0]" />
                    </div>
                    <span className="text-[#3A3A2A] flex-1" style={{ fontFamily: 'Old Standard TT, serif' }}>{ing.name}</span>
                    <span className="font-medium text-[#7A8B6F]" style={{ fontFamily: 'Old Standard TT, serif' }}>
                      {ing.amount} {ing.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'steps' && (
            <div className="bg-white rounded-2xl p-6 border border-[#D4A574]/15 shadow-sm animate-fade-in">
              <h3 
                className="text-lg font-bold text-[#7A8B6F] mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Пошаговое приготовление
              </h3>
              <ol className="space-y-6">
                {recipe.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4764E] text-white flex items-center justify-center font-bold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {idx + 1}
                    </div>
                    <p 
                      className="text-[#3A3A2A] leading-relaxed pt-1"
                      style={{ fontFamily: 'Old Standard TT, serif' }}
                    >
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="bg-white rounded-2xl p-6 border border-[#D4A574]/15 shadow-sm mt-6">
            <h3 
              className="text-lg font-bold text-[#7A8B6F] mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Комментарии ({recipe.comments.length})
            </h3>

            <div className="flex gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4A574] to-[#D4764E] flex items-center justify-center text-sm flex-shrink-0 text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                A
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Напишите комментарий..."
                  className="flex-1 px-4 py-2 bg-[#E8DCC4]/20 border border-[#D4A574]/25 rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-[#B8C5A0]/30 outline-none placeholder:text-[#9BA87D]/60"
                  style={{ fontFamily: 'Old Standard TT, serif' }}
                />
                <button className="p-2 bg-[#D4764E] text-white rounded-full hover:bg-[#B85A35] transition-colors">
                  <Send size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {recipe.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#9BA87D] flex items-center justify-center text-sm flex-shrink-0 text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {comment.author.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-[#7A8B6F] text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>{comment.author.name}</span>
                      <span className="text-xs text-[#9BA87D]/60" style={{ fontFamily: 'Old Standard TT, serif' }}>
                        {new Date(comment.createdAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <p className="text-[#3A3A2A] text-sm" style={{ fontFamily: 'Old Standard TT, serif' }}>{comment.text}</p>
                    <button className="flex items-center gap-1 mt-1 text-xs text-[#9BA87D] hover:text-[#7A8B6F] transition-colors">
                      <ThumbsUp size={12} />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#D4A574]/15 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A574] to-[#D4764E] flex items-center justify-center text-xl text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                {recipe.author.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-[#7A8B6F]" style={{ fontFamily: 'Playfair Display, serif' }}>{recipe.author.name}</h4>
                <p className="text-xs text-[#9BA87D]" style={{ fontFamily: 'Old Standard TT, serif' }}>{recipe.author.recipesCount} рецептов</p>
              </div>
            </div>
            <p className="text-sm text-[#9BA87D] mb-4" style={{ fontFamily: 'Old Standard TT, serif' }}>{recipe.author.bio}</p>
            <button className="w-full py-2 bg-[#D4764E] text-white rounded-xl font-medium text-sm hover:bg-[#B85A35] transition-all shadow-sm" style={{ fontFamily: 'Old Standard TT, serif' }}>
              Подписаться
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#D4A574]/15 shadow-sm">
            <div className="space-y-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                  liked
                    ? 'bg-[#D4764E]/10 text-[#D4764E] border border-[#D4764E]/25'
                    : 'bg-[#E8DCC4]/20 text-[#9BA87D] hover:bg-[#E8DCC4]/40 border border-[#D4A574]/20'
                }`}
                style={{ fontFamily: 'Old Standard TT, serif' }}
              >
                <Heart size={16} className={liked ? 'fill-[#D4764E]' : ''} />
                {liked ? 'Вам нравится' : 'Нравится'} ({recipe.likes})
              </button>
              <button
                onClick={() => setSaved(!saved)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                  saved
                    ? 'bg-[#B8C5A0]/20 text-[#7A8B6F] border border-[#B8C5A0]/30'
                    : 'bg-[#E8DCC4]/20 text-[#9BA87D] hover:bg-[#E8DCC4]/40 border border-[#D4A574]/20'
                }`}
                style={{ fontFamily: 'Old Standard TT, serif' }}
              >
                <Bookmark size={16} className={saved ? 'fill-[#7A8B6F]' : ''} />
                {saved ? 'Сохранено' : 'Сохранить'}
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm bg-[#E8DCC4]/20 text-[#9BA87D] hover:bg-[#E8DCC4]/40 border border-[#D4A574]/20 transition-all" style={{ fontFamily: 'Old Standard TT, serif' }}>
                <Share2 size={16} />
                Поделиться
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#D4A574]/15 shadow-sm">
            <h4 className="font-bold text-[#7A8B6F] mb-4 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              <ChefHat size={16} className="text-[#9BA87D]" />
              Пищевая ценность
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#9BA87D] text-sm" style={{ fontFamily: 'Old Standard TT, serif' }}>Калории</span>
                <span className="font-medium text-[#7A8B6F]" style={{ fontFamily: 'Old Standard TT, serif' }}>{recipe.calories} ккал</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9BA87D] text-sm" style={{ fontFamily: 'Old Standard TT, serif' }}>Белки</span>
                <span className="font-medium text-[#7A8B6F]" style={{ fontFamily: 'Old Standard TT, serif' }}>{Math.round(recipe.calories * 0.15 / 4)}г</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9BA87D] text-sm" style={{ fontFamily: 'Old Standard TT, serif' }}>Жиры</span>
                <span className="font-medium text-[#7A8B6F]" style={{ fontFamily: 'Old Standard TT, serif' }}>{Math.round(recipe.calories * 0.35 / 9)}г</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9BA87D] text-sm" style={{ fontFamily: 'Old Standard TT, serif' }}>Углеводы</span>
                <span className="font-medium text-[#7A8B6F]" style={{ fontFamily: 'Old Standard TT, serif' }}>{Math.round(recipe.calories * 0.5 / 4)}г</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
