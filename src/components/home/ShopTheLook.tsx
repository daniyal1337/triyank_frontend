import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import shopLook1 from "@/assets/shop-look-1.jpg";
import shopLook2 from "@/assets/shop-look-2.jpg";
import shopLook3 from "@/assets/shop-look-3.jpg";
import shopLook4 from "@/assets/shop-look-4.jpg";

const looks = [
  {
    id: 1,
    image: shopLook1,
    title: "Bridal Elegance",
    occasion: "Wedding Collection",
    link: "/collection/traditional",
  },
  {
    id: 2,
    image: shopLook2,
    title: "Royal Heritage",
    occasion: "Traditional Collection",
    link: "/collection/traditional",
  },
  {
    id: 3,
    image: shopLook3,
    title: "Festive Charm",
    occasion: "Celebration Collection",
    link: "/collection/traditional",
  },
  {
    id: 4,
    image: shopLook4,
    title: "Pearl Grace",
    occasion: "Haldi Collection",
    link: "/collection/traditional",
  },
];

const ShopTheLook = () => {
  return (
    <section className="py-14 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-wider text-foreground mb-4">
            SHOP THE LOOK
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
            {looks.map((look, index) => (
              <CarouselItem
                key={look.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <Link to={look.link} className="block">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                      <img
                        src={look.image}
                        alt={look.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <p className="text-sm uppercase tracking-wider opacity-80 mb-1">
                          {look.occasion}
                        </p>
                        <h3 className="text-lg font-medium mb-4">
                          {look.title}
                        </h3>
                        <button className="bg-white text-foreground px-6 py-2.5 text-sm tracking-wider hover:bg-primary hover:text-white transition-colors duration-300 rounded-sm">
                          SHOP THE LOOK
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 h-12 w-12 bg-white/90 hover:bg-white border-0" />
          <CarouselNext className="right-4 h-12 w-12 bg-white/90 hover:bg-white border-0" />
        </Carousel>
      </div>
    </section>
  );
};

export default ShopTheLook;
