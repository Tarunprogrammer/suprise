import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Play, Pause, Volume2 } from 'lucide-react';
import { playSfx } from '../../utils/sound';

export default function WishDetailModal({ wish, onClose }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = React.useRef(null);

  if (!wish) return null;

  const toggleAudio = () => {
    playSfx('click');
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioRef.current.play();
        setIsPlayingAudio(true);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          className="relative max-w-md w-full bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border border-white/20 rounded-3xl p-6 shadow-2xl text-white overflow-hidden"
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

          {/* Sender Header */}
          <div className="flex items-center space-x-4 mb-6">
            {wish.avatar ? (
              <img
                src={wish.avatar}
                alt={wish.senderName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-pink-500/50 shadow-lg"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-500 flex items-center justify-center font-bold text-xl text-white shadow-lg">
                {wish.senderName?.charAt(0) || '❤️'}
              </div>
            )}
            <div>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-1.5">
                {wish.senderName || 'Loved One'}
              </h3>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mt-1">
                {wish.relation || 'Wish'}
              </span>
            </div>
          </div>

          {/* Heart Decor Quote Box */}
          <div className="relative p-5 rounded-2xl bg-white/5 border border-white/10 mb-6">
            <Heart className="w-8 h-8 text-pink-500/30 absolute top-3 right-3" />
            <p className="text-base text-slate-200 leading-relaxed font-serif italic">
              "{wish.message}"
            </p>
          </div>

          {/* Audio Voice Note Player (If audioUrl provided) */}
          {wish.audioUrl && (
            <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleAudio}
                  className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white transition shadow-md"
                >
                  {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div>
                  <h5 className="text-xs font-bold text-white flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-indigo-400" /> Voice Wish Audio
                  </h5>
                  <p className="text-[10px] text-slate-400">Click play to listen</p>
                </div>
              </div>
              <audio
                ref={audioRef}
                src={wish.audioUrl}
                onEnded={() => setIsPlayingAudio(false)}
              />
            </div>
          )}

          <div className="text-center pt-2">
            <span className="text-xs text-pink-400 font-medium">✨ Sent with lots of love & warm birthday wishes</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
