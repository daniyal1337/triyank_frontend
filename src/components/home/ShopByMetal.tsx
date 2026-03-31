import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";

const metalCategories = [
  {
    name: "Gold Plated",
    description: "Classic elegance",
    color: "#FFD700",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700",
    link: "/category/gold-plated"
  },
  {
    name: "Sterling Silver",
    description: "Timeless shine",
    color: "#C0C0C0",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    textColor: "text-gray-700",
    link: "/category/sterling-silver"
  },
  {
    name: "Rose Gold",
    description: "Romantic hue",
    color: "#B76E79",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    textColor: "text-rose-700",
    link: "/category/rose-gold"
  },
  {
    name: "Oxidized",
    description: "Vintage charm",
    color: "#4A4A4A",
    bgColor: "bg-stone-50",
    borderColor: "border-stone-200",
    textColor: "text-stone-700",
    link: "/category/oxidized"
  },
  {
    name: "Kundan",
    description: "Royal heritage",
    color: "#D4AF37",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    link: "/category/kundan"
  },
  {
    name: "Pearl",
    description: "Elegant beauty",
    color: "#F8F6F0",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    textColor: "text-slate-700",
    link: "/category/pearl"
  }
];

const ShopByMetal = () => {
  return (
    <section className="py-14 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-wider text-foreground mb-4">
            SHOP BY METAL
          </h2>
          <div className="w-20 h-px bg-[#c9a86c] mx-auto mb-4" />
          <p className="text-muted-foreground">
            Choose your preferred metal finish
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metalCategories.map((metal, index) => (
            <motion.div
              key={metal.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={metal.link}
                className={`group block p-6 rounded-xl ${metal.bgColor} ${metal.borderColor} border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex flex-col items-center text-center">
                  <div 
                    className="w-16 h-16 rounded-full mb-4 shadow-md group-hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                    style={{ backgroundColor: metal.color }}
                  >
                    <Circle className="w-8 h-8 text-white/50" strokeWidth={1} />
                  </div>
                  <h3 className={`text-sm font-medium tracking-wider ${metal.textColor} mb-1`}>
                    {metal.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {metal.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByMetal;
