import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { playSfx } from '../../utils/sound';

export default function GiftBox3D({ gift, onOpenGift }) {
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const lidRef = useRef();
  const boxGroupRef = useRef();

  useFrame((state, delta) => {
    if (boxGroupRef.current) {
      if (hovered && !isOpen) {
        boxGroupRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), delta * 8);
      } else {
        boxGroupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 8);
      }
    }
    if (lidRef.current && isOpen) {
      // Animate lid flying up and off
      lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, 1.2, delta * 4);
      lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, 0.8, delta * 4);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isOpen) {
      setIsOpen(true);
      playSfx('pop');
      setTimeout(() => playSfx('magic'), 300);
    }
    if (onOpenGift) {
      onOpenGift(gift);
    }
  };

  const boxColor = gift.boxColor || '#ec4899';
  const ribbonColor = gift.ribbonColor || '#ffd700';

  return (
    <group position={gift.position || [2, -1, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <group
          ref={boxGroupRef}
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
          {/* Main Gift Box Base */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.7, 0.7, 0.7]} />
            <meshStandardMaterial color={boxColor} roughness={0.3} metalness={0.2} />
          </mesh>

          {/* Ribbon Wrap (Cross X & Z) */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.72, 0.71, 0.15]} />
            <meshStandardMaterial color={ribbonColor} metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.15, 0.71, 0.72]} />
            <meshStandardMaterial color={ribbonColor} metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Animated Lid */}
          <group ref={lidRef} position={[0, 0.36, 0]}>
            <mesh>
              <boxGeometry args={[0.76, 0.12, 0.76]} />
              <meshStandardMaterial color={boxColor} roughness={0.3} metalness={0.2} />
            </mesh>
            {/* Top Ribbon Bow */}
            <mesh position={[0, 0.1, 0]}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshStandardMaterial color={ribbonColor} metalness={0.9} roughness={0.1} />
            </mesh>
          </group>

          {/* Glowing particle indicator when closed */}
          {!isOpen && (
            <pointLight position={[0, 0.5, 0]} color={ribbonColor} intensity={1.5} distance={1.5} />
          )}

          {/* Floating Tag */}
          <Text
            position={[0, -0.5, 0]}
            fontSize={0.11}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {isOpen ? '✨ Opened!' : '🎁 Click to Open Gift!'}
          </Text>
        </group>
      </Float>
    </group>
  );
}
