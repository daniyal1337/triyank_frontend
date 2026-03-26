import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const blogPosts = [
  {
    id: 1,
    slug: "sterling-silver-care",
    title: "Complete Guide to Sterling Silver Jewelry Care",
    excerpt: "Learn how to maintain the shine and quality of your silver jewelry with our expert care tips and cleaning techniques.",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Jewelry Care",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&h=500&fit=crop"
  },
  {
    id: 2,
    slug: "wedding-jewelry-trends-2024",
    title: "2024 Wedding Jewelry Trends: Traditional Meets Modern",
    excerpt: "Discover the latest bridal jewelry trends that blend traditional Indian designs with contemporary styles for your special day.",
    date: "March 10, 2024",
    readTime: "7 min read",
    category: "Wedding Trends",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&h=500&fit=crop"
  },
  {
    id: 3,
    slug: "perfect-jewelry-gift-guide",
    title: "How to Choose the Perfect Jewelry Gift for Every Occasion",
    excerpt: "Our comprehensive guide to selecting meaningful jewelry gifts that will delight your loved ones on birthdays, anniversaries, and more.",
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "Gift Guide",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=500&fit=crop"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-[#f5f0e8] to-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wider text-[#1a1410] mb-6">
              OUR BLOG
            </h1>
            <div className="w-24 h-px bg-[#c9a86c] mx-auto mb-8" />
            <p className="text-lg text-[#1a1410]/70 max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest jewelry trends, care tips, and styling guides from our experts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/3]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary/90 text-white text-xs font-medium tracking-wider uppercase rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <time>{post.date}</time>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-medium text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-primary font-medium tracking-wider text-sm group-hover:gap-3 transition-all duration-300">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
