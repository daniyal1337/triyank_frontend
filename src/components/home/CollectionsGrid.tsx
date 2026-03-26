import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import collectionExecutive from "@/assets/collection-executive.jpg";
import collectionSoftgirl from "@/assets/collection-softgirl.jpg";
import collectionGlamgoddess from "@/assets/collection-glamgoddess.jpg";
import collectionFunky from "@/assets/collection-funky.jpg";
import collectionDesigirl from "@/assets/collection-desigirl.jpg";
import collectionPartynight from "@/assets/collection-partynight.jpg";
import collectionMaryada from "@/assets/collection-maryada.jpg";
import collectionShringaar from "@/assets/collection-shringaar.jpg";
import collectionApsara from "@/assets/collection-apsara.jpg";
import collectionRangoli from "@/assets/collection-rangoli.jpg";
import collectionSaumya from "@/assets/collection-saumya.jpg";
import collectionRangrez from "@/assets/collection-rangrez.jpg";

const collections = [
  { name: "Executive", image: collectionExecutive, link: "/collection/western?collection=executive" },
  { name: "Soft Girl", image: collectionSoftgirl, link: "/collection/western?collection=softgirl" },
  { name: "Glam Goddess", image: collectionGlamgoddess, link: "/collection/western?collection=glamgoddess" },
  { name: "Funky", image: collectionFunky, link: "/collection/western?collection=funky" },
  { name: "Desi Girl", image: collectionDesigirl, link: "/collection/western?collection=desigirl" },
  { name: "Party Night", image: collectionPartynight, link: "/collection/western?collection=partynight" },
  { name: "Maryada", image: collectionMaryada, link: "/collection/traditional?collection=maryada" },
  { name: "Shringaar", image: collectionShringaar, link: "/collection/traditional?collection=shringaar" },
  { name: "Apsara", image: collectionApsara, link: "/collection/traditional?collection=apsara" },
  { name: "Rangoli", image: collectionRangoli, link: "/collection/traditional?collection=rangoli" },
  { name: "Saumya", image: collectionSaumya, link: "/collection/traditional?collection=saumya" },
  { name: "Rangrez", image: collectionRangrez, link: "/collection/traditional?collection=rangrez" },
];

const CollectionsGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const len = collections.length;

  const wrapIndex = (index: number) => {
    return ((index % len) + len) % len;
  };

  const go = (dir: 1 | -1) => {
    setActiveIndex((prev) => wrapIndex(prev + dir));
  };

  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    if (Math.abs(diff) > 2) return null;
    return diff as -2 | -1 | 0 | 1 | 2;
  };

  const positionStyles = (offset: -2 | -1 | 0 | 1 | 2) => {
    switch (offset) {
      case -2:
        return {
          x: -280,
          scale: 0.72,
          opacity: 0.22,
          zIndex: 1,
          filter: "blur(1px)",
        };
      case -1:
        return {
          x: -150,
          scale: 0.86,
          opacity: 0.5,
          zIndex: 2,
          filter: "blur(0.5px)",
        };
      case 0:
        return {
          x: 0,
          scale: 1,
          opacity: 1,
          zIndex: 3,
          filter: "blur(0px)",
        };
      case 1:
        return {
          x: 190,
          scale: 0.84,
          opacity: 0.45,
          zIndex: 2,
          filter: "blur(0.5px)",
        };
      case 2:
      default:
        return {
          x: 340,
          scale: 0.7,
          opacity: 0.18,
          zIndex: 1,
          filter: "blur(1px)",
        };
    }
  };

  return (
    <section className="py-14 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-wide text-foreground leading-tight">
              Our
              <br />
              Collections
            </h2>
            <div className="w-12 h-px bg-primary mt-4" />
          </motion.div>

          <div className="lg:col-span-9">
            <div className="relative">
              <div className="relative h-[360px] sm:h-[420px] md:h-[520px] flex items-center justify-center overflow-visible">
                {collections.map((collection, index) => {
                  const offset = getOffset(index);
                  if (offset === null) return null;
                  const pos = positionStyles(offset);

                  return (
                    <motion.div
                      key={collection.name}
                      initial={false}
                      animate={{
                        x: pos.x,
                        scale: pos.scale,
                        opacity: pos.opacity,
                      }}
                      transition={{
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute"
                      style={{
                        zIndex: pos.zIndex,
                        filter: pos.filter,
                      }}
                    >
                      <Link
                        to={collection.link}
                        className="group block"
                        aria-label={`Explore ${collection.name}`}
                      >
                        <div className="relative w-[240px] sm:w-[290px] md:w-[380px] aspect-[4/5] rounded-xl overflow-hidden shadow-[0_18px_55px_rgba(0,0,0,0.16)]">
                          <img
                            src={collection.image}
                            alt={collection.name}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                            <h3 className="text-white text-lg md:text-xl font-serif tracking-wide uppercase drop-shadow">
                              {collection.name}
                            </h3>
                            <span className="mt-1 inline-block text-white/75 text-xs tracking-[0.25em] uppercase">
                              Explore
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="w-10 h-10 rounded-full border border-border/60 bg-background/80 backdrop-blur flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                  aria-label="Previous collection"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {collections.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setActiveIndex(i);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeIndex ? "w-10 bg-primary" : "w-4 bg-border"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => go(1)}
                  className="w-10 h-10 rounded-full border border-border/60 bg-background/80 backdrop-blur flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                  aria-label="Next collection"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;
