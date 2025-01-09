import Background3D from '@/components/Background3D';
import Terminal from '@/components/Terminal';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <Background3D />
      <div className="z-10 text-center mb-12 floating">
        <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-300 to-rose-600">
          MikasaAI
        </h1>
        <p className="text-xl text-rose-200 opacity-80">
          Your gateway to the future of coding
        </p>
      </div>
      <Terminal />
    </div>
  );
};

export default Index;