import { useParams, Link } from "react-router-dom";
import Footer from "@/components/footer/Footer";
import { allProducts } from "@/data/products";
import ProductCard from "@/components/home/ProductCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const occasionMap: Record<string, { title: string; description: string; occasions: string[]; heroImage: string }> = {
  wedding: {
    title: "Wedding Collection",
    description: "Discover our exquisite bridal and wedding jewelry — timeless pieces crafted for your most special day.",
    occasions: ["Bridal", "Wedding Guest"],
    heroImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=500&fit=crop",
  },
  party: {
    title: "Party Collection",
    description: "Make a statement with bold, glamorous pieces designed to turn heads at every celebration.",
    occasions: ["Party Wear"],
    heroImage: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1200&h=500&fit=crop",
  },
  everyday: {
    title: "Everyday Collection",
    description: "Effortless elegance for your daily style — minimal, lightweight, and endlessly versatile.",
    occasions: ["Daily Wear", "Casual", "Office Wear"],
    heroImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=500&fit=crop",
  },
  festive: {
    title: "Festive Collection",
    description: "Celebrate every festival with charm — vibrant, colourful pieces that capture the spirit of joy.",
    occasions: ["Festive"],
    heroImage: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1200&h=500&fit=crop",
  },
};

const OccasionCollection = () => {
  const { occasion } = useParams<{ occasion: string }>();
  const config = occasionMap[occasion || ""];

  if (!config) {
    return (
      <div className="min-h-screen bg-background">
        <main className="py-20 text-center pt-32">
          <h1 className="text-2xl font-light">Collection not found</h1>
          <Link to="/" className="text-primary underline mt-4 inline-block">Back to Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const products = allProducts.filter(
    (p) => p.occasion && config.occasions.includes(p.occasion) && p.status === "active"
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        {/* Hero */}
        <div className="relative h-[300px] md:h-[400px] overflow-hidden">
          <img src={config.heroImage} alt={config.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
            <h1 className="text-3xl md:text-5xl font-light tracking-wider mb-2">{config.title}</h1>
            <p className="text-sm md:text-base text-white/80 max-w-xl">{config.description}</p>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{config.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Products */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">
                No products found for this occasion yet.
              </p>
              <Link to="/" className="text-primary underline">Browse all collections</Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OccasionCollection;
