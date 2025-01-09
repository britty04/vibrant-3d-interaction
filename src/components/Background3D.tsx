import Spline from '@splinetool/react-spline';
import { useState } from 'react';

const Background3D = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#1A0F0F] to-[#2D1F1F]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-rose-500"></div>
        </div>
      )}
      <Spline 
        scene="https://prod.spline.design/PXQxWq-3NhiAhAXN/scene.splinecode"
        className="w-full h-full"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default Background3D;