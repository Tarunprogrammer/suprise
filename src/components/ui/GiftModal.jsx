import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Sparkles, Award } from 'lucide-react';
import { fireConfettiBurst } from './ConfettiOverlay';
import { playSfx } from '../../utils/sound';

export default function GiftModal({ gift, onClose }) {
  useEffect(() => {
    if (gift) {
      fireConfettiBurst();
    }
  }, [gift]);

  if (!gift) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -30 }}
          className="relative max-w-md w-full bg-gradient-to-b from-slate-900 via-purple-950 to-slate-950 border border-amber-500/30 rounded-3xl p-6 shadow-2xl text-white text-center overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              playSfx('click');
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Gift Icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-400 p-0.5 shadow-xl shadow-pink-500/30 flex items-center justify-center animate-bounce">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
              <Gift className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-3 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Surprise Gift Unlocked!</span>
          </div>

          <h3 className="text-2xl font-extrabold text-white mb-4">
            {gift.title || '🎁 Special Birthday Gift'}
          </h3>

          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 font-medium text-base mb-6 leading-relaxed shadow-inner">
            {gift.content || 'Enjoy your extra special birthday treat! 🎉'}
          </div>

          <button
            onClick={() => {
              playSfx('click');
              onClose();
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition active:scale-95 flex items-center justify-center space-x-2"
          >
            <Award className="w-4 h-4" />
            <span>Claim Birthday Gift ✨</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
