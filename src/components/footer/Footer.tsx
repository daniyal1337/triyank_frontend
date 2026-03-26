import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full pt-12 pb-4 px-6 bg-western-accent">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          {/* Brand - Left side */}
          <div>
            <h2 className="text-2xl font-light tracking-[0.3em] text-white mb-4">TRIYANK</h2>
            <p className="text-sm font-light text-white/80 leading-relaxed max-w-md mb-6">
              Where tradition meets modern elegance. Curating exquisite jewelry for every occasion.
            </p>
            
            {/* Contact Information - with slightly darker background */}
            <div className="p-4 rounded-lg space-y-2 text-sm font-light text-white/90" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
              <div>
                <p className="font-normal text-white mb-1">Visit Us</p>
                <p>Karol Bagh, New Delhi</p>
                <p>India - 110005</p>
              </div>
              <div>
                <p className="font-normal text-white mb-1 mt-3">Contact</p>
                <p>+91 98765 43210</p>
                <p>hello@triyank.com</p>
              </div>
            </div>
          </div>

          {/* Link lists - Right side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Collections */}
            <div>
              <h4 className="text-sm font-normal mb-4 text-white">Collections</h4>
              <ul className="space-y-2">
                <li><Link to="/collection/western" className="text-sm font-light text-white/70 hover:text-white transition-colors">Western</Link></li>
                <li><Link to="/collection/traditional" className="text-sm font-light text-white/70 hover:text-white transition-colors">Traditional</Link></li>
                <li><Link to="/collection/western" className="text-sm font-light text-white/70 hover:text-white transition-colors">New Arrivals</Link></li>
                <li><Link to="/collection/traditional" className="text-sm font-light text-white/70 hover:text-white transition-colors">Bridal</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-normal mb-4 text-white">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-sm font-light text-white/70 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/about/size-guide" className="text-sm font-light text-white/70 hover:text-white transition-colors">Size Guide</Link></li>
                <li><Link to="/about/customer-care" className="text-sm font-light text-white/70 hover:text-white transition-colors">Customer Care</Link></li>
                <li><Link to="/about/customer-care" className="text-sm font-light text-white/70 hover:text-white transition-colors">Shipping</Link></li>
                <li><Link to="/about/customer-care" className="text-sm font-light text-white/70 hover:text-white transition-colors">Returns</Link></li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-sm font-normal mb-4 text-white">
                <Link to="/about" className="hover:text-white/70 transition-colors">About</Link>
              </h4>
              <ul className="space-y-2">
                <li><Link to="/about/our-story" className="text-sm font-light text-white/70 hover:text-white transition-colors">Our Story</Link></li>
                <li><Link to="/about/sustainability" className="text-sm font-light text-white/70 hover:text-white transition-colors">Sustainability</Link></li>
                <li><Link to="/about/store-locator" className="text-sm font-light text-white/70 hover:text-white transition-colors">Store Locator</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-white/20 pt-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm font-light text-white/60 mb-1 md:mb-0">
            © 2024 Triyank Jewelry. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm font-light text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm font-light text-white/60 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;