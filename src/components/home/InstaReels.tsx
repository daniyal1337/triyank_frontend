import { motion } from "framer-motion";
import { Instagram, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Placeholder reels data - replace with actual video URLs
const reels = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop",
    title: "Gold Chain Collection",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=600&fit=crop",
    title: "Statement Earrings",
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=600&fit=crop",
    title: "Elegant Bracelets",
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=400&h=600&fit=crop",
    title: "Ring Styling Tips",
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=600&fit=crop",
    title: "Layering Necklaces",
  },
  {
    id: 6,
    thumbnail: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&h=600&fit=crop",
    title: "Traditional Pieces",
  },
];

const InstaReels = () => {
  return (
    <section className="py-12 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Instagram className="w-6 h-6 text-western-gold" />
            <span className="text-sm font-medium text-western-muted uppercase tracking-wider">
              @triyankjewelry
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-medium tracking-wider text-western-accent uppercase mb-2">
            Follow Us on Instagram
          </h2>
          <p className="text-western-muted max-w-md mx-auto">
            Get inspired by our latest jewelry styling videos and behind-the-scenes content
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {reels.map((reel, index) => (
              <CarouselItem key={reel.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/4 lg:basis-1/5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative cursor-pointer"
                >
                  <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-western-card">
                    <img
                      src={reel.thumbnail}
                      alt={reel.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                        <Play className="w-5 h-5 text-western-accent ml-1" fill="currentColor" />
                      </div>
                    </div>

                    {/* Instagram icon */}
                    <div className="absolute top-3 right-3">
                      <Instagram className="w-5 h-5 text-white drop-shadow-lg" />
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {reel.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-white border-western-gold/20 hover:bg-western-card" />
          <CarouselNext className="hidden md:flex -right-4 bg-white border-western-gold/20 hover:bg-western-card" />
        </Carousel>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="https://instagram.com/triyankjewelry"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-full font-medium text-sm hover:shadow-lg transition-shadow duration-300"
          >
            <Instagram className="w-4 h-4" />
            Follow @triyankjewelry
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstaReels;
