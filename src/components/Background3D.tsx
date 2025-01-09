import Spline from '@splinetool/react-spline';

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#1A0F0F] to-[#2D1F1F]">
      {/* This is a sample Spline scene URL - you can replace it with your own from Spline editor */}
      <Spline 
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
};

export default Background3D;