import Background3D from '@/components/Background3D';
import Terminal from '@/components/Terminal';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <Background3D />
      <div className="z-10 text-center mb-12 floating">
        <h1 className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-700 to-rose-300 drop-shadow-[0_0_15px_rgba(225,29,72,0.3)]">
          Survey Corps Terminal
        </h1>
        <p className="text-xl text-rose-200 opacity-80 font-semibold tracking-wider">
          Dedicate your heart to humanity
        </p>
      </div>
      <Terminal />
    </div>
  );
};

export default Index;