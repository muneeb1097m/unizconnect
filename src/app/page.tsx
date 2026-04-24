'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  Users, Award, Globe as GlobeIcon, CheckCircle2, XCircle, 
  Phone, Mail, MapPin, Star, Play, 
  ShieldCheck, Zap, Laptop, GraduationCap, Plane, FileText, Check,
  Clock, Wallet, AlertTriangle, X, Target, UserCheck, ChevronDown, ChevronUp,
  MessageCircle, Menu, ClipboardList, Volume2, VolumeX, Pause
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import GHLForm from '@/components/GHLForm'

// --- Animation Variants ---
const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: "easeOut" as const }
}

const STAGGER = (i: number) => ({
  ...FADE_UP,
  transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.1 }
})

// --- Shared Components ---
const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-16 md:py-28 px-6 md:px-12 lg:px-24 overflow-hidden ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
)

const Eyebrow = ({ children, white = false }: { children: React.ReactNode, white?: boolean }) => (
  <motion.div 
    {...FADE_UP}
    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-bold tracking-[2px] uppercase mb-8 border ${white ? 'bg-white/10 text-white border-white/20' : 'bg-primary/10 text-primary border-primary/20'}`}
  >
    <div className={`w-1.5 h-1.5 rounded-full ${white ? 'bg-white' : 'bg-primary'} animate-pulse`} />
    {children}
  </motion.div>
)

const PrimaryButton = ({ children, className = "", onClick, lg = false }: { children: React.ReactNode, className?: string, onClick?: () => void, lg?: boolean }) => (
  <motion.button 
    initial={{ backgroundColor: "#81248a", color: "#ffffff" }}
    whileHover={{ 
      backgroundColor: "rgba(255,255,255,1)", 
      color: "#81248a",
      scale: 1.02,
      boxShadow: "0 15px 40px rgba(129,36,138,0.1)"
    }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.2 }}
    onClick={onClick}
    className={`rounded-md font-black shadow-sm border-2 border-primary uppercase tracking-widest ${lg ? 'px-12 py-5 text-lg' : 'px-8 py-3.5 text-[13px]'} ${className}`}
  >
    {children}
  </motion.button>
)

const GhostButton = ({ children, className = "", onClick, white = false }: { children: React.ReactNode, className?: string, onClick?: () => void, white?: boolean }) => (
  <motion.button 
    whileHover={{ translateY: -2, background: white ? "rgba(255,255,255,0.1)" : "rgba(129,36,138,0.05)" }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`border-2 rounded-full font-bold transition-all px-8 py-3.5 ${white ? 'border-white text-white' : 'border-primary text-primary'} ${className}`}
  >
    {children}
  </motion.button>
)

const Card = ({ children, className = "", delay = 0, hover = true }: { children: React.ReactNode, className?: string, delay?: number, hover?: boolean }) => (
  <motion.div 
    {...STAGGER(delay)}
    whileHover={hover ? { translateY: -6, boxShadow: "0 20px 60px rgba(129,36,138,0.15)" } : {}}
    className={`bg-white border border-primary/10 rounded-[30px] p-8 transition-all ${className}`}
  >
    {children}
  </motion.div>
)

const DottedArrow = ({ className = "", color = "currentColor" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path 
      d="M20 140C40 80 100 40 140 20" 
      stroke={color} 
      strokeWidth="2.5" 
      strokeDasharray="0.1 7" 
      strokeLinecap="round" 
    />
    <path 
      d="M125 22L140 20L138 35" 
      stroke={color} 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
)

// --- Sections ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${scrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-md py-4 shadow-[0_8px_32px_0_rgba(129,36,138,0.05)] border-b border-primary/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center cursor-pointer relative z-[70]" onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMobileMenuOpen(false);
          }}>
            <img src="/logo.png" alt="UnizConnect" className="h-8 md:h-10 w-auto" />
          </div>
          
          <div className="hidden lg:flex items-center space-x-10">
            {['About', 'Results', 'FAQ', 'Booking'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="font-bold text-[13px] transition-colors uppercase tracking-[2px] text-[#4a0e8f]/70 hover:text-[#4a0e8f]"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 relative z-[70]">
            <motion.button 
              initial={{ backgroundColor: "#81248a", color: "#ffffff" }}
              whileHover={{ 
                backgroundColor: "#ffffff", 
                color: "#81248a",
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(129, 36, 138, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="hidden sm:block px-6 py-2.5 rounded-md font-black text-[13px] uppercase tracking-widest transition-all border-2 border-primary"
              onClick={() => {
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
            >
              Book a Call
            </motion.button>
            
            <button 
              className="lg:hidden p-2 text-primary" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[55] bg-white pt-32 px-6 lg:hidden"
          >
            <div className="flex flex-col space-y-6">
              {['About', 'Results', 'FAQ', 'Booking'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-fraunces text-4xl font-black text-primary border-b border-primary/10 pb-4"
                >
                  {item}
                </a>
              ))}
              <PrimaryButton 
                lg 
                className="w-full mt-8"
                onClick={() => {
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
              >
                Book a Call
              </PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-[#81248a]/[0.02]">
      {/* Optimized Background Blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div initial="initial" whileInView="whileInView" viewport={{ once: true }}>
          <h1 className="mb-6 md:mb-8 font-fraunces font-black leading-[1.2] text-3xl md:text-5xl lg:text-6xl tracking-tight bg-gradient-to-r from-[#81248a] via-[#4a0e8f] to-[#81248a] bg-clip-text text-transparent">
            Before You Spend One More Rupee On Study Abroad FIX YOUR PLAN FIRST
          </h1>
          
          <p className="text-dark/70 text-base md:text-xl font-medium mb-8 md:mb-10 leading-relaxed max-w-xl border-l-[8px] md:border-l-[12px] border-secondary/20 pl-6 md:pl-8">
            The most expensive part of your study abroad journey is not the fee. It is wrong guidance that makes you lose scholarships, time and peace of mind.
          </p>

          <p className="text-primary text-lg md:text-xl font-bold mb-10 md:mb-12 bg-primary/3 inline-block px-6 md:px-8 py-4 md:py-5 rounded-[20px] md:rounded-[24px] border border-primary/10 shadow-[0_8px_32px_0_rgba(129,36,138,0.05)] backdrop-blur-md">
            One Focused 1:1 Session That Can Save You Years Of Trial And Lacs Of Wasted Fees.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16 max-w-sm">
            <motion.button 
              initial={{ backgroundColor: "#81248a", color: "#ffffff" }}
              whileHover={{ 
                backgroundColor: "#ffffff", 
                color: "#81248a",
                scale: 1.02,
                boxShadow: "0 12px 30px rgba(129, 36, 138, 0.2)"
              }} 
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-primary px-7 py-4 rounded-md font-black text-[15px] shadow-sm transition-all uppercase tracking-widest flex-[1.5]"
            >
              BOOK YOUR 1 to 1 SESSION
            </motion.button>
            <motion.button 
              initial={{ backgroundColor: "#25D366", color: "#ffffff" }}
              whileHover={{ 
                backgroundColor: "#ffffff", 
                color: "#25D366",
                scale: 1.02,
                boxShadow: "0 12px 30px rgba(37, 211, 102, 0.2)"
              }} 
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => window.open('https://wa.me/923244898766', '_blank')}
              className="border-2 border-[#25D366] px-7 py-4 rounded-md font-black text-[15px] shadow-sm transition-all flex items-center justify-center gap-2 flex-1 uppercase tracking-widest"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </motion.button>
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            <img src="/tmpsknjl26f.webp" alt="Successful Students" className="h-16 md:h-20 w-auto object-contain self-start drop-shadow-sm" />
            <div className="flex items-center space-x-4 md:space-x-6 text-[12px] md:text-[14px] font-bold text-dark/40 uppercase tracking-[0.1em]">
              <div className="flex text-[#ffb800]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 md:w-4 h-3 md:h-4 fill-current" />)}
              </div>
              <span>5.0 Rating · 1,000+ Placements</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Floating Illustrations & Icons */}
          <div className="absolute inset-0 z-30 pointer-events-none hidden md:block">
            {[
              { t: "£327k+", d: "Scholarships Won", top: "-10%", left: "-10%", delay: 0 },
              { t: "1000+", d: "Students Guided", top: "20%", right: "-30%", delay: 1 },
              { t: "99%", d: "Success Rate", bottom: "25%", left: "-20%", delay: 0.5 },
              { t: "9 Years", d: "Experience", bottom: "40%", right: "-25%", delay: 1.5 },
            ].map((item, i) => (
              <motion.div
                key={i}
                animate={{ 
                   y: [0, -10, 0],
                }}
                transition={{ 
                   duration: 6 + i, 
                   repeat: Infinity, 
                   ease: "easeInOut",
                   delay: item.delay 
                }}
                style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                className="absolute bg-gradient-to-br from-[#4a0e8f] to-[#2a064f] p-4 rounded-lg shadow-2xl border border-white/10 flex items-center gap-3 min-w-[200px] z-50 text-white"
              >
                <div className="bg-white/20 rounded-md p-2 flex-shrink-0">
                  <Check className="w-4 h-4 text-white stroke-[4]" />
                </div>
                <div className="leading-tight text-white">
                   <p className="font-black text-sm md:text-base leading-none mb-1 text-white">{item.t}</p>
                   <p className="font-black uppercase tracking-widest text-[9px] md:text-[10px] leading-none text-white opacity-90">{item.d}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Badges Layout */}
          <div className="grid grid-cols-2 gap-3 mt-12 md:hidden">
            {[
              { t: "£327k+", d: "Scholarships" },
              { t: "1000+", d: "Students" },
              { t: "99%", d: "Success" },
              { t: "9 Years", d: "Experience" },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-[#4a0e8f] to-[#2a064f] p-4 rounded-xl border border-white/10 flex flex-col items-center text-center">
                <p className="font-black text-lg text-white mb-1">{item.t}</p>
                <p className="font-black uppercase tracking-widest text-[8px] text-white/70">{item.d}</p>
              </div>
            ))}
          </div>

          <div className="relative z-10 rounded-[24px] md:rounded-[40px] overflow-hidden">
            <img 
              src="/CEOimg.webp" 
              alt="Ayesha Saleem - Founder" 
              className="w-full h-auto object-cover aspect-[4/5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-40" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white drop-shadow-2xl">
              <p className="font-fraunces text-3xl md:text-5xl font-black mb-1">Ayesha Saleem</p>
              <p className="text-white/90 font-black tracking-[2px] md:tracking-[4px] text-[10px] md:text-[13px] uppercase">Founder UnizConnect</p>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/30 rounded-full blur-[100px] -z-10" />
          <div className="absolute -bottom-20 -left-20 w-90 h-90 bg-primary/20 rounded-full blur-[120px] -z-10" />
        </motion.div>
      </div>
    </section>
  )
}

const LogoItem = ({ url, name }: { url: string, name: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-shrink-0 flex items-center justify-center h-20 md:h-24 px-8 md:px-24 relative min-w-[200px] md:min-w-[450px]"
    >
      <AnimatePresence mode="popLayout">
        {!isHovered ? (
          <motion.span
            key="name"
            initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.95 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(4px)', scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="font-fraunces text-xl md:text-2xl font-black text-[#4a0e8f] whitespace-nowrap block"
          >
            {name}
          </motion.span>
        ) : (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <img 
              src={url} 
              alt={name} 
              className="h-10 md:h-16 w-auto object-contain max-w-[180px] md:max-w-[280px]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LogoBar = () => {
  const logos = [
    { name: "King's College London", url: "/kings college london.png" },
    { name: "University of Edinburgh", url: "/iuniversity of edinburgh.png" },
    { name: "University of Sheffield", url: "/university of sheffield.png" },
    { name: "University of Essex", url: "/university of essex.png" },
    { name: "LSE", url: "/the london school of economics and political science.png" },
    { name: "University of Kent", url: "/univeresity of kent.png" },
    { name: "Queen Mary University", url: "/queen marry univeristy of london.png" },
    { name: "University of Liverpool", url: "/university of liverpool1.png" },
  ];

  return (
    <div className="bg-[#81248a]/[0.02] border-y border-primary/10 py-12 overflow-hidden relative shadow-sm cursor-default">
        <p className="text-center text-[#4a0e8f]/40 text-[10px] uppercase font-bold tracking-[0.5em] mb-12">
          Students Placed At Leading Institutions
        </p>
        
        <div className="flex overflow-hidden relative w-full">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex flex-nowrap items-center"
          >
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <LogoItem key={i} url={logo.url} name={logo.name} />
            ))}
          </motion.div>
        </div>
    </div>
  );
}


const VideoIntro = () => (
  <Section className="bg-white pt-10 pb-0">
    <div className="text-center">
       <Eyebrow>Action Required</Eyebrow>
       <h2 className="font-fraunces text-4xl md:text-5xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-[#81248a] via-[#4a0e8f] to-[#81248a] bg-clip-text text-transparent max-w-5xl mx-auto">
         Please watch the video before you move further
       </h2>
    </div>
  </Section>
)

const ScrollVideoReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.8], [0.8, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.8], ["32px", "0px"]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    
    video.addEventListener('timeupdate', updateProgress);
    const handleVideoEnd = () => setIsPlaying(false);
    video.addEventListener('ended', handleVideoEnd);
    
    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div ref={containerRef} className="relative h-[100vh] md:h-[130vh] bg-white">
      <div className="sticky top-0 md:h-screen w-full flex items-center justify-center overflow-hidden py-10 md:py-0">
        <motion.div 
          style={{ scale: typeof window !== 'undefined' && window.innerWidth > 768 ? scale : 1, borderRadius: typeof window !== 'undefined' && window.innerWidth > 768 ? borderRadius : "16px" }}
          className="relative w-[92%] md:w-full h-auto md:h-full overflow-hidden shadow-2xl bg-black group cursor-pointer rounded-2xl md:rounded-none"
          onClick={togglePlay}
        >
          <video 
            ref={videoRef}
            src="https://assets.cdn.filesafe.space/B1KkpgABfPleeIPoYy8x/media/697b5bdbb3ae839f21a29faa.mp4"
            muted loop playsInline
            poster="https://assets.cdn.filesafe.space/B1KkpgABfPleeIPoYy8x/media/6928bdac571896657f6dba4d.png"
            className="w-full h-auto md:h-full md:object-cover"
          />
          
          <div className="absolute inset-0 flex items-center justify-center bg-transparent transition-all pointer-events-none">
             <motion.div 
               animate={{ scale: isPlaying ? 0.8 : 1, opacity: isPlaying ? 0 : 1 }}
               className="w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/20"
             >
                {isPlaying ? (
                  <Pause className="w-8 h-8 md:w-10 md:h-10 text-white fill-white" />
                ) : (
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-2" />
                )}
             </motion.div>
          </div>

          {/* Custom Video Bar/Scrubber */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-4 md:h-6 bg-transparent z-40 cursor-pointer group/scrub flex items-end"
            onClick={(e) => {
              e.stopPropagation();
              const video = videoRef.current;
              if (video && video.duration) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const clickedProgress = x / rect.width;
                video.currentTime = clickedProgress * video.duration;
              }
            }}
          >
             <div className="w-full h-1 md:h-1.5 bg-white/20 relative">
                <motion.div 
                   className="h-full bg-primary shadow-[0_0_20px_rgba(129,36,138,0.8)] relative"
                   style={{ width: `${progress}%` }}
                >
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full shadow-lg scale-0 md:group-hover/scrub:scale-100 transition-transform" />
                </motion.div>
             </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className="absolute bottom-4 right-4 md:bottom-10 md:right-10 z-50 bg-primary/20 backdrop-blur-xl p-2 md:p-4 rounded-full text-white border border-white/20 hover:bg-primary/40 transition-all flex items-center gap-2 group/btn"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest max-w-0 overflow-hidden md:group-hover/btn:max-w-xs transition-all duration-500 whitespace-nowrap">Unmute Intro</span>
              </>
            ) : (
              <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

const TargetAudience = () => {
  const points = [
    "Final Year Students", "Fresh Grads", "Working Professionals",
    "Study Gaps / Average Grades", "Confused about Country / Course", "Applying in next 6-12 Months",
    "Tired of Random Agents", "Concerned Parents", "Scholarship Seekers without a Plan"
  ];

  return (
    <Section className="bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/[0.04] via-off-white to-white relative overflow-hidden">
       {/* Decorative blob */}
       <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
       
       <div className="text-center mb-16 relative z-10">
          <Eyebrow>Eligibility</Eyebrow>
          <h2 className="font-fraunces text-center text-4xl md:text-5xl text-primary">Who this 1 to 1 Clarity Session is perfect for</h2>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-20 relative z-10">
          {points.map((point, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            >
              <motion.div
                animate={{ 
                   y: [0, -8, 0],
                }}
                transition={{ 
                   y: {
                     duration: 4 + i % 2, 
                     repeat: Infinity, 
                     ease: "easeInOut",
                     delay: i * 0.2
                   }
                }}
                className="bg-gradient-to-br from-[#81248a] to-[#4a0e8f] hover:bg-none hover:bg-white p-6 md:p-8 rounded-2xl flex items-center gap-4 md:gap-5 shadow-xl border border-white/10 hover:border-primary group h-full cursor-default transition-all duration-300"
              >
                 <div className="bg-white/20 rounded-xl p-2.5 md:p-3 flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Check className="w-4 md:w-5 h-4 md:h-5 text-white stroke-[3] group-hover:text-primary transition-colors" />
                 </div>
                 <span className="text-white font-black uppercase tracking-widest text-xs md:text-sm leading-tight group-hover:text-primary transition-colors">{point}</span>
              </motion.div>
            </motion.div>
          ))}
       </div>

       <div className="text-center relative z-10">
          <motion.p 
            {...FADE_UP}
            className="font-bold text-primary mb-12 tracking-[0.2em] text-[10px] md:text-xs uppercase bg-primary/5 inline-block px-10 py-3 rounded-full border border-primary/10"
          >
            If you see yourself in any of these, this session is designed for you.
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
             <PrimaryButton lg onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
                BOOK YOUR 1 to 1 SESSION
             </PrimaryButton>
          </div>
       </div>
    </Section>
  )
}



const MeetingAyeshaVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isInView]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
      <video 
        ref={videoRef}
        src="https://framerusercontent.com/assets/VzY8HkGfP0e6NqK5pL6f.mp4"
        loop muted playsInline
        className="w-full h-auto"
      />
    </div>
  );
};

const MeetingAyesha = () => {
  return (
    <Section id="about" className="bg-white">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
             <Eyebrow>Direct Access</Eyebrow>
             <h2 className="font-fraunces text-4xl md:text-6xl font-black mb-8 leading-tight">Meet Your Mentor, <br/><span className="text-primary">Ayesha Saleem</span></h2>
             
             <div className="space-y-6 text-dark/70 text-lg leading-relaxed mb-12">
                <p className="font-bold text-dark text-xl">Hi there,</p>
                <p>I am <span className="text-primary font-bold">Ayesha Saleem</span>, a British Council-certified counsellor and the founder of UnizConnect.</p>
                <p>Through my 1:1 coaching program, my students have secured over <span className="text-secondary font-black">£327,000</span> in scholarships, tuition fee waivers from <span className="font-bold">10% up to 100%</span>, and offers from top UK universities like <span className="font-bold">Imperial, UCL, LSE, Manchester, Nottingham, Edinburgh, King's, Bristol</span>, and others.</p>
                <p>None of this is by luck. It comes from a clear system I have refined over the past <span className="font-bold">9 years</span>, working with students across Pakistan, including from <span className="font-bold">LUMS, NUST, IBA, FAST, UET, Karachi University, Virtual University</span>, and public colleges in smaller cities.</p>
             </div>

             <div className="bg-gradient-to-r from-[#4a0e8f] to-[#2a064f] rounded-xl p-8 border border-white/10 shadow-2xl flex flex-wrap gap-8 justify-between">
                <div>
                   <p className="text-white text-2xl font-black">£327k</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Scholarships</p>
                </div>
                <div>
                   <p className="text-white text-2xl font-black">1000+</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Students</p>
                </div>
                <div>
                   <p className="text-white text-2xl font-black">99%</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Success</p>
                </div>
             </div>
          </motion.div>

          <div className="relative group flex justify-center">
             <div className="relative bg-white p-4 md:p-8 rounded-[40px] shadow-2xl border border-primary/10 max-w-lg overflow-hidden transition-all group-hover:shadow-[0_60px_100px_-20px_rgba(129,36,138,0.2)]">
                <img src="/certificate.webp" alt="British Council Certification" className="w-full h-auto rounded-2xl" />
                <div className="absolute top-0 right-0 p-6">
                   <div className="bg-primary/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                      <Award className="w-4 h-4 text-white" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Certified Advisor</span>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </Section>
  )
}


const GoogleReviews = () => {
    const reviews = [
        { name: "Bilal Ahmed", role: "UK Student", content: "Ayesha ma'am is incredible. She saved me from a £3000 mistake that another consultant was pushing. Best clarity session ever!", date: "2 months ago" },
        { name: "Fatima Zahra", role: "Canada Applicant", content: "The roadmap provided was so detailed. I finally understood the 2026 rule changes that were confusing me. Very professional.", date: "1 month ago" },
        { name: "Zainab Malik", role: "Masters Student", content: "Got my visa within 15 days using the UnizConnect framework. The SOP guidance is top-tier and very personalized.", date: "3 months ago" },
        { name: "Hamza Sheikh", role: "Scholarship Winner", content: "Highly recommended for anyone looking for honest advice. No fake promises, just real data and rule-based guidance.", date: "2 weeks ago" },
        { name: "Sara Khan", role: "Germany Aspirant", content: "The block account and APS process was so smooth with their help. Truly British Council standard service.", date: "5 months ago" },
        { name: "Usman Ali", role: "Australia Applicant", content: "If you are confused about which country to pick, just book one session here. It clears everything in 30 minutes.", date: "1 month ago" }
    ];

    return (
        <Section id="results" className="bg-off-white">
            <div className="text-center mb-20 px-4">
                <Eyebrow>Student Proof</Eyebrow>
                <h2 className="font-fraunces text-center">Unfiltered Success Stories</h2>
                <div className="flex items-center justify-center gap-2 mt-6">
                    <img src="/logo.png" className="h-6 opacity-20 grayscale" alt="" />
                    <div className="flex text-[#ffb800]">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                    <span className="font-bold text-dark/60">5.0 Based on Google Reviews</span>
                </div>
            </div>
            
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {reviews.map((review, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="break-inside-avoid bg-white p-8 rounded-[24px] border border-primary/5 shadow-sm hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-black text-primary">
                                {review.name[0]}
                            </div>
                            <div>
                                <h4 className="font-black text-dark leading-none text-sm uppercase tracking-wider">{review.name}</h4>
                                <p className="text-[10px] text-muted uppercase tracking-[0.2em] font-black mt-1">{review.role}</p>
                            </div>
                        </div>
                        <div className="flex text-[#ffb800] mb-4">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                        </div>
                        <p className="text-dark/80 text-sm leading-relaxed mb-6 italic font-medium">"{review.content}"</p>
                        <p className="text-[10px] text-muted font-bold tracking-widest uppercase">{review.date}</p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 text-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('https://www.google.com/search?q=unizconnect+google+reviews', '_blank')}
                    className="px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest border-2 border-primary bg-gradient-to-r from-primary to-secondary text-white hover:bg-none hover:bg-white hover:text-primary transition-all duration-300 shadow-xl"
                  >
                      View All 150+ Reviews on Google
                  </motion.button>
            </div>
        </Section>
    )
}

const SocialSpotlight = () => (
  <Section className="bg-white overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Eyebrow>Daily Viral Wisdom</Eyebrow>
        <h2 className="font-fraunces text-4xl md:text-5xl mb-8 leading-tight">We don't just advise. We educate thousands every day.</h2>
        <p className="text-dark/70 text-lg mb-10 leading-relaxed max-w-md">
          Join our community on Instagram where we share the rule changes that no one else talks about.
        </p>
        <PrimaryButton onClick={() => window.open('https://instagram.com/unizconnect', '_blank')}>
          FOLLOW ON INSTAGRAM
        </PrimaryButton>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {[
          "https://assets.cdn.filesafe.space/B1KkpgABfPleeIPoYy8x/media/69d4dbe9bec7abdef1361995.jpeg",
          "https://assets.cdn.filesafe.space/B1KkpgABfPleeIPoYy8x/media/69b7fdeaad027626651f03ed.jpg",
          "https://assets.cdn.filesafe.space/B1KkpgABfPleeIPoYy8x/media/69b7fdea3e6072e3dc397208.jpg",
          "https://assets.cdn.filesafe.space/B1KkpgABfPleeIPoYy8x/media/69a0d5db95735c85ca5036fc.png",
          "https://assets.cdn.filesafe.space/B1KkpgABfPleeIPoYy8x/media/696cc4d5e125ef11e203b897.jpg",
          "https://assets.cdn.filesafe.space/B1KkpgABfPleeIPoYy8x/media/69774488a87beb1d88faed7e.jpg",
          "https://assets.cdn.filesafe.space/B1KkpgABfPleeIPoYy8x/media/69651ae21af9a2c463c1cdbf.jpg"
        ].map((url, i) => (
          <motion.div 
            key={url}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -8 }}
            className="relative h-full shadow-2xl rounded-xl overflow-hidden group cursor-pointer"
          >
            <img 
              src={url} 
              alt={`Post ${i+1}`} 
              loading="lazy"
              className="w-full h-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/40">
                  <Star className="w-5 h-5 text-white fill-white" />
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

const FeaturedVideo = () => (
  <Section className="bg-[#81248a]/[0.02] pt-8">
    <div className="max-w-5xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl border-4 border-white"
      >
        <video 
          src="https://assets.cdn.filesafe.space/B1KkpgABfPleeIPoYy8x/media/697b53931fd827b16f93bd14.mp4"
          controls
          className="w-full h-full object-cover"
          poster="https://assets.cdn.filesafe.space/B1KkpgABfPleeIPoYy8x/media/6928400222c9d64caf800f54.png"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
      </motion.div>
    </div>
  </Section>
);

const DecisionBanner = () => (
  <Section className="bg-[#81248a]/[0.02] pb-12">
     <div className="max-w-4xl mx-auto text-center px-6">
        <motion.div {...FADE_UP}>
           <p className="font-black text-primary text-xs uppercase tracking-[0.3em] mb-8">Your Competitive Edge</p>
           <h2 className="font-fraunces text-3xl md:text-5xl mb-8 leading-tight">
              This is the decision that can <span className="text-primary italic">change your next 2 years</span>
           </h2>
           <p className="text-xl md:text-2xl font-bold text-dark/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Imagine If Every Step Of Your Study Abroad Journey Was Checked By Someone Who Has Done It <span className="bg-primary/5 px-2">Hundreds Of Times</span>
           </p>
            <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-xl border border-white/10 shadow-2xl">
               <p className="text-lg md:text-xl font-bold text-white leading-relaxed">
                  That is what this <span className="font-black text-white">4000 PKR</span> session is: 9 years of real admission and scholarship experience focused only on your profile.
               </p>
            </div>
        </motion.div>
     </div>
  </Section>
);

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "What exactly does UnizConnect do?", a: "UnizConnect provides expert guidance, resources, and strategic consulting for students aiming to secure fully funded international scholarships and study opportunities abroad." },
    { q: "Which specific scholarships do you provide support for?", a: "We offer dedicated support and comprehensive promotional resources for highly competitive global programs, including the Chevening Scholarship, the Clarendon Fund, and the Gates Cambridge Scholarship." },
    { q: "Do you assist with the application and submission process?", a: "Yes. We guide applicants through the entire process, from understanding the specific eligibility requirements of each scholarship to refining application materials so they stand out to selection committees." },
    { q: "How do I know which scholarship is the right fit for me?", a: "We begin by assessing your academic background, professional experience, and future goals. This allows us to match you with the scholarship programs that perfectly align with your profile." },
    { q: "Do you offer video or media support for applications?", a: "Yes, we assist with script development and media strategies (including reels and video submissions) for applications or promotional campaigns that require a strong visual presentation." }
  ];

  return (
    <Section id="faq" className="bg-off-white">
      <div className="max-w-3xl mx-auto">
         <h2 className="text-center font-fraunces mb-16">Questions Answered</h2>
         <div className="space-y-4">
             {faqs.map((f, i) => (
               <div key={i} className="rounded-3xl border border-white/10 overflow-hidden shadow-lg transition-all hover:shadow-2xl">
                  <button 
                    onClick={() => setOpen(open === i ? null : i)} 
                    className={`w-full p-8 text-left flex justify-between items-center transition-all duration-300 group
                      ${open === i ? 'bg-white text-primary' : 'bg-gradient-to-r from-primary to-[#4a0e8f] text-white hover:bg-white hover:from-white hover:to-white hover:text-primary'}
                    `}
                  >
                     <span className="font-bold text-lg">{f.q}</span>
                     <div className={`transition-transform duration-300 ${open === i ? 'rotate-180 text-primary' : 'text-white group-hover:text-primary'}`}>
                        <ChevronDown />
                     </div>
                  </button>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }} 
                        animate={{ height: 'auto', opacity: 1 }} 
                        exit={{ height: 0, opacity: 0 }} 
                        className="overflow-hidden bg-white"
                      >
                         <div className="p-8 text-dark/70 leading-relaxed border-t border-primary/5">{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
             ))}
         </div>
      </div>
    </Section>
  )
}


export default function LandingPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <LogoBar />
      <VideoIntro />
      <ScrollVideoReveal />
      <TargetAudience />
      <MeetingAyesha />
      <GoogleReviews />
      <SocialSpotlight />
      <DecisionBanner />
      <FeaturedVideo />
      
      <Section id="booking" className="bg-gradient-to-b from-white to-off-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary rounded-full blur-[120px]" />
           <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-primary rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 px-6">
           <div className="text-center mb-16">
              <motion.div {...FADE_UP}>
                 <Eyebrow>Reserve Your Spot</Eyebrow>
                 <h2 className="font-fraunces text-4xl md:text-5xl lg:text-6xl mb-6 font-black tracking-tight">Book Your 1-on-1 Session</h2>
                 <p className="text-dark/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Confirmed within hours. Please fill the form after sending your payment to secure your professional evaluation.
                 </p>
              </motion.div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Payment Info & Value Prop */}
              <motion.div 
                {...FADE_UP}
                className="lg:col-span-5 space-y-6"
              >
                 <div className="bg-gradient-to-br from-[#81248a] to-[#4a0e8f] p-8 rounded-xl border border-white/10 shadow-2xl">
                    <h3 className="font-fraunces text-2xl mb-2 text-white font-black">Book At Discounted Price</h3>
                    <p className="text-white/70 font-bold text-sm mb-6 uppercase tracking-wider">Online Bank Transfer</p>
                    
                    <div className="space-y-4 mb-8">
                       {[
                         { l: "Bank Name", v: "Bank Alfalah Islamic", s: "xs" },
                         { l: "Account Title", v: "UNIZCONNECT", s: "xs" },
                         { l: "Account Number", v: "5501 5002061733", s: "lg" },
                         { l: "IBAN", v: "PK70-ALFH5501005002061733", s: "xs" }
                       ].map((item, i) => (
                          <div key={i} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 group hover:bg-white/20 transition-all">
                             <p className="text-[10px] uppercase font-black tracking-widest text-white/50 mb-1">{item.l}</p>
                             <p className={`font-bold text-white ${item.s === 'lg' ? 'text-lg' : 'text-sm'} break-all`}>{item.v}</p>
                          </div>
                       ))}
                    </div>

                    <div className="space-y-4">
                       <div className="flex gap-3 items-start">
                          <div className="w-6 h-6 bg-white text-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                          <p className="text-white/90 text-sm font-bold">Send <span className="font-black text-white underline decoration-secondary decoration-2">Rs 4000</span> & take a screenshot.</p>
                       </div>
                       <div className="flex gap-3 items-start">
                          <div className="w-6 h-6 bg-white text-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                          <p className="text-white/90 text-sm font-bold">Attach screenshot with the form for calendar access.</p>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white p-8 rounded-xl border border-primary/10">
                    <h4 className="font-fraunces text-xl mb-6">You Are One Step Away</h4>
                    <ul className="space-y-4 mb-8">
                       {[
                         "Personalised study abroad & scholarship plan",
                         "Custom Meeting Summary in your inbox",
                         "Free Follow-up Questions",
                         "Bonus: “STUDY ABROAD CLARITY” framework"
                       ].map((item, i) => (
                         <li key={i} className="flex gap-3 items-center">
                            <Check className="w-4 h-4 text-primary" />
                            <span className="text-dark/70 text-sm font-bold">{item}</span>
                         </li>
                       ))}
                    </ul>

                    <div className="pt-6 border-t border-primary/10 flex items-center justify-between">
                       <div>
                          <p className="text-[10px] uppercase font-black text-dark/40 line-through">Original: Rs 5000</p>
                          <p className="text-2xl font-black text-primary">Rs 4000</p>
                       </div>
                       <div className="bg-primary/10 px-4 py-2 rounded-full">
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest">20% OFF TODAY</p>
                       </div>
                    </div>
                 </div>

                 <div className="text-center italic text-primary/60 text-xs font-bold">
                    "Best <span className="font-black text-primary">4000</span> Rupees I Spent On My Entire Degree Plan."
                 </div>
              </motion.div>

              {/* Form Container */}
              <motion.div 
                {...FADE_UP}
                transition={{ delay: 0.2 }}
                className="lg:col-span-7"
              >
                 <div className="bg-white p-2 rounded-xl shadow-[0_20px_60px_-15px_rgba(129,36,138,0.15)] border border-primary/5 overflow-hidden">
                    <GHLForm />
                 </div>
              </motion.div>
           </div>
         </div>
      </Section>
      <FAQ />
      <section className="py-32 bg-gradient-to-br from-[#81248a] via-[#4a0e8f] to-[#2e0958] text-white text-center px-6 relative overflow-hidden">
         {/* Deep Branded Decorative Elements */}
         <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-primary opacity-20 rounded-full blur-[150px] pointer-events-none" />
         <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-[#4a0e8f] opacity-30 rounded-full blur-[150px] pointer-events-none" />
         
         <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="font-fraunces text-2xl md:text-4xl lg:text-5xl font-black max-w-5xl mx-auto leading-tight relative z-10 drop-shadow-2xl"
         >
           TWO YEARS FROM NOW, YOU WILL EITHER THANK YOURSELF FOR BOOKING THIS SESSION OR WISH YOU HAD
         </motion.h2>
      </section>
    </main>
  )
}
