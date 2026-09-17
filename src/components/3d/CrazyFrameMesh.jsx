import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Procedural 3D Frame Borders for the 8 "Crazy Frame" styles.
 * Dimensions: Photo plane width = 2.0, height = 1.5, depth = 0.05
 */
export default function CrazyFrameMesh({ styleId = 'neon', isFocused = false }) {
  const groupRef = useRef();
  const neonGlowRef = useRef();

  useFrame((state, delta) => {
    if (neonGlowRef.current && styleId === 'neon') {
      neonGlowRef.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 4) * 0.8;
    }
    if (groupRef.current && styleId === 'holographic') {
      groupRef.current.rotation.z += delta * 0.5;
    }
  });

  const width = 2.0;
  const height = 1.5;
  const borderThickness = 0.18;

  switch (styleId) {
    case 'neon':
      return (
        <group>
          {/* Main Neon Border */}
          <mesh position={[0, 0, -0.02]}>
            <boxGeometry args={[width + borderThickness * 2, height + borderThickness * 2, 0.08]} />
            <meshStandardMaterial
              color="#0d0221"
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          {/* Glowing Neon Outline Frame */}
          <mesh position={[0, 0, 0.02]}>
            <torusGeometry args={[1.2, 0.04, 16, 32]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={2}
              toneMapped={false}
            />
          </mesh>
          <pointLight ref={neonGlowRef} color="#ff007f" distance={3} intensity={2} />
          {/* Corner Cyber Nodes */}
          {[-1.1, 1.1].map((x) =>
            [-0.85, 0.85].map((y) => (
              <mesh key={`${x}-${y}`} position={[x, y, 0.04]}>
                <boxGeometry args={[0.15, 0.15, 0.12]} />
                <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={3} />
              </mesh>
            ))
          )}
        </group>
      );

    case 'gold':
      return (
        <group>
          {/* Royal Baroque Gold Frame */}
          <mesh position={[0, 0, -0.03]}>
            <boxGeometry args={[width + 0.35, height + 0.35, 0.12]} />
            <meshStandardMaterial
              color="#ffd700"
              metalness={0.95}
              roughness={0.15}
              envMapIntensity={2.5}
            />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[width + 0.15, height + 0.15, 0.08]} />
            <meshStandardMaterial color="#b8860b" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Royal Corner Gems */}
          {[-1.15, 1.15].map((x) =>
            [-0.9, 0.9].map((y) => (
              <group key={`gold-${x}-${y}`} position={[x, y, 0.06]}>
                <mesh>
                  <sphereGeometry args={[0.12, 16, 16]} />
                  <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
                </mesh>
                <mesh position={[0, 0, 0.05]}>
                  <octahedronGeometry args={[0.07]} />
                  <meshStandardMaterial color="#dc2626" emissive="#991b1b" roughness={0.1} />
                </mesh>
              </group>
            ))
          )}
        </group>
      );

    case 'polaroid':
      return (
        <group>
          {/* Classic Polaroid White Card */}
          <mesh position={[0, -0.15, -0.02]}>
            <boxGeometry args={[width + 0.25, height + 0.55, 0.04]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.6} />
          </mesh>
          {/* Decorative Washi Tape Top Left */}
          <mesh position={[-0.8, 0.85, 0.03]} rotation={[0, 0, 0.35]}>
            <boxGeometry args={[0.5, 0.15, 0.02]} />
            <meshStandardMaterial color="#f472b6" opacity={0.85} transparent />
          </mesh>
          {/* Handwritten Style Label */}
          <Text
            position={[0, -0.85, 0.03]}
            fontSize={0.12}
            color="#334155"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/caveat/v18/Wblm6nflXqi247NM9jI2.woff"
          >
            ★ Unforgettable Memory ★
          </Text>
        </group>
      );

    case 'heart':
      return (
        <group>
          {/* Sparkling Pink Border */}
          <mesh position={[0, 0, -0.02]}>
            <boxGeometry args={[width + 0.3, height + 0.3, 0.08]} />
            <meshStandardMaterial color="#ec4899" roughness={0.3} metalness={0.2} />
          </mesh>
          {/* Inner Light Frame */}
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[width + 0.1, height + 0.1, 0.05]} />
            <meshStandardMaterial color="#f472b6" emissive="#db2777" emissiveIntensity={0.8} />
          </mesh>
          {/* Floating Hearts around border */}
          {[-1.1, 1.1].map((x, idx) => (
            <Float key={`heart-${idx}`} speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
              <mesh position={[x, 0.9, 0.1]} rotation={[0, 0, x > 0 ? 0.3 : -0.3]}>
                <sphereGeometry args={[0.1, 12, 12]} />
                <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={1.5} />
              </mesh>
            </Float>
          ))}
        </group>
      );

    case 'comic':
      return (
        <group>
          {/* Pop Art Yellow Frame */}
          <mesh position={[0, 0, -0.04]}>
            <boxGeometry args={[width + 0.4, height + 0.4, 0.08]} />
            <meshStandardMaterial color="#18181b" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <boxGeometry args={[width + 0.28, height + 0.28, 0.06]} />
            <meshStandardMaterial color="#facc15" roughness={0.3} />
          </mesh>
          {/* Comic Burst Tag */}
          <group position={[0.9, 0.75, 0.08]} rotation={[0, 0, -0.2]}>
            <mesh>
              <cylinderGeometry args={[0.22, 0.22, 0.04, 8]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
            <Text position={[0, 0, 0.03]} fontSize={0.1} color="#ffffff">
              POP!
            </Text>
          </group>
        </group>
      );

    case 'holographic':
      return (
        <group>
          {/* Iridescent Portal Ring */}
          <group ref={groupRef} position={[0, 0, -0.05]}>
            <mesh>
              <torusGeometry args={[1.35, 0.08, 16, 60]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#818cf8"
                emissiveIntensity={1.2}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
          </group>
          <mesh position={[0, 0, -0.02]}>
            <boxGeometry args={[width + 0.2, height + 0.2, 0.05]} />
            <meshPhysicalMaterial
              color="#0284c7"
              transmission={0.4}
              opacity={0.9}
              transparent
              roughness={0.1}
              ior={1.5}
            />
          </mesh>
        </group>
      );

    case 'floral':
      return (
        <group>
          {/* Garden Vine Frame */}
          <mesh position={[0, 0, -0.03]}>
            <boxGeometry args={[width + 0.3, height + 0.3, 0.08]} />
            <meshStandardMaterial color="#064e3b" roughness={0.6} />
          </mesh>
          {/* Corner Flowers */}
          {[-1.1, 1.1].map((x) =>
            [-0.85, 0.85].map((y) => (
              <group key={`flower-${x}-${y}`} position={[x, y, 0.06]}>
                <mesh>
                  <sphereGeometry args={[0.13, 12, 12]} />
                  <meshStandardMaterial color="#f43f5e" roughness={0.3} />
                </mesh>
                <mesh position={[0, 0, 0.05]}>
                  <sphereGeometry args={[0.05, 8, 8]} />
                  <meshStandardMaterial color="#fde047" />
                </mesh>
              </group>
            ))
          )}
        </group>
      );

    case 'wood':
    default:
      return (
        <group>
          {/* Rustic Wood Frame */}
          <mesh position={[0, 0, -0.03]}>
            <boxGeometry args={[width + 0.32, height + 0.32, 0.1]} />
            <meshStandardMaterial color="#451a03" roughness={0.8} />
          </mesh>
          {/* Brass Corners */}
          {[-1.1, 1.1].map((x) =>
            [-0.85, 0.85].map((y) => (
              <mesh key={`brass-${x}-${y}`} position={[x, y, 0.04]}>
                <boxGeometry args={[0.16, 0.16, 0.06]} />
                <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.3} />
              </mesh>
            ))
          )}
        </group>
      );
  }
}
