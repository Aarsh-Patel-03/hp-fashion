
import imgHeader from '../../assets/herobg.avif';
function HeroSection() {
  return (
    <section
      className="h-[40vh] bg-cover bg-center flex items-center"
      style={{
        backgroundImage:
          `url(${imgHeader})`,
      }}
    >
      <div className="bg-black/50 w-full h-full flex items-center">
        <div className="px-6 md:px-16 max-w-2xl text-white">
          <p className="text-sm uppercase tracking-widest mb-3">
            Welcome to HP Fashion
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Discover Your <br /> Perfect Style
          </h1>
          <p className="mt-4 text-gray-300">
            Trendy outfits curated just for you.  
            Explore fashion that speaks confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;