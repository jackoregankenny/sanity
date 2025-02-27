"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { urlForImage } from '@/lib/sanity.image';
import { SanityImage } from '@/types/sanity';

// Updated to include all editable elements
type DataPoint = {
  label: string;
  value: string;
};

type MinimalHeroProps = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  secondaryCtaText?: string;
  image?: SanityImage;
  showNotification?: boolean;
  notificationText?: string;
  notificationIcon?: string;
  dataPoints?: DataPoint[];
  highlightWords?: string;
};

const MinimalHero: React.FC<MinimalHeroProps> = ({
  title = "Scientific protection for optimal crop performance",
  subtitle = "High-efficacy agricultural solutions backed by research and developed for sustainable farming practices.",
  ctaText = "Discover Products",
  secondaryCtaText = "Learn More",
  image,
  showNotification = true,
  notificationText = "New sustainable formula release",
  notificationIcon = "",
  dataPoints = [
    { label: "Effectiveness", value: "98.3%" },
    { label: "Sustainability", value: "Eco-certified" },
    { label: "Research", value: "15+ years" }
  ],
  highlightWords = "optimal crop performance"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Subtle parallax effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Function to highlight specific words in the title
  const renderTitleWithHighlight = () => {
    if (!title) return null;
    
    // If there are highlight words, split and highlight them
    if (highlightWords && title.includes(highlightWords)) {
      const parts = title.split(highlightWords);
      return (
        <>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="block mb-1"
          >
            {parts[0]}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="block"
          >
            for <span className="text-[#0f766e]">{highlightWords}</span>{parts[1] || ''}
          </motion.span>
        </>
      );
    }
    
    // Otherwise just render the title normally
    return (
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {title}
      </motion.span>
    );
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-white flex flex-col justify-center"
    >
      {/* Background image from Sanity if available */}
      {image && urlForImage(image) ? (
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <Image
            src={urlForImage(image)!.url()}
            alt={image.alt || 'Hero background'}
            fill
            priority
            className="object-cover opacity-20"
          />
        </motion.div>
      ) : (
        // Subtle pattern background fallback
        <div className="absolute inset-0 bg-[#f9fafb]">
          <div 
            className="h-full w-full opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
      )}
      
      {/* Background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-white"
        style={{ y: backgroundY }}
      />

      {/* Main content */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center justify-center h-full">
        <div className="max-w-5xl mx-auto text-center">
          {/* Announcement badge - Now conditional */}
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 inline-flex items-center rounded-full bg-[#f0f9f6] border border-[#e0f2ed] px-4 py-1.5"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#10b981] mr-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#10b981] opacity-75"></span>
              </span>
              <span className="text-sm font-medium text-[#0f766e]">{notificationText}</span>
            </motion.div>
          )}
          
          {/* Title with staggered reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 font-display">
              {renderTitleWithHighlight()}
            </h1>
          </motion.div>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10"
          >
            {subtitle}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            {/* Primary CTA */}
            <Button 
              size="lg"
              className="bg-[#0f766e] hover:bg-[#0f766e]/90 text-white px-8 py-6 h-auto rounded-md group transition-all duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="font-medium">{ctaText}</span>
              <motion.span
                className="inline-block ml-2"
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </Button>
            
            {/* Secondary CTA */}
            <Button 
              variant="outline" 
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 h-auto rounded-md"
            >
              {secondaryCtaText}
            </Button>
          </motion.div>
        </div>

        {/* Abstract product visualization (replacing the cartoonish bottles) */}
        <motion.div 
          className="relative w-full max-w-4xl mx-auto"
          style={{ y: foregroundY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="relative aspect-[16/9] w-full">
            {/* The elegant abstract representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Main circular element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px]"
              >
                {/* Spinning outer ring */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-[#0f766e]/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                >
                  {/* Dots on the ring */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-[#0f766e]"
                      style={{ 
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 30}deg) translateX(${280/2}px) translateY(-50%)` 
                      }}
                    />
                  ))}
                </motion.div>
                
                {/* Middle ring with gradient */}
                <motion.div 
                  className="absolute top-[15%] bottom-[15%] left-[15%] right-[15%] rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.1), rgba(15, 118, 110, 0.03))',
                    border: '1px solid rgba(15, 118, 110, 0.2)',
                    backdropFilter: 'blur(5px)'
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 80, ease: "linear", repeat: Infinity }}
                >
                  {/* Subtle dashes on middle ring */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute w-6 h-0.5 rounded-full bg-[#0f766e]/20"
                      style={{ 
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 45}deg) translateX(${280/4}px) translateY(-50%)` 
                      }}
                    />
                  ))}
                </motion.div>
                
                {/* Center element */}
                <motion.div 
                  className="absolute top-[30%] bottom-[30%] left-[30%] right-[30%] rounded-full bg-white shadow-lg flex items-center justify-center"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  <div className="text-[#0f766e] font-medium">
                    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
                      <path d="M50 20C32.4 20 18 34.4 18 52C18 69.6 32.4 84 50 84C67.6 84 82 69.6 82 52C82 34.4 67.6 20 50 20ZM50 80C34.5 80 22 67.5 22 52C22 36.5 34.5 24 50 24C65.5 24 78 36.5 78 52C78 67.5 65.5 80 50 80Z" fill="currentColor"/>
                      <path d="M50 34C46.7 34 44 36.7 44 40C44 43.3 46.7 46 50 46C53.3 46 56 43.3 56 40C56 36.7 53.3 34 50 34Z" fill="currentColor"/>
                      <path d="M50 50C47.8 50 46 51.8 46 54V70C46 72.2 47.8 74 50 74C52.2 74 54 72.2 54 70V54C54 51.8 52.2 50 50 50Z" fill="currentColor"/>
                    </svg>
                  </div>
                </motion.div>

                {/* Orbiting elements */}
                <motion.div
                  className="absolute w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                >
                  <motion.div
                    className="absolute top-5 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#f0f9f6] border border-[#0f766e]/20 shadow-md flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-6 h-6 text-[#0f766e]">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M7 17.9999L12 14.9999L17 17.9999V5.99991C17 5.46968 16.7893 4.96075 16.4142 4.58582C16.0391 4.21089 15.5304 3.99991 15 3.99991H9C8.46957 3.99991 7.96086 4.21089 7.58579 4.58582C7.21071 4.96075 7 5.46968 7 5.99991V17.9999Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
                
                <motion.div
                  className="absolute w-full h-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                >
                  <motion.div
                    className="absolute top-1/2 -right-5 -translate-y-1/2 w-14 h-14 rounded-full bg-[#f0f9f6] border border-[#0f766e]/20 shadow-md flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-7 h-7 text-[#0f766e]">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 16L16 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
                
                <motion.div
                  className="absolute w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                >
                  <motion.div
                    className="absolute bottom-0 left-1/4 w-10 h-10 rounded-full bg-[#f0f9f6] border border-[#0f766e]/20 shadow-md flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-5 h-5 text-[#0f766e]">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.09003 9.00008C9.32513 8.33175 9.78918 7.76819 10.4 7.40921C11.0108 7.05024 11.729 6.91902 12.4272 7.03879C13.1255 7.15857 13.7588 7.52161 14.2151 8.06361C14.6714 8.60561 14.9211 9.2916 14.92 10.0001C14.92 12.0001 11.92 13.0001 11.92 13.0001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Floating data points - now dynamic */}
              {dataPoints && dataPoints.length > 0 && (
                <>
                  {dataPoints[0] && (
                    <motion.div 
                      className="absolute left-[15%] top-[30%] flex flex-col items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-xs font-medium text-gray-500 mb-1">{dataPoints[0].label}</div>
                        <div className="text-lg font-semibold text-[#0f766e]">{dataPoints[0].value}</div>
                      </div>
                    </motion.div>
                  )}
                  
                  {dataPoints[1] && (
                    <motion.div 
                      className="absolute right-[15%] top-[40%] flex flex-col items-end"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                    >
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-xs font-medium text-gray-500 mb-1">{dataPoints[1].label}</div>
                        <div className="text-lg font-semibold text-[#0f766e]">{dataPoints[1].value}</div>
                      </div>
                    </motion.div>
                  )}
                  
                  {dataPoints[2] && (
                    <motion.div 
                      className="absolute left-[25%] bottom-[25%] flex flex-col items-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                    >
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                        <div className="text-xs font-medium text-gray-500 mb-1">{dataPoints[2].label}</div>
                        <div className="text-lg font-semibold text-[#0f766e]">{dataPoints[2].value}</div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Performance indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute -bottom-10 right-10 flex items-center gap-6 text-sm text-gray-600"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span>Environmentally validated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>Scientifically proven</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MinimalHero;
