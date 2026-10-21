import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Image } from 'lucide-react';

export default function CreateRecipePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [servings, setServings] = useState('');
  const [calories, setCalories] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: 'г' }]);
  const [steps, setSteps] = useState(['']);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const addIngredient = () => setIngredients([...ingredients, { name: '', amount: '', unit: 'г' }]);
  const removeIngredient = (idx: number) => setIngredients(ingredients.filter((_, i) => i !== idx));
  const updateIngredient = (idx: number, field: string, value: string) => {
    const updated = [...ingredients];
    updated[idx] = { ...updated[idx], [field]: value };
    setIngredients(updated);
  };

  const addStep = () => setSteps([...steps, '']);
  const removeStep = (idx: number) => setSteps(steps.filter((_, i) => i !== idx));
  const updateStep = (idx: number, value: string) => {
    const updated = [...steps];
    updated[idx] = value;
    setSteps(updated);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => navigate('/'), 2000);
  };

  if (showSuccess) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 animate-scale-in">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#B2BD7E]/20 flex items-center justify-center animate-float">
          <div className="w-10 h-10 rounded-full bg-[#6A795D] flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 
          className="text-3xl font-bold text-[#6A795D] mb-3"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Рецепт создан
        </h2>
        <p className="text-[#8E9162] text-lg" style={{ fontFamily: 'Old Standard TT, serif' }}>
          Ваш рецепт опубликован и доступен всем пользователям
        </p>
        <div className="mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#B2BD7E]/15 text-[#6A795D] rounded-full text-sm border border-[#B2BD7E]/30" style={{ fontFamily: 'Old Standard TT, serif' }}>
            Перенаправление на главную...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#6A795D]" style={{ fontFamily: 'Playfair Display, serif' }}>
          Создать рецепт
        </h1>
        <p className="text-[#8E9162] mt-1" style={{ fontFamily: 'Old Standard TT, serif' }}>
          Поделитесь своим кулинарным шедевром с сообществом
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-[#D9D28B]/20">
          <label className="block">
            <div className="border-2 border-dashed border-[#D9D28B]/40 rounded-2xl p-8 text-center hover:border-[#8E9162] transition-colors cursor-pointer">
              <Image size={36} className="mx-auto text-[#B2BD7E] mb-3" />
              <p className="text-[#8E9162] font-medium" style={{ fontFamily: 'Old Standard TT, serif' }}>Нажмите для загрузки фото</p>
              <p className="text-[#8E9162]/60 text-sm mt-1" style={{ fontFamily: 'Old Standard TT, serif' }}>PNG, JPG до 5MB</p>
            </div>
          </label>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#D9D28B]/20 space-y-4">
          <h3 className="font-bold text-[#6A795D] text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Основная информация</h3>
          <div>
            <label className="block text-sm font-medium text-[#8E9162] mb-1" style={{ fontFamily: 'Old Standard TT, serif' }}>Название рецепта *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Паста Карбонара"
              className="w-full px-4 py-3 border border-[#D9D28B]/30 rounded-xl focus:ring-2 focus:ring-[#B2BD7E]/20 focus:border-[#8E9162] outline-none transition-all placeholder:text-[#8E9162]/40"
              style={{ fontFamily: 'Old Standard TT, serif' }}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#8E9162] mb-1" style={{ fontFamily: 'Old Standard TT, serif' }}>Описание *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Расскажите о блюде..."
              rows={3}
              className="w-full px-4 py-3 border border-[#D9D28B]/30 rounded-xl focus:ring-2 focus:ring-[#B2BD7E]/20 focus:border-[#8E9162] outline-none transition-all resize-none placeholder:text-[#8E9162]/40"
              style={{ fontFamily: 'Old Standard TT, serif' }}
              required
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#8E9162] mb-1" style={{ fontFamily: 'Old Standard TT, serif' }}>Подготовка (мин)</label>
              <input type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} className="w-full px-4 py-3 border border-[#D9D28B]/30 rounded-xl focus:ring-2 focus:ring-[#B2BD7E]/20 outline-none" style={{ fontFamily: 'Old Standard TT, serif' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#8E9162] mb-1" style={{ fontFamily: 'Old Standard TT, serif' }}>Готовка (мин)</label>
              <input type="number" value={cookTime} onChange={(e) => setCookTime(e.target.value)} className="w-full px-4 py-3 border border-[#D9D28B]/30 rounded-xl focus:ring-2 focus:ring-[#B2BD7E]/20 outline-none" style={{ fontFamily: 'Old Standard TT, serif' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#8E9162] mb-1" style={{ fontFamily: 'Old Standard TT, serif' }}>Порции</label>
              <input type="number" value={servings} onChange={(e) => setServings(e.target.value)} className="w-full px-4 py-3 border border-[#D9D28B]/30 rounded-xl focus:ring-2 focus:ring-[#B2BD7E]/20 outline-none" style={{ fontFamily: 'Old Standard TT, serif' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#8E9162] mb-1" style={{ fontFamily: 'Old Standard TT, serif' }}>Калории</label>
              <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} className="w-full px-4 py-3 border border-[#D9D28B]/30 rounded-xl focus:ring-2 focus:ring-[#B2BD7E]/20 outline-none" style={{ fontFamily: 'Old Standard TT, serif' }} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#8E9162] mb-1" style={{ fontFamily: 'Old Standard TT, serif' }}>Сложность</label>
            <div className="flex gap-3">
              {[
                { value: 'easy', label: 'Легко' },
                { value: 'medium', label: 'Средне' },
                { value: 'hard', label: 'Сложно' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDifficulty(opt.value as any)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                    difficulty === opt.value
                      ? 'bg-[#6A795D] text-white'
                      : 'bg-[#D9D28B]/10 text-[#8E9162] hover:bg-[#D9D28B]/20 border border-[#D9D28B]/20'
                  }`}
                  style={{ fontFamily: 'Old Standard TT, serif' }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#D9D28B]/20">
          <h3 className="font-bold text-[#6A795D] text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Ингредиенты</h3>
          <div className="space-y-3">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input type="text" value={ing.name} onChange={(e) => updateIngredient(idx, 'name', e.target.value)} placeholder="Название" className="flex-1 px-3 py-2 border border-[#D9D28B]/30 rounded-lg text-sm focus:ring-2 focus:ring-[#B2BD7E]/20 outline-none" style={{ fontFamily: 'Old Standard TT, serif' }} />
                <input type="text" value={ing.amount} onChange={(e) => updateIngredient(idx, 'amount', e.target.value)} placeholder="Кол-во" className="w-20 px-3 py-2 border border-[#D9D28B]/30 rounded-lg text-sm focus:ring-2 focus:ring-[#B2BD7E]/20 outline-none" style={{ fontFamily: 'Old Standard TT, serif' }} />
                <select value={ing.unit} onChange={(e) => updateIngredient(idx, 'unit', e.target.value)} className="w-20 px-2 py-2 border border-[#D9D28B]/30 rounded-lg text-sm focus:ring-2 focus:ring-[#B2BD7E]/20 outline-none" style={{ fontFamily: 'Old Standard TT, serif' }}>
                  <option>г</option><option>кг</option><option>мл</option><option>л</option><option>шт</option><option>ст.л.</option><option>ч.л.</option>
                </select>
                {ingredients.length > 1 && (
                  <button type="button" onClick={() => removeIngredient(idx)} className="p-1 text-[#8E9162] hover:text-[#6A795D] transition-colors">
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={addIngredient} className="mt-3 flex items-center gap-2 text-sm text-[#6A795D] hover:text-[#4A5541] font-medium" style={{ fontFamily: 'Old Standard TT, serif' }}>
            <Plus size={14} />
            Добавить ингредиент
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#D9D28B]/20">
          <h3 className="font-bold text-[#6A795D] text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Шаги приготовления</h3>
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6A795D] text-white flex items-center justify-center font-bold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {idx + 1}
                </div>
                <div className="flex-1 relative">
                  <textarea value={step} onChange={(e) => updateStep(idx, e.target.value)} placeholder={`Шаг ${idx + 1}...`} rows={2} className="w-full px-4 py-2 border border-[#D9D28B]/30 rounded-xl text-sm focus:ring-2 focus:ring-[#B2BD7E]/20 outline-none resize-none" style={{ fontFamily: 'Old Standard TT, serif' }} />
                  {steps.length > 1 && (
                    <button type="button" onClick={() => removeStep(idx)} className="absolute top-2 right-2 p-1 text-[#8E9162] hover:text-[#6A795D]">
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={addStep} className="mt-3 flex items-center gap-2 text-sm text-[#6A795D] hover:text-[#4A5541] font-medium" style={{ fontFamily: 'Old Standard TT, serif' }}>
            <Plus size={14} />
            Добавить шаг
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#D9D28B]/20">
          <h3 className="font-bold text-[#6A795D] text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Теги</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-[#B2BD7E]/20 text-[#6A795D] rounded-full text-sm border border-[#B2BD7E]/30" style={{ fontFamily: 'Old Standard TT, serif' }}>
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Добавить тег..." className="flex-1 px-4 py-2 border border-[#D9D28B]/30 rounded-xl text-sm focus:ring-2 focus:ring-[#B2BD7E]/20 outline-none" style={{ fontFamily: 'Old Standard TT, serif' }} />
            <button type="button" onClick={addTag} className="px-4 py-2 bg-[#D9D28B]/15 text-[#8E9162] rounded-xl text-sm hover:bg-[#D9D28B]/25 transition-colors border border-[#D9D28B]/20" style={{ fontFamily: 'Old Standard TT, serif' }}>
              Добавить
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#6A795D] text-white rounded-2xl font-bold text-lg hover:bg-[#4A5541] hover:shadow-xl transition-all btn-elegant"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Опубликовать рецепт
        </button>
      </form>
    </div>
  );
}
