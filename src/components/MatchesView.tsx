import React from 'react';
import { Match } from '../types';
import { Calendar, ArrowUpDown, Search, ChevronRight, Star } from 'lucide-react';

interface MatchesViewProps {
  matches: Match[];
  filterTab: string;
  onFilterTabChange: (tab: string) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectMatch: (match: Match) => void;
  onOpenDatePicker?: () => void;
}

const TABS = ['All', 'LIVE', 'Upcoming', 'Finished'];

export const MatchesView: React.FC<MatchesViewProps> = ({
  matches,
  filterTab,
  onFilterTabChange,
  onToggleBookmark,
  onSelectMatch,
}) => {
  // Filter matches by status
  const filtered = matches.filter((m) => {
    if (filterTab === 'LIVE') return m.live;
    if (filterTab === 'Upcoming') return m.status === 'upcoming';
    if (filterTab === 'Finished') return m.status === 'finished';
    return true;
  });

  // Group by League
  const leagues = Array.from(new Set(filtered.map((m) => m.leagueName)));

  return (
    <div className="pb-24 pt-2">
      {/* Filter Tabs Bar & Quick Utilities */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {TABS.map((tab) => {
            const isActive = filterTab === tab;
            const count =
              tab === 'LIVE'
                ? matches.filter((m) => m.live).length
                : tab === 'Upcoming'
                ? matches.filter((m) => m.status === 'upcoming').length
                : tab === 'Finished'
                ? matches.filter((m) => m.status === 'finished').length
                : matches.length;

            return (
              <button
                key={tab}
                id={`filter-tab-${tab.toLowerCase()}`}
                onClick={() => onFilterTabChange(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#2a2a3e] text-white shadow-sm ring-1 ring-[#3d3d58]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#1a1a28]'
                }`}
              >
                <span>{tab}</span>
                {tab === 'LIVE' && count > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#e8453c] animate-ping inline-block" />
                )}
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#3a3a54] text-white' : 'bg-[#1e1e2c] text-gray-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Utility Icons */}
        <div className="flex items-center gap-2 pl-2 text-gray-400">
          <button
            title="Today's fixtures"
            className="p-1.5 rounded-lg hover:text-white hover:bg-[#202030] transition-colors"
          >
            <Calendar size={18} />
          </button>
          <button
            title="Sort fixtures"
            className="p-1.5 rounded-lg hover:text-white hover:bg-[#202030] transition-colors"
          >
            <ArrowUpDown size={18} />
          </button>
        </div>
      </div>

      {/* Matches Content */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 px-4">
          <div className="text-4xl mb-3">⚽</div>
          <p className="text-gray-300 font-medium text-base">No matches found</p>
          <p className="text-gray-500 text-xs mt-1">There are no {filterTab.toLowerCase()} matches at the moment.</p>
        </div>
      ) : (
        leagues.map((leagueName) => {
          const leagueMatches = filtered.filter((m) => m.leagueName === leagueName);
          const firstMatch = leagueMatches[0];

          return (
            <div key={leagueName} className="mb-4">
              {/* League Header */}
              <div className="flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-base">{firstMatch.leagueFlag}</span>
                  <span className="text-white text-sm font-semibold">{leagueName}</span>
                  <span className="text-gray-500 font-normal">{firstMatch.leagueCountry}</span>
                </div>
                <ChevronRight size={16} className="text-gray-500" />
              </div>

              {/* Match Cards */}
              <div className="space-y-2 px-3">
                {leagueMatches.map((match) => (
                  <div
                    key={match.id}
                    id={`match-card-${match.id}`}
                    onClick={() => onSelectMatch(match)}
                    className="relative flex items-center bg-[#1e1e2e] hover:bg-[#242438] active:bg-[#282840] transition-colors rounded-xl px-3.5 py-3 cursor-pointer overflow-hidden border border-[#2a2a3e]/50 shadow-sm"
                  >
                    {/* Live indicator bar */}
                    {match.live && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#e8453c] shadow-[0_0_8px_rgba(232,69,60,0.8)]" />
                    )}

                    {/* Time / Period */}
                    <div className="w-12 text-center shrink-0 pr-2 border-r border-[#2d2d42]">
                      <div
                        className={`text-xs font-bold leading-tight ${
                          match.live ? 'text-[#e8453c]' : match.status === 'finished' ? 'text-gray-400' : 'text-white'
                        }`}
                      >
                        {match.time}
                      </div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                        {match.period}
                      </div>
                    </div>

                    {/* Teams and Emojis */}
                    <div className="flex-1 px-3 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-sm shrink-0">{match.homeEmoji}</span>
                          <span className="text-sm text-white font-medium truncate">{match.home}</span>
                        </div>
                        <span
                          className={`text-sm font-bold ml-2 ${
                            match.status === 'upcoming' ? 'text-gray-500' : 'text-white'
                          }`}
                        >
                          {match.status === 'upcoming' ? '-' : match.homeScore}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-sm shrink-0">{match.awayEmoji}</span>
                          <span className="text-sm text-white font-medium truncate">{match.away}</span>
                        </div>
                        <span
                          className={`text-sm font-bold ml-2 ${
                            match.status === 'upcoming' ? 'text-gray-500' : 'text-white'
                          }`}
                        >
                          {match.status === 'upcoming' ? '-' : match.awayScore}
                        </span>
                      </div>
                    </div>

                    {/* Bookmark Toggle */}
                    <button
                      id={`bookmark-${match.id}`}
                      onClick={(e) => onToggleBookmark(match.id, e)}
                      className="p-1.5 text-gray-500 hover:text-[#e8453c] transition-colors ml-1"
                      title={match.bookmarked ? 'Remove from watchlist' : 'Add to watchlist'}
                    >
                      <Star
                        size={19}
                        className={`transition-all ${
                          match.bookmarked ? 'fill-[#e8453c] text-[#e8453c] scale-110' : 'text-[#555566]'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
