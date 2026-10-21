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
      <div className="text-center py-20">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Рецепт не найден</h2>
        <Link to="/" className="text-orange-500 hover:underline">
          Вернуться на главную
        </Link>
      </div>
    );
  }

  const difficultyLabel = { easy: 'Легко', medium: 'Средне', hard: 'Сложно' };
  const difficultyColor = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 transition-colors"
      >
        <ArrowLeft size={18} />
        <span>Назад к рецептам</span>
      </Link>

      {/* Hero Image */}
      <div className="relative rounded-3xl overflow-hidden mb-6 aspect-[16/9]">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor[recipe.difficulty]}`}>
              {difficultyLabel[recipe.difficulty]}
            </span>
            {recipe.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{recipe.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Stats */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl">
              <Clock size={18} className="text-orange-500" />
              <div>
                <div className="text-xs text-gray-500">Общее время</div>
                <div className="font-semibold text-gray-800">{recipe.cookTime + recipe.prepTime} мин</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">
              <Users size={18} className="text-blue-500" />
              <div>
                <div className="text-xs text-gray-500">Порции</div>
                <div className="font-semibold text-gray-800">{recipe.servings}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-xl">
              <Flame size={18} className="text-red-500" />
              <div>
                <div className="text-xs text-gray-500">Калории</div>
                <div className="font-semibold text-gray-800">{recipe.calories} ккал</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100">
            <p className="text-gray-700 leading-relaxed text-lg">{recipe.description}</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'ingredients' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              Ингредиенты ({recipe.ingredients.length})
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'steps' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              Приготовление ({recipe.steps.length})
            </button>
          </div>

          {/* Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>🥘</span> Ингредиенты
              </h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-center gap-3 group">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-orange-400 flex items-center justify-center transition-colors">
                      <div className="w-3 h-3 rounded-full bg-transparent group-hover:bg-orange-400 transition-colors" />
                    </div>
                    <span className="text-gray-700 flex-1">{ing.name}</span>
                    <span className="font-medium text-gray-900">
                      {ing.amount} {ing.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps */}
          {activeTab === 'steps' && (
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>👨‍🍳</span> Пошаговое приготовление
              </h3>
              <ol className="space-y-6">
                {recipe.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-400 text-white flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Comments */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 mt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>💬</span> Комментарии ({recipe.comments.length})
            </h3>

            {/* Comment input */}
            <div className="flex gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-sm flex-shrink-0">
                👩‍🍳
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Напишите комментарий..."
                  className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-orange-200 outline-none"
                />
                <button className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
                  <Send size={16} />
                </button>
              </div>
            </div>

            {/* Comments list */}
            <div className="space-y-4">
              {recipe.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-sm flex-shrink-0">
                    {comment.author.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">{comment.author.name}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{comment.text}</p>
                    <button className="flex items-center gap-1 mt-1 text-xs text-gray-400 hover:text-red-400 transition-colors">
                      <ThumbsUp size={12} />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Author */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-xl">
                {recipe.author.avatar}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{recipe.author.name}</h4>
                <p className="text-xs text-gray-500">{recipe.author.recipesCount} рецептов</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{recipe.author.bio}</p>
            <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all">
              Подписаться
            </button>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="space-y-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                  liked
                    ? 'bg-red-50 text-red-500 border border-red-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Heart size={18} className={liked ? 'fill-red-500' : ''} />
                {liked ? 'Вам нравится' : 'Нравится'} ({recipe.likes})
              </button>
              <button
                onClick={() => setSaved(!saved)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                  saved
                    ? 'bg-orange-50 text-orange-500 border border-orange-200'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Bookmark size={18} className={saved ? 'fill-orange-500' : ''} />
                {saved ? 'Сохранено' : 'Сохранить'}
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-all">
                <Share2 size={18} />
                Поделиться
              </button>
            </div>
          </div>

          {/* Nutrition */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ChefHat size={18} className="text-orange-500" />
              Пищевая ценность
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Калории</span>
                <span className="font-medium text-gray-900">{recipe.calories} ккал</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Белки</span>
                <span className="font-medium text-gray-900">{Math.round(recipe.calories * 0.15 / 4)}г</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Жиры</span>
                <span className="font-medium text-gray-900">{Math.round(recipe.calories * 0.35 / 9)}г</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Углеводы</span>
                <span className="font-medium text-gray-900">{Math.round(recipe.calories * 0.5 / 4)}г</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
