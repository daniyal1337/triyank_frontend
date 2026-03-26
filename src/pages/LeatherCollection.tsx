import Footer from "@/components/footer/Footer";
import { Link } from "react-router-dom";
import leatherBanner from "@/assets/leather-jewelry-banner.jpg";
import triyankLogo from "@/assets/triyank-logo-banner.png";
import { leatherProducts, formatPrice } from "@/data/products";

const LeatherCollection = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <section className="relative w-full h-[200px] md:h-[280px] overflow-hidden pt-16">
        <img src={leatherBanner} alt="Leather Jewelry Collection" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <img src={triyankLogo} alt="Triyank Logo" className="w-20 h-20 md:w-32 md:h-32 object-contain mb-3 drop-shadow-2xl" />
          <h1 className="text-2xl md:text-4xl font-bold tracking-[0.2em] text-white uppercase drop-shadow-lg mb-2">
            Leather Collection
          </h1>
          <div className="w-16 h-px bg-white/50 mb-2" />
          <p className="text-white/80 max-w-md mx-auto text-sm md:text-base drop-shadow">
            Handcrafted with passion
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto text-center py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-light tracking-[0.1em] text-foreground mb-4">
          Our Signature Leather Line
        </h2>
        <p className="text-muted-foreground font-light leading-relaxed">
          Each piece in our leather jewelry collection is meticulously handcrafted using premium quality leather 
          and metal accents. From everyday bracelets to statement earrings, our leather line brings a unique 
          blend of rustic charm and contemporary style that sets you apart.
        </p>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {leatherProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer">
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
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LeatherCollection;
