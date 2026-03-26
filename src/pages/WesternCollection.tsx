import { useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Grid3X3, LayoutGrid, Shield, Truck, RotateCcw, Headphones, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/home/ProductCard";
import { westernProducts } from "@/data/products";
import westernBannerFull from "@/assets/western-banner-full.jpg";
import triyanLogoBanner from "@/assets/triyank-logo-banner.png";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const WesternCollection = () => {
  const [searchParams] = useSearchParams();
  const productsRef = useRef<HTMLDivElement>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [gridSize, setGridSize] = useState<"small" | "large">("large");
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = ["Necklaces", "Earrings", "Bracelets", "Rings"];
  const priceRanges = ["Under ₹500", "₹500 - ₹1,000", "₹1,000 - ₹2,000", "Over ₹2,000"];

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = westernProducts.filter(p => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
    if (showNewOnly && !p.isNew) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "newest": return a.isNew ? -1 : b.isNew ? 1 : 0;
      default: return 0;
    }
  });

  const clearFilters = () => {
    setSelectedCategories([]);
    setShowNewOnly(false);
  };

  const activeFilterCount = selectedCategories.length + (showNewOnly ? 1 : 0);

  const features = [
    { icon: RotateCcw, title: "EASY RETURNS", subtitle: "REQUEST WITHIN 72 HRS OF DELIVERY" },
    { icon: Shield, title: "100% SECURE PAYMENT", subtitle: "ONLINE, WALLET'S, COD" },
    { icon: Truck, title: "FREE SHIPPING", subtitle: "FOR ORDER VALUE ₹500 OR ABOVE" },
    { icon: Headphones, title: "HELP DESK", subtitle: "VIA CALL OR MAIL (9AM - 6PM)" },
  ];

  return (
    <div className="min-h-screen bg-western-bg">
      <main className="pt-16">
        {/* Hero Banner */}
        <div className="relative h-[200px] md:h-[280px] overflow-hidden">
          <img src={westernBannerFull} alt="Western Collection Banner" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <img src={triyanLogoBanner} alt="Triyank Logo" className="w-20 h-20 md:w-32 md:h-32 object-contain mb-3 drop-shadow-2xl" />
            <h1 className="text-2xl md:text-4xl font-bold tracking-[0.2em] text-white uppercase drop-shadow-lg mb-2">Western Collection</h1>
            <div className="w-16 h-px bg-white/50 mb-2" />
            <p className="text-white/80 max-w-md mx-auto text-sm md:text-base drop-shadow">Modern elegance for the contemporary woman</p>
          </div>
        </div>

        <div ref={productsRef} className="px-6 py-12">
          {/* Filter & Sort Bar */}
          <div className="flex justify-between items-center gap-4 mb-8 pb-6 border-b border-western-border">
            <div className="flex items-center gap-3">
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <button className="flex items-center gap-2 text-base font-semibold text-western-text hover:text-western-accent transition-colors">
                    <SlidersHorizontal size={18} />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="bg-western-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-western-bg border-western-border">
                  <SheetHeader className="mb-6 border-b border-western-border pb-4">
                    <SheetTitle className="text-lg font-semibold text-western-text">Filters</SheetTitle>
                  </SheetHeader>

                  <div className="space-y-6">
                    {/* New Arrivals */}
                    <div>
                      <h3 className="text-base font-bold mb-3 text-western-text">New Arrivals</h3>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="new-arrivals"
                          checked={showNewOnly}
                          onCheckedChange={(checked) => setShowNewOnly(checked === true)}
                          className="border-western-border data-[state=checked]:bg-western-accent data-[state=checked]:border-western-accent"
                        />
                        <Label htmlFor="new-arrivals" className="text-base font-medium text-western-text cursor-pointer">
                          Show New Arrivals Only
                        </Label>
                      </div>
                    </div>

                    <Separator className="bg-western-border" />

                    {/* Category */}
                    <div>
                      <h3 className="text-base font-bold mb-3 text-western-text">Category</h3>
                      <div className="space-y-3">
                        {categories.map((cat) => (
                          <div key={cat} className="flex items-center space-x-3">
                            <Checkbox
                              id={`western-${cat}`}
                              checked={selectedCategories.includes(cat)}
                              onCheckedChange={() => toggleCategory(cat)}
                              className="border-western-border data-[state=checked]:bg-western-accent data-[state=checked]:border-western-accent"
                            />
                            <Label htmlFor={`western-${cat}`} className="text-base font-medium text-western-text cursor-pointer">
                              {cat}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-western-border" />

                    {/* Price */}
                    <div>
                      <h3 className="text-base font-bold mb-3 text-western-text">Price</h3>
                      <div className="space-y-3">
                        {priceRanges.map((range) => (
                          <div key={range} className="flex items-center space-x-3">
                            <Checkbox id={`price-${range}`} className="border-western-border data-[state=checked]:bg-western-accent data-[state=checked]:border-western-accent" />
                            <Label htmlFor={`price-${range}`} className="text-base font-medium text-western-text cursor-pointer">
                              {range}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-western-border" />

                    <div className="flex flex-col gap-2 pt-4">
                      <Button onClick={() => setFiltersOpen(false)} className="w-full bg-western-accent hover:bg-western-accent/90 text-white">
                        Apply Filters
                      </Button>
                      <Button variant="ghost" onClick={clearFilters} className="w-full text-western-muted hover:text-western-text">
                        Clear All
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <p className="text-western-muted text-base font-semibold">{sortedProducts.length} products</p>
            </div>

            <div className="flex items-center gap-4">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 text-base font-semibold bg-western-card border border-western-border text-western-text cursor-pointer focus:outline-none focus:border-western-accent rounded">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="hidden md:flex items-center gap-2">
                <button onClick={() => setGridSize("large")} className={`p-2 ${gridSize === "large" ? "text-western-accent" : "text-western-muted"}`}>
                  <LayoutGrid size={20} />
                </button>
                <button onClick={() => setGridSize("small")} className={`p-2 ${gridSize === "small" ? "text-western-accent" : "text-western-muted"}`}>
                  <Grid3X3 size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {showNewOnly && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-western-accent/10 text-western-accent border border-western-accent/30 rounded-full">
                  New Arrivals
                  <X size={12} className="cursor-pointer" onClick={() => setShowNewOnly(false)} />
                </span>
              )}
              {selectedCategories.map(cat => (
                <span key={cat} className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-western-accent/10 text-western-accent border border-western-accent/30 rounded-full">
                  {cat}
                  <X size={12} className="cursor-pointer" onClick={() => toggleCategory(cat)} />
                </span>
              ))}
              <button onClick={clearFilters} className="text-xs text-western-muted hover:text-western-accent underline">
                Clear all
              </button>
            </div>
          )}

          <div className={`grid gap-6 md:gap-8 ${gridSize === "large" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-3 md:grid-cols-4 lg:grid-cols-5"}`}>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant="western" />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-western-muted">No products found. Try adjusting your filters.</p>
            </div>
          )}

          <div className="mt-16 py-8 border-t border-western-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border border-western-accent flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-western-accent" />
                  </div>
                  <h3 className="text-xs font-semibold text-western-text mb-1">{feature.title}</h3>
                  <p className="text-xs text-western-muted">{feature.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-western-card border-t border-western-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-[0.3em] text-western-accent mb-4">TRIYANK</h2>
            <p className="text-western-muted text-sm mb-6">Modern elegance for the contemporary woman</p>
            <div className="flex justify-center gap-8 text-sm text-western-muted">
              <Link to="/about/our-story" className="hover:text-western-accent transition-colors">Our Story</Link>
              <Link to="/about/customer-care" className="hover:text-western-accent transition-colors">Customer Care</Link>
              <Link to="/about/size-guide" className="hover:text-western-accent transition-colors">Size Guide</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WesternCollection;
