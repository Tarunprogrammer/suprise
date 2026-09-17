import React, { useState, useEffect } from 'react';
import { DEFAULT_SURPRISE_DATA } from './utils/defaultData';
import { loadLocalSurpriseData, saveLocalSurpriseData, decodeSurpriseFromUrlHash } from './utils/storage';
import { playBgm, stopBgm, toggleGlobalMute, playSfx } from './utils/sound';

import BirthdayScene from './components/3d/BirthdayScene';
import NavigationHeader from './components/ui/NavigationHeader';
import SurpriseIntroModal from './components/ui/SurpriseIntroModal';
import PhotoDetailModal from './components/ui/PhotoDetailModal';
import WishDetailModal from './components/ui/WishDetailModal';
import GiftModal from './components/ui/GiftModal';
import AdminLayout from './components/admin/AdminLayout';
import PublishModal from './components/admin/PublishModal';
import { fireConfettiBurst } from './components/ui/ConfettiOverlay';

export default function App() {
  const [data, setData] = useState(() => {
    // 1. Check if URL hash has encoded published surprise data
    const urlData = decodeSurpriseFromUrlHash();
    if (urlData) return urlData;
    // 2. Otherwise load from local storage
    return loadLocalSurpriseData();
  });

  const [showIntro, setShowIntro] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedWish, setSelectedWish] = useState(null);
  const [selectedGift, setSelectedGift] = useState(null);

  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [isPlayingBgm, setIsPlayingBgm] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Save changes to localStorage whenever data changes
  useEffect(() => {
    saveLocalSurpriseData(data);
  }, [data]);

  // Handle start surprise from Intro Modal
  const handleStartSurprise = () => {
    setShowIntro(false);
    setIsPlayingBgm(true);
    playBgm(data.theme?.bgMusicUrl || DEFAULT_SURPRISE_DATA.theme.bgMusicUrl);
    fireConfettiBurst();
  };

  // Toggle Background Music
  const handleToggleBgm = () => {
    if (isPlayingBgm) {
      stopBgm();
      setIsPlayingBgm(false);
    } else {
      playBgm(data.theme?.bgMusicUrl || DEFAULT_SURPRISE_DATA.theme.bgMusicUrl);
      setIsPlayingBgm(true);
    }
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    toggleGlobalMute(nextMute);
  };

  // Blow out Candles on 3D Cake
  const handleBlowCandles = () => {
    setIsCandleBlown(true);
    fireConfettiBurst();
  };

  // Admin Data update handler
  const handleDataChange = (newData) => {
    setData(newData);
  };

  return (
    <main className="w-screen h-screen relative bg-slate-950 overflow-hidden font-sans select-none">
      {/* Top Floating Navigation Bar */}
      <NavigationHeader
        recipientName={data.recipient?.name || 'Alex'}
        isPlayingBgm={isPlayingBgm}
        onToggleBgm={handleToggleBgm}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onShareSurprise={() => setShowPublishModal(true)}
      />

      {/* Main 3D Birthday Room Canvas */}
      <BirthdayScene
        data={data}
        isCandleBlown={isCandleBlown}
        onBlowCandles={handleBlowCandles}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
        onSelectWish={(wish) => setSelectedWish(wish)}
        onOpenGift={(gift) => setSelectedGift(gift)}
        selectedPhoto={selectedPhoto}
      />

      {/* Intro Welcome Modal */}
      <SurpriseIntroModal
        recipient={data.recipient || {}}
        isOpen={showIntro}
        onStartSurprise={handleStartSurprise}
      />

      {/* Photo Detail Modal with Secret Memory Flip Card */}
      <PhotoDetailModal
        photo={selectedPhoto}
        photos={data.photos || []}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
      />

      {/* Wish Detail Modal with Loved Ones Messages & Audio */}
      <WishDetailModal
        wish={selectedWish}
        onClose={() => setSelectedWish(null)}
      />

      {/* Unwrapped Gift Modal */}
      <GiftModal
        gift={selectedGift}
        onClose={() => setSelectedGift(null)}
      />

      {/* Admin Studio Dashboard CMS */}
      <AdminLayout
        data={data}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onChangeData={handleDataChange}
        onShareSurprise={() => setShowPublishModal(true)}
      />

      {/* Standalone Share & Publish Modal */}
      <PublishModal
        data={data}
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onImportData={handleDataChange}
      />
    </main>
  );
}
