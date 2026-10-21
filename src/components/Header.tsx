import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, Search, Plus, Bell, User, X } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🍳</span>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent hidden sm:block">
              FoodShare
            </span>
          </Link>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск рецептов, ингредиентов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-full focus:bg-white focus:border-orange-300 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Search size={20} className="text-gray-600" />
          </button>
          <Link
            to="/create"
            className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:shadow-lg transition-all text-sm font-medium"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Создать</span>
          </Link>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <Link
            to="/profile"
            className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white font-bold text-sm hover:shadow-md transition-all"
          >
            👩‍🍳
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      {showSearch && (
        <div className="md:hidden px-4 pb-3 border-t border-gray-100">
          <div className="relative mt-3">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск рецептов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-gray-100 rounded-full focus:bg-white focus:ring-2 focus:ring-orange-200 outline-none"
              autoFocus
            />
            <button onClick={() => setShowSearch(false)} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={18} className="text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
