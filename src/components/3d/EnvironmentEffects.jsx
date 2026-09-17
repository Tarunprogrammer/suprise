import React from 'react';
import { Sparkles, Stars } from '@react-three/drei';
import { THEME_PRESETS } from '../../utils/defaultData';

export default function EnvironmentEffects({ themePresetId = 'cosmic' }) {
  const theme = THEME_PRESETS.find((t) => t.id === themePresetId) || THEME_PRESETS[0];

  return (
    <>
      {/* Background Color & Fog */}
      <color attach="background" args={[theme.clearColor]} />
      <fog attach="fog" args={[theme.fogColor, 6, 25]} />

      {/* Lighting Setup */}
      <ambientLight intensity={theme.ambientLight} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color={theme.directionalColor}
        castShadow
      />
      <pointLight position={[-5, 5, -5]} intensity={0.8} color={theme.accentColor} />

      {/* Particle Stars & Sparkles */}
      <Sparkles
        count={120}
        scale={[15, 10, 15]}
        size={3.5}
        speed={0.4}
        color={theme.particleColor}
      />

      {themePresetId === 'cosmic' && (
        <Stars radius={40} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />
      )}
    </>
  );
}
