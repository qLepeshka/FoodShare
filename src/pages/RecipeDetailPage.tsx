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
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D9D28B]/20 flex items-center justify-center">
          <ChefHat size={24} className="text-[#8E9162]" />
        </div>
        <h2 
          className="text-2xl font-bold text-[#6A795D] mb-2"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Рецепт не найден
        </h2>
        <Link to="/" className="text-[#8E9162] hover:text-[#6A795D] transition-colors" style={{ fontFamily: 'Old Standard TT, serif' }}>
          Вернуться на главную
        </Link>
      </div>
    );
  }

  const difficultyLabel = { easy: 'Легко', medium: 'Средне', hard: 'Сложно' };
  const difficultyColor = {
    easy: 'bg-[#B2BD7E]/20 text-[#6A795D] border-[#B2BD7E]/30',
    medium: 'bg-[#D9D28B]/30 text-[#8E9162] border-[#D9D28B]/40',
    hard: 'bg-[#8E9162]/20 text-[#6A795D] border-[#8E9162]/30',
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[#8E9162] hover:text-[#6A795D] mb-4 transition-colors"
        style={{ fontFamily: 'Old Standard TT, serif' }}
      >
        <ArrowLeft size={16} />
        <span>Назад к рецептам</span>
      </Link>

      <div className="relative rounded-3xl overflow-hidden mb-6 aspect-[16/9]">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#6A795D]/60 via-transparent to-transparent" />
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
            <div className="flex items-center gap-2 bg-[#D9D28B]/15 px-4 py-2.5 rounded-xl border border-[#D9D28B]/30">
              <Clock size={16} className="text-[#6A795D]" />
              <div>
                <div className="text-xs text-[#8E9162]" style={{ fontFamily: 'Old Standard TT, serif' }}>Общее время</div>
                <div className="font-semibold text-[#6A795D]" style={{ fontFamily: 'Playfair Display, serif' }}>{recipe.cookTime + recipe.prepTime} мин</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#B2BD7E]/15 px-4 py-2.5 rounded-xl border border-[#B2BD7E]/30">
              <Users size={16} className="text-[#6A795D]" />
              <div>
                <div className="text-xs text-[#8E9162]" style={{ fontFamily: 'Old Standard TT, serif' }}>Порции</div>
                <div className="font-semibold text-[#6A795D]" style={{ fontFamily: 'Playfair Display, serif' }}>{recipe.servings}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#8E9162]/15 px-4 py-2.5 rounded-xl border border-[#8E9162]/30">
              <Flame size={16} className="text-[#6A795D]" />
              <div>
                <div className="text-xs text-[#8E9162]" style={{ fontFamily: 'Old Standard TT, serif' }}>Калории</div>
                <div className="font-semibold text-[#6A795D]" style={{ fontFamily: 'Playfair Display, serif' }}>{recipe.calories} ккал</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-6 border border-[#D9D28B]/20">
            <p 
              className="text-[#3A3A2A] leading-relaxed text-lg"
              style={{ fontFamily: 'Old Standard TT, serif' }}
            >
              {recipe.description}
            </p>
          </div>

          <div className="flex gap-1 bg-[#D9D28B]/15 rounded-xl p-1 mb-6">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'ingredients' ? 'bg-white shadow-sm text-[#6A795D]' : 'text-[#8E9162]'
              }`}
              style={{ fontFamily: 'Old Standard TT, serif' }}
            >
              Ингредиенты ({recipe.ingredients.length})
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'steps' ? 'bg-white shadow-sm text-[#6A795D]' : 'text-[#8E9162]'
              }`}
              style={{ fontFamily: 'Old Standard TT, serif' }}
            >
              Приготовление ({recipe.steps.length})
            </button>
          </div>

          {activeTab === 'ingredients' && (
            <div className="bg-white rounded-2xl p-6 border border-[#D9D28B]/20 animate-fade-in">
              <h3 
                className="text-lg font-bold text-[#6A795D] mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Ингредиенты
              </h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-[#B2BD7E] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#B2BD7E]" />
                    </div>
                    <span className="text-[#3A3A2A] flex-1" style={{ fontFamily: 'Old Standard TT, serif' }}>{ing.name}</span>
                    <span className="font-medium text-[#6A795D]" style={{ fontFamily: 'Old Standard TT, serif' }}>
                      {ing.amount} {ing.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'steps' && (
            <div className="bg-white rounded-2xl p-6 border border-[#D9D28B]/20 animate-fade-in">
              <h3 
                className="text-lg font-bold text-[#6A795D] mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Пошаговое приготовление
              </h3>
              <ol className="space-y-6">
                {recipe.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6A795D] text-white flex items-center justify-center font-bold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
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

          <div className="bg-white rounded-2xl p-6 border border-[#D9D28B]/20 mt-6">
            <h3 
              className="text-lg font-bold text-[#6A795D] mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Комментарии ({recipe.comments.length})
            </h3>

            <div className="flex gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-[#B2BD7E] flex items-center justify-center text-sm flex-shrink-0 text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                A
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Напишите комментарий..."
                  className="flex-1 px-4 py-2 bg-[#D9D28B]/10 border border-[#D9D28B]/30 rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-[#B2BD7E]/20 outline-none placeholder:text-[#8E9162]/60"
                  style={{ fontFamily: 'Old Standard TT, serif' }}
                />
                <button className="p-2 bg-[#6A795D] text-white rounded-full hover:bg-[#4A5541] transition-colors">
                  <Send size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {recipe.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#8E9162] flex items-center justify-center text-sm flex-shrink-0 text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {comment.author.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-[#6A795D] text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>{comment.author.name}</span>
                      <span className="text-xs text-[#8E9162]/60" style={{ fontFamily: 'Old Standard TT, serif' }}>
                        {new Date(comment.createdAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <p className="text-[#3A3A2A] text-sm" style={{ fontFamily: 'Old Standard TT, serif' }}>{comment.text}</p>
                    <button className="flex items-center gap-1 mt-1 text-xs text-[#8E9162] hover:text-[#6A795D] transition-colors">
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
          <div className="bg-white rounded-2xl p-6 border border-[#D9D28B]/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#B2BD7E] flex items-center justify-center text-xl text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                {recipe.author.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-[#6A795D]" style={{ fontFamily: 'Playfair Display, serif' }}>{recipe.author.name}</h4>
                <p className="text-xs text-[#8E9162]" style={{ fontFamily: 'Old Standard TT, serif' }}>{recipe.author.recipesCount} рецептов</p>
              </div>
            </div>
            <p className="text-sm text-[#8E9162] mb-4" style={{ fontFamily: 'Old Standard TT, serif' }}>{recipe.author.bio}</p>
            <button className="w-full py-2 bg-[#6A795D] text-white rounded-xl font-medium text-sm hover:bg-[#4A5541] transition-all" style={{ fontFamily: 'Old Standard TT, serif' }}>
              Подписаться
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#D9D28B]/20">
            <div className="space-y-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                  liked
                    ? 'bg-[#8E9162]/15 text-[#6A795D] border border-[#8E9162]/30'
                    : 'bg-[#D9D28B]/10 text-[#8E9162] hover:bg-[#D9D28B]/20 border border-[#D9D28B]/20'
                }`}
                style={{ fontFamily: 'Old Standard TT, serif' }}
              >
                <Heart size={16} className={liked ? 'fill-[#6A795D]' : ''} />
                {liked ? 'Вам нравится' : 'Нравится'} ({recipe.likes})
              </button>
              <button
                onClick={() => setSaved(!saved)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                  saved
                    ? 'bg-[#B2BD7E]/20 text-[#6A795D] border border-[#B2BD7E]/30'
                    : 'bg-[#D9D28B]/10 text-[#8E9162] hover:bg-[#D9D28B]/20 border border-[#D9D28B]/20'
                }`}
                style={{ fontFamily: 'Old Standard TT, serif' }}
              >
                <Bookmark size={16} className={saved ? 'fill-[#6A795D]' : ''} />
                {saved ? 'Сохранено' : 'Сохранить'}
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm bg-[#D9D28B]/10 text-[#8E9162] hover:bg-[#D9D28B]/20 border border-[#D9D28B]/20 transition-all" style={{ fontFamily: 'Old Standard TT, serif' }}>
                <Share2 size={16} />
                Поделиться
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#D9D28B]/20">
            <h4 className="font-bold text-[#6A795D] mb-4 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              <ChefHat size={16} className="text-[#8E9162]" />
              Пищевая ценность
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#8E9162] text-sm" style={{ fontFamily: 'Old Standard TT, serif' }}>Калории</span>
                <span className="font-medium text-[#6A795D]" style={{ fontFamily: 'Old Standard TT, serif' }}>{recipe.calories} ккал</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E9162] text-sm" style={{ fontFamily: 'Old Standard TT, serif' }}>Белки</span>
                <span className="font-medium text-[#6A795D]" style={{ fontFamily: 'Old Standard TT, serif' }}>{Math.round(recipe.calories * 0.15 / 4)}г</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E9162] text-sm" style={{ fontFamily: 'Old Standard TT, serif' }}>Жиры</span>
                <span className="font-medium text-[#6A795D]" style={{ fontFamily: 'Old Standard TT, serif' }}>{Math.round(recipe.calories * 0.35 / 9)}г</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E9162] text-sm" style={{ fontFamily: 'Old Standard TT, serif' }}>Углеводы</span>
                <span className="font-medium text-[#6A795D]" style={{ fontFamily: 'Old Standard TT, serif' }}>{Math.round(recipe.calories * 0.5 / 4)}г</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
