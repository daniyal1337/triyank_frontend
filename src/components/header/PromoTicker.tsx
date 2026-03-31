import { motion } from "framer-motion";

const promoMessages = [
  "Apply FLAT10 to get instant 10% off",
  "Shop for ₹500 and above and get FREE delivery",
  "Apply FLAT10 to get instant 10% off",
  "Shop for ₹500 and above and get FREE delivery",
];

const PromoTicker = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-western-accent text-white py-2 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 50,
            ease: "linear",
          },
        }}
      >
        {[...promoMessages, ...promoMessages, ...promoMessages].map((message, index) => (
          <span
            key={index}
            className="mx-8 text-xs md:text-sm font-medium tracking-wide uppercase"
          >
            ✦ {message}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default PromoTicker;
