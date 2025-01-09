import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Sphere visible args={[1, 100, 200]} scale={2}>
          <MeshDistortMaterial
            color="#B76E79"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0}
          />
        </Sphere>
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
};

export default Background3D;