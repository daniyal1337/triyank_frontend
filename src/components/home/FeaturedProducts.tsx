import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const featuredProducts = [
  {
    id: 1,
    name: "Celestial Drops",
    price: 2499,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop",
    isNew: true
  },
  {
    id: 2,
    name: "Royal Kundan Set",
    price: 8999,
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&h=500&fit=crop",
    isNew: false
  },
  {
    id: 3,
    name: "Modern Chain",
    price: 1899,
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=500&fit=crop",
    isNew: true
  },
  {
    id: 4,
    name: "Pearl Elegance",
    price: 3499,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
    isNew: false
  },
  {
    id: 5,
    name: "Golden Hoop Earrings",
    price: 1599,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400&h=500&fit=crop",
    isNew: true
  },
  {
    id: 6,
    name: "Diamond Pendant",
    price: 12999,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop",
    isNew: false
  },
  {
    id: 7,
    name: "Silver Bracelet",
    price: 2199,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220c?w=400&h=500&fit=crop",
    isNew: true
  },
  {
    id: 8,
    name: "Rose Gold Ring",
    price: 4599,
    image: "https://images.unsplash.com/photo-1605100804763-901f87329ef4?w=400&h=500&fit=crop",
    isNew: false
  }
];

const FeaturedProducts = () => {
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
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-wider text-foreground mb-4">
            BESTSELLERS
          </h2>
          <div className="w-20 h-px bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Our most loved pieces</p>
        </motion.div>

        <div className="relative">
          <Carousel
            opts={{ align: "center", loop: true }}
            setApi={handleSetApi}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {featuredProducts.map((product, index) => (
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
                      <div className="relative aspect-[4/5] overflow-hidden mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {product.isNew && (
                          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1 tracking-wider">
                            NEW
                          </span>
                        )}
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Heart size={16} className="text-foreground" />
                        </button>
                      </div>
                      <h3 className="text-sm font-light tracking-wider text-foreground mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Desktop arrows */}
            <CarouselPrevious className="hidden md:flex -left-4 h-12 w-12 bg-background/80 border-border hover:bg-background" />
            <CarouselNext className="hidden md:flex -right-4 h-12 w-12 bg-background/80 border-border hover:bg-background" />
          </Carousel>

          {/* Mobile arrows */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous"
            className="md:hidden absolute left-0 top-[40%] -translate-y-1/2 -translate-x-1 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow border border-border text-foreground"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next"
            className="md:hidden absolute right-0 top-[40%] -translate-y-1/2 translate-x-1 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow border border-border text-foreground"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Mobile dot indicators */}
        <div className="flex md:hidden justify-center gap-2 mt-5">
          {featuredProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex ? "w-6 bg-primary" : "w-2 bg-primary/30"
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
            to="/collection/western"
            className="inline-block px-8 py-3 border border-foreground text-foreground text-sm tracking-wider hover:bg-foreground hover:text-background transition-colors"
          >
            VIEW ALL
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
