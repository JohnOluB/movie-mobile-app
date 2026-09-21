import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TabBar, TabType } from './components/TabBar';
import { MatchesView } from './components/MatchesView';
import { WatchlistView } from './components/WatchlistView';
import { EarningsView } from './components/EarningsView';
import { WalletView } from './components/WalletView';
import { MatchDetailModal } from './components/MatchDetailModal';
import { INITIAL_MATCHES, INITIAL_BETS, INITIAL_TRANSACTIONS } from './data/mockMatches';
import { Match, BetSlip, WalletTransaction } from './types';

export function App() {
  const [matches, setMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem('scorestream_matches');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_MATCHES;
  });

  const [bets, setBets] = useState<BetSlip[]>(INITIAL_BETS);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);

  const [activeTab, setActiveTab] = useState<TabType>('matches');
  const [filterTab, setFilterTab] = useState<string>('All');
  const [currentSport, setCurrentSport] = useState<string>('Football');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [refreshToast, setRefreshToast] = useState<string | null>(null);

  // Sync matches to localStorage
  useEffect(() => {
    localStorage.setItem('scorestream_matches', JSON.stringify(matches));
  }, [matches]);

  // Handle bookmark toggle
  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMatches((prev) =>
      prev.map((m) => (m.id === id ? { ...m, bookmarked: !m.bookmarked } : m))
    );
    if (selectedMatch && selectedMatch.id === id) {
      setSelectedMatch((prev) => (prev ? { ...prev, bookmarked: !prev.bookmarked } : null));
    }
  };

  // Handle Live Refresh Simulation
  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);

    setTimeout(() => {
      // Advance match minutes or simulate random live score update
      setMatches((prev) =>
        prev.map((m) => {
          if (m.live) {
            const currentMin = parseInt(m.time.replace(/[^0-9]/g, ''), 10) || 10;
            const newMin = Math.min(currentMin + 3, 90);
            return {
              ...m,
              time: `${newMin}'`,
            };
          }
          return m;
        })
      );

      setIsRefreshing(false);
      setRefreshToast('Scores updated to the latest minute!');
      setTimeout(() => setRefreshToast(null), 2500);
    }, 700);
  };

  const handleAddTransaction = (tx: WalletTransaction) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  // Filter matches by search query
  const searchedMatches = matches.filter((m) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.home.toLowerCase().includes(q) ||
      m.away.toLowerCase().includes(q) ||
      m.leagueName.toLowerCase().includes(q) ||
      m.leagueCountry.toLowerCase().includes(q)
    );
  });

  const watchlistCount = matches.filter((m) => m.bookmarked).length;

  return (
    <div className="min-h-screen bg-[#10101a] flex justify-center text-white font-sans antialiased">
      {/* Mobile container centered on screen */}
      <div className="w-full max-w-md min-h-screen bg-[#141420] flex flex-col shadow-2xl relative border-x border-[#1e1e30]/80">
        {/* Navigation Bar */}
        <Navbar
          currentSport={currentSport}
          onSelectSport={setCurrentSport}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showSearch={showSearch}
          onToggleSearch={() => setShowSearch(!showSearch)}
        />

        {/* Refresh Notification Toast */}
        {refreshToast && (
          <div className="sticky top-16 z-30 mx-4 mt-2 px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold text-center animate-in fade-in slide-in-from-top-2 duration-150">
            {refreshToast}
          </div>
        )}

        {/* Main Content by Tab */}
        <main className="flex-1">
          {activeTab === 'matches' && (
            <MatchesView
              matches={searchedMatches}
              filterTab={filterTab}
              onFilterTabChange={setFilterTab}
              onToggleBookmark={handleToggleBookmark}
              onSelectMatch={setSelectedMatch}
            />
          )}

          {activeTab === 'watchlist' && (
            <WatchlistView
              matches={searchedMatches}
              onToggleBookmark={handleToggleBookmark}
              onSelectMatch={setSelectedMatch}
              onGoToMatches={() => setActiveTab('matches')}
            />
          )}

          {activeTab === 'earnings' && <EarningsView bets={bets} />}

          {activeTab === 'wallet' && (
            <WalletView
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
            />
          )}
        </main>

        {/* Bottom Tab Bar */}
        <TabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          watchlistCount={watchlistCount}
        />

        {/* Match Details Center Modal */}
        <MatchDetailModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onToggleBookmark={handleToggleBookmark}
        />
      </div>
    </div>
  );
}

export default App;
