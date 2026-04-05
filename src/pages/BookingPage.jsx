import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, Clock, DollarSign, User, ShieldCheck, Mail, ArrowRight, Loader2 } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';

export default function BookingPage() {
  const { id } = useParams();
  const { backendUrl, isLoggedin, login } = useContext(AppContext);
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState(new Date());
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGig();
  }, [id]);

  const fetchGig = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/gigs/${id}`);
      if (data.success) {
        setGig(data.data);
      }
    } catch (error) {
      console.error("Error fetching gig", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!isLoggedin) {
      login();
      return;
    }
    setBookingLoading(true);
    try {
      // End time is start time + duration from gig
      const endTime = new Date(startTime.getTime() + (gig.durationMinutes || 60) * 60000);
      
      const { data } = await axios.post(`${backendUrl}/api/bookings/${id}`, {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString()
      });

      if (data.success) {
        toast.success("Booking request sent!");
        navigate('/student-dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-brand-dark"><Loader2 className="w-12 h-12 animate-spin text-brand-green" /></div>;
  if (!gig) return <div className="min-h-screen flex items-center justify-center dark:bg-brand-dark text-white">Gig not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark transition-colors duration-500 pt-32 pb-12 px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* Left: Gig Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-bold uppercase tracking-widest">
            {gig.subject}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-brand-dark dark:text-white leading-tight">
            {gig.title}
          </h1>
          <p className="text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {gig.description}
          </p>

          <div className="flex flex-wrap gap-8 py-8 border-y border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center shadow-sm">
                <DollarSign className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-400">Price</p>
                <p className="text-xl font-black dark:text-white">${gig.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center shadow-sm">
                <Clock className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-400">Duration</p>
                <p className="text-xl font-black dark:text-white">{gig.durationMinutes} Mins</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl overflow-hidden ring-4 ring-brand-green/20">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${gig.tutor.name}`} alt="Tutor" />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-400">Taught by</p>
              <h4 className="text-2xl font-black dark:text-white">{gig.tutor.name}</h4>
              <div className="flex items-center gap-1 text-brand-green">
                <ShieldCheck className="w-4 h-4 fill-brand-green/20" />
                <span className="text-xs font-bold uppercase tracking-widest">Verified Expert</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Booking Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-white/5 p-10 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-white/10 relative h-fit"
        >
          <div className="space-y-8">
            <h3 className="text-3xl font-black dark:text-white">Secure Your Slot</h3>
            
            <div className="space-y-4">
              <label className="text-sm font-bold text-neutral-500 uppercase tracking-widest pl-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Select Date & Time
              </label>
              <div className="relative">
                <DatePicker 
                  selected={startTime} 
                  onChange={(date) => setStartTime(date)} 
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full bg-slate-50 dark:bg-brand-dark text-brand-dark dark:text-white border-none rounded-2xl p-5 shadow-inner focus:ring-2 focus:ring-brand-green"
                />
              </div>
            </div>

            <div className="bg-brand-green/5 p-6 rounded-2xl border border-brand-green/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-neutral-500 dark:text-neutral-400 font-bold">Standard Rate</span>
                <span className="text-2xl font-black dark:text-white">${gig.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500 dark:text-neutral-400 font-bold">Transaction Fee</span>
                <span className="text-neutral-500 dark:text-neutral-400">$2.00</span>
              </div>
              <div className="h-px bg-brand-green/10 my-4" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-black dark:text-brand-green">Total Due</span>
                <span className="text-3xl font-black dark:text-brand-green">${gig.price + 2}</span>
              </div>
            </div>

            <button 
              onClick={handleBooking}
              disabled={bookingLoading}
              className="w-full py-6 bg-brand-green text-brand-dark font-black rounded-3xl hover:bg-brand-dark hover:text-white transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl shadow-brand-green/20 disabled:opacity-50"
            >
              {bookingLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Complete Booking <ArrowRight className="w-6 h-6" /></>}
            </button>
            <p className="text-center text-xs font-bold text-neutral-400 uppercase tracking-widest">
              No immediate charge. Tutor will confirm first.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
