import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Video, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TutorDashboard() {
  const { backendUrl, userData } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/bookings/tutor-requests`);
      if (data.success) {
        setBookings(data.data.content || []);
      }
    } catch (error) {
      console.error("Error fetching bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await axios.patch(`${backendUrl}/api/bookings/${bookingId}/status`, null, {
        params: { status }
      });
      fetchBookings();
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const startMeeting = (booking) => {
    navigate(`/video-session/${booking.meetingChannel || booking.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark transition-colors duration-500 pt-24 px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black text-brand-dark dark:text-white">Tutor Dashboard</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-2">Manage your classes and upcoming sessions.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-brand-green text-brand-dark font-bold rounded-2xl hover:bg-brand-dark hover:text-white transition-all shadow-lg shadow-brand-green/20">
            <Plus className="w-5 h-5" /> Create New Class
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats or Quick Actions can go here */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-2xl font-bold text-brand-dark dark:text-white">Recent Booking Requests</h2>
            
            {loading ? (
              <div className="grid gap-4">
                {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-200 dark:bg-white/5 animate-pulse rounded-3xl" />)}
              </div>
            ) : bookings.length === 0 ? (
              <div className="bg-white dark:bg-white/5 p-12 rounded-[2rem] text-center border border-dashed border-neutral-300 dark:border-white/10">
                <p className="text-neutral-400">No booking requests found.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {bookings.map((booking) => (
                  <motion.div 
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-white/5 p-6 rounded-[2rem] border border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-brand-green/20 rounded-2xl flex items-center justify-center text-brand-green">
                        <Calendar className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-brand-dark dark:text-white">{booking.gig.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {new Date(booking.startTime).toLocaleString()}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            booking.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' :
                            booking.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {booking.status === 'PENDING' && (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(booking.id, 'CONFIRMED')}
                            className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
                          >
                            <CheckCircle className="w-6 h-6" />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(booking.id, 'CANCELLED')}
                            className="p-3 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                          >
                            <XCircle className="w-6 h-6" />
                          </button>
                        </>
                      )}
                      {booking.status === 'CONFIRMED' && (
                        <button 
                          onClick={() => startMeeting(booking)}
                          className="flex items-center gap-2 px-6 py-3 bg-brand-dark dark:bg-white text-white dark:text-brand-dark font-bold rounded-xl hover:bg-brand-green hover:text-brand-dark transition-all"
                        >
                          <Video className="w-5 h-5" /> Start Session
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
