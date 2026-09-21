import React, { useState } from 'react';
import { Match } from '../types';
import { X, Star, Trophy, Clock, MapPin, UserCheck, Flame } from 'lucide-react';

interface MatchDetailModalProps {
  match: Match | null;
  onClose: () => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({
  match,
  onClose,
  onToggleBookmark,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'timeline' | 'stats' | 'lineups' | 'info'>('timeline');

  if (!match) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#181826] border border-[#2d2d42] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header with League & Close */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#252538] bg-[#141420]">
          <div className="flex items-center gap-2">
            <span className="text-base">{match.leagueFlag}</span>
            <span className="text-xs font-semibold text-gray-300">
              {match.leagueName} • {match.leagueCountry}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onToggleBookmark(match.id, e)}
              className="p-1.5 text-gray-400 hover:text-[#e8453c] transition-colors rounded-lg"
              title="Bookmark match"
            >
              <Star
                size={18}
                className={match.bookmarked ? 'fill-[#e8453c] text-[#e8453c]' : ''}
              />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-[#252538] rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scoreboard Banner */}
        <div className="bg-gradient-to-b from-[#1a1a2c] to-[#161624] px-6 py-5 text-center border-b border-[#252538]">
          <div className="flex items-center justify-center gap-2 mb-3">
            {match.live ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e8453c]/20 border border-[#e8453c]/40 text-[#e8453c] text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8453c] animate-ping" />
                Live {match.time}
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-[#2a2a3e] text-gray-300 text-xs font-semibold">
                {match.period} • {match.time}
              </span>
            )}
          </div>

          {/* Teams and Big Score */}
          <div className="grid grid-cols-7 items-center justify-items-center">
            {/* Home Team */}
            <div className="col-span-3 flex flex-col items-center">
              <span className="text-3xl mb-1.5">{match.homeEmoji}</span>
              <span className="text-sm sm:text-base font-bold text-white text-center leading-tight">
                {match.home}
              </span>
            </div>

            {/* Score */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {match.status === 'upcoming' ? 'vs' : `${match.homeScore} - ${match.awayScore}`}
              </div>
              <span className="text-[10px] text-gray-400 mt-0.5">
                {match.status === 'finished' ? 'Final Score' : match.status === 'upcoming' ? 'Kickoff' : match.period}
              </span>
            </div>

            {/* Away Team */}
            <div className="col-span-3 flex flex-col items-center">
              <span className="text-3xl mb-1.5">{match.awayEmoji}</span>
              <span className="text-sm sm:text-base font-bold text-white text-center leading-tight">
                {match.away}
              </span>
            </div>
          </div>
        </div>

        {/* Sub-tabs Navigation */}
        <div className="flex border-b border-[#252538] bg-[#141420] text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('timeline')}
            className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
              activeSubTab === 'timeline'
                ? 'border-[#e8453c] text-white bg-[#1a1a2c]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setActiveSubTab('stats')}
            className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
              activeSubTab === 'stats'
                ? 'border-[#e8453c] text-white bg-[#1a1a2c]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveSubTab('lineups')}
            className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
              activeSubTab === 'lineups'
                ? 'border-[#e8453c] text-white bg-[#1a1a2c]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Lineups
          </button>
          <button
            onClick={() => setActiveSubTab('info')}
            className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
              activeSubTab === 'info'
                ? 'border-[#e8453c] text-white bg-[#1a1a2c]'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Match Info
          </button>
        </div>

        {/* Subtab Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* TIMELINE */}
          {activeSubTab === 'timeline' && (
            <div className="space-y-3">
              {match.events.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-8">
                  No match events recorded yet.
                </p>
              ) : (
                match.events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-[#1e1e2e] border border-[#2a2a3e]"
                  >
                    <span className="text-xs font-bold text-gray-400 w-8">{event.minute}</span>
                    <div className="text-lg">
                      {event.type === 'goal' ? '⚽' : event.type === 'yellow_card' ? '🟨' : '🟥'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <span>{event.player}</span>
                        <span className="text-[10px] text-gray-400">
                          ({event.team === 'home' ? match.home : match.away})
                        </span>
                      </div>
                      {event.assist && (
                        <div className="text-[10px] text-gray-400">Assist: {event.assist}</div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* STATS */}
          {activeSubTab === 'stats' && (
            <div className="space-y-4">
              {match.stats.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-8">
                  Statistics will be available once the match begins.
                </p>
              ) : (
                match.stats.map((stat, idx) => {
                  const total = stat.homeValue + stat.awayValue || 1;
                  const homePercent = stat.isPercentage
                    ? stat.homeValue
                    : Math.round((stat.homeValue / total) * 100);
                  const awayPercent = stat.isPercentage
                    ? stat.awayValue
                    : Math.round((stat.awayValue / total) * 100);

                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-300 font-semibold">
                        <span>{stat.homeValue}{stat.isPercentage ? '%' : ''}</span>
                        <span className="text-gray-400 font-normal">{stat.label}</span>
                        <span>{stat.awayValue}{stat.isPercentage ? '%' : ''}</span>
                      </div>
                      <div className="h-2 bg-[#2a2a3e] rounded-full overflow-hidden flex">
                        <div
                          style={{ width: `${homePercent}%` }}
                          className="bg-[#e8453c] h-full rounded-l-full"
                        />
                        <div
                          style={{ width: `${awayPercent}%` }}
                          className="bg-blue-500 h-full rounded-r-full"
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* LINEUPS */}
          {activeSubTab === 'lineups' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* Home starting */}
                <div className="bg-[#1e1e2e] p-3 rounded-xl border border-[#2a2a3e]">
                  <div className="font-bold text-white mb-1">{match.home}</div>
                  <div className="text-[10px] text-[#e8453c] mb-2 font-semibold">
                    Formation: {match.lineups.homeFormation}
                  </div>
                  <div className="space-y-1.5">
                    {match.lineups.homeStarting.map((player) => (
                      <div key={player.number} className="flex items-center justify-between text-gray-300">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-gray-500 font-mono text-[10px] w-4">{player.number}</span>
                          <span className="truncate">{player.name}</span>
                        </div>
                        <span className="text-[9px] px-1 bg-[#252538] text-gray-400 rounded">
                          {player.pos}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Away starting */}
                <div className="bg-[#1e1e2e] p-3 rounded-xl border border-[#2a2a3e]">
                  <div className="font-bold text-white mb-1">{match.away}</div>
                  <div className="text-[10px] text-blue-400 mb-2 font-semibold">
                    Formation: {match.lineups.awayFormation}
                  </div>
                  <div className="space-y-1.5">
                    {match.lineups.awayStarting.map((player) => (
                      <div key={player.number} className="flex items-center justify-between text-gray-300">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-gray-500 font-mono text-[10px] w-4">{player.number}</span>
                          <span className="truncate">{player.name}</span>
                        </div>
                        <span className="text-[9px] px-1 bg-[#252538] text-gray-400 rounded">
                          {player.pos}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MATCH INFO */}
          {activeSubTab === 'info' && (
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 p-3 bg-[#1e1e2e] rounded-xl border border-[#2a2a3e]">
                <MapPin size={16} className="text-[#e8453c]" />
                <div>
                  <div className="text-gray-400 text-[10px]">Stadium</div>
                  <div className="text-white font-medium">{match.stadium}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-[#1e1e2e] rounded-xl border border-[#2a2a3e]">
                <UserCheck size={16} className="text-blue-400" />
                <div>
                  <div className="text-gray-400 text-[10px]">Referee</div>
                  <div className="text-white font-medium">{match.referee}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-[#1e1e2e] rounded-xl border border-[#2a2a3e]">
                <Trophy size={16} className="text-amber-400" />
                <div>
                  <div className="text-gray-400 text-[10px]">Tournament</div>
                  <div className="text-white font-medium">
                    {match.leagueName} ({match.leagueCountry})
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
