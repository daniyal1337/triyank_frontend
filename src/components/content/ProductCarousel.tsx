import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { allProducts, formatPrice } from "@/data/products";

const ProductCarousel = () => {
  // Show first 6 products
  const products = allProducts.slice(0, 6);

  return (
    <section className="w-full mb-16 px-6">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full relative"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 pr-2 md:pr-4"
            >
              <Link to={`/product/${product.id}`}>
                <Card className="border-none shadow-none bg-transparent group">
                  <CardContent className="p-0">
                    <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-black/[0.03]"></div>
                      {product.isNew && (
                        <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium text-foreground">
                          NEW
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-light text-foreground">
                        {product.category}
                      </p>
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-foreground">
                          {product.name}
                        </h3>
                        <p className="text-sm font-light text-foreground">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 -translate-x-1/2 w-10 h-10 bg-white shadow-md hover:bg-muted" />
        <CarouselNext className="right-0 translate-x-1/2 w-10 h-10 bg-white shadow-md hover:bg-muted" />
      </Carousel>
    </section>
  );
};

export default ProductCarousel;