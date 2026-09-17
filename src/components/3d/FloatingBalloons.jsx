import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { playSfx } from '../../utils/sound';

export default function FloatingBalloons({ colors = [], count = 16 }) {
  const balloonColors = colors.length ? colors : ['#ff4081', '#7c4dff', '#00e676', '#ffeb3b', '#00bcd4', '#ff9100'];

  // Pre-generate 3D positions for balloons
  const balloons = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 3.5 + Math.random() * 2.5;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      const y = -1.0 + Math.random() * 4.0;
      const color = balloonColors[i % balloonColors.length];
      const speed = 1.5 + Math.random() * 2.0;
      list.push({ id: i, x, y, z, color, speed });
    }
    return list;
  }, [count, balloonColors]);

  return (
    <group>
      {balloons.map((b) => (
        <SingleBalloon key={`balloon-${b.id}`} balloon={b} />
      ))}
    </group>
  );
}

function SingleBalloon({ balloon }) {
  const [popped, setPopped] = useState(false);
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current && !popped) {
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * balloon.speed + balloon.id) * 0.003;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (!popped) {
      setPopped(true);
      playSfx('pop');
    }
  };

  if (popped) return null;

  return (
    <group position={[balloon.x, balloon.y, balloon.z]}>
      <Float speed={balloon.speed} rotationIntensity={0.3} floatIntensity={0.8}>
        <group
          ref={groupRef}
          onClick={handleClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default';
          }}
        >
          {/* Main Balloon Sphere */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.32, 24, 24]} />
            <meshStandardMaterial
              color={balloon.color}
              roughness={0.15}
              metalness={0.3}
              clearcoat={0.8}
            />
          </mesh>

          {/* Balloon Bottom Knot */}
          <mesh position={[0, -0.32, 0]}>
            <coneGeometry args={[0.05, 0.08, 12]} />
            <meshStandardMaterial color={balloon.color} roughness={0.3} />
          </mesh>

          {/* Balloon String */}
          <mesh position={[0, -0.7, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.7, 8]} />
            <meshStandardMaterial color="#ffffff" opacity={0.6} transparent />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
