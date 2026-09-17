import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Settings, Share2, Sparkles, Check } from 'lucide-react';
import { playSfx } from '../../utils/sound';

export default function NavigationHeader({
  recipientName = 'Alex',
  isPlayingBgm,
  onToggleBgm,
  isMuted,
  onToggleMute,
  onOpenAdmin,
  onShareSurprise
}) {
  const [copied, setCopied] = useState(false);

  const handleShareClick = () => {
    playSfx('click');
    if (onShareSurprise) {
      onShareSurprise();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-30 p-4 flex items-center justify-between pointer-events-none">
      {/* Recipient Title Badge */}
      <div className="pointer-events-auto flex items-center space-x-3 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-xl">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="text-white font-bold text-base tracking-wide flex items-center gap-1.5">
            Happy Birthday, <span className="text-pink-400 font-extrabold">{recipientName}</span> 🎉
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block">Explore the 3D world: Cake, Photos, Wishes & Gifts!</p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="pointer-events-auto flex items-center space-x-2">
        {/* BGM Toggle */}
        <button
          onClick={() => {
            playSfx('click');
            onToggleBgm();
          }}
          className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all duration-200 shadow-lg ${
            isPlayingBgm
              ? 'bg-pink-500/20 border-pink-500/40 text-pink-300 hover:bg-pink-500/30 shadow-pink-500/10'
              : 'bg-slate-900/80 border-white/10 text-slate-300 hover:bg-slate-800'
          }`}
          title={isPlayingBgm ? 'Pause Background Music' : 'Play Background Music'}
        >
          <Music className={`w-4 h-4 ${isPlayingBgm ? 'animate-spin' : ''}`} />
          <span className="hidden md:inline">{isPlayingBgm ? 'Music ON' : 'Music OFF'}</span>
        </button>

        {/* Global Sound Mute */}
        <button
          onClick={() => {
            playSfx('click');
            onToggleMute();
          }}
          className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 backdrop-blur-md transition-all shadow-lg"
          title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>

        {/* Share Button */}
        <button
          onClick={handleShareClick}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold backdrop-blur-md shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? 'Link Copied!' : 'Publish & Share'}</span>
        </button>

        {/* Admin Builder Button */}
        <button
          onClick={() => {
            playSfx('click');
            onOpenAdmin();
          }}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-pink-500/30 text-pink-300 text-xs font-semibold backdrop-blur-md shadow-lg transition-all"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Admin CMS</span>
        </button>
      </div>
    </header>
  );
}
