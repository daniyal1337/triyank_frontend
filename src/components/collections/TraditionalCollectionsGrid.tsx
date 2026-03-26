import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import collectionMaryada from "@/assets/collection-maryada.jpg";
import collectionShringaar from "@/assets/collection-shringaar.jpg";
import collectionApsara from "@/assets/collection-apsara.jpg";
import collectionRangoli from "@/assets/collection-rangoli.jpg";
import collectionSaumya from "@/assets/collection-saumya.jpg";
import collectionRangrez from "@/assets/collection-rangrez.jpg";
import collectionSwatantra from "@/assets/collection-swatantra.jpg";

const collections = [
  {
    name: "Maryada",
    image: collectionMaryada,
    link: "/collection/traditional?collection=maryada",
  },
  {
    name: "Shringaar",
    image: collectionShringaar,
    link: "/collection/traditional?collection=shringaar",
  },
  {
    name: "Apsara",
    image: collectionApsara,
    link: "/collection/traditional?collection=apsara",
  },
  {
    name: "Rangoli",
    image: collectionRangoli,
    link: "/collection/traditional?collection=rangoli",
  },
  {
    name: "Saumya",
    image: collectionSaumya,
    link: "/collection/traditional?collection=saumya",
  },
  {
    name: "Rangrez",
    image: collectionRangrez,
    link: "/collection/traditional?collection=rangrez",
  },
];

const TraditionalCollectionsGrid = () => {
  return (
    <section className="py-16 px-6 bg-indian-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-light tracking-wider text-indian-accent uppercase mb-2">
            Collections
          </h2>
          <div className="w-16 h-px bg-indian-gold mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="col-span-1"
            >
              <Link
                to={collection.link}
                className="group relative block overflow-hidden rounded-lg"
              >
                <div className="relative h-40 md:h-56">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Collection name */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="text-white text-lg md:text-2xl font-serif tracking-wide uppercase drop-shadow-lg">
                      {collection.name}
                    </h3>
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

export default TraditionalCollectionsGrid;
