import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const APP_ID = import.meta.env.VITE_AGORA_APP_ID;

export default function VideoSession() {
  const { channelName } = useParams();
  const { backendUrl, userData } = useContext(AppContext);
  const [localTracks, setLocalTracks] = useState([]);
  const [remoteUsers, setRemoteUsers] = useState({});
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  
  const client = useRef(AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }));
  const localVideoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    init();
    return () => {
      leave();
    };
  }, [channelName]);

  const init = async () => {
    try {
      // 1. Get Token from backend
      const { data } = await axios.get(`${backendUrl}/api/bookings/meeting-token`, {
        params: { channelName, account: userData?.email || 'anonymous' }
      });

      if (!data.success) throw new Error("Failed to get token");

      const token = data.data;

      // 2. Handle Events
      client.current.on('user-published', async (user, mediaType) => {
        await client.current.subscribe(user, mediaType);
        if (mediaType === 'video') {
          setRemoteUsers(prev => ({ ...prev, [user.uid]: user }));
        }
        if (mediaType === 'audio') {
          user.audioTrack.play();
        }
      });

      client.current.on('user-unpublished', (user) => {
        setRemoteUsers(prev => {
          const next = { ...prev };
          delete next[user.uid];
          return next;
        });
      });

      // 3. Join
      await client.current.join(APP_ID, channelName, token, userData?.email || null);

      // 4. Create and Publish local tracks
      const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      setLocalTracks([audioTrack, videoTrack]);
      
      if (localVideoRef.current) {
        videoTrack.play(localVideoRef.current);
      }

      await client.current.publish([audioTrack, videoTrack]);
      setIsJoined(true);
    } catch (error) {
      console.error("Agora Init Error", error);
    } finally {
      setLoading(false);
    }
  };

  const leave = async () => {
    localTracks.forEach(track => {
      track.stop();
      track.close();
    });
    await client.current.leave();
    setLocalTracks([]);
    setRemoteUsers({});
    setIsJoined(false);
    navigate(-1);
  };

  const toggleAudio = () => {
    if (localTracks[0]) {
      localTracks[0].setEnabled(audioMuted);
      setAudioMuted(!audioMuted);
    }
  };

  const toggleVideo = () => {
    if (localTracks[1]) {
      localTracks[1].setEnabled(videoMuted);
      setVideoMuted(!videoMuted);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-dark text-white gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-brand-green" />
        <p className="font-bold text-xl animate-pulse">Initializing Secure Session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark overflow-hidden flex flex-col">
      {/* Main Video Area */}
      <div className="flex-1 relative grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-16">
        {/* Local Video */}
        <div className="relative bg-slate-900 rounded-[2.5rem] overflow-hidden border-2 border-white/10 group aspect-video">
           <div ref={localVideoRef} className="w-full h-full" />
           <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
              <span className="text-white font-bold text-sm">You (Tutor)</span>
           </div>
           {videoMuted && (
             <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
               <VideoOff className="w-20 h-20 text-white/20" />
             </div>
           )}
        </div>

        {/* Remote Video(s) */}
        <AnimatePresence>
          {Object.values(remoteUsers).length > 0 ? (
            Object.values(remoteUsers).map(user => (
              <RemotePlayer key={user.uid} user={user} />
            ))
          ) : (
            <div className="relative bg-slate-900 rounded-[2.5rem] flex flex-col items-center justify-center border-2 border-dashed border-white/10 aspect-video">
               <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-10 h-10 text-white/20" />
               </div>
               <p className="text-white/40 font-bold">Waiting for student to join...</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls Bar */}
      <div className="h-24 bg-black/40 backdrop-blur-2xl border-t border-white/10 flex items-center justify-center gap-6 px-8">
        <button 
          onClick={toggleAudio}
          className={`p-4 rounded-2xl transition-all ${audioMuted ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {audioMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        
        <button 
          onClick={toggleVideo}
          className={`p-4 rounded-2xl transition-all ${videoMuted ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {videoMuted ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
        </button>

        <button 
          onClick={leave}
          className="p-4 bg-rose-600 text-white rounded-2xl hover:bg-rose-700 transition-all hover:scale-110 shadow-xl shadow-rose-600/20"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

const RemotePlayer = ({ user }) => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (user.videoTrack && videoRef.current) {
      user.videoTrack.play(videoRef.current);
    }
  }, [user.videoTrack]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative bg-slate-900 rounded-[2.5rem] overflow-hidden border-2 border-white/10 aspect-video"
    >
      <div ref={videoRef} className="w-full h-full" />
      <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <span className="text-white font-bold text-sm">Student Session</span>
      </div>
    </motion.div>
  );
};
