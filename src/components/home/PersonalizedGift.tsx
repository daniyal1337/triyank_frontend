import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gift, Heart, User, Calendar, Sparkles, ArrowRight } from "lucide-react";

const giftCategories = [
  {
    icon: Heart,
    title: "For Her",
    description: "Elegant pieces she'll treasure",
    link: "/category/western-jewellery",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    icon: User,
    title: "For Him",
    description: "Bold accessories with style",
    link: "/category/leather-jewellery",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220c?w=400&h=500&fit=crop",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    icon: Calendar,
    title: "Special Occasions",
    description: "Make moments memorable",
    link: "/occasion/bridal",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&h=500&fit=crop",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    icon: Sparkles,
    title: "Custom Jewelry",
    description: "Create something unique",
    link: "/contact",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=500&fit=crop",
    color: "from-purple-500/20 to-violet-500/20"
  }
];

const PersonalizedGift = () => {
  return (
    <section className="py-14 px-4 md:px-6 bg-gradient-to-b from-[#f8f5f2] to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="w-6 h-6 text-[#c9a86c]" />
            <h2 className="text-3xl md:text-4xl font-medium tracking-wider text-foreground">
              PERSONALIZED GIFTS
            </h2>
            <Gift className="w-6 h-6 text-[#c9a86c]" />
          </div>
          <div className="w-20 h-px bg-[#c9a86c] mx-auto mb-4" />
          <p className="text-muted-foreground max-w-md mx-auto">
            Find the perfect gift for your loved ones
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {giftCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={category.link}
                className="group block overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} via-transparent to-transparent opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-[#c9a86c]" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-lg font-medium tracking-wider mb-1">
                      {category.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-1 text-white/90 text-sm font-medium group-hover:text-[#c9a86c] transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
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
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#c9a86c] text-white text-sm tracking-wider hover:bg-[#b8975b] transition-colors rounded-full shadow-md hover:shadow-lg"
          >
            <Gift className="w-4 h-4" />
            Get Gift Recommendations
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalizedGift;
