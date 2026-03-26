import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const occasions = [
  {
    name: "Casual Wear",
    description: "Everyday elegance",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop",
    link: "/occasion/casual"
  },
  {
    name: "Festive Wear",
    description: "Celebratory charm",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&h=800&fit=crop",
    link: "/occasion/festive"
  },
  {
    name: "Party Collection",
    description: "Statement pieces",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&h=800&fit=crop",
    link: "/occasion/party"
  },
  {
    name: "Formal Wear",
    description: "Professional elegance",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=800&fit=crop",
    link: "/occasion/formal"
  }
];

const ShopByOccasion = () => {
  return (
    <section className="py-14 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-wider text-foreground mb-4">
            SHOP BY OCCASION
          </h2>
          <div className="w-20 h-px bg-primary mx-auto" />
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {occasions.map((occasion, index) => (
              <CarouselItem
                key={occasion.name}
                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={occasion.link}
                    className="group block relative overflow-hidden aspect-[3/4]"
                  >
                    <img
                      src={occasion.image}
                      alt={occasion.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                      <h3 className="text-lg md:text-xl font-light tracking-wider mb-1">
                        {occasion.name}
                      </h3>
                      <p className="text-xs md:text-sm text-white/80">
                        {occasion.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-background/80 border-border hover:bg-background" />
          <CarouselNext className="hidden md:flex -right-4 bg-background/80 border-border hover:bg-background" />
        </Carousel>
      </div>
    </section>
  );
};

export default ShopByOccasion;
