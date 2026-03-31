import { useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Grid3X3, LayoutGrid, Shield, Truck, RotateCcw, Headphones, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/home/ProductCard";
import { allProducts, formatPrice } from "@/data/products";
import newArrivalsBanner from "@/assets/triyank-logo-banner.png";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer/Footer";

const NewArrivalsPage = () => {
  const [searchParams] = useSearchParams();
  const productsRef = useRef<HTMLDivElement>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [gridSize, setGridSize] = useState<"small" | "large">("large");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = ["Necklaces", "Earrings", "Bracelets", "Rings", "Bangles", "Maang Tikka"];
  const collections = ["Western", "Traditional", "Leather"];
  const priceRanges = ["Under ₹1,000", "₹1,000 - ₹5,000", "₹5,000 - ₹10,000", "Over ₹10,000"];

  // Filter only new arrival products
  const newArrivals = allProducts.filter((p) => p.isNew && p.status === "active");

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleCollection = (col: string) => {
    setSelectedCollections(prev =>
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    );
  };

  const filteredProducts = newArrivals.filter(p => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
    if (selectedCollections.length > 0) {
      const collectionMap: { [key: string]: string } = {
        "Western": "western",
        "Traditional": "indian",
        "Leather": "leather"
      };
      const productCollection = collectionMap[p.collection] || p.collection;
      if (!selectedCollections.includes(productCollection === "indian" ? "Traditional" : productCollection.charAt(0).toUpperCase() + productCollection.slice(1))) return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default: return 0;
    }
  });

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedCollections([]);
  };

  const activeFilterCount = selectedCategories.length + selectedCollections.length;

  const features = [
    { icon: RotateCcw, title: "EASY RETURNS", subtitle: "REQUEST WITHIN 72 HRS OF DELIVERY" },
    { icon: Shield, title: "100% SECURE PAYMENT", subtitle: "ONLINE, WALLET'S, COD" },
    { icon: Truck, title: "FREE SHIPPING", subtitle: "FOR ORDER VALUE ₹500 OR ABOVE" },
    { icon: Headphones, title: "HELP DESK", subtitle: "VIA CALL OR MAIL (9AM - 6PM)" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <main className="pt-16">
        {/* Hero Banner */}
        <div className="relative h-[220px] md:h-[280px] overflow-hidden bg-gradient-to-r from-[#c9a86c]/20 to-[#b8a090]/20">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <img src={newArrivalsBanner} alt="Triyank Logo" className="hidden md:block w-24 h-24 object-contain mb-3 drop-shadow-2xl" />
            <h1 className="text-2xl md:text-4xl font-bold tracking-[0.2em] text-[#1a1410] uppercase drop-shadow-lg mb-2">
              New Arrivals
            </h1>
            <div className="w-16 h-px bg-[#c9a86c] mb-2" />
            <p className="text-[#1a1410]/70 max-w-md mx-auto text-sm md:text-base">
              Discover our latest collection of exquisite jewelry
            </p>
          </div>
        </div>

        <div ref={productsRef} className="px-6 py-12">
          {/* Filter & Sort Bar */}
          <div className="flex justify-between items-center gap-4 mb-8 pb-6 border-b border-[#e5e0d8]">
            <div className="flex items-center gap-3">
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <button className="flex items-center gap-2 text-base font-semibold text-[#1a1410] hover:text-[#c9a86c] transition-colors">
                    <SlidersHorizontal size={18} />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="bg-[#c9a86c] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-[#f8f5f2] border-[#e5e0d8]">
                  <SheetHeader className="mb-6 border-b border-[#e5e0d8] pb-4">
                    <SheetTitle className="text-lg font-semibold text-[#1a1410]">Filters</SheetTitle>
                  </SheetHeader>

                  <div className="space-y-6">
                    {/* Category */}
                    <div>
                      <h3 className="text-base font-bold mb-3 text-[#1a1410]">Category</h3>
                      <div className="space-y-3">
                        {categories.map((cat) => (
                          <div key={cat} className="flex items-center space-x-3">
                            <Checkbox
                              id={`new-${cat}`}
                              checked={selectedCategories.includes(cat)}
                              onCheckedChange={() => toggleCategory(cat)}
                              className="border-[#e5e0d8] data-[state=checked]:bg-[#c9a86c] data-[state=checked]:border-[#c9a86c]"
                            />
                            <Label htmlFor={`new-${cat}`} className="text-base font-medium text-[#1a1410] cursor-pointer">
                              {cat}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-[#e5e0d8]" />

                    {/* Collection */}
                    <div>
                      <h3 className="text-base font-bold mb-3 text-[#1a1410]">Collection</h3>
                      <div className="space-y-3">
                        {collections.map((col) => (
                          <div key={col} className="flex items-center space-x-3">
                            <Checkbox
                              id={`new-col-${col}`}
                              checked={selectedCollections.includes(col)}
                              onCheckedChange={() => toggleCollection(col)}
                              className="border-[#e5e0d8] data-[state=checked]:bg-[#c9a86c] data-[state=checked]:border-[#c9a86c]"
                            />
                            <Label htmlFor={`new-col-${col}`} className="text-base font-medium text-[#1a1410] cursor-pointer">
                              {col}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-[#e5e0d8]" />

                    {/* Price */}
                    <div>
                      <h3 className="text-base font-bold mb-3 text-[#1a1410]">Price</h3>
                      <div className="space-y-3">
                        {priceRanges.map((range) => (
                          <div key={range} className="flex items-center space-x-3">
                            <Checkbox id={`new-price-${range}`} className="border-[#e5e0d8] data-[state=checked]:bg-[#c9a86c] data-[state=checked]:border-[#c9a86c]" />
                            <Label htmlFor={`new-price-${range}`} className="text-base font-medium text-[#1a1410] cursor-pointer">
                              {range}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-[#e5e0d8]" />

                    <div className="flex flex-col gap-2 pt-4">
                      <Button onClick={() => setFiltersOpen(false)} className="w-full bg-[#c9a86c] hover:bg-[#b8975b] text-white">
                        Apply Filters
                      </Button>
                      <Button variant="ghost" onClick={clearFilters} className="w-full text-[#666] hover:text-[#1a1410]">
                        Clear All
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <p className="text-[#666] text-base font-semibold">{sortedProducts.length} products</p>
            </div>

            <div className="flex items-center gap-4">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 text-base font-semibold bg-white border border-[#e5e0d8] text-[#1a1410] cursor-pointer focus:outline-none focus:border-[#c9a86c] rounded">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="hidden md:flex items-center gap-2">
                <button onClick={() => setGridSize("large")} className={`p-2 ${gridSize === "large" ? "text-[#c9a86c]" : "text-[#999]"}`}>
                  <LayoutGrid size={20} />
                </button>
                <button onClick={() => setGridSize("small")} className={`p-2 ${gridSize === "small" ? "text-[#c9a86c]" : "text-[#999]"}`}>
                  <Grid3X3 size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map(cat => (
                <span key={cat} className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-[#c9a86c]/10 text-[#c9a86c] border border-[#c9a86c]/30 rounded-full">
                  {cat}
                  <X size={12} className="cursor-pointer" onClick={() => toggleCategory(cat)} />
                </span>
              ))}
              {selectedCollections.map(col => (
                <span key={col} className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-[#c9a86c]/10 text-[#c9a86c] border border-[#c9a86c]/30 rounded-full">
                  {col}
                  <X size={12} className="cursor-pointer" onClick={() => toggleCollection(col)} />
                </span>
              ))}
              <button onClick={clearFilters} className="text-xs text-[#666] hover:text-[#c9a86c] underline">
                Clear all
              </button>
            </div>
          )}

          <div className={`grid gap-6 md:gap-8 ${gridSize === "large" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-3 md:grid-cols-4 lg:grid-cols-5"}`}>
            {sortedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                variant={product.collection === "indian" ? "indian" : "western"} 
              />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#666]">No new arrivals found. Try adjusting your filters.</p>
            </div>
          )}

          <div className="mt-16 py-8 border-t border-[#e5e0d8]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full border border-[#c9a86c] flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-[#c9a86c]" />
                  </div>
                  <h3 className="text-xs font-semibold text-[#1a1410] mb-1">{feature.title}</h3>
                  <p className="text-xs text-[#666]">{feature.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewArrivalsPage;
