import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NUM_PARTICLES = 500;

export default function ParticleSystem() {
  const ref = useRef();

  const particles = useMemo(() => {
    const positions = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      positions.push(
        (Math.random() - 0.5) * 4, // x
        0,                        // y (start at ground)
        (Math.random() - 0.5) * 4 // z
      );
    }
    return new Float32Array(positions);
  }, []);

  const velocities = useRef(
    new Array(NUM_PARTICLES).fill().map(() => new THREE.Vector3(0, Math.random() * 0.01 + 0.01, 0))
  );

  useFrame(() => {
    const positions = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < NUM_PARTICLES; i++) {
      let index = i * 3;
      positions[index + 1] += velocities.current[i].y; // y movement
      // swirl motion
      positions[index] += Math.sin(performance.now() * 0.001 + i) * 0.001;
      positions[index + 2] += Math.cos(performance.now() * 0.001 + i) * 0.001;

      // cap y height to form a shape
      if (positions[index + 1] > 2) {
        positions[index + 1] = 2;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="brown" size={0.05} />
    </points>
  );
}
