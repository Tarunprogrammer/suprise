import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Image, Heart, Palette, Share2, Eye, Save } from 'lucide-react';
import GeneralSettings from './GeneralSettings';
import PhotosManager from './PhotosManager';
import WishesManager from './WishesManager';
import SceneCustomizer from './SceneCustomizer';
import PublishModal from './PublishModal';
import { playSfx } from '../../utils/sound';

export default function AdminLayout({ data, isOpen, onClose, onChangeData, onShareSurprise }) {
  const [activeTab, setActiveTab] = useState('photos');
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  if (!isOpen) return null;

  const handleUpdateRecipient = (updatedRecipient) => {
    onChangeData({ ...data, recipient: updatedRecipient });
    triggerSaveToast();
  };

  const handleUpdatePhotos = (updatedPhotos) => {
    onChangeData({ ...data, photos: updatedPhotos });
    triggerSaveToast();
  };

  const handleUpdateWishes = (updatedWishes) => {
    onChangeData({ ...data, wishes: updatedWishes });
    triggerSaveToast();
  };

  const handleUpdateTheme = (updatedTheme) => {
    onChangeData({ ...data, theme: updatedTheme });
    triggerSaveToast();
  };

  const triggerSaveToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-4xl w-full bg-slate-950 border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
                ⚙️
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-white">3D Birthday Surprise Studio</h2>
                <p className="text-xs text-slate-400">Admin CMS - Customize recipient, photos, frames, wishes & music</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  playSfx('magic');
                  setShowPublishModal(true);
                }}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg transition"
              >
                <Share2 className="w-4 h-4" />
                <span>Publish Link</span>
              </button>

              <button
                onClick={() => {
                  playSfx('click');
                  onClose();
                }}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition"
              >
                <Eye className="w-4 h-4" />
                <span>View 3D Surprise</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-1 px-5 pt-3 border-b border-white/10 bg-slate-900/30 overflow-x-auto">
            <TabButton
              id="photos"
              activeId={activeTab}
              label="Photos & Frames"
              icon={Image}
              count={data.photos?.length || 0}
              onClick={setActiveTab}
            />
            <TabButton
              id="wishes"
              activeId={activeTab}
              label="Loved Ones Wishes"
              icon={Heart}
              count={data.wishes?.length || 0}
              onClick={setActiveTab}
            />
            <TabButton
              id="recipient"
              activeId={activeTab}
              label="Recipient Info"
              icon={User}
              onClick={setActiveTab}
            />
            <TabButton
              id="theme"
              activeId={activeTab}
              label="3D Theme & BGM"
              icon={Palette}
              onClick={setActiveTab}
            />
          </div>

          {/* Tab Body */}
          <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
            {activeTab === 'recipient' && (
              <GeneralSettings recipient={data.recipient} onChange={handleUpdateRecipient} />
            )}
            {activeTab === 'photos' && (
              <PhotosManager photos={data.photos} onChange={handleUpdatePhotos} />
            )}
            {activeTab === 'wishes' && (
              <WishesManager wishes={data.wishes} onChange={handleUpdateWishes} />
            )}
            {activeTab === 'theme' && (
              <SceneCustomizer theme={data.theme} onChange={handleUpdateTheme} />
            )}
          </div>

          {/* Save Status Toast */}
          {saveToast && (
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-1.5 shadow-lg backdrop-blur-md">
              <Save className="w-3.5 h-3.5" />
              <span>Saved changes!</span>
            </div>
          )}
        </motion.div>

        {/* Publish Modal nested */}
        <PublishModal
          data={data}
          isOpen={showPublishModal}
          onClose={() => setShowPublishModal(false)}
          onImportData={onChangeData}
        />
      </div>
    </AnimatePresence>
  );
}

function TabButton({ id, activeId, label, icon: Icon, count, onClick }) {
  const isActive = id === activeId;
  return (
    <button
      onClick={() => {
        playSfx('click');
        onClick(id);
      }}
      className={`flex items-center space-x-2 px-4 py-3 border-b-2 text-xs font-bold whitespace-nowrap transition ${
        isActive
          ? 'border-pink-500 text-pink-400 bg-pink-500/10'
          : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      {count !== undefined && (
        <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-[10px]">{count}</span>
      )}
    </button>
  );
}
