import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Clock, Users } from 'lucide-react';

export default function Courses() {
  const courses = [
    { title: 'Advanced Data Science', category: 'Data Science', duration: '12 Weeks', students: '1.2k', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400' },
    { title: 'Graphic Design Masterclass', category: 'Design', duration: '8 Weeks', students: '2.5k', image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80&w=400' },
    { title: 'Modern Web Development', category: 'Development', duration: '10 Weeks', students: '3.8k', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400' },
    { title: 'Digital Marketing Pro', category: 'Business', duration: '6 Weeks', students: '900', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400' },
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
            Our Professional <span className="text-brand-green">Courses</span>
          </motion.h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Enhance your career with our expert-led online courses designed for modern industry requirements.
          </p>
        </div>
      </section>

      {/* Courses Grid Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-3xl overflow-hidden bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-brand-green transition-all shadow-xl"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={course.title} />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-brand-green text-brand-dark font-bold text-xs rounded-full">
                    {course.category}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-black text-brand-dark dark:text-white line-clamp-1 group-hover:text-brand-green transition-colors">{course.title}</h3>
                  <div className="flex justify-between text-sm text-neutral-500 font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {course.students}</span>
                  </div>
                  <Link 
                    to={`/booking/${course.id || i + 1}`} 
                    className="block w-full py-3 bg-brand-dark dark:bg-white/10 text-white font-bold text-center rounded-xl hover:bg-brand-green hover:text-brand-dark transition-all"
                  >
                    Book Session
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
