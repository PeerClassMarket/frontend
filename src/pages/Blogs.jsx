import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function Blogs() {
  const blogs = [
    { title: 'The Future of AI in Education', author: 'Dr. Sarah Jenkins', date: 'Oct 12, 2026', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400' },
    { title: 'Designing for the Modern User', author: 'Markus Weber', date: 'Sept 28, 2026', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400' },
    { title: 'How to Scale Your Business in 2026', author: 'Elena Rodriguez', date: 'Aug 15, 2026', image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-brand-dark transition-colors duration-500">
      {/* Header Section (Always Dark) */}
      <section className="bg-brand-dark pt-20 pb-32 px-8">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white"
          >
            Insights & <span className="text-brand-green">Articles</span>
          </motion.h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Stay updated with the latest trends, tips, and professional advice from our industry experts.
          </p>
        </div>
      </section>

      {/* Blogs Grid Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogs.map((blog, i) => (
              <motion.article 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group space-y-4"
              >
                <div className="relative h-64 rounded-[2rem] overflow-hidden shadow-xl">
                  <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={blog.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-6 text-sm text-neutral-500 font-medium">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {blog.date}</span>
                    <span className="flex items-center gap-1"><User className="w-4 h-4" /> {blog.author}</span>
                  </div>
                  <h3 className="text-2xl font-black text-brand-dark dark:text-white line-clamp-2 leading-tight group-hover:text-brand-green transition-colors">{blog.title}</h3>
                  <button className="flex items-center gap-2 text-brand-dark dark:text-brand-green font-bold group-hover:gap-4 transition-all">
                    Read More <ArrowRight className="w-5 h-5 text-brand-green" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
