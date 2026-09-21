import React from 'react';
import { Trophy, Star, DollarSign, Wallet, RefreshCw } from 'lucide-react';

export type TabType = 'matches' | 'watchlist' | 'earnings' | 'wallet';

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  watchlistCount: number;
}

export const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  onTabChange,
  onRefresh,
  isRefreshing,
  watchlistCount,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a1a2a] border-t border-[#2a2a3e]/60 pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {/* Matches */}
        <button
          id="tab-matches-button"
          onClick={() => onTabChange('matches')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'matches' ? 'text-[#e8453c]' : 'text-[#666677] hover:text-[#9999aa]'
          }`}
        >
          <Trophy size={20} className={activeTab === 'matches' ? 'scale-110' : ''} />
          <span className="text-[11px] mt-1 font-medium">Matches</span>
        </button>

        {/* Watchlist */}
        <button
          id="tab-watchlist-button"
          onClick={() => onTabChange('watchlist')}
          className={`flex flex-col items-center justify-center flex-1 py-1 relative transition-colors ${
            activeTab === 'watchlist' ? 'text-[#e8453c]' : 'text-[#666677] hover:text-[#9999aa]'
          }`}
        >
          <div className="relative">
            <Star size={20} className={activeTab === 'watchlist' ? 'scale-110 fill-[#e8453c]' : ''} />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#e8453c] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </div>
          <span className="text-[11px] mt-1 font-medium">Watchlist</span>
        </button>

        {/* Earnings */}
        <button
          id="tab-earnings-button"
          onClick={() => onTabChange('earnings')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'earnings' ? 'text-[#e8453c]' : 'text-[#666677] hover:text-[#9999aa]'
          }`}
        >
          <DollarSign size={20} className={activeTab === 'earnings' ? 'scale-110' : ''} />
          <span className="text-[11px] mt-1 font-medium">Earnings</span>
        </button>

        {/* Wallet */}
        <button
          id="tab-wallet-button"
          onClick={() => onTabChange('wallet')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            activeTab === 'wallet' ? 'text-[#e8453c]' : 'text-[#666677] hover:text-[#9999aa]'
          }`}
        >
          <Wallet size={20} className={activeTab === 'wallet' ? 'scale-110' : ''} />
          <span className="text-[11px] mt-1 font-medium">Wallet</span>
        </button>

        {/* Refresh */}
        <button
          id="tab-refresh-button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex flex-col items-center justify-center flex-1 py-1 text-[#666677] hover:text-[#e8453c] transition-colors"
        >
          <RefreshCw size={20} className={isRefreshing ? 'animate-spin text-[#e8453c]' : ''} />
          <span className="text-[11px] mt-1 font-medium">{isRefreshing ? 'Updating...' : 'Refresh'}</span>
        </button>
      </div>
    </nav>
  );
};
