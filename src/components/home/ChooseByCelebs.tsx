import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  return (
    <section className="py-14 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-wider text-foreground mb-4">
            CHOOSE BY CELEBS
          </h2>
          <div className="w-20 h-px bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
      </div>
    </section>
  );
};

export default ChooseByCelebs;
