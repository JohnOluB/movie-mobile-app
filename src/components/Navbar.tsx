import React, { useState } from 'react';
import { RefreshCw, Search, ChevronDown, Bell } from 'lucide-react';

interface NavbarProps {
  currentSport: string;
  onSelectSport: (sport: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  showSearch: boolean;
  onToggleSearch: () => void;
}

const SPORTS = ['Football', 'Basketball', 'Tennis', 'Baseball'];

export const Navbar: React.FC<NavbarProps> = ({
  currentSport,
  onSelectSport,
  onRefresh,
  isRefreshing,
  searchQuery,
  onSearchChange,
  showSearch,
  onToggleSearch,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#141420]/95 backdrop-blur border-b border-[#252538]">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl select-none" role="img" aria-label="app logo">
            🪸
          </span>
          <span className="font-bold text-base tracking-wide text-white hidden sm:inline">
            ScoreStream
          </span>
        </div>

        {/* Sports dropdown */}
        <div className="relative">
          <button
            id="sports-dropdown-button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#333348] bg-[#1a1a2c] hover:bg-[#252538] transition-colors text-sm text-white font-medium shadow-sm"
          >
            <span>⚽</span>
            <span>{currentSport}</span>
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 w-36 bg-[#1e1e2e] border border-[#33334a] rounded-xl shadow-2xl py-1 z-50 overflow-hidden">
              {SPORTS.map((sport) => (
                <button
                  key={sport}
                  onClick={() => {
                    onSelectSport(sport);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-[#2a2a40] transition-colors ${
                    currentSport === sport ? 'text-[#e8453c] font-semibold bg-[#252538]' : 'text-gray-200'
                  }`}
                >
                  <span>{sport === 'Football' ? '⚽' : sport === 'Basketball' ? '🏀' : sport === 'Tennis' ? '🎾' : '⚾'}</span>
                  <span>{sport}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          <button
            id="search-toggle-button"
            onClick={onToggleSearch}
            className={`p-2 rounded-lg transition-colors ${showSearch ? 'bg-[#e8453c]/20 text-[#e8453c]' : 'text-gray-400 hover:text-white hover:bg-[#202030]'}`}
            title="Search matches"
          >
            <Search size={18} />
          </button>

          <button
            id="refresh-button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#202030] transition-colors disabled:opacity-50"
            title="Refresh scores"
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin text-[#e8453c]' : ''} />
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      {showSearch && (
        <div className="px-4 pb-3 pt-1 border-t border-[#202030] bg-[#181826]">
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3 text-gray-400" />
            <input
              id="match-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search team, league, or country..."
              className="w-full bg-[#12121c] border border-[#2a2a3e] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e8453c]"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
