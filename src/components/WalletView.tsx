import React, { useState } from 'react';
import { WalletTransaction } from '../types';
import { Wallet, ArrowDownLeft, ArrowUpRight, Plus, CreditCard, ShieldCheck } from 'lucide-react';

interface WalletViewProps {
  transactions: WalletTransaction[];
  onAddTransaction: (tx: WalletTransaction) => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  transactions,
  onAddTransaction,
}) => {
  const [balance, setBalance] = useState(3450.0);
  const [modalMode, setModalMode] = useState<'deposit' | 'withdraw' | null>(null);
  const [amountInput, setAmountInput] = useState('100');

  const handleAction = () => {
    const val = parseFloat(amountInput);
    if (isNaN(val) || val <= 0) return;

    if (modalMode === 'withdraw' && val > balance) {
      alert('Insufficient balance');
      return;
    }

    const isDeposit = modalMode === 'deposit';
    const newBalance = isDeposit ? balance + val : balance - val;
    setBalance(newBalance);

    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      type: isDeposit ? 'deposit' : 'withdrawal',
      amount: isDeposit ? val : -val,
      description: isDeposit ? 'Quick Deposit (Card)' : 'Standard Withdrawal (Bank)',
      date: 'Just now',
      status: 'completed',
    };

    onAddTransaction(newTx);
    setModalMode(null);
    setAmountInput('100');
  };

  return (
    <div className="pb-24 pt-3 px-3">
      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-[#1c1c30] via-[#22223a] to-[#181828] p-5 rounded-2xl border border-[#33334e] shadow-xl mb-4 relative overflow-hidden">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">
            Available Balance
          </span>
          <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            <ShieldCheck size={12} />
            Verified
          </span>
        </div>

        <div className="text-3xl font-extrabold text-white tracking-tight mb-4">
          ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setModalMode('deposit')}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#e8453c] hover:bg-[#d03d35] text-white text-xs font-bold transition-all shadow-md shadow-[#e8453c]/20 active:scale-98"
          >
            <Plus size={16} />
            Deposit
          </button>
          <button
            onClick={() => setModalMode('withdraw')}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2a2a3e] hover:bg-[#34344e] text-white text-xs font-bold transition-all border border-[#3a3a52] active:scale-98"
          >
            <ArrowUpRight size={16} />
            Withdraw
          </button>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="mb-2 flex items-center justify-between px-1">
        <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
          Transaction History
        </h3>
        <span className="text-[11px] text-gray-500">{transactions.length} records</span>
      </div>

      <div className="space-y-2">
        {transactions.map((tx) => {
          const isPositive = tx.amount > 0;
          return (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-xl bg-[#1e1e2e] border border-[#2a2a3e]/50 hover:bg-[#232338] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    isPositive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
                  }`}
                >
                  {isPositive ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">{tx.description}</div>
                  <div className="text-[10px] text-gray-400">{tx.date}</div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`text-xs font-bold ${
                    isPositive ? 'text-emerald-400' : 'text-gray-300'
                  }`}
                >
                  {isPositive ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                </div>
                <div className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">
                  {tx.status}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deposit/Withdraw Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#1e1e2e] border border-[#33334a] w-full max-w-sm rounded-2xl p-5 shadow-2xl">
            <h3 className="text-base font-bold text-white capitalize mb-1">
              {modalMode === 'deposit' ? 'Add Funds to Wallet' : 'Withdraw Funds'}
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Enter the amount in USD you would like to {modalMode}.
            </p>

            <div className="mb-4">
              <label className="text-[11px] text-gray-400 block mb-1 uppercase font-semibold">
                Amount ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  min="10"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="w-full bg-[#141420] border border-[#33334e] rounded-xl pl-7 pr-3 py-2.5 text-white font-bold text-lg focus:outline-none focus:border-[#e8453c]"
                />
              </div>

              <div className="flex gap-2 mt-2">
                {['25', '50', '100', '250'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmountInput(preset)}
                    className="flex-1 py-1 rounded-lg bg-[#252538] hover:bg-[#2f2f48] text-xs text-gray-300 font-medium transition-colors"
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setModalMode(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#252538] hover:bg-[#2f2f48] text-xs font-semibold text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                className="flex-1 py-2.5 rounded-xl bg-[#e8453c] hover:bg-[#d03d35] text-xs font-semibold text-white transition-colors shadow-lg shadow-[#e8453c]/30"
              >
                Confirm {modalMode === 'deposit' ? 'Deposit' : 'Withdrawal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
