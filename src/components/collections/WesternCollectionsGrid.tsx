import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import collectionExecutive from "@/assets/collection-executive.jpg";
import collectionSoftgirl from "@/assets/collection-softgirl.jpg";
import collectionGlamgoddess from "@/assets/collection-glamgoddess.jpg";
import collectionFunky from "@/assets/collection-funky.jpg";
import collectionDesigirl from "@/assets/collection-desigirl.jpg";
import collectionUnder99 from "@/assets/collection-under99.jpg";
import collectionPartynight from "@/assets/collection-partynight.jpg";

const collections = [
  {
    name: "The Executive Ensemble",
    image: collectionExecutive,
    link: "/collection/western?collection=executive",
  },
  {
    name: "The Soft Girl Essentials",
    image: collectionSoftgirl,
    link: "/collection/western?collection=softgirl",
  },
  {
    name: "The Glam Goddess",
    image: collectionGlamgoddess,
    link: "/collection/western?collection=glamgoddess",
  },
  {
    name: "Funks & Quirks",
    image: collectionFunky,
    link: "/collection/western?collection=funky",
  },
  {
    name: "The Desi Girl Collection",
    image: collectionDesigirl,
    link: "/collection/western?collection=desigirl",
  },
  {
    name: "The Party Night Collection",
    image: collectionPartynight,
    link: "/collection/western?collection=partynight",
  },
];

const WesternCollectionsGrid = () => {
  return (
    <section className="py-16 px-6 bg-western-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-light tracking-wider text-western-accent uppercase mb-2">
            Collections
          </h2>
          <div className="w-16 h-px bg-western-gold mx-auto" />
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
                    <h3 className="text-white text-base md:text-xl font-semibold tracking-wide uppercase drop-shadow-lg">
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

export default WesternCollectionsGrid;
