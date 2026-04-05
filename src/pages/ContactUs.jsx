import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactUs() {
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
            Get In <span className="text-brand-green">Touch</span>
          </motion.h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Have questions or need assistance? Reach out to us and our support team will get back to you shortly.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <h2 className="text-4xl font-black text-brand-dark dark:text-white leading-tight">
              Ready to Maximize Your <br />
              <span className="text-brand-green">Learning Success?</span>
            </h2>
            <div className="space-y-8">
              {[
                { icon: <Mail className="w-6 h-6 text-brand-green" />, title: 'Email address', body: 'support@educax.com' },
                { icon: <Phone className="w-6 h-6 text-brand-green" />, title: 'Phone number', body: '+1 (555) 123-4567' },
                { icon: <MapPin className="w-6 h-6 text-brand-green" />, title: 'Office location', body: 'San Francisco, CA, USA' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-center">
                  <div className="w-14 h-14 rounded-2xl bg-brand-dark flex items-center justify-center shadow-xl ring-2 ring-brand-green/20">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-widest">{item.title}</h4>
                    <p className="text-xl font-black text-brand-dark dark:text-white">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-white/5 p-10 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/10"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-500">First Name</label>
                  <input type="text" className="w-full bg-white dark:bg-brand-dark border-none rounded-2xl p-4 shadow-sm focus:ring-2 focus:ring-brand-green transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-neutral-500">Last Name</label>
                  <input type="text" className="w-full bg-white dark:bg-brand-dark border-none rounded-2xl p-4 shadow-sm focus:ring-2 focus:ring-brand-green transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-500">Email Address</label>
                <input type="email" className="w-full bg-white dark:bg-brand-dark border-none rounded-2xl p-4 shadow-sm focus:ring-2 focus:ring-brand-green transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-500">Message</label>
                <textarea rows="4" className="w-full bg-white dark:bg-brand-dark border-none rounded-2xl p-4 shadow-sm focus:ring-2 focus:ring-brand-green transition-all"></textarea>
              </div>
              <button className="w-full py-5 bg-brand-green text-brand-dark font-black rounded-2xl hover:bg-brand-dark hover:text-white transition-all flex items-center justify-center gap-2 group shadow-xl shadow-brand-green/20">
                Send Message <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
