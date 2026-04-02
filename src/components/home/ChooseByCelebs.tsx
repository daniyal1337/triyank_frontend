import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import celeb1 from "@/assets/celeb-1.jpg";
import celeb2 from "@/assets/celeb-2.jpg";
import celeb3 from "@/assets/celeb-3.jpg";
import celeb4 from "@/assets/celeb-4.jpg";

const celebs = [
  { name: "Priya's Pick", description: "Royal Necklace Set", image: celeb1, link: "/category/necklaces" },
  { name: "Ananya's Style", description: "Statement Earrings", image: celeb2, link: "/category/earrings" },
  { name: "Deepika's Choice", description: "Bridal Bangles", image: celeb3, link: "/category/bracelets" },
  { name: "Alia's Favourite", description: "Modern Choker Set", image: celeb4, link: "/category/necklaces" },
];

const ChooseByCelebs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const handleSetApi = useCallback(
    (api: EmblaCarouselType | undefined) => {
      if (!api) return;
      setEmblaApi(api);
      api.on("select", onSelect);
      onSelect(api);
    },
    [onSelect]
  );

  return (
    <section className="py-14 px-4 md:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-wider text-foreground mb-4">
            SHOP BY CELEBS
          </h2>
          <div className="w-20 h-px bg-primary mx-auto" />
        </motion.div>

        {/* Desktop Grid - hidden on mobile */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {celebs.map((celeb, index) => (
            <motion.div
              key={celeb.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={celeb.link}
                className="group block overflow-hidden"
              >
                <div className="aspect-[3/4] overflow-hidden mb-3 relative">
                  <img
                    src={celeb.image}
                    alt={celeb.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium tracking-wider">{celeb.name}</p>
                    <p className="text-white/70 text-xs tracking-wider">{celeb.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel - hidden on desktop */}
        <div className="md:hidden relative">
          <Carousel
            opts={{ align: "center", loop: true }}
            setApi={handleSetApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {celebs.map((celeb, index) => (
                <CarouselItem
                  key={celeb.name}
                  className="pl-4 basis-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={celeb.link}
                      className="group block overflow-hidden"
                    >
                      <div className="aspect-[3/4] overflow-hidden mb-3 relative rounded-lg">
                        <img
                          src={celeb.image}
                          alt={celeb.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white text-lg font-medium tracking-wider">{celeb.name}</p>
                          <p className="text-white/70 text-sm tracking-wider">{celeb.description}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Mobile arrows */}
            <button
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous"
              className="absolute left-0 top-[45%] -translate-y-1/2 -translate-x-2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow border border-border text-foreground"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next"
              className="absolute right-0 top-[45%] -translate-y-1/2 translate-x-2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow border border-border text-foreground"
            >
              <ChevronRight size={28} />
            </button>
          </Carousel>

          {/* Mobile dot indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {celebs.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseByCelebs;
