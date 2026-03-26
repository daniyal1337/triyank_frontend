import { Link } from "react-router-dom";
import leatherBanner from "@/assets/leather-jewelry-banner.jpg";

const LeatherJewelry = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[450px] overflow-hidden">
      <img
        src={leatherBanner}
        alt="Leather Jewelry Collection"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
        <p className="text-[#c9a86c] text-sm tracking-[0.3em] uppercase mb-3 font-light">
          Our Specialty
        </p>
        <h2 className="text-white text-3xl md:text-5xl font-medium tracking-[0.15em] mb-4">
          LEATHER JEWELRY
        </h2>
        <p className="text-white/80 text-sm md:text-base font-light max-w-lg mb-8 leading-relaxed">
          Handcrafted leather pieces that blend rustic charm with modern elegance. 
          Each piece is a statement of bold, unique style.
        </p>
        <Link
          to="/collection/leather"
          className="border border-[#c9a86c] text-[#c9a86c] hover:bg-[#c9a86c] hover:text-white px-10 py-3 text-sm tracking-[0.2em] uppercase transition-all duration-300"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default LeatherJewelry;
