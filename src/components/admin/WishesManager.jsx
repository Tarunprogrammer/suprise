import React, { useState } from 'react';
import { Heart, Plus, Trash2, Mic, Upload } from 'lucide-react';
import { playSfx } from '../../utils/sound';

export default function WishesManager({ wishes = [], onChange }) {
  const [editingId, setEditingId] = useState(null);

  const handleAddWish = () => {
    playSfx('click');
    const newWish = {
      id: `wish_${Date.now()}`,
      senderName: 'Best Friend',
      relation: 'Bestie 🚀',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      message: 'Happy Birthday! Wishing you endless laughter, joy, and success in everything you pursue!',
      audioUrl: '',
      envelopeColor: '#ec4899',
      position: [2.5, 2.5, -1.0]
    };
    onChange([...wishes, newWish]);
    setEditingId(newWish.id);
  };

  const handleUpdateWish = (id, field, value) => {
    onChange(
      wishes.map((w) => (w.id === id ? { ...w, [field]: value } : w))
    );
  };

  const handleDeleteWish = (id) => {
    playSfx('click');
    onChange(wishes.filter((w) => w.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleAvatarUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleUpdateWish(id, 'avatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" /> Wishes & Messages from Loved Ones
          </h3>
          <p className="text-xs text-slate-400">Add love notes, family wishes, avatars, and audio voice messages.</p>
        </div>
        <button
          onClick={handleAddWish}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-xs font-bold shadow-lg transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Wish</span>
        </button>
      </div>

      <div className="space-y-4">
        {wishes.map((wish, index) => {
          const isExpanded = editingId === wish.id;

          return (
            <div key={wish.id} className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {wish.avatar ? (
                    <img src={wish.avatar} alt={wish.senderName} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
                      {wish.senderName?.charAt(0) || '❤️'}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      #{index + 1} {wish.senderName}
                      <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px]">
                        {wish.relation}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1">"{wish.message}"</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingId(isExpanded ? null : wish.id)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition"
                  >
                    {isExpanded ? 'Done' : 'Edit Wish'}
                  </button>
                  <button
                    onClick={() => handleDeleteWish(wish.id)}
                    className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Sender Name</label>
                    <input
                      type="text"
                      value={wish.senderName}
                      onChange={(e) => handleUpdateWish(wish.id, 'senderName', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Relationship Tag</label>
                    <input
                      type="text"
                      value={wish.relation}
                      onChange={(e) => handleUpdateWish(wish.id, 'relation', e.target.value)}
                      placeholder="e.g. Mom, Bestie, Brother"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-300 mb-1">Avatar Image</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={wish.avatar}
                        onChange={(e) => handleUpdateWish(wish.id, 'avatar', e.target.value)}
                        placeholder="Avatar URL..."
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-white"
                      />
                      <label className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleAvatarUpload(wish.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-300 mb-1">Heartfelt Wish Message</label>
                    <textarea
                      rows={3}
                      value={wish.message}
                      onChange={(e) => handleUpdateWish(wish.id, 'message', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-white resize-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-indigo-300 mb-1 flex items-center gap-1">
                      <Mic className="w-3.5 h-3.5" /> Voice Note / Audio Link (Optional)
                    </label>
                    <input
                      type="text"
                      value={wish.audioUrl || ''}
                      onChange={(e) => handleUpdateWish(wish.id, 'audioUrl', e.target.value)}
                      placeholder="Paste MP3 audio URL for voice wish..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-indigo-500/30 text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
