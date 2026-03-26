import { motion } from "framer-motion";

const BrandStory = () => {
  return (
    <section className="py-14 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-wider text-foreground mb-4">
            ABOUT US
          </h2>
          <div className="w-20 h-px bg-primary mx-auto mb-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="space-y-6 text-muted-foreground"
        >
          <p className="text-base md:text-lg leading-relaxed">
            Weddings deserve jewelry that feels special, and at Triyank, that's exactly what we kept in mind while creating our collections. Every piece in our occasion-wear collection is handcrafted with care, made with love, and designed to make your celebrations even more beautiful.
          </p>
          
          <p className="text-sm md:text-base leading-relaxed">
            This collection has something for every ceremony – elegant picks for your engagement, bright styles for Haldi, intricate designs for Mehndi, glam pieces for cocktail night, classic options for the Shaadi, and refined sparkle for the reception. We also bring you trousseau-friendly pieces that you'll treasure long after the wedding.
          </p>

          <p className="text-sm md:text-base leading-relaxed">
            Whether you're the bride, a bridesmaid, a guest, or someone who simply enjoys handcrafted jewelry, this collection is made for you. Each design blends traditional charm with a modern touch, so you can look regal while feeling comfortable.
          </p>

          <p className="text-sm md:text-base leading-relaxed">
            Many brides trust Triyank for their big day, and that trust inspires us to create pieces that look beautiful in photos, feel light during long functions, and add a touch of magic to every moment.
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-base md:text-lg font-medium text-foreground mt-10 italic"
          >
            Celebrate your wedding story with jewelry made by hand, made with heart, and made just for you.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStory;
