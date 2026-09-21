import React, { useState } from 'react';
import { BetSlip } from '../types';
import { DollarSign, TrendingUp, CheckCircle, Clock, XCircle, Award } from 'lucide-react';

interface EarningsViewProps {
  bets: BetSlip[];
}

export const EarningsView: React.FC<EarningsViewProps> = ({ bets }) => {
  const [filter, setFilter] = useState<'all' | 'won' | 'pending' | 'lost'>('all');

  const totalWon = bets
    .filter((b) => b.status === 'won')
    .reduce((acc, curr) => acc + (curr.payout - curr.stake), 0);

  const totalStaked = bets.reduce((acc, curr) => acc + curr.stake, 0);
  const settledBets = bets.filter((b) => b.status !== 'pending');
  const wonCount = bets.filter((b) => b.status === 'won').length;
  const winRate = settledBets.length > 0 ? Math.round((wonCount / settledBets.length) * 100) : 0;

  const filteredBets = bets.filter((b) => {
    if (filter === 'won') return b.status === 'won';
    if (filter === 'pending') return b.status === 'pending';
    if (filter === 'lost') return b.status === 'lost';
    return true;
  });

  return (
    <div className="pb-24 pt-3 px-3">
      {/* Earnings Overview Card */}
      <div className="bg-gradient-to-br from-[#1e1e32] via-[#24243c] to-[#181826] p-5 rounded-2xl border border-[#33334e] shadow-xl mb-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-28 h-28 bg-[#e8453c]/10 rounded-full blur-2xl" />

        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">
            Net Profit (30 Days)
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <TrendingUp size={12} />
            +24.8%
          </span>
        </div>

        <div className="text-3xl font-extrabold text-white tracking-tight mb-4">
          ${totalWon.toFixed(2)}
        </div>

        {/* Quick stat row */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#2e2e46] text-center">
          <div>
            <div className="text-[10px] text-gray-400 uppercase">Win Rate</div>
            <div className="text-sm font-bold text-white mt-0.5">{winRate}%</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase">Settled Bets</div>
            <div className="text-sm font-bold text-white mt-0.5">{settledBets.length}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase">Total Stakes</div>
            <div className="text-sm font-bold text-white mt-0.5">${totalStaked.toFixed(0)}</div>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar py-1">
        {(['all', 'won', 'pending', 'lost'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
              filter === status
                ? 'bg-[#2a2a3e] text-white ring-1 ring-[#3e3e58]'
                : 'text-gray-400 hover:text-white bg-[#181826]'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Bets List */}
      <div className="space-y-2.5">
        {filteredBets.map((bet) => (
          <div
            key={bet.id}
            className="bg-[#1e1e2e] rounded-xl p-3.5 border border-[#2a2a3e]/60 hover:bg-[#232338] transition-colors"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-white truncate max-w-[200px]">
                {bet.matchTitle}
              </span>
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  bet.status === 'won'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : bet.status === 'pending'
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'bg-red-500/15 text-red-400 border border-red-500/30'
                }`}
              >
                {bet.status === 'won' ? (
                  <CheckCircle size={10} />
                ) : bet.status === 'pending' ? (
                  <Clock size={10} />
                ) : (
                  <XCircle size={10} />
                )}
                {bet.status.toUpperCase()}
              </span>
            </div>

            <div className="text-xs text-gray-300 font-medium mb-2.5 flex items-center justify-between">
              <span>{bet.pick}</span>
              <span className="font-mono text-[11px] text-gray-400 bg-[#252538] px-1.5 py-0.5 rounded">
                @{bet.odds.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#2a2a3e] text-gray-400">
              <span>Stake: ${bet.stake.toFixed(2)}</span>
              <span
                className={`font-semibold ${
                  bet.status === 'won' ? 'text-emerald-400' : bet.status === 'lost' ? 'text-gray-500 line-through' : 'text-white'
                }`}
              >
                Payout: ${bet.payout.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
