import React from 'react';
import { User, Sparkles, Lock, Type } from 'lucide-react';

export default function GeneralSettings({ recipient = {}, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...recipient,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
          <User className="w-5 h-5 text-pink-400" /> Recipient & Birthday Person Details
        </h3>
        <p className="text-xs text-slate-400">Customize the birthday person's name, age, and greeting text.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Recipient Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
          <input
            type="text"
            value={recipient.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g. Alex Parker"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-pink-500 transition"
          />
        </div>

        {/* Nickname / Title Badge */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Nickname / Badge</label>
          <input
            type="text"
            value={recipient.nickname || ''}
            onChange={(e) => handleChange('nickname', e.target.value)}
            placeholder="e.g. Birthday Star ⭐"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-pink-500 transition"
          />
        </div>

        {/* Birthday Age */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Birthday Age</label>
          <input
            type="text"
            value={recipient.age || ''}
            onChange={(e) => handleChange('age', e.target.value)}
            placeholder="e.g. 25"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-pink-500 transition"
          />
        </div>

        {/* Admin Lock PIN */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
            <span>Admin PIN Protection</span>
            <span className="text-[10px] text-slate-400">(Optional)</span>
          </label>
          <input
            type="password"
            value={recipient.pinCode || ''}
            onChange={(e) => handleChange('pinCode', e.target.value)}
            placeholder="Leave blank for open access"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-pink-500 transition"
          />
        </div>
      </div>

      {/* Greeting Title */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Main Surprise Title</label>
        <input
          type="text"
          value={recipient.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g. Happy 25th Birthday Alex!"
          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-pink-500 transition"
        />
      </div>

      {/* Subtitle / Welcome Text */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Welcome Subtitle Message</label>
        <textarea
          rows={3}
          value={recipient.subtitle || ''}
          onChange={(e) => handleChange('subtitle', e.target.value)}
          placeholder="Write a warm introductory message for the intro screen..."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-pink-500 transition resize-none"
        />
      </div>
    </div>
  );
}
