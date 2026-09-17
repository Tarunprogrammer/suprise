import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Calendar, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { FRAME_STYLES } from '../../utils/defaultData';
import { playSfx } from '../../utils/sound';

export default function PhotoDetailModal({ photo, photos = [], onClose, onSelectPhoto }) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!photo) return null;

  const currentIdx = photos.findIndex((p) => p.id === photo.id);
  const frameInfo = FRAME_STYLES.find((f) => f.id === photo.frameStyle) || FRAME_STYLES[0];

  const handleNext = () => {
    playSfx('click');
    setIsFlipped(false);
    const nextIdx = (currentIdx + 1) % photos.length;
    onSelectPhoto(photos[nextIdx]);
  };

  const handlePrev = () => {
    playSfx('click');
    setIsFlipped(false);
    const prevIdx = (currentIdx - 1 + photos.length) % photos.length;
    onSelectPhoto(photos[prevIdx]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-2xl w-full bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl text-white overflow-hidden"
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

          {/* Header info */}
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              Frame: {frameInfo.name}
            </span>
            {photo.date && (
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {photo.date}
              </span>
            )}
          </div>

          {/* Photo & Flip Container */}
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-5 bg-slate-950 flex items-center justify-center border border-white/10">
            {!isFlipped ? (
              <img
                src={photo.url}
                alt={photo.title || 'Memory'}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <div className="w-full h-full p-8 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 flex flex-col items-center justify-center text-center">
                <Sparkles className="w-8 h-8 text-pink-400 mb-3 animate-bounce" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-pink-300 mb-2">Secret Memory Story</h4>
                <p className="text-lg font-medium text-slate-200 leading-relaxed italic max-w-md">
                  "{photo.hiddenMemory || photo.caption || 'A memory that will stay in our hearts forever!'}"
                </p>
              </div>
            )}
          </div>

          {/* Caption & Controls */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-white mb-1">{photo.title || 'Special Moment'}</h3>
              <p className="text-sm text-slate-300">{photo.caption}</p>
            </div>

            {/* Flip Card Action */}
            <button
              onClick={() => {
                playSfx('magic');
                setIsFlipped(!isFlipped);
              }}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-300 text-xs font-bold transition shadow-lg"
            >
              <RotateCw className="w-4 h-4" />
              <span>{isFlipped ? 'Show Photo' : 'Flip Secret Note'}</span>
            </button>
          </div>

          {/* Next / Prev Navigation */}
          {photos.length > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 text-xs text-slate-400">
              <button
                onClick={handlePrev}
                className="flex items-center space-x-1 hover:text-white transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Frame</span>
              </button>
              <span>{currentIdx + 1} of {photos.length}</span>
              <button
                onClick={handleNext}
                className="flex items-center space-x-1 hover:text-white transition"
              >
                <span>Next Frame</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
