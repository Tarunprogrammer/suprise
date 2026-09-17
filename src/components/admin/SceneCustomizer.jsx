import React from 'react';
import { Palette, Music, Flame, Sparkles } from 'lucide-react';
import { THEME_PRESETS, PRESET_AUDIO_TRACKS } from '../../utils/defaultData';
import { playSfx } from '../../utils/sound';

export default function SceneCustomizer({ theme = {}, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...theme,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-pink-400" /> 3D Theme & Audio Customizer
        </h3>
        <p className="text-xs text-slate-400">Choose the 3D room theme, cake design, candle count, and ambient birthday music.</p>
      </div>

      {/* 3D Theme Preset Picker */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2">3D Environment Theme Preset</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {THEME_PRESETS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                playSfx('click');
                handleChange('presetId', t.id);
              }}
              className={`p-3 rounded-2xl text-left border transition relative overflow-hidden ${
                theme.presetId === t.id
                  ? 'bg-pink-500/20 border-pink-500 text-white shadow-xl ring-2 ring-pink-500/50'
                  : 'bg-slate-900 border-white/10 text-slate-400 hover:border-white/30'
              }`}
            >
              <div className="font-bold text-sm text-white mb-1">{t.name}</div>
              <div className="flex items-center space-x-1.5 mt-2">
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: t.clearColor }} />
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: t.particleColor }} />
                <span className="w-4 h-4 rounded-full" style={{ backgroundColor: t.accentColor }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* BGM Music Picker */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
          <Music className="w-4 h-4 text-indigo-400" /> Background Birthday Music Track
        </label>
        <div className="space-y-2">
          {PRESET_AUDIO_TRACKS.map((track) => (
            <button
              key={track.id}
              type="button"
              onClick={() => {
                playSfx('click');
                handleChange('bgMusicUrl', track.url);
              }}
              className={`w-full p-3 rounded-xl text-left text-xs font-semibold border transition flex items-center justify-between ${
                theme.bgMusicUrl === track.url
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                  : 'bg-slate-900 border-white/10 text-slate-400 hover:bg-slate-800'
              }`}
            >
              <span>{track.name}</span>
              {theme.bgMusicUrl === track.url && <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />}
            </button>
          ))}
        </div>

        {/* Custom Audio URL */}
        <div className="mt-3">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Custom BGM Audio URL</label>
          <input
            type="text"
            value={theme.bgMusicUrl || ''}
            onChange={(e) => handleChange('bgMusicUrl', e.target.value)}
            placeholder="Paste custom MP3 audio link..."
            className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-xs"
          />
        </div>
      </div>

      {/* Cake & Candle Controls */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-400" /> 3D Cake & Candle Settings
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Number of Lit Candles ({theme.candleCount || 5})</label>
            <input
              type="range"
              min={1}
              max={12}
              value={theme.candleCount || 5}
              onChange={(e) => handleChange('candleCount', parseInt(e.target.value))}
              className="w-full accent-pink-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Floating Balloons Count ({theme.balloonCount || 16})</label>
            <input
              type="range"
              min={6}
              max={30}
              value={theme.balloonCount || 16}
              onChange={(e) => handleChange('balloonCount', parseInt(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Cake Color</label>
            <input
              type="color"
              value={theme.cakeColor || '#ff4081'}
              onChange={(e) => handleChange('cakeColor', e.target.value)}
              className="w-full h-9 rounded-xl bg-slate-950 border border-white/15 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Frosting Color</label>
            <input
              type="color"
              value={theme.frostingColor || '#ffffff'}
              onChange={(e) => handleChange('frostingColor', e.target.value)}
              className="w-full h-9 rounded-xl bg-slate-950 border border-white/15 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
