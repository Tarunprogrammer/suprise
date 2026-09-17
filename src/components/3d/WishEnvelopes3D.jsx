import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { playSfx } from '../../utils/sound';

export default function WishEnvelopes3D({ wishes = [], onSelectWish }) {
  return (
    <group>
      {wishes.map((wish, index) => (
        <SingleEnvelope
          key={wish.id || `wish-${index}`}
          wish={wish}
          index={index}
          onSelectWish={onSelectWish}
        />
      ))}
    </group>
  );
}

function SingleEnvelope({ wish, index, onSelectWish }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), delta * 8);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 8);
      }
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    playSfx('magic');
    if (onSelectWish) {
      onSelectWish(wish);
    }
  };

  const pos = wish.position || [-2 + index * 1.5, 2, -1];
  const color = wish.envelopeColor || '#ec4899';

  return (
    <group position={pos}>
      <Float speed={2.5 + (index % 3) * 0.5} rotationIntensity={0.3} floatIntensity={0.6}>
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
          {/* Glowing Aura Orb */}
          <mesh position={[0, 0, -0.05]}>
            <sphereGeometry args={[0.42, 16, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={hovered ? 2.5 : 1.2}
              transparent
              opacity={0.35}
            />
          </mesh>

          {/* Envelope Body */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.7, 0.45, 0.04]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>

          {/* Envelope Flap Triangle */}
          <mesh position={[0, 0.05, 0.025]} rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[0.3, 0.3]} />
            <meshStandardMaterial color={color} roughness={0.4} />
          </mesh>

          {/* Envelope Heart Seal */}
          <mesh position={[0, 0, 0.035]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={1.5} />
          </mesh>

          {/* Sender Name Badge */}
          <Text
            position={[0, -0.35, 0.05]}
            fontSize={0.11}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            💌 Wish from {wish.senderName || 'Loved One'}
          </Text>

          <pointLight color={color} distance={1.8} intensity={hovered ? 2.5 : 1.2} />
        </group>
      </Float>
    </group>
  );
}
