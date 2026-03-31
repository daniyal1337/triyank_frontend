import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState, useCallback } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { allProducts, formatPrice } from "@/data/products";

const NewArrivals = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);

  // Filter products that are marked as new
  const newArrivals = allProducts.filter((product) => product.isNew);

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

  if (newArrivals.length === 0) return null;

  return (
    <section className="py-14 px-4 md:px-6 bg-gradient-to-b from-white to-muted/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#c9a86c]" />
            <h2 className="text-3xl md:text-4xl font-medium tracking-wider text-foreground">
              NEW ARRIVALS
            </h2>
            <Sparkles className="w-5 h-5 text-[#c9a86c]" />
          </div>
          <div className="w-20 h-px bg-[#c9a86c] mx-auto mb-4" />
          <p className="text-muted-foreground">Discover our latest collection</p>
        </motion.div>

        <div className="relative">
          <Carousel
            opts={{ align: "center", loop: true }}
            setApi={handleSetApi}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {newArrivals.map((product, index) => (
                <CarouselItem
                  key={product.id}
                  className="pl-3 md:pl-4 basis-[72%] sm:basis-[55%] md:basis-1/4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden mb-3 rounded-lg bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-3 left-3 bg-[#c9a86c] text-white text-xs px-2 py-1 tracking-wider uppercase font-medium">
                          NEW
                        </span>
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                          <Heart size={16} className="text-foreground" />
                        </button>
                      </div>
                      <h3 className="text-sm font-light tracking-wider text-foreground mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(product.price)}
                      </p>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Desktop arrows */}
            <CarouselPrevious className="hidden md:flex -left-4 bg-background/80 border-border hover:bg-background" />
            <CarouselNext className="hidden md:flex -right-4 bg-background/80 border-border hover:bg-background" />
          </Carousel>

          {/* Mobile arrows */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous"
            className="md:hidden absolute left-0 top-[40%] -translate-y-1/2 -translate-x-1 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow border border-border text-foreground"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next"
            className="md:hidden absolute right-0 top-[40%] -translate-y-1/2 translate-x-1 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow border border-border text-foreground"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Mobile dot indicators */}
        <div className="flex md:hidden justify-center gap-2 mt-5">
          {newArrivals.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex ? "w-6 bg-[#c9a86c]" : "w-2 bg-[#c9a86c]/30"
              }`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/category/new-arrivals"
            className="inline-block px-8 py-3 border border-foreground text-foreground text-sm tracking-wider hover:bg-foreground hover:text-background transition-colors"
          >
            VIEW ALL NEW ARRIVALS
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NewArrivals;
