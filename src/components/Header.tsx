import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, Search, Plus, Bell, X } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF5]/95 backdrop-blur-md border-b border-[#D9D28B]/30">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-lg hover:bg-[#D9D28B]/20 transition-colors"
          >
            <Menu size={22} className="text-[#6A795D]" />
          </button>
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#6A795D] flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>F</span>
            </div>
            <span className="text-xl font-bold text-[#6A795D] hidden sm:block" style={{ fontFamily: 'Playfair Display, serif' }}>
              FoodShare
            </span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E9162]" />
            <input
              type="text"
              placeholder="Поиск рецептов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#D9D28B]/15 border border-[#D9D28B]/30 rounded-full text-sm focus:bg-white focus:border-[#8E9162] focus:ring-2 focus:ring-[#B2BD7E]/20 outline-none transition-all placeholder:text-[#8E9162]/60"
              style={{ fontFamily: 'Old Standard TT, serif' }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 rounded-lg hover:bg-[#D9D28B]/20 transition-colors"
          >
            <Search size={18} className="text-[#6A795D]" />
          </button>
          <Link
            to="/create"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#6A795D] text-white rounded-full hover:bg-[#4A5541] transition-all text-sm font-medium btn-elegant"
            style={{ fontFamily: 'Old Standard TT, serif' }}
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Создать</span>
          </Link>
          <button className="p-2 rounded-full hover:bg-[#D9D28B]/20 transition-colors relative">
            <Bell size={18} className="text-[#6A795D]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#8E9162] rounded-full"></span>
          </button>
          <Link
            to="/profile"
            className="w-9 h-9 rounded-full bg-[#B2BD7E] flex items-center justify-center text-white font-bold text-sm hover:bg-[#8E9162] transition-all"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            A
          </Link>
        </div>
      </div>

      {showSearch && (
        <div className="md:hidden px-4 pb-3 border-t border-[#D9D28B]/20 animate-fade-in">
          <div className="relative mt-3">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E9162]" />
            <input
              type="text"
              placeholder="Поиск рецептов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-[#D9D28B]/15 border border-[#D9D28B]/30 rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-[#B2BD7E]/20 outline-none placeholder:text-[#8E9162]/60"
              autoFocus
              style={{ fontFamily: 'Old Standard TT, serif' }}
            />
            <button onClick={() => setShowSearch(false)} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={16} className="text-[#8E9162]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
