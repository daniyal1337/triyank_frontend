import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import westernHero from "@/assets/western-collection-hero.jpg";
import indianHero from "@/assets/indian-collection-hero.jpg";
import leatherTeaser from "@/assets/leather-jewelry-banner.jpg";

const SplitHero = () => {
  return (
    <div>
      <section className="relative flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
        {/* Western Collection - Left Side */}
        <Link 
          to="/collection/western"
          className="relative flex-1 group overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0">
            <img 
              src={westernHero}
              alt="Western Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3d3425]/80 via-[#3d3425]/20 to-transparent" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-end h-full min-h-[75vw] md:min-h-full pb-10 md:pb-24 px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-wider mb-1 md:mb-2">
                WESTERN
              </h2>
              <p className="text-sm md:text-xl text-white/90 tracking-widest mb-5 md:mb-8">
                COLLECTION
              </p>
              <span className="inline-block px-6 md:px-8 py-2.5 md:py-3 bg-white text-[#3d3425] text-xs md:text-sm font-medium tracking-wider transition-all duration-300 group-hover:bg-[#c9a86c] group-hover:text-white">
                EXPLORE NOW
              </span>
            </motion.div>
          </div>
        </Link>

        {/* Traditional Collection - Right Side */}
        <Link 
          to="/collection/traditional"
          className="relative flex-1 group overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0">
            <img 
              src={indianHero}
              alt="Traditional Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#5c1a1a]/60 via-[#5c1a1a]/10 to-transparent" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-end h-full min-h-[75vw] md:min-h-full pb-10 md:pb-24 px-4 md:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-wider mb-1 md:mb-2">
                TRADITIONAL
              </h2>
              <p className="text-sm md:text-xl text-white/90 tracking-widest mb-5 md:mb-8">
                COLLECTION
              </p>
              <span className="inline-block px-6 md:px-8 py-2.5 md:py-3 bg-white text-[#5c1a1a] text-xs md:text-sm font-medium tracking-wider transition-all duration-300 group-hover:bg-[#c9a86c] group-hover:text-white">
                EXPLORE NOW
              </span>
            </motion.div>
          </div>
        </Link>
      </section>

      {/* Leather Jewelry Teaser */}
      <div className="bg-[#f5f0e8]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-3 md:gap-4 px-6 py-3 md:py-4">
          <div className="flex gap-2 shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border border-[#c9a86c]/30">
              <img src={leatherTeaser} alt="Leather Jewelry" className="w-full h-full object-cover" />
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border border-[#c9a86c]/30">
              <img src={westernHero} alt="Leather Collection" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <p className="text-[#c9a86c] text-sm tracking-[0.2em] uppercase mb-0.5 font-bold">Our Specialty</p>
            <h3 className="text-[#3d3425] text-xl md:text-2xl font-bold tracking-[0.1em] uppercase">
              Handcrafted Leather Jewelry
            </h3>
          </div>
          <Link 
            to="/collection/leather" 
            className="text-[#3d3425] text-xs font-semibold tracking-wider uppercase border-2 border-[#3d3425] hover:bg-[#3d3425] hover:text-white px-6 py-2 transition-all duration-300 shrink-0"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SplitHero;
