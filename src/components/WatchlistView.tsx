import React, { useState } from 'react';
import { Match } from '../types';
import { Star, Bell, BellOff, ChevronRight } from 'lucide-react';

interface WatchlistViewProps {
  matches: Match[];
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onSelectMatch: (match: Match) => void;
  onGoToMatches: () => void;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({
  matches,
  onToggleBookmark,
  onSelectMatch,
  onGoToMatches,
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const bookmarkedMatches = matches.filter((m) => m.bookmarked);

  return (
    <div className="pb-24 pt-3 px-3">
      {/* Header and alerts toggle */}
      <div className="flex items-center justify-between px-1 mb-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-1.5">
            <Star size={18} className="fill-[#e8453c] text-[#e8453c]" />
            Watchlist
          </h2>
          <p className="text-xs text-gray-400">
            {bookmarkedMatches.length} {bookmarkedMatches.length === 1 ? 'match' : 'matches'} saved
          </p>
        </div>

        <button
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            notificationsEnabled
              ? 'bg-[#e8453c]/10 text-[#e8453c] border-[#e8453c]/40'
              : 'bg-[#1e1e2e] text-gray-400 border-[#333348]'
          }`}
          title="Toggle Goal Alerts"
        >
          {notificationsEnabled ? <Bell size={13} /> : <BellOff size={13} />}
          <span>{notificationsEnabled ? 'Alerts ON' : 'Muted'}</span>
        </button>
      </div>

      {bookmarkedMatches.length === 0 ? (
        <div className="text-center py-16 px-4 bg-[#1a1a28] rounded-2xl border border-[#252538] mt-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#202032] flex items-center justify-center text-gray-500 mb-3">
            <Star size={26} />
          </div>
          <h3 className="text-white font-semibold text-base mb-1">Your Watchlist is Empty</h3>
          <p className="text-gray-400 text-xs max-w-xs mx-auto mb-5">
            Star your favorite matches to track live scores, goal alerts, and real-time updates here.
          </p>
          <button
            onClick={onGoToMatches}
            className="px-5 py-2.5 rounded-xl bg-[#e8453c] hover:bg-[#d03d35] text-white text-xs font-semibold shadow-lg shadow-[#e8453c]/30 transition-all active:scale-95"
          >
            Explore Today's Fixtures
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {bookmarkedMatches.map((match) => (
            <div
              key={match.id}
              onClick={() => onSelectMatch(match)}
              className="relative flex items-center bg-[#1e1e2e] hover:bg-[#242438] transition-colors rounded-xl px-3.5 py-3 cursor-pointer border border-[#2a2a3e]/50 shadow-sm"
            >
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

              {/* Teams and Scores */}
              <div className="flex-1 px-3 space-y-1.5">
                <div className="text-[10px] text-gray-400 flex items-center gap-1 mb-0.5">
                  <span>{match.leagueFlag}</span>
                  <span>{match.leagueName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{match.homeEmoji}</span>
                    <span className="text-sm text-white font-medium">{match.home}</span>
                  </div>
                  <span className="text-sm font-bold text-white">
                    {match.status === 'upcoming' ? '-' : match.homeScore}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{match.awayEmoji}</span>
                    <span className="text-sm text-white font-medium">{match.away}</span>
                  </div>
                  <span className="text-sm font-bold text-white">
                    {match.status === 'upcoming' ? '-' : match.awayScore}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => onToggleBookmark(match.id, e)}
                  className="p-1.5 text-[#e8453c] hover:opacity-80 transition-opacity"
                  title="Remove from watchlist"
                >
                  <Star size={18} className="fill-[#e8453c]" />
                </button>
                <ChevronRight size={16} className="text-gray-500" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
