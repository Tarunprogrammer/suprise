import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import EnvironmentEffects from './EnvironmentEffects';
import ThreeCake from './ThreeCake';
import PhotoFrame3D from './PhotoFrame3D';
import WishEnvelopes3D from './WishEnvelopes3D';
import GiftBox3D from './GiftBox3D';
import FloatingBalloons from './FloatingBalloons';

export default function BirthdayScene({
  data,
  isCandleBlown,
  onBlowCandles,
  onSelectPhoto,
  onSelectWish,
  onOpenGift,
  selectedPhoto
}) {
  const theme = data?.theme || {};
  const photos = data?.photos || [];
  const wishes = data?.wishes || [];
  const gifts = data?.gifts || [];

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-950 select-none">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1.5, 6.5]} fov={50} />

        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.05}
          minPolarAngle={Math.PI / 6}
          minDistance={3.5}
          maxDistance={12}
          dampingFactor={0.05}
          rotateSpeed={0.6}
        />

        <Suspense fallback={null}>
          {/* Theme Background, Lighting & Particles */}
          <EnvironmentEffects themePresetId={theme.presetId || 'cosmic'} />

          {/* Center 3D Birthday Cake */}
          <ThreeCake
            cakeColor={theme.cakeColor || '#ff4081'}
            frostingColor={theme.frostingColor || '#ffffff'}
            candleCount={theme.candleCount || 5}
            isBlown={isCandleBlown}
            onBlowCandles={onBlowCandles}
          />

          {/* 3D Photo Frames with "Crazy Frames" */}
          {photos.map((photo) => (
            <PhotoFrame3D
              key={photo.id}
              photo={photo}
              onSelectPhoto={onSelectPhoto}
              isSelected={selectedPhoto?.id === photo.id}
            />
          ))}

          {/* 3D Wish Envelopes */}
          <WishEnvelopes3D wishes={wishes} onSelectWish={onSelectWish} />

          {/* 3D Gift Boxes */}
          {gifts.map((gift) => (
            <GiftBox3D key={gift.id} gift={gift} onOpenGift={onOpenGift} />
          ))}

          {/* Floating Balloons */}
          <FloatingBalloons count={theme.balloonCount || 16} />
        </Suspense>
      </Canvas>
    </div>
  );
}
