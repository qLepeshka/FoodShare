import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Users, Bookmark, MessageCircle, Share2, Flame } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onLike?: (id: string) => void;
  onSave?: (id: string) => void;
}

export default function RecipeCard({ recipe, onLike, onSave }: RecipeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const difficultyColor = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
  };

  const difficultyLabel = {
    easy: 'Легко',
    medium: 'Средне',
    hard: 'Сложно',
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-red-100 animate-pulse" />
        )}
        <img
          src={recipe.image}
          alt={recipe.title}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColor[recipe.difficulty]}`}>
            {difficultyLabel[recipe.difficulty]}
          </span>
        </div>

        {/* Save button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onSave?.(recipe.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <Bookmark
            size={16}
            className={recipe.isSaved ? 'fill-orange-500 text-orange-500' : 'text-gray-600'}
          />
        </button>

        {/* Bottom info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Clock size={12} className="text-gray-600" />
            <span className="text-xs font-medium text-gray-700">{recipe.cookTime + recipe.prepTime} мин</span>
          </div>
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Flame size={12} className="text-orange-500" />
            <span className="text-xs font-medium text-gray-700">{recipe.calories} ккал</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/recipe/${recipe.id}`} className="block">
          <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors">
            {recipe.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{recipe.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-xs">
              {recipe.author.avatar}
            </div>
            <span className="text-sm text-gray-600 font-medium">{recipe.author.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                onLike?.(recipe.id);
              }}
              className="flex items-center gap-1 text-sm"
            >
              <Heart
                size={16}
                className={recipe.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'}
              />
              <span className="text-gray-500">{recipe.likes}</span>
            </button>
            <div className="flex items-center gap-1 text-sm">
              <MessageCircle size={16} className="text-gray-400" />
              <span className="text-gray-500">{recipe.comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
