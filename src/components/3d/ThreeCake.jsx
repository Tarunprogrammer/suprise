import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { playSfx } from '../../utils/sound';

export default function ThreeCake({
  cakeColor = '#ff4081',
  frostingColor = '#ffffff',
  candleCount = 5,
  isBlown = false,
  onBlowCandles
}) {
  const cakeGroupRef = useRef();
  const flameLightRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (cakeGroupRef.current) {
      cakeGroupRef.current.rotation.y += delta * 0.2;
    }
    if (flameLightRef.current && !isBlown) {
      flameLightRef.current.intensity = 2.0 + Math.sin(state.clock.elapsedTime * 12) * 0.4;
    }
  });

  const handleCakeClick = (e) => {
    e.stopPropagation();
    if (!isBlown && onBlowCandles) {
      playSfx('blow');
      setTimeout(() => playSfx('cheer'), 400);
      onBlowCandles();
    }
  };

  // Generate Candle Positions in a circle on top tier
  const candles = [];
  const radius = 0.55;
  for (let i = 0; i < Math.min(candleCount, 12); i++) {
    const angle = (i / Math.min(candleCount, 12)) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    candles.push({ id: i, x, z });
  }

  return (
    <group position={[0, -0.6, 0]}>
      {/* Interactive Floating Label above Cake */}
      <Float speed={2} floatIntensity={0.4}>
        <Text
          position={[0, 2.2, 0]}
          fontSize={0.22}
          color={isBlown ? "#38bdf8" : "#fbbf24"}
          outlineWidth={0.03}
          outlineColor="#000000"
          anchorX="center"
          anchorY="middle"
        >
          {isBlown ? "🎉 Wishes Granted!" : "🎂 Click Cake to Blow Candles!"}
        </Text>
      </Float>

      <group
        ref={cakeGroupRef}
        onClick={handleCakeClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        {/* Cake Stand / Plate */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[1.5, 1.3, 0.1, 32]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.5, 0.7, 0.2, 32]} />
          <meshStandardMaterial color="#b8860b" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Bottom Tier */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.6, 32]} />
          <meshStandardMaterial color={cakeColor} roughness={0.4} />
        </mesh>
        {/* Bottom Tier Frosting Ring */}
        <mesh position={[0, 0.55, 0]}>
          <torusGeometry args={[1.21, 0.06, 16, 32]} />
          <meshStandardMaterial color={frostingColor} roughness={0.2} />
        </mesh>

        {/* Top Tier */}
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.6, 32]} />
          <meshStandardMaterial color={cakeColor} roughness={0.4} />
        </mesh>
        {/* Top Tier Frosting Cover */}
        <mesh position={[0, 1.16, 0]}>
          <cylinderGeometry args={[0.82, 0.82, 0.05, 32]} />
          <meshStandardMaterial color={frostingColor} roughness={0.2} />
        </mesh>

        {/* Decorative Strawberries/Cherries around top tier */}
        {[0, 1, 2, 3, 4, 5].map((idx) => {
          const a = (idx / 6) * Math.PI * 2;
          return (
            <mesh key={`cherry-${idx}`} position={[Math.cos(a) * 0.75, 1.22, Math.sin(a) * 0.75]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial color="#dc2626" roughness={0.1} />
            </mesh>
          );
        })}

        {/* Candles */}
        {candles.map((c) => (
          <group key={`candle-${c.id}`} position={[c.x, 1.4, c.z]}>
            {/* Candle Stick */}
            <mesh>
              <cylinderGeometry args={[0.03, 0.03, 0.4, 16]} />
              <meshStandardMaterial
                color={c.id % 2 === 0 ? '#38bdf8' : '#f472b6'}
                roughness={0.3}
              />
            </mesh>
            {/* Candle Wick */}
            <mesh position={[0, 0.22, 0]}>
              <cylinderGeometry args={[0.006, 0.006, 0.06, 8]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>

            {/* Flame (If NOT blown out) */}
            {!isBlown && (
              <group position={[0, 0.28, 0]}>
                <mesh>
                  <coneGeometry args={[0.04, 0.12, 12]} />
                  <meshStandardMaterial
                    color="#f59e0b"
                    emissive="#ff0000"
                    emissiveIntensity={3}
                    toneMapped={false}
                  />
                </mesh>
                <pointLight color="#fbbf24" distance={1.2} intensity={1.5} />
              </group>
            )}

            {/* Smoke particle when blown out */}
            {isBlown && (
              <mesh position={[0, 0.35, 0]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial color="#94a3b8" opacity={0.6} transparent />
              </mesh>
            )}
          </group>
        ))}

        {/* Global Warm Candle Light (If NOT blown) */}
        {!isBlown && (
          <pointLight
            ref={flameLightRef}
            position={[0, 2.0, 0]}
            color="#fef08a"
            intensity={2.5}
            distance={6}
          />
        )}
      </group>
    </group>
  );
}
