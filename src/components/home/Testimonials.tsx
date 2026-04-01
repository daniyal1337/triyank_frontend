import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { EmblaCarouselType } from "embla-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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
  {
    id: 4,
    name: "Priya",
    image: testimonial1,
    rating: 5,
    review:
      "Absolutely stunning collection! The craftsmanship is impeccable and the jewelry looks even more beautiful in person. Fast delivery and excellent packaging. Will definitely shop again!",
  },
  {
    id: 5,
    name: "Neha",
    image: testimonial2,
    rating: 5,
    review:
      "The jewelry is absolutely gorgeous! I ordered a necklace and earring set for my sister's wedding and everyone kept asking where I got it from. The quality is top-notch and the price is very reasonable.",
  },
  {
    id: 6,
    name: "Riya",
    image: testimonial3,
    rating: 5,
    review:
      "I'm a repeat customer and Triyank never disappoints! Their customer service is amazing and the products are always exactly as shown. Highly recommend to anyone looking for ethnic jewelry!",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <Card className="border-0 shadow-xl bg-card h-full">
    <CardContent className="p-4 md:p-8 text-center">
      {/* Stars */}
      <div className="flex justify-center gap-1 mb-3 md:mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 md:w-5 md:h-5 fill-primary text-primary"
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-muted-foreground leading-relaxed mb-4 md:mb-6 text-sm md:text-base italic line-clamp-4 md:line-clamp-none">
        "{testimonial.review}"
      </p>

      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden mb-2 md:mb-3 ring-4 ring-primary/20">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="font-medium text-foreground tracking-wide text-sm md:text-base">
          {testimonial.name}
        </h4>
      </div>
    </CardContent>
  </Card>
);

const Testimonials = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const handleSetApi = useCallback(
    (api: EmblaCarouselType | undefined) => {
      if (!api) return;
      setEmblaApi(api);
      api.on("select", onSelect);
      onSelect(api);
    },
    [onSelect]
  );

  // For desktop: group testimonials into pairs
  const desktopSlides = [
    [testimonials[0], testimonials[1]],
    [testimonials[2], testimonials[3]],
    [testimonials[4], testimonials[5]],
  ];

  // For mobile: group testimonials into sets of 4 (2x2 grid)
  const mobileSlides = [
    [testimonials[0], testimonials[1], testimonials[2], testimonials[3]],
    [testimonials[4], testimonials[5]],
  ];

  return (
    <section id="testimonials" className="py-14 px-4 md:px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl md:text-4xl font-medium tracking-wider text-foreground mb-4">
            THAT'S WHAT THEY SAID
          </h2>
          <div className="w-20 h-px bg-primary mx-auto" />
        </motion.div>

        {/* Desktop View - 2 cards per slide */}
        <div className="hidden md:block relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          <Carousel
            opts={{ align: "start", loop: true }}
            setApi={handleSetApi}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {desktopSlides.map((slide, slideIndex) => (
                <CarouselItem key={slideIndex} className="pl-6">
                  <div className="grid grid-cols-2 gap-6">
                    {slide.map((testimonial) => (
                      <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {desktopSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-primary scale-125"
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile View - 4 cards in 2x2 grid with slider */}
        <div className="md:hidden relative">
          <Carousel
            opts={{ align: "center", loop: true }}
            setApi={handleSetApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {mobileSlides.map((slide, slideIndex) => (
                <CarouselItem key={slideIndex} className="pl-4">
                  <div className="grid grid-cols-2 gap-3">
                    {slide.map((testimonial) => (
                      <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Mobile Navigation Arrows */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          {/* Mobile Dot Indicators */}
          <div className="flex justify-center gap-3 mt-6">
            {mobileSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
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
