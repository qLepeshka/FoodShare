import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Calendar, Heart, User, ChefHat, X, Utensils } from 'lucide-react';

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

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-4">
          <button onClick={onClose} className="md:hidden absolute top-4 right-4 p-1 rounded hover:bg-gray-100">
            <X size={20} />
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
                      ? 'bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Categories */}
          <div className="mt-8">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Категории
            </h3>
            <nav className="space-y-1">
              {['🍕 Итальянская', '🍣 Японская', '🥗 Здоровое', '🍰 Десерты', '🥩 Мясо', '🐟 Рыба'].map(
                (cat) => (
                  <button
                    key={cat}
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {cat}
                  </button>
                )
              )}
            </nav>
          </div>

          {/* API Info */}
          <div className="mt-8 mx-4 p-3 bg-blue-50 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <Utensils size={14} className="text-blue-500" />
              <span className="text-xs font-semibold text-blue-700">API Ready</span>
            </div>
            <p className="text-xs text-blue-600">
              Готово к интеграции с .NET бэкендом
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
