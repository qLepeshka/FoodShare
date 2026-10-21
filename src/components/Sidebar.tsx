import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Calendar, Heart, User, ChefHat, X, Utensils, Leaf, Fish, Beef, Cake, Coffee, Soup } from 'lucide-react';
import { categories } from '../data/mockData';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: '/', icon: Home, label: 'Главная' },
  { path: '/planner', icon: Calendar, label: 'Планировщик' },
  { path: '/create', icon: ChefHat, label: 'Создать рецепт' },
  { path: '/saved', icon: Heart, label: 'Сохранённые' },
  { path: '/profile', icon: User, label: 'Профиль' },
];

const categoryIcons: Record<string, any> = {
  italian: Utensils,
  japanese: Fish,
  healthy: Leaf,
  desserts: Cake,
  meat: Beef,
  fish: Fish,
  breakfast: Coffee,
  soups: Soup,
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#6A795D]/20 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-[#FAFAF5] border-r border-[#D9D28B]/30 z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <button onClick={onClose} className="md:hidden absolute top-4 right-4 p-1 rounded hover:bg-[#D9D28B]/20">
            <X size={20} className="text-[#6A795D]" />
          </button>

          <nav className="space-y-1 mt-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#D9D28B]/30 text-[#6A795D] font-medium'
                      : 'text-[#8E9162] hover:bg-[#D9D28B]/15 hover:text-[#6A795D]'
                  }`}
                  style={{ fontFamily: 'Old Standard TT, serif' }}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8">
            <h3 className="px-4 text-xs font-semibold text-[#8E9162]/60 uppercase tracking-wider mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              Категории
            </h3>
            <nav className="space-y-1">
              {categories.map((cat) => {
                const Icon = categoryIcons[cat.id] || Utensils;
                return (
                  <Link
                    key={cat.id}
                    to={`/?category=${cat.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#8E9162] hover:bg-[#D9D28B]/15 hover:text-[#6A795D] rounded-lg transition-colors"
                    style={{ fontFamily: 'Old Standard TT, serif' }}
                  >
                    <Icon size={16} />
                    <span>{cat.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-8 mx-4 p-4 bg-[#B2BD7E]/15 rounded-xl border border-[#B2BD7E]/20">
            <div className="flex items-center gap-2 mb-1.5">
              <Utensils size={14} className="text-[#6A795D]" />
              <span className="text-xs font-semibold text-[#6A795D]" style={{ fontFamily: 'Playfair Display, serif' }}>API Ready</span>
            </div>
            <p className="text-xs text-[#8E9162]" style={{ fontFamily: 'Old Standard TT, serif' }}>
              Готово к интеграции с .NET бэкендом
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
