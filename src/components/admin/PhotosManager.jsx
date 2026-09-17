import React, { useState } from 'react';
import { Image, Plus, Trash2, Sparkles, Upload, Eye } from 'lucide-react';
import { FRAME_STYLES } from '../../utils/defaultData';
import { playSfx } from '../../utils/sound';

export default function PhotosManager({ photos = [], onChange }) {
  const [editingId, setEditingId] = useState(null);

  const handleAddPhoto = () => {
    playSfx('click');
    const newPhoto = {
      id: `photo_${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
      title: 'New Memory Moment',
      caption: 'Add a special description here...',
      hiddenMemory: 'Write a secret funny story here for the photo back flip!',
      frameStyle: 'neon',
      date: 'Special Day',
      position: [0, 2.0, -2.0],
      rotation: [0, 0, 0]
    };
    onChange([...photos, newPhoto]);
    setEditingId(newPhoto.id);
  };

  const handleUpdatePhoto = (id, field, value) => {
    onChange(
      photos.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleDeletePhoto = (id) => {
    playSfx('click');
    onChange(photos.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleImageUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleUpdatePhoto(id, 'url', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Image className="w-5 h-5 text-pink-400" /> 3D Photos & Crazy Frames Manager
          </h3>
          <p className="text-xs text-slate-400">Add photos, choose wild 3D crazy frame styles, and write secret memory notes.</p>
        </div>
        <button
          onClick={handleAddPhoto}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-xs font-bold shadow-lg transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
      </div>

      {/* Photo List */}
      <div className="space-y-4">
        {photos.map((photo, index) => {
          const isExpanded = editingId === photo.id;
          const frameInfo = FRAME_STYLES.find((f) => f.id === photo.frameStyle) || FRAME_STYLES[0];

          return (
            <div
              key={photo.id}
              className="p-4 rounded-2xl bg-slate-900 border border-white/10 space-y-4 transition"
            >
              {/* Photo Header Summary */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-12 h-12 rounded-xl object-cover border border-white/15"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      #{index + 1} {photo.title || 'Untitled Photo'}
                      <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-semibold">
                        {frameInfo.name}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{photo.caption}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingId(isExpanded ? null : photo.id)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition"
                  >
                    {isExpanded ? 'Done' : 'Edit Frame'}
                  </button>
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 transition"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Expanded Editor Form */}
              {isExpanded && (
                <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Image URL & File Upload */}
                  <div className="sm:col-span-2 space-y-2">
                    <label className="block font-semibold text-slate-300">Photo Image Source</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={photo.url}
                        onChange={(e) => handleUpdatePhoto(photo.id, 'url', e.target.value)}
                        placeholder="Paste image URL here..."
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-white text-xs"
                      />
                      <label className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(photo.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Frame Style Selector */}
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-300 mb-2">
                      Select 3D "Crazy Frame" Style
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {FRAME_STYLES.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => {
                            playSfx('click');
                            handleUpdatePhoto(photo.id, 'frameStyle', f.id);
                          }}
                          className={`p-2.5 rounded-xl text-left border transition ${
                            photo.frameStyle === f.id
                              ? 'bg-pink-500/20 border-pink-500 text-white shadow-lg'
                              : 'bg-slate-950 border-white/10 text-slate-400 hover:border-white/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs">{f.name}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-pink-300">
                              {f.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{f.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photo Title */}
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Title Caption</label>
                    <input
                      type="text"
                      value={photo.title}
                      onChange={(e) => handleUpdatePhoto(photo.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-white"
                    />
                  </div>

                  {/* Memory Date */}
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Memory Date / Place</label>
                    <input
                      type="text"
                      value={photo.date}
                      onChange={(e) => handleUpdatePhoto(photo.id, 'date', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-white"
                    />
                  </div>

                  {/* Front Caption */}
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-300 mb-1">Main Caption Story</label>
                    <input
                      type="text"
                      value={photo.caption}
                      onChange={(e) => handleUpdatePhoto(photo.id, 'caption', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/15 text-white"
                    />
                  </div>

                  {/* Hidden Flip Memory Note */}
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-pink-300 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Secret Memory Note (Revealed on Photo Flip)
                    </label>
                    <textarea
                      rows={2}
                      value={photo.hiddenMemory}
                      onChange={(e) => handleUpdatePhoto(photo.id, 'hiddenMemory', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-pink-500/30 text-white resize-none"
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
