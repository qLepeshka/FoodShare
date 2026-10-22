import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Bookmark, MessageCircle } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onLike?: (id: string) => void;
  onSave?: (id: string) => void;
  index?: number;
}

export default function RecipeCard({ recipe, onLike, onSave, index = 0 }: RecipeCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const difficultyColor = {
    easy: 'bg-[#B8C5A0]/25 text-[#7A8B6F] border-[#B8C5A0]/40',
    medium: 'bg-[#D4A574]/20 text-[#8B6F47] border-[#D4A574]/35',
    hard: 'bg-[#D4764E]/15 text-[#B85A35] border-[#D4764E]/30',
  };

  const difficultyLabel = {
    easy: 'Легко',
    medium: 'Средне',
    hard: 'Сложно',
  };

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden border border-[#D4A574]/20 card-hover animate-fade-in-up opacity-0 shadow-sm"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#E8DCC4]/30 animate-pulse" />
        )}
        <img
          src={recipe.image}
          alt={recipe.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#7A8B6F]/30 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${difficultyColor[recipe.difficulty]}`} style={{ fontFamily: 'Old Standard TT, serif' }}>
            {difficultyLabel[recipe.difficulty]}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            onSave?.(recipe.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <Bookmark
            size={14}
            className={recipe.isSaved ? 'fill-[#D4764E] text-[#D4764E]' : 'text-[#9BA87D]'}
          />
        </button>

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1">
            <Clock size={12} className="text-[#7A8B6F]" />
            <span className="text-xs font-medium text-[#7A8B6F]" style={{ fontFamily: 'Old Standard TT, serif' }}>{recipe.cookTime + recipe.prepTime} мин</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Link to={`/recipe/${recipe.id}`} className="block">
          <h3 
            className="font-bold text-[#3A3A2A] text-lg mb-1.5 line-clamp-1 hover:text-[#7A8B6F] transition-colors"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {recipe.title}
          </h3>
        </Link>
        <p 
          className="text-[#9BA87D] text-sm mb-3 line-clamp-2"
          style={{ fontFamily: 'Old Standard TT, serif' }}
        >
          {recipe.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-[#D4A574]/12 text-[#8B6F47] rounded-full text-xs border border-[#D4A574]/20"
              style={{ fontFamily: 'Old Standard TT, serif' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#D4A574]/15">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#D4A574] to-[#D4764E] flex items-center justify-center text-xs text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              {recipe.author.name.charAt(0)}
            </div>
            <span className="text-sm text-[#9BA87D]" style={{ fontFamily: 'Old Standard TT, serif' }}>{recipe.author.name}</span>
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
                size={14}
                className={recipe.isLiked ? 'fill-[#D4764E] text-[#D4764E]' : 'text-[#B8C5A0] hover:text-[#D4764E]'}
              />
              <span className="text-[#9BA87D] text-xs">{recipe.likes}</span>
            </button>
            <div className="flex items-center gap-1 text-sm">
              <MessageCircle size={14} className="text-[#B8C5A0]" />
              <span className="text-[#9BA87D] text-xs">{recipe.comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
