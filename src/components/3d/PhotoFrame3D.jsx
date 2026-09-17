import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import CrazyFrameMesh from './CrazyFrameMesh';
import { playSfx } from '../../utils/sound';

export default function PhotoFrame3D({ photo, onSelectPhoto, isSelected }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  // Load image texture safely with fallback handling
  let texture;
  try {
    texture = useTexture(photo.url);
  } catch (err) {
    console.warn(`Failed to load texture for photo ${photo.id}`);
  }

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle floating bob
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.08, 1.08, 1.08), delta * 8);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 8);
      }
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    playSfx('magic');
    if (onSelectPhoto) {
      onSelectPhoto(photo);
    }
  };

  return (
    <group position={photo.position || [0, 1.5, 0]} rotation={photo.rotation || [0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <group
          ref={meshRef}
          onClick={handleClick}
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
          {/* Crazy Frame Border Mesh */}
          <CrazyFrameMesh styleId={photo.frameStyle || 'neon'} isFocused={isSelected} />

          {/* Photo Plane */}
          <mesh position={[0, photo.frameStyle === 'polaroid' ? 0.05 : 0, 0.01]}>
            <planeGeometry args={[2.0, 1.5]} />
            {texture ? (
              <meshBasicMaterial map={texture} toneMapped={false} />
            ) : (
              <meshStandardMaterial color="#38bdf8" />
            )}
          </mesh>

          {/* Back side of Frame (Shows secret indicator) */}
          <mesh position={[0, 0, -0.05]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[2.0, 1.5]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>

          {/* Floating Title Label below photo */}
          {photo.title && (
            <Text
              position={[0, photo.frameStyle === 'polaroid' ? -1.05 : -0.95, 0.1]}
              fontSize={0.14}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#000000"
            >
              {photo.title}
            </Text>
          )}
        </group>
      </Float>
    </group>
  );
}
