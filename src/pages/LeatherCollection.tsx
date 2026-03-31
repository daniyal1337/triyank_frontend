import Footer from "@/components/footer/Footer";
import { Link } from "react-router-dom";
import { Grid3X3, LayoutGrid, Shield, Truck, RotateCcw, Headphones, SlidersHorizontal, X } from "lucide-react";
import leatherBanner from "@/assets/leather-jewelry-banner.jpg";
import triyanLogo from "@/assets/triyank-logo-banner.png";
import { leatherProducts, formatPrice, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, Check } from "lucide-react";
import { useState, useRef } from "react";
import ProductCard from "@/components/home/ProductCard";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface LeatherProductCardProps {
  product: Product;
}

const LeatherProductCard = ({ product }: LeatherProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdding(true);
    toast({
      title: "Added to bag",
      description: `${product.name} added to your bag.`
    });
    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <div className="group cursor-pointer">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-[#c9a86c] text-white text-xs px-3 py-1 tracking-wider uppercase">
              New
            </span>
          )}
          {product.isBestseller && !product.isNew && (
            <span className="absolute top-3 left-3 bg-[#c9a86c] text-white text-xs px-3 py-1 tracking-wider uppercase">
              Bestseller
            </span>
          )}
          
          {/* Add to Cart Button - visible on mobile, hover on desktop */}
          <div className="absolute bottom-3 left-3 right-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded text-xs font-medium transition-all duration-200 bg-[#c9a86c] text-white hover:bg-[#b8975b] ${isAdding ? 'bg-green-600' : ''}`}
            >
              {isAdding ? (
                <><Check size={14} /> Added</>
              ) : (
                <><ShoppingBag size={14} /> Add to Cart</>
              )}
            </button>
          </div>
        </div>
        <h3 className="text-sm font-light tracking-wide text-foreground">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

const LeatherCollection = () => {
  const productsRef = useRef<HTMLDivElement>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [gridSize, setGridSize] = useState<"small" | "large">("large");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = ["Necklaces", "Earrings", "Bracelets", "Rings"];
  const priceRanges = ["Under ₹500", "₹500 - ₹1,000", "₹1,000 - ₹2,000", "Over ₹2,000"];

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = leatherProducts.filter(p => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "newest": return a.isNew ? -1 : b.isNew ? 1 : 0;
      case "popularity": return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      default: return 0;
    }
  });

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  const activeFilterCount = selectedCategories.length;

  const features = [
    { icon: RotateCcw, title: "EASY RETURNS", subtitle: "REQUEST WITHIN 72 HRS OF DELIVERY" },
    { icon: Shield, title: "100% SECURE PAYMENT", subtitle: "ONLINE, WALLET'S, COD" },
    { icon: Truck, title: "FREE SHIPPING", subtitle: "FOR ORDER VALUE ₹500 OR ABOVE" },
    { icon: Headphones, title: "HELP DESK", subtitle: "VIA CALL OR MAIL (9AM - 6PM)" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <section className="relative w-full h-[220px] md:h-[280px] overflow-hidden pt-16">
        <img src={leatherBanner} alt="Leather Jewelry Collection" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-end md:justify-center text-center px-6 pb-6 md:pb-0">
          <img src={triyanLogo} alt="Triyank Logo" className="hidden md:block w-32 h-32 object-contain mb-3 drop-shadow-2xl" />
          <h1 className="text-2xl md:text-4xl font-bold tracking-[0.2em] text-white uppercase drop-shadow-lg mb-2">
            Leather Collection
          </h1>
          <div className="w-16 h-px bg-white/50 mb-2" />
          <p className="text-white/80 max-w-md mx-auto text-sm md:text-base drop-shadow">
            Handcrafted with passion
          </p>
        </div>
      </section>

      <div ref={productsRef} className="px-6 py-12">
        {/* Filter & Sort Bar */}
        <div className="flex justify-between items-center gap-4 mb-8 pb-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <button className="flex items-center gap-2 text-base font-semibold text-foreground hover:text-primary transition-colors">
                  <SlidersHorizontal size={18} />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-background border-border">
                <SheetHeader className="mb-6 border-b border-border pb-4">
                  <SheetTitle className="text-lg font-semibold text-foreground">Filters</SheetTitle>
                </SheetHeader>

                <div className="space-y-6">
                  {/* Category */}
                  <div>
                    <h3 className="text-base font-bold mb-3 text-foreground">Category</h3>
                    <div className="space-y-3">
                      {categories.map((cat) => (
                        <div key={cat} className="flex items-center space-x-3">
                          <Checkbox
                            id={`leather-${cat}`}
                            checked={selectedCategories.includes(cat)}
                            onCheckedChange={() => toggleCategory(cat)}
                            className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <Label htmlFor={`leather-${cat}`} className="text-base font-medium text-foreground cursor-pointer">
                            {cat}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  {/* Price */}
                  <div>
                    <h3 className="text-base font-bold mb-3 text-foreground">Price</h3>
                    <div className="space-y-3">
                      {priceRanges.map((range) => (
                        <div key={range} className="flex items-center space-x-3">
                          <Checkbox id={`price-leather-${range}`} className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                          <Label htmlFor={`price-leather-${range}`} className="text-base font-medium text-foreground cursor-pointer">
                            {range}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  <div className="flex flex-col gap-2 pt-4">
                    <Button onClick={() => setFiltersOpen(false)} className="w-full bg-foreground hover:bg-foreground/90 text-background">
                      Apply Filters
                    </Button>
                    <Button variant="ghost" onClick={clearFilters} className="w-full text-muted-foreground hover:text-foreground">
                      Clear All
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <p className="text-muted-foreground text-base font-semibold">{sortedProducts.length} products</p>
          </div>

          <div className="flex items-center gap-4">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 text-base font-semibold bg-background border border-border text-foreground cursor-pointer focus:outline-none focus:border-primary rounded">
              <option value="featured">Featured</option>
              <option value="popularity">Popularity</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => setGridSize("large")} className={`p-2 ${gridSize === "large" ? "text-primary" : "text-muted-foreground"}`}>
                <LayoutGrid size={20} />
              </button>
              <button onClick={() => setGridSize("small")} className={`p-2 ${gridSize === "small" ? "text-primary" : "text-muted-foreground"}`}>
                <Grid3X3 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategories.map(cat => (
              <span key={cat} className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-primary/10 text-primary border border-primary/30 rounded-full">
                {cat}
                <X size={12} className="cursor-pointer" onClick={() => toggleCategory(cat)} />
              </span>
            ))}
            <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-primary underline">
              Clear all
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className={`grid gap-6 md:gap-8 ${gridSize === "large" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-3 md:grid-cols-4 lg:grid-cols-5"}`}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="western" />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
          </div>
        )}

        {/* Features */}
        <div className="mt-16 py-8 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xs font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LeatherCollection;
