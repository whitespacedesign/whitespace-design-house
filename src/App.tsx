import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Instagram, 
  MessageCircle, 
  MapPin, 
  Mail, 
  Phone, 
  Download, 
  HardDrive, 
  Share2, 
  X,
  ChevronRight,
  MousePointerClick
} from 'lucide-react';

const personalInfo = {
  name: "Swarali Devi",
  company: "Whitespace Design House",
  shortTagline: "Clarity, focus, and meaning in design.",
  description: "In a world full of visual noise, whitespace brings clarity, focus, and meaning — guiding attention to what truly matters. Built on this philosophy, Whitespace Design House delivers precise, insight driven design solutions that cut through clutter and communicate with purpose. Every brand is shaped with intention, giving it the space to stand out, connect meaningfully, and be remembered.",
  services: [
    "Brand Identity System",
    "Packaging",
    "Print Advertising",
    "Strategic Consultancy"
  ],
  phone: "+919529134102", 
  email: "whitespace.dh@gmail.com", 
  whatsapp: "+919529134102", 
  instagram: "https://www.instagram.com/whitespace_designhouse",
  maps: "https://maps.google.com/",
  drive: "https://drive.google.com/drive/folders/1NmoccNaKJ-aAV8nRDG1pdG-Gd2wiTo0C?usp=drive_link"
};

const generateVCard = () => {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${personalInfo.name}
ORG:${personalInfo.company}
TITLE:Owner
TEL;TYPE=WORK,VOICE:${personalInfo.phone}
EMAIL;TYPE=WORK:${personalInfo.email}
URL:${window.location.origin}
END:VCARD`;

  // Check if the device is iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isIOS) {
    // For iOS, a data URI with target="_blank" is often the most reliable way to trigger the native Contacts app
    const dataUrl = `data:text/x-vcard;charset=utf-8,${encodeURIComponent(vCardData)}`;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.target = '_blank';
    link.download = `${personalInfo.name.replace(' ', '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Desktop and Android
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personalInfo.name.replace(' ', '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
};

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const playWhooshSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const noiseSize = ctx.sampleRate * 0.25; 
    const buffer = ctx.createBuffer(1, noiseSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < noiseSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.1);
    filter.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.25);
    filter.Q.value = 1.5;
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start();
  } catch (e) {
    // Ignore audio play errors
  }
};

export default function App() {
  const [showQR, setShowQR] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleSaveContact = () => {
    generateVCard();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-black selection:text-white pb-24">
      
      <main className="max-w-3xl mx-auto px-6">
        
        {/* Business Card Section */}
        <section className="pt-8 pb-12">

          {/* Business Card Preview */}
          <div className="mt-16 mb-8 flex flex-col items-center justify-center px-4" style={{ perspective: '1000px' }}>
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => {
                setIsCardFlipped(!isCardFlipped);
                playWhooshSound();
                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                  navigator.vibrate([60, 50, 60]);
                }
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                stiffness: 150, 
                damping: 20,
                scale: { duration: 0.3 } 
              }}
              className="w-full aspect-[1.58/1] max-w-xl relative select-none cursor-pointer group"
            >
              <AnimatePresence>
                {!isCardFlipped && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.4 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.2 } }}
                    className="absolute -bottom-14 sm:-bottom-16 left-0 z-10"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="bg-black text-white text-xs sm:text-sm font-semibold tracking-wide px-4 py-2 sm:px-5 sm:py-2.5 rounded-full flex items-center gap-2 shadow-xl relative"
                    >
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }} 
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <MousePointerClick className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                      Click to flip
                      <div className="absolute -top-1 left-6 w-2.5 h-2.5 bg-black rotate-45" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.div
                initial={false}
                animate={{ 
                  rotateY: isCardFlipped ? 180 : 0,
                  z: isCardFlipped ? [0, 40, 0.01] : [0.01, 40, 0],
                  boxShadow: isCardFlipped 
                    ? ["0 15px 40px rgba(0,0,0,0.03)", "0 40px 80px rgba(0,0,0,0.15)", "0 15px 40px rgba(0,0,0,0.03)"]
                    : ["0 15px 40px rgba(0,0,0,0.03)", "0 40px 80px rgba(0,0,0,0.15)", "0 15px 40px rgba(0,0,0,0.03)"]
                }}
                transition={{ 
                  duration: 0.6, 
                  rotateY: { type: "spring", stiffness: 260, damping: 20 },
                  z: { duration: 0.6, ease: "easeInOut" },
                  boxShadow: { duration: 0.6, ease: "easeInOut" }
                }}
                className="w-full h-full relative rounded-sm"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front Side */}
                <div 
                  className="absolute inset-0 bg-white border border-black/10 rounded-sm overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isCardFlipped) setShowQR(true);
                    }}
                    disabled={isCardFlipped}
                    className={`absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-black/5 transition-colors z-20 text-black/60 hover:text-black ${isCardFlipped ? 'pointer-events-none' : ''}`}
                    aria-label="Share QR Code"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <div className="absolute -bottom-8 -left-8 sm:-bottom-10 sm:-left-10 md:-bottom-12 md:-left-12 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
                    <img 
                      src="/logo.png" 
                      alt="Logo" 
                      className="w-full h-full object-contain object-left-bottom"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.card-placeholder') as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="card-placeholder hidden absolute inset-0 bg-black/5 border border-dashed border-black/20 rounded-lg flex items-center justify-center">
                      <span className="text-[10px] text-black/30 uppercase tracking-[0.2em] font-medium">Logo</span>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div 
                  className="absolute inset-0 bg-white text-[#111] border border-black/10 rounded-sm overflow-hidden flex flex-col"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)' 
                  }}
                >
                  <div className="flex-1 p-6 sm:p-8 pb-8 flex flex-col items-start justify-start w-full relative">
                    <div className="w-full flex justify-between items-start">
                    <div className="w-[160px] h-[90px] sm:w-[210px] sm:h-[118px] pr-2 -ml-[17px] -mt-[14px] sm:-ml-[24px] sm:-mt-[20px] relative">
                      <img 
                        src="/swarali%20info.png" 
                        alt="Swarali Info" 
                        className="w-full h-full object-contain object-left-top"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement?.querySelector('.info-placeholder') as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="info-placeholder hidden aspect-[16/9] bg-black/5 border border-dashed border-black/20 rounded-lg flex-col items-center justify-center p-2 text-center">
                        <span className="text-[8px] sm:text-[10px] text-black/40 uppercase tracking-widest font-medium leading-tight">Upload<br/>swarali info.png</span>
                      </div>
                    </div>
                    
                    <div 
                      className="flex gap-3 mt-1 mr-1" 
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a 
                        href={`tel:${personalInfo.phone}`}
                        className="flex flex-col items-center gap-1 group/btn"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#111] text-white group-hover/btn:bg-black/5 group-hover/btn:text-black flex items-center justify-center transition-all duration-200">
                          <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="text-[6px] sm:text-[8px] font-semibold text-black/60 group-hover/btn:text-black transition-colors uppercase tracking-wider">Call</span>
                      </a>
                      <a 
                        href={`https://wa.me/${personalInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent("Hello Swarali, I would like to connect with you.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1 group/btn"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#111] text-white group-hover/btn:bg-black/5 group-hover/btn:text-black flex items-center justify-center transition-all duration-200">
                          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <span className="text-[6px] sm:text-[8px] font-semibold text-black/60 group-hover/btn:text-black transition-colors uppercase tracking-wider">Whatsapp</span>
                      </a>
                    </div>
                  </div>

                  {/* Connect Buttons inside Card */}
                  <div 
                    className="w-full mt-auto mb-14 sm:mb-12 pt-4 grid grid-cols-4 gap-2 sm:gap-4 z-10" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    {[
                      { icon: Instagram, label: "Instagram", href: personalInfo.instagram },
                      { icon: Mail, label: "Email", href: `mailto:${personalInfo.email}` },
                      { icon: HardDrive, label: "Works", href: personalInfo.drive },
                      { icon: Download, label: "Save contact", onClick: handleSaveContact }
                    ].map((item) => {
                      const Component = item.onClick ? motion.button : motion.a;
                      return (
                        <Component 
                          key={item.label}
                          href={item.href}
                          onClick={(e) => {
                            if (item.onClick) item.onClick();
                          }}
                          target={item.href ? "_blank" : undefined} 
                          rel={item.href ? "noopener noreferrer" : undefined}
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.05 }}
                          className="flex flex-col items-center justify-center py-2.5 px-1.5 sm:py-3 sm:px-2 rounded-lg bg-black/[0.04] hover:bg-[#111] active:bg-black text-black hover:text-white transition-all duration-200 cursor-pointer -mt-[15px]"
                        >
                          <item.icon className="w-4 h-4 sm:w-5 sm:h-5 transition-colors mb-1.5" strokeWidth={2} />
                          <span className="text-[8px] sm:text-xs font-semibold transition-colors text-center leading-[1.2]">{item.label}</span>
                        </Component>
                      );
                    })}
                  </div>
                  </div>

                  {/* Scrolling Services Ticker */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#111] text-white py-1.5 sm:py-2.5 overflow-hidden flex items-center border-t border-black/10">
                    <motion.div
                      animate={{ x: [0, "-50%"] }}
                      transition={{ 
                        repeat: Infinity, 
                        ease: "linear", 
                        duration: 15 
                      }}
                      className="flex whitespace-nowrap items-center shrink-0"
                    >
                      {[...personalInfo.services, ...personalInfo.services, ...personalInfo.services, ...personalInfo.services].map((service, index) => (
                        <React.Fragment key={index}>
                          <span className="text-[8px] sm:text-xs font-medium tracking-widest uppercase mx-3 sm:mx-4">{service}</span>
                          <div className="w-1 h-1 rounded-full bg-white/30" />
                        </React.Fragment>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pb-28 text-center text-xs text-black/40 font-light mx-auto" style={{ height: '121px', width: '328.2px' }}>
          <FadeIn delay={0.4}>
            <div className="w-12 h-px bg-black/10 mx-auto mb-3 mt-6"></div>
            <p>© 2026 Whitespace Design House All rights reserved.</p>
          </FadeIn>
        </footer>

      </main>


      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center mb-8 mt-2">
                <h3 className="font-serif text-2xl mb-1">Share Card</h3>
                <p className="text-sm text-black/50">Scan to view on another device</p>
              </div>

              <div className="flex justify-center bg-white p-4 rounded-2xl border border-black/5 shadow-sm mb-6">
                <QRCodeSVG 
                  value={currentUrl || "https://whitespacedesignhouse.vercel.app/"} 
                  size={200}
                  level="H"
                  includeMargin={false}
                  fgColor="#111111"
                />
              </div>

              <button 
                onClick={() => {
                  navigator.clipboard.writeText(currentUrl);
                  // Optional: Show a toast notification here
                }}
                className="w-full py-4 rounded-xl bg-black/5 hover:bg-black/10 transition-colors font-medium text-sm"
              >
                Copy Link
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 bg-[#111] text-white px-5 py-3 rounded-full text-xs sm:text-sm font-medium shadow-xl z-50 flex items-center gap-2 pointer-events-none"
          >
            <div className="w-2 h-2 rounded-full bg-green-400" />
            Contact saved successfully
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
