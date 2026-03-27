import { useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Grid3X3, LayoutGrid, Shield, Truck, RotateCcw, Headphones, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/home/ProductCard";
import { indianProducts } from "@/data/products";
import indianBannerFull from "@/assets/indian-banner-full.jpg";
import triyanLogoBanner from "@/assets/triyank-logo-banner.png";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const TraditionalCollection = () => {
  const [searchParams] = useSearchParams();
  const productsRef = useRef<HTMLDivElement>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [gridSize, setGridSize] = useState<"small" | "large">("large");
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = ["Necklaces", "Earrings", "Bangles", "Maang Tikka"];
  const priceRanges = ["Under ₹500", "₹500 - ₹1,000", "₹1,000 - ₹2,000", "Over ₹2,000"];

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = indianProducts.filter(p => {
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
    <div className="min-h-screen bg-indian-bg">
      <main className="pt-16">
        {/* Hero Banner */}
        <div className="relative h-[220px] md:h-[280px] overflow-hidden">
          <img src={indianBannerFull} alt="Traditional Collection Banner" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 h-full flex flex-col items-center justify-end md:justify-center text-center px-6 pb-6 md:pb-0">
            <img src={triyanLogoBanner} alt="Triyank Logo" className="hidden md:block w-32 h-32 object-contain mb-3 drop-shadow-2xl" />
            <h1 className="text-2xl md:text-4xl font-bold tracking-[0.2em] text-white uppercase drop-shadow-lg mb-2">Traditional Collection</h1>
            <div className="w-16 h-px bg-white/50 mb-2" />
            <p className="text-white/80 max-w-md mx-auto text-sm md:text-base drop-shadow">Exquisite pieces for weddings, festivals & celebrations</p>
          </div>
        </div>

        <div ref={productsRef} className="px-6 py-12">
          {/* Filter & Sort Bar */}
          <div className="flex justify-between items-center gap-4 mb-8 pb-6 border-b border-indian-border">
            <div className="flex items-center gap-3">
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <button className="flex items-center gap-2 text-base font-semibold text-indian-text hover:text-indian-accent transition-colors">
                    <SlidersHorizontal size={18} />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="bg-indian-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-indian-bg border-indian-border">
                  <SheetHeader className="mb-6 border-b border-indian-border pb-4">
                    <SheetTitle className="text-lg font-semibold text-indian-text">Filters</SheetTitle>
                  </SheetHeader>

                  <div className="space-y-6">
                    {/* New Arrivals */}
                    <div>
                      <h3 className="text-base font-bold mb-3 text-indian-text">New Arrivals</h3>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="new-arrivals-indian"
                          checked={showNewOnly}
                          onCheckedChange={(checked) => setShowNewOnly(checked === true)}
                          className="border-indian-border data-[state=checked]:bg-indian-accent data-[state=checked]:border-indian-accent"
                        />
                        <Label htmlFor="new-arrivals-indian" className="text-base font-medium text-indian-text cursor-pointer">
                          Show New Arrivals Only
                        </Label>
                      </div>
                    </div>

                    <Separator className="bg-indian-border" />

                    {/* Category */}
                    <div>
                      <h3 className="text-base font-bold mb-3 text-indian-text">Category</h3>
                      <div className="space-y-3">
                        {categories.map((cat) => (
                          <div key={cat} className="flex items-center space-x-3">
                            <Checkbox
                              id={`indian-${cat}`}
                              checked={selectedCategories.includes(cat)}
                              onCheckedChange={() => toggleCategory(cat)}
                              className="border-indian-border data-[state=checked]:bg-indian-accent data-[state=checked]:border-indian-accent"
                            />
                            <Label htmlFor={`indian-${cat}`} className="text-base font-medium text-indian-text cursor-pointer">
                              {cat}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-indian-border" />

                    {/* Price */}
                    <div>
                      <h3 className="text-base font-bold mb-3 text-indian-text">Price</h3>
                      <div className="space-y-3">
                        {priceRanges.map((range) => (
                          <div key={range} className="flex items-center space-x-3">
                            <Checkbox id={`price-indian-${range}`} className="border-indian-border data-[state=checked]:bg-indian-accent data-[state=checked]:border-indian-accent" />
                            <Label htmlFor={`price-indian-${range}`} className="text-base font-medium text-indian-text cursor-pointer">
                              {range}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-indian-border" />

                    <div className="flex flex-col gap-2 pt-4">
                      <Button onClick={() => setFiltersOpen(false)} className="w-full bg-indian-accent hover:bg-indian-accent/90 text-white">
                        Apply Filters
                      </Button>
                      <Button variant="ghost" onClick={clearFilters} className="w-full text-indian-muted hover:text-indian-text">
                        Clear All
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <p className="text-indian-muted text-base font-semibold">{sortedProducts.length} products</p>
            </div>

            <div className="flex items-center gap-4">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 text-base font-semibold bg-indian-card border border-indian-border text-indian-text cursor-pointer focus:outline-none focus:border-indian-accent rounded">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="hidden md:flex items-center gap-2">
                <button onClick={() => setGridSize("large")} className={`p-2 ${gridSize === "large" ? "text-indian-accent" : "text-indian-muted"}`}>
                  <LayoutGrid size={20} />
                </button>
                <button onClick={() => setGridSize("small")} className={`p-2 ${gridSize === "small" ? "text-indian-accent" : "text-indian-muted"}`}>
                  <Grid3X3 size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {showNewOnly && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-indian-accent/10 text-indian-accent border border-indian-accent/30 rounded-full">
                  New Arrivals
                  <X size={12} className="cursor-pointer" onClick={() => setShowNewOnly(false)} />
                </span>
              )}
              {selectedCategories.map(cat => (
                <span key={cat} className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-indian-accent/10 text-indian-accent border border-indian-accent/30 rounded-full">
                  {cat}
                  <X size={12} className="cursor-pointer" onClick={() => toggleCategory(cat)} />
                </span>
              ))}
              <button onClick={clearFilters} className="text-xs text-indian-muted hover:text-indian-accent underline">
                Clear all
              </button>
            </div>
          )}

          <div className={`grid gap-6 md:gap-8 ${gridSize === "large" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-3 md:grid-cols-4 lg:grid-cols-5"}`}>
            {sortedProducts.map((product) => (
              <div key={product.id} className="group">
                <ProductCard product={product} variant="indian" />
              </div>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-indian-muted">No products found. Try adjusting your filters.</p>
            </div>
          )}

          <div className="mt-16 py-8 border-t border-indian-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border border-indian-accent flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-indian-accent" />
                  </div>
                  <h3 className="text-xs font-semibold text-indian-text mb-1">{feature.title}</h3>
                  <p className="text-xs text-indian-muted">{feature.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-indian-card border-t border-indian-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-[0.3em] text-indian-accent mb-4">TRIYANK</h2>
            <p className="text-indian-muted text-sm mb-6">Where tradition meets elegance</p>
            <div className="flex justify-center gap-8 text-sm text-indian-muted">
              <Link to="/about/our-story" className="hover:text-indian-accent transition-colors">Our Story</Link>
              <Link to="/about/customer-care" className="hover:text-indian-accent transition-colors">Customer Care</Link>
              <Link to="/about/size-guide" className="hover:text-indian-accent transition-colors">Size Guide</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TraditionalCollection;
