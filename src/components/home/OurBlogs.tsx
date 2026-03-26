import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

// Import blog images - replace with actual blog images
import blog1 from "@/assets/collection-executive.jpg";
import blog2 from "@/assets/collection-softgirl.jpg";
import blog3 from "@/assets/collection-glamgoddess.jpg";

const blogPosts = [
  {
    id: 1,
    title: "Complete Guide to Sterling Silver Jewelry Care",
    excerpt: "Learn how to maintain the shine and quality of your silver jewelry with our expert care tips and cleaning techniques.",
    date: "March 15, 2024",
    image: blog1,
    category: "Jewelry Care",
    link: "/blog/sterling-silver-care"
  },
  {
    id: 2,
    title: "2024 Wedding Jewelry Trends: Traditional Meets Modern",
    excerpt: "Discover the latest bridal jewelry trends that blend traditional Indian designs with contemporary styles for your special day.",
    date: "March 10, 2024",
    image: blog2,
    category: "Wedding Trends",
    link: "/blog/wedding-jewelry-trends-2024"
  },
  {
    id: 3,
    title: "How to Choose the Perfect Jewelry Gift for Every Occasion",
    excerpt: "Our comprehensive guide to selecting meaningful jewelry gifts that will delight your loved ones on birthdays, anniversaries, and more.",
    date: "March 5, 2024",
    image: blog3,
    category: "Gift Guide",
    link: "/blog/perfect-jewelry-gift-guide"
  }
];

const OurBlogs = () => {
  return (
    <section className="py-14 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-foreground leading-tight mb-4">
            Our Blogs
          </h2>
          <div className="w-20 h-px bg-primary mx-auto mt-4" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Stay updated with the latest jewelry trends, care tips, and styling guides from our experts
          </p>
        </motion.div>

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
              <Link to={post.link} className="block">
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
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <time>{post.date}</time>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-medium text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-3 px-8 py-3 border border-border hover:border-primary hover:bg-primary hover:text-background transition-all duration-300 rounded-full font-medium tracking-wider text-sm"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OurBlogs;
