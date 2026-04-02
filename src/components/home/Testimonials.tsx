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
  {
    id: 7,
    name: "Ananya",
    image: testimonial1,
    rating: 5,
    review:
      "Triyank has the most beautiful and unique jewelry designs! The attention to detail is remarkable and the pieces are so comfortable to wear. Love their customer service too!",
  },
  {
    id: 8,
    name: "Meera",
    image: testimonial2,
    rating: 5,
    review:
      "Best jewelry shopping experience ever! The website is easy to navigate and the product photos are true to the actual pieces. Will definitely be coming back for more!",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <Card className="border-0 shadow-xl bg-card h-full">
    <CardContent className="p-4 md:p-6 text-center">
      {/* Stars */}
      <div className="flex justify-center gap-1 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-primary text-primary"
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-muted-foreground leading-relaxed mb-4 text-sm italic line-clamp-4">
        "{testimonial.review}"
      </p>

      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mb-2 ring-4 ring-primary/20">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="font-medium text-foreground tracking-wide text-sm">
          {testimonial.name}
        </h4>
      </div>
    </CardContent>
  </Card>
);

const Testimonials = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [desktopApi, setDesktopApi] = useState<EmblaCarouselType | null>(null);
  const [mobileApi, setMobileApi] = useState<EmblaCarouselType | null>(null);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const handleSetDesktopApi = useCallback(
    (api: EmblaCarouselType | undefined) => {
      if (!api) return;
      setDesktopApi(api);
      api.on("select", onSelect);
      onSelect(api);
    },
    [onSelect]
  );

  const handleSetMobileApi = useCallback(
    (api: EmblaCarouselType | undefined) => {
      if (!api) return;
      setMobileApi(api);
      api.on("select", onSelect);
      onSelect(api);
    },
    [onSelect]
  );

  // For desktop: group testimonials into 4-card slides
  const desktopSlides = [
    [testimonials[0], testimonials[1], testimonials[2], testimonials[3]],
    [testimonials[4], testimonials[5], testimonials[6], testimonials[7]],
  ];

  // For mobile: group testimonials into 4-card slides (2x2 grid)
  const mobileSlides = [
    [testimonials[0], testimonials[1], testimonials[2], testimonials[3]],
    [testimonials[4], testimonials[5], testimonials[6], testimonials[7]],
  ];

  return (
    <section id="testimonials" className="py-14 px-4 md:px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
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

        {/* Desktop View - 4 cards per slide with arrows inside carousel */}
        <div className="hidden md:block relative">
          <Carousel
            opts={{ align: "start", loop: true }}
            setApi={handleSetDesktopApi}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4">
              {desktopSlides.map((slide, slideIndex) => (
                <CarouselItem key={slideIndex} className="pl-4">
                  <div className="grid grid-cols-4 gap-4">
                    {slide.map((testimonial) => (
                      <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows - now inside Carousel */}
            <button
              onClick={() => desktopApi?.scrollPrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-10 h-10 text-foreground" />
            </button>

            <button
              onClick={() => desktopApi?.scrollNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-10 h-10 text-foreground" />
            </button>
          </Carousel>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {desktopSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => desktopApi?.scrollTo(index)}
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
            setApi={handleSetMobileApi}
            className="w-full relative"
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

            {/* Mobile Navigation Arrows - now inside Carousel */}
            <button
              onClick={() => mobileApi?.scrollPrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8 text-foreground" />
            </button>

            <button
              onClick={() => mobileApi?.scrollNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8 text-foreground" />
            </button>
          </Carousel>

          {/* Mobile Dot Indicators */}
          <div className="flex justify-center gap-3 mt-6">
            {mobileSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => mobileApi?.scrollTo(index)}
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
