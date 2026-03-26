import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductCarousel from "../components/content/ProductCarousel";
import Testimonials from "../components/home/Testimonials";
import InstaReels from "../components/home/InstaReels";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { allProducts } from "@/data/products";

const ProductDetail = () => {
  const { productId } = useParams();
  const product = allProducts.find(p => p.id === productId);

  // Get similar products from same category
  const similarProducts = allProducts
    .filter(p => p.category === product?.category && p.id !== productId)
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        <section className="w-full px-6">
          {/* Breadcrumb - Show above image on smaller screens */}
          <div className="lg:hidden mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/category/${product?.category?.toLowerCase() || 'earrings'}`}>
                      {product?.category || 'Earrings'}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product?.name || 'Product'}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <ProductImageGallery />
            
            <div className="lg:pl-12 mt-8 lg:mt-0 lg:sticky lg:top-6 lg:h-fit">
              <ProductInfo />
            </div>
          </div>
        </section>
        
        {/* Similar Products */}
        <section className="w-full mt-16 lg:mt-24">
          <div className="mb-4 px-6">
            <h2 className="text-lg font-light text-foreground tracking-wider uppercase">Similar Products</h2>
          </div>
          <ProductCarousel />
        </section>
        
        {/* Testimonials */}
        <Testimonials />

        {/* Insta Reels */}
        <InstaReels />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;