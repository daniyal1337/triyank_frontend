import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

// Blog data
const blogPosts = [
  {
    id: 1,
    slug: "sterling-silver-care",
    title: "Complete Guide to Sterling Silver Jewelry Care",
    excerpt: "Learn how to maintain the shine and quality of your silver jewelry with our expert care tips and cleaning techniques.",
    content: `
      <p>Sterling silver jewelry is a timeless investment that can last generations when properly cared for. At Triyank, we believe that understanding how to maintain your jewelry is just as important as selecting the perfect piece.</p>
      
      <h3>Understanding Sterling Silver</h3>
      <p>Sterling silver is an alloy containing 92.5% pure silver and 7.5% other metals, usually copper. This composition gives it strength while maintaining the beautiful luster that silver is known for. Our 92.5 sterling silver jewelry at Triyank is crafted to the highest standards, ensuring longevity and brilliance.</p>
      
      <h3>Daily Care Tips</h3>
      <ul>
        <li>Store your silver jewelry in a cool, dry place away from direct sunlight</li>
        <li>Use anti-tarnish strips in your jewelry box to prevent oxidation</li>
        <li>Keep pieces separated to avoid scratching</li>
        <li>Put on jewelry last when dressing, after applying cosmetics and perfume</li>
      </ul>
      
      <h3>Cleaning Your Silver Jewelry</h3>
      <p>Regular cleaning helps maintain the shine of your sterling silver pieces. For daily cleaning, use a soft cloth specifically designed for silver. For deeper cleaning, create a solution of warm water and mild dish soap, gently clean with a soft brush, and dry thoroughly.</p>
      
      <h3>Professional Care</h3>
      <p>While home care is essential, professional cleaning every 6-12 months can restore your jewelry to its original brilliance. At Triyank, we offer complimentary cleaning services for all our customers.</p>
    `,
    date: "March 15, 2024",
    readTime: "5 min read",
    author: "Triyank Team",
    category: "Jewelry Care",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1200&h=600&fit=crop"
  },
  {
    id: 2,
    slug: "wedding-jewelry-trends-2024",
    title: "2024 Wedding Jewelry Trends: Traditional Meets Modern",
    excerpt: "Discover the latest bridal jewelry trends that blend traditional Indian designs with contemporary styles for your special day.",
    content: `
      <p>Wedding season is upon us, and 2024 brings a beautiful fusion of tradition and modernity in bridal jewelry. At Triyank, we've curated the finest collection that honors heritage while embracing contemporary elegance.</p>
      
      <h3>The Rise of Minimalist Bridal Sets</h3>
      <p>Modern brides are embracing understated elegance. Our new collection features delicate necklaces with single statement pendants, paired with matching earrings that make a subtle yet powerful statement. These pieces transition beautifully from wedding day to everyday wear.</p>
      
      <h3>Revival of Heritage Designs</h3>
      <p>Traditional temple jewelry and antique-inspired designs are making a comeback. Our heritage collection features intricate jhumkas, chandbalis, and chokers that pay homage to Indian craftsmanship while incorporating modern comfort and wearability.</p>
      
      <h3>Mixing Metals and Gemstones</h3>
      <p>The modern bride isn't afraid to mix rose gold with yellow gold, or pair diamonds with colored gemstones. Our fusion collection offers pieces that combine different metals and stones for a unique, personalized bridal look.</p>
      
      <h3>Sustainable Bridal Choices</h3>
      <p>Today's brides are conscious of their environmental impact. Our lab-grown diamond collection and recycled metal options offer stunning alternatives that are both beautiful and responsible.</p>
      
      <h3>Customization is Key</h3>
      <p>Every bride wants something unique. Our bespoke service allows you to customize everything from stone settings to engraving, ensuring your bridal jewelry is truly one-of-a-kind.</p>
    `,
    date: "March 10, 2024",
    readTime: "7 min read",
    author: "Triyank Team",
    category: "Wedding Trends",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1200&h=600&fit=crop"
  },
  {
    id: 3,
    slug: "perfect-jewelry-gift-guide",
    title: "How to Choose the Perfect Jewelry Gift for Every Occasion",
    excerpt: "Our comprehensive guide to selecting meaningful jewelry gifts that will delight your loved ones on birthdays, anniversaries, and more.",
    content: `
      <p>Choosing jewelry as a gift is an art that combines thoughtfulness, knowledge of the recipient's style, and understanding the significance of different pieces. At Triyank, we help you make every gift memorable.</p>
      
      <h3>Birthdays: Celebrating Individuality</h3>
      <p>For birthdays, consider birthstone jewelry or pieces that reflect the recipient's personality. Our birthstone collection offers elegant pendants, rings, and earrings featuring genuine gemstones for each month.</p>
      
      <h3>Anniversaries: Marking Milestones</h3>
      <p>Each anniversary has a traditional metal or gemstone associated with it. From paper to diamond anniversaries, we have curated collections that honor these traditions while offering contemporary designs.</p>
      
      <h3>Weddings and Engagements</h3>
      <p>For couples starting their journey, our bridal collection offers everything from delicate mangalsutras to statement reception pieces. Consider our matching couple bands for a thoughtful touch.</p>
      
      <h3>Festivals and Celebrations</h3>
      <p>Indian festivals call for traditional elegance. Our festive collection features kundan, polki, and temple jewelry perfect for Diwali, Karva Chauth, and other celebrations.</p>
      
      <h3>Just Because: Spontaneous Gifting</h3>
      <p>Sometimes the best gifts need no occasion. Our everyday collection features dainty necklaces, stackable rings, and minimalist earrings that make perfect spontaneous gifts.</p>
      
      <h3>Gift Presentation Matters</h3>
      <p>Every piece from Triyank comes in our signature luxury packaging, complete with a certificate of authenticity and care instructions, making your gift even more special.</p>
    `,
    date: "March 5, 2024",
    readTime: "6 min read",
    author: "Triyank Team",
    category: "Gift Guide",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=600&fit=crop"
  }
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
              </Link>
              
              <span className="inline-block px-4 py-1 bg-primary text-white text-sm font-medium tracking-wider uppercase rounded-full mb-4">
                {post.category}
              </span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-wider mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-12 border-t border-border"
          >
            <h3 className="text-2xl font-medium text-foreground mb-8">More Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map(relatedPost => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group block p-4 rounded-lg border border-border hover:border-primary transition-colors"
                  >
                    <span className="text-xs text-primary font-medium tracking-wider uppercase">
                      {relatedPost.category}
                    </span>
                    <h4 className="text-lg font-medium text-foreground mt-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
