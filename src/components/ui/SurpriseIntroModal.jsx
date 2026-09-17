import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Heart, Music } from 'lucide-react';
import { playSfx } from '../../utils/sound';

export default function SurpriseIntroModal({ recipient, isOpen, onStartSurprise }) {
  if (!isOpen) return null;

  const handleStart = () => {
    playSfx('cheer');
    if (onStartSurprise) {
      onStartSurprise();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-lg w-full bg-gradient-to-b from-slate-900 via-indigo-950/90 to-purple-950 p-8 rounded-3xl border border-white/20 shadow-2xl text-center overflow-hidden"
        >
          {/* Background Ambient Glow Orbs */}
          <div className="absolute -top-16 -left-16 w-40 h-40 bg-pink-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl" />

          {/* Top Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-semibold mb-6 shadow-inner">
            <Sparkles className="w-4 h-4 text-pink-400 animate-spin" />
            <span>Personalized 3D Birthday Experience</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 leading-tight">
            {recipient.title || `Happy Birthday ${recipient.name}!`}
          </h1>

          <p className="text-sm text-slate-300 mb-8 leading-relaxed px-2">
            {recipient.subtitle || 'A special interactive world filled with 3D photos in crazy frames, lit candles, secret gifts, and wishes from loved ones awaits you!'}
          </p>

          {/* Surprise Feature Badges */}
          <div className="grid grid-cols-3 gap-3 mb-8 text-left">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
              <Gift className="w-5 h-5 text-pink-400 mb-1" />
              <span className="text-xs font-bold text-white">3D Gifts</span>
              <span className="text-[10px] text-slate-400">Click to unwrap</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
              <Sparkles className="w-5 h-5 text-yellow-400 mb-1" />
              <span className="text-xs font-bold text-white">Crazy Frames</span>
              <span className="text-[10px] text-slate-400">Interactive 3D photos</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
              <Heart className="w-5 h-5 text-indigo-400 mb-1" />
              <span className="text-xs font-bold text-white">Love Notes</span>
              <span className="text-[10px] text-slate-400">Floating wishes</span>
            </div>
          </div>

          {/* Enter Button */}
          <button
            onClick={handleStart}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-pink-500/25 transition-all transform active:scale-95 flex items-center justify-center space-x-2"
          >
            <Music className="w-5 h-5" />
            <span>Enter 3D Birthday World 🎁</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
