import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Image, Clock, Users, Tag } from 'lucide-react';

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

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: 'г' }]);
  };

  const removeIngredient = (idx: number) => {
    setIngredients(ingredients.filter((_, i) => i !== idx));
  };

  const updateIngredient = (idx: number, field: string, value: string) => {
    const updated = [...ingredients];
    updated[idx] = { ...updated[idx], [field]: value };
    setIngredients(updated);
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const removeStep = (idx: number) => {
    setSteps(steps.filter((_, i) => i !== idx));
  };

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

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="text-7xl mb-6 animate-bounce">🎉</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Рецепт создан!</h2>
        <p className="text-gray-500 text-lg">Ваш рецепт опубликован и доступен всем пользователям</p>
        <div className="mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm">
            <span>✅</span> Перенаправление на главную...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Создать рецепт</h1>
        <p className="text-gray-500 mt-1">Поделитесь своим кулинарным шедевром с сообществом</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image upload */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <label className="block">
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-orange-300 transition-colors cursor-pointer">
              <Image size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">Нажмите для загрузки фото</p>
              <p className="text-gray-400 text-sm mt-1">PNG, JPG до 5MB</p>
            </div>
          </label>
        </div>

        {/* Basic info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
          <h3 className="font-bold text-gray-900 text-lg">Основная информация</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Название рецепта *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Паста Карбонара"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Описание *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Расскажите о блюде..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none transition-all resize-none"
              required
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Подготовка (мин)</label>
              <input
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Готовка (мин)</label>
              <input
                type="number"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Порции</label>
              <input
                type="number"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Калории</label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-300 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Сложность</label>
            <div className="flex gap-3">
              {[
                { value: 'easy', label: '🟢 Легко' },
                { value: 'medium', label: '🟡 Средне' },
                { value: 'hard', label: '🔴 Сложно' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDifficulty(opt.value as any)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                    difficulty === opt.value
                      ? 'bg-orange-100 text-orange-700 border-2 border-orange-300'
                      : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg mb-4">🥘 Ингредиенты</h3>
          <div className="space-y-3">
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={ing.name}
                  onChange={(e) => updateIngredient(idx, 'name', e.target.value)}
                  placeholder="Название"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-200 outline-none"
                />
                <input
                  type="text"
                  value={ing.amount}
                  onChange={(e) => updateIngredient(idx, 'amount', e.target.value)}
                  placeholder="Кол-во"
                  className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-200 outline-none"
                />
                <select
                  value={ing.unit}
                  onChange={(e) => updateIngredient(idx, 'unit', e.target.value)}
                  className="w-20 px-2 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-200 outline-none"
                >
                  <option>г</option>
                  <option>кг</option>
                  <option>мл</option>
                  <option>л</option>
                  <option>шт</option>
                  <option>ст.л.</option>
                  <option>ч.л.</option>
                </select>
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(idx)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addIngredient}
            className="mt-3 flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 font-medium"
          >
            <Plus size={16} />
            Добавить ингредиент
          </button>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg mb-4">👨‍🍳 Шаги приготовления</h3>
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-400 text-white flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1 relative">
                  <textarea
                    value={step}
                    onChange={(e) => updateStep(idx, e.target.value)}
                    placeholder={`Шаг ${idx + 1}...`}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-200 outline-none resize-none"
                  />
                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(idx)}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addStep}
            className="mt-3 flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 font-medium"
          >
            <Plus size={16} />
            Добавить шаг
          </button>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg mb-4">🏷️ Теги</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
              >
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Добавить тег..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-200 outline-none"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm hover:bg-gray-200 transition-colors"
            >
              Добавить
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-orange-200 transition-all"
        >
          🚀 Опубликовать рецепт
        </button>
      </form>
    </div>
  );
}
