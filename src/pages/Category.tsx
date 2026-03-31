import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Grid3X3, LayoutGrid, Shield, Truck, RotateCcw, Headphones, SlidersHorizontal, X } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { allProducts, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/home/ProductCard";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import categoryBanner from "@/assets/western-banner-full.jpg";

const Category = () => {
  const { category } = useParams();
  const productsRef = useRef<HTMLDivElement>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [gridSize, setGridSize] = useState<"small" | "large">("large");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { addToCart } = useCart();
  const { toast } = useToast();

  // Get products for this category
  const categoryProducts = allProducts.filter(
    p => p.category.toLowerCase() === category?.toLowerCase() ||
         p.subcategory?.toLowerCase() === category?.toLowerCase()
  );

  // Get unique subcategories for this category
  const subcategories = [...new Set(categoryProducts.map(p => p.subcategory).filter(Boolean))];
  const materials = ["Gold", "Silver", "Rose Gold", "Platinum"];
  const priceRanges = ["Under ₹1,000", "₹1,000 - ₹2,000", "₹2,000 - ₹3,000", "Over ₹3,000"];

  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories(prev =>
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  };

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials(prev =>
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const filteredProducts = categoryProducts.filter(p => {
    if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(p.subcategory || "")) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "newest": return (a.isNew ? -1 : 0) - (b.isNew ? -1 : 0);
      case "popularity": return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      default: return 0;
    }
  });

  const clearFilters = () => {
    setSelectedSubcategories([]);
    setSelectedMaterials([]);
  };

  const activeFilterCount = selectedSubcategories.length + selectedMaterials.length;

  const features = [
    { icon: RotateCcw, title: "EASY RETURNS", subtitle: "REQUEST WITHIN 72 HRS OF DELIVERY" },
    { icon: Shield, title: "100% SECURE PAYMENT", subtitle: "ONLINE, WALLET'S, COD" },
    { icon: Truck, title: "FREE SHIPPING", subtitle: "FOR ORDER VALUE ₹500 OR ABOVE" },
    { icon: Headphones, title: "HELP DESK", subtitle: "VIA CALL OR MAIL (9AM - 6PM)" },
  ];

  const displayCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products';

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <section className="relative w-full h-[180px] md:h-[220px] overflow-hidden pt-16">
        <img src={categoryBanner} alt={displayCategory} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-2xl md:text-4xl font-bold tracking-[0.15em] text-white uppercase drop-shadow-lg">
            {displayCategory}
          </h1>
          <div className="w-16 h-px bg-white/50 mt-3" />
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
                  {/* Subcategory */}
                  {subcategories.length > 0 && (
                    <>
                      <div>
                        <h3 className="text-base font-bold mb-3 text-foreground">Subcategory</h3>
                        <div className="space-y-3">
                          {subcategories.map((sub) => (
                            <div key={sub} className="flex items-center space-x-3">
                              <Checkbox
                                id={`sub-${sub}`}
                                checked={selectedSubcategories.includes(sub || "")}
                                onCheckedChange={() => toggleSubcategory(sub || "")}
                                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                              <Label htmlFor={`sub-${sub}`} className="text-base font-medium text-foreground cursor-pointer">
                                {sub}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Separator className="bg-border" />
                    </>
                  )}

                  {/* Material */}
                  <div>
                    <h3 className="text-base font-bold mb-3 text-foreground">Material</h3>
                    <div className="space-y-3">
                      {materials.map((mat) => (
                        <div key={mat} className="flex items-center space-x-3">
                          <Checkbox
                            id={`mat-${mat}`}
                            checked={selectedMaterials.includes(mat)}
                            onCheckedChange={() => toggleMaterial(mat)}
                            className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <Label htmlFor={`mat-${mat}`} className="text-base font-medium text-foreground cursor-pointer">
                            {mat}
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
                          <Checkbox id={`price-${range}`} className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                          <Label htmlFor={`price-${range}`} className="text-base font-medium text-foreground cursor-pointer">
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
            {selectedSubcategories.map(sub => (
              <span key={sub} className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-primary/10 text-primary border border-primary/30 rounded-full">
                {sub}
                <X size={12} className="cursor-pointer" onClick={() => toggleSubcategory(sub)} />
              </span>
            ))}
            {selectedMaterials.map(mat => (
              <span key={mat} className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-primary/10 text-primary border border-primary/30 rounded-full">
                {mat}
                <X size={12} className="cursor-pointer" onClick={() => toggleMaterial(mat)} />
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
            <p className="text-muted-foreground">No products found in this category.</p>
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

export default Category;