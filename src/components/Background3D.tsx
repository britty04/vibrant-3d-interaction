import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      // More dynamic rotation for better interactivity
      sphereRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.4) * 0.3;
      sphereRef.current.rotation.y = Math.cos(clock.getElapsedTime() * 0.3) * 0.3;
      sphereRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <Sphere ref={sphereRef} visible args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#8B0000" // Dark red color matching Attack on Titan theme
        attach="material"
        distort={0.6}
        speed={1.5}
        roughness={0.4}
        metalness={0.9}
      />
    </Sphere>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#1A0F0F] to-[#2D1F1F]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ 
          background: 'radial-gradient(circle at center, #2D1F1F 0%, #1A0F0F 100%)',
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FF9999" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8B0000" />
        <AnimatedSphere />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
};

export default Background3D;