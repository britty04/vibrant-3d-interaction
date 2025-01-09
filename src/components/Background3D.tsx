import Spline from '@splinetool/react-spline';
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

const Background3D = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Reset states when component mounts
    setIsLoading(true);
    setLoadError(false);
    
    return () => {
      // Cleanup function
      setIsLoading(false);
      setLoadError(false);
    };
  }, []);

  const handleError = () => {
    if (!loadError) {  // Prevent multiple error toasts
      setLoadError(true);
      setIsLoading(false);
      toast({
        title: "3D Scene Error",
        description: "Failed to load 3D background scene",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#1A0F0F] to-[#2D1F1F]">
      {isLoading && !loadError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-rose-500"></div>
        </div>
      )}
      {!loadError && (
        <Spline 
          scene="https://prod.spline.design/mRqZwAQVQQhX6duX/scene.splinecode"
          className="w-full h-full"
          onLoad={() => setIsLoading(false)}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default Background3D;