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
  ChevronRight
} from 'lucide-react';

const personalInfo = {
  name: "Swarali Devi",
  company: "Whitespace Designs House",
  shortTagline: "Clarity, focus, and meaning in design.",
  description: "In a world full of visual noise, whitespace brings clarity, focus, and meaning — guiding attention to what truly matters. Built on this philosophy, Whitespace Designs House. delivers precise, insight driven design solutions that cut through clutter and communicate with purpose. Every brand is shaped with intention, giving it the space to stand out, connect meaningfully, and be remembered.",
  services: [
    "Brand Identity System",
    "Packaging",
    "Print Advertising",
    "Strategic Consultancy"
  ],
  phone: "+919529134102", 
  email: "whitespace.dh@gmail.com", 
  whatsapp: "+919529134102", 
  instagram: "https://instagram.com/",
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

export default function App() {
  const [showQR, setShowQR] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-black selection:text-white pb-24">
      
      {/* Top Bar */}
      <header className="flex justify-between items-center p-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="font-medium text-sm tracking-wide">{personalInfo.company}</span>
        </div>
        <button 
          onClick={() => setShowQR(true)}
          className="p-2 rounded-full hover:bg-black/5 transition-colors"
          aria-label="Share QR Code"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-6">
        
        {/* Hero Section */}
        <section className="pt-20 pb-32 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-sm md:max-w-md"
          >
            <img 
              src="/logo.png" 
              alt="Whitespace Designs House. Logo" 
              className="w-full h-auto object-contain mix-blend-multiply"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = document.getElementById('logo-fallback');
                if (fallback) fallback.classList.remove('hidden');
              }}
            />
            <div id="logo-fallback" className="hidden text-center p-8 border-2 border-dashed border-black/20 rounded-2xl text-black/50">
              <p className="text-sm">Please upload your logo image as <br/><code className="font-mono text-black/70 bg-black/5 px-1 py-0.5 rounded">logo.png</code><br/> to the <code className="font-mono text-black/70 bg-black/5 px-1 py-0.5 rounded">public</code> folder.</p>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section className="py-20 border-t border-black/10">
          <FadeIn>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-black mb-8">About</h2>
            <p className="text-sm md:text-base leading-relaxed font-light text-black/50">
              {personalInfo.description}
            </p>
          </FadeIn>
        </section>

        {/* Services Section */}
        <section className="py-20 border-t border-black/10">
          <FadeIn>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-black mb-8">Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalInfo.services.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <p className="text-sm font-medium text-black/80">{service}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Connect Section */}
        <section className="pt-20 pb-12 border-t border-black/10">
          <FadeIn>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-black mb-8">Connect with us</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Instagram, label: "Instagram", href: personalInfo.instagram },
                { icon: Mail, label: "Email", href: `mailto:${personalInfo.email}` },
                { icon: HardDrive, label: "Works", href: personalInfo.drive },
                { icon: Download, label: "Save contact", onClick: generateVCard }
              ].map((item, index) => {
                const Component = item.onClick ? motion.button : motion.a;
                return (
                  <Component 
                    key={item.label}
                    href={item.href}
                    onClick={item.onClick}
                    target={item.href ? "_blank" : undefined} 
                    rel={item.href ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    className="group flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-white border border-black/5 shadow-sm hover:bg-black active:bg-black hover:shadow-md transition-colors duration-200 cursor-pointer select-none touch-manipulation w-full"
                  >
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 mb-2 sm:mb-2.5 text-black/70 group-hover:text-white group-active:text-white group-hover:scale-110 group-active:scale-110 transition-transform duration-200" />
                    <span className="text-xs sm:text-sm font-medium text-black group-hover:text-white group-active:text-white transition-colors duration-200">{item.label}</span>
                  </Component>
                );
              })}
            </div>
          </FadeIn>
        </section>

        {/* Footer */}
        <footer className="pb-28 text-center text-xs text-black/40 font-light">
          <FadeIn>
            <div className="mb-6">
              <p className="text-sm font-medium text-black/80">Swarali Devi</p>
              <p className="mt-1">Founder & Creative Director</p>
            </div>
            <div className="w-12 h-px bg-black/10 mx-auto mb-3"></div>
            <p>© 2026 Whitespace Designs House. All rights reserved.</p>
          </FadeIn>
        </footer>

      </main>

      {/* Sticky Bottom Bar */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 250, damping: 25 }}
        className="fixed bottom-4 sm:bottom-6 left-0 right-0 px-4 sm:px-6 pointer-events-none z-40"
      >
        <div className="max-w-[420px] mx-auto pointer-events-auto">
          <div className="flex items-center justify-between gap-1 sm:gap-1.5 p-1.5 sm:p-2 bg-white/95 backdrop-blur-md border border-black/10 rounded-full shadow-lg">
            <motion.a 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href={`tel:${personalInfo.phone}`}
              className="group flex-1 py-2 sm:py-3 px-2 sm:px-3 rounded-full hover:bg-black active:bg-black hover:text-white active:text-white transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 select-none touch-manipulation"
            >
              <Phone className="w-5 h-5 sm:w-4 sm:h-4 text-black/70 group-hover:text-white group-active:text-white group-hover:scale-110 group-active:scale-110 transition-transform duration-200" />
              <span className="text-[10px] sm:text-sm font-medium leading-none sm:leading-normal">Call</span>
            </motion.a>
            <div className="w-[1px] h-8 sm:h-7 bg-black/10"></div>
            <motion.a 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href={`https://wa.me/${personalInfo.whatsapp}?text=Hello%20Swarali,%20I%20would%20like%20to%20connect%20with%20you.`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 py-2 sm:py-3 px-2 sm:px-3 rounded-full bg-black text-white hover:bg-white active:bg-white hover:text-black active:text-black border border-transparent hover:border-black/20 active:border-black/20 transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 shadow-md select-none touch-manipulation"
            >
              <MessageCircle className="w-5 h-5 sm:w-4 sm:h-4 text-white group-hover:text-black group-active:text-black group-hover:scale-110 group-active:scale-110 transition-transform duration-200" />
              <span className="text-[10px] sm:text-sm font-medium leading-none sm:leading-normal">WhatsApp</span>
            </motion.a>
          </div>
        </div>
      </motion.div>

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

    </div>
  );
}
