import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const testimonials = [
  {
    id: 1,
    name: "Aarti",
    image: testimonial1,
    rating: 5,
    review:
      "Thank you so much, Team Triyank! I'm absolutely loving my jewelry set – it added the perfect touch to my wedding look. The quality and design exceeded my expectations, and I'm so happy to have chosen your brand.",
  },
  {
    id: 2,
    name: "Shreshtha",
    image: testimonial2,
    rating: 5,
    review:
      "I bought a choker set and earrings from Triyank, and they were just perfect for my Haldi look. I got so many compliments! And the best part, it was a pool Haldi, and even after a full pool session, they're still perfect and haven't tarnished till date.",
  },
  {
    id: 3,
    name: "Ayushi",
    image: testimonial3,
    rating: 5,
    review:
      "It gave my Haldi outfit a beautiful uplift, adding both sophistication and traditional warmth. The detailing is exquisite and matched the festive vibe perfectly. So happy with how it turned out in pictures and in person!",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(testimonials.length / 2);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Get the two testimonials to display
  const getVisibleTestimonials = () => {
    const first = currentIndex * 2;
    const second = first + 1;
    return [
      testimonials[first],
      testimonials[second % testimonials.length],
    ];
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className="py-14 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-wider text-foreground mb-4">
            THAT'S WHAT THEY SAID
          </h2>
          <div className="w-20 h-px bg-primary mx-auto" />
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          {/* Testimonial Cards - Two in a row */}
          <div className="overflow-hidden px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {visibleTestimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="border-0 shadow-xl bg-card">
                    <CardContent className="p-6 md:p-8 text-center">
                      {/* Stars */}
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-primary text-primary"
                          />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-muted-foreground leading-relaxed mb-6 text-base italic">
                        "{testimonial.review}"
                      </p>

                      {/* Avatar */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-3 ring-4 ring-primary/20">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-medium text-foreground tracking-wide text-base">
                          {testimonial.name}
                        </h4>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
