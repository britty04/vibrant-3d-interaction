import Spline from '@splinetool/react-spline';

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#1A0F0F] to-[#2D1F1F]">
      <Spline 
        scene="https://prod.spline.design/6Wq1Q9DyFvwZH5st/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
};

export default Background3D;