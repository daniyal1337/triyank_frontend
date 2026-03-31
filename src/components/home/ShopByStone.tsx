import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gem } from "lucide-react";

const stoneCategories = [
  {
    name: "Diamond",
    description: "Eternal sparkle",
    color: "#E8F4F8",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    textColor: "text-cyan-700",
    accentColor: "#00BCD4",
    link: "/category/diamond"
  },
  {
    name: "Ruby",
    description: "Passion & love",
    color: "#FFEBEE",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    accentColor: "#E53935",
    link: "/category/ruby"
  },
  {
    name: "Emerald",
    description: "Royal green",
    color: "#E8F5E9",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    accentColor: "#43A047",
    link: "/category/emerald"
  },
  {
    name: "Sapphire",
    description: "Deep blue beauty",
    color: "#E3F2FD",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    accentColor: "#1E88E5",
    link: "/category/sapphire"
  },
  {
    name: "Pearl",
    description: "Classic elegance",
    color: "#FAFAFA",
    bgColor: "bg-slate-50",
    borderColor: "border-slate-200",
    textColor: "text-slate-700",
    accentColor: "#78909C",
    link: "/category/pearl-stone"
  },
  {
    name: "Opal",
    description: "Rainbow hues",
    color: "#FFF3E0",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    accentColor: "#FB8C00",
    link: "/category/opal"
  }
];

const ShopByStone = () => {
  return (
    <section className="py-14 px-4 md:px-6 bg-gradient-to-b from-white to-[#f8f5f2]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gem className="w-6 h-6 text-[#c9a86c]" />
            <h2 className="text-3xl md:text-4xl font-medium tracking-wider text-foreground">
              SHOP BY STONE
            </h2>
            <Gem className="w-6 h-6 text-[#c9a86c]" />
          </div>
          <div className="w-20 h-px bg-[#c9a86c] mx-auto mb-4" />
          <p className="text-muted-foreground">
            Discover jewelry adorned with precious stones
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stoneCategories.map((stone, index) => (
            <motion.div
              key={stone.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={stone.link}
                className={`group block p-6 rounded-xl ${stone.bgColor} ${stone.borderColor} border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex flex-col items-center text-center">
                  <div 
                    className="w-16 h-16 rounded-full mb-4 shadow-md group-hover:scale-110 transition-transform duration-300 flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: stone.color }}
                  >
                    <Gem 
                      className="w-8 h-8 relative z-10" 
                      style={{ color: stone.accentColor }}
                      strokeWidth={1.5}
                    />
                    <div 
                      className="absolute inset-0 opacity-30"
                      style={{ 
                        background: `radial-gradient(circle at 30% 30%, ${stone.accentColor}40, transparent 70%)` 
                      }}
                    />
                  </div>
                  <h3 className={`text-sm font-medium tracking-wider ${stone.textColor} mb-1`}>
                    {stone.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {stone.description}
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

export default ShopByStone;
