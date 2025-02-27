"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ArrowRight, Plus, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// Product type definition
type ProductType = {
  id: string;
  name: string;
  color: string;
  category: string;
  description: string;
  shortDescription: string;
}

// Product data
const PRODUCTS: ProductType[] = [
  {
    id: "niantic",
    name: "Niantic",
    color: "#0052cc",
    category: "Herbicide",
    description: "Advanced systemic herbicide for broad-spectrum weed control with long-lasting residual action.",
    shortDescription: "Systemic broad-spectrum herbicide"
  },
  {
    id: "tarak",
    name: "Tarak",
    color: "#d4126e",
    category: "Broad Spectrum",
    description: "Powerful broad-spectrum solution for fungal disease prevention and control across multiple crops.",
    shortDescription: "Fungal disease prevention"
  },
  {
    id: "firestarter",
    name: "Firestarter",
    color: "#1f464d",
    category: "Plant Activator",
    description: "Innovative plant activator that enhances natural defense mechanisms against environmental stress.",
    shortDescription: "Defense mechanism enhancer"
  },
  {
    id: "lambda",
    name: "Lambda",
    color: "#8e44ad",
    category: "Insecticide",
    description: "Fast-acting insecticide with broad spectrum control for effective pest management.",
    shortDescription: "Fast-acting pest control"
  }
];

// Product card component
const ProductCard = ({ 
  product, 
  isActive, 
  onClick,
  index,
  animationEnabled
}: { 
  product: ProductType; 
  isActive: boolean; 
  onClick: () => void;
  index: number;
  animationEnabled: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      className={`group relative rounded-lg border overflow-hidden h-[140px] md:h-[180px] ${isActive ? 'border-gray-300' : 'border-gray-200'}`}
      initial={animationEnabled ? { opacity: 0, y: 20 } : false}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Product color indicator */}
      <div 
        className="absolute top-0 left-0 w-full h-1 transform origin-left transition-transform duration-500 ease-out"
        style={{ 
          backgroundColor: product.color,
          transform: isActive ? 'scaleX(1)' : 'scaleX(0)'
        }}
      />
      
      <div className="p-5 h-full flex flex-col">
        <div className="flex items-center mb-2">
          {/* Category tag */}
          <div 
            className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium"
            style={{ 
              color: product.color,
              backgroundColor: `${product.color}15`
            }}
          >
            {product.category}
          </div>
          
          {/* Selected indicator */}
          {isActive && (
            <div className="ml-auto">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: product.color }}
              >
                <Plus className="w-3 h-3 text-white" />
              </motion.div>
            </div>
          )}
        </div>
        
        <h3 
          className="text-lg font-semibold mb-1 transition-colors duration-200"
          style={{ color: isActive ? product.color : 'inherit' }}
        >
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
          {product.shortDescription}
        </p>
        
        <div className="mt-auto">
          <span 
            className={`text-xs font-medium transition-opacity duration-200 flex items-center ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`}
            style={{ color: product.color }}
          >
            Learn more
            <ArrowRight className="ml-1 w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Floating container animation component
const FloatingContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{ 
        y: [0, 8, 0],
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 8,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Hero section component
export function ModernHero({
  title = "Scientific solutions for agricultural excellence",
  subtitle = "Developing high-quality crop protection products for sustainable farming practices worldwide.",
  ctaText = "Explore our products",
  secondaryCtaText = "About us"
}: {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  secondaryCtaText?: string;
}) {
  const [activeProductId, setActiveProductId] = useState<string>("niantic");
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const activeProduct = PRODUCTS.find(p => p.id === activeProductId) || PRODUCTS[0];
  
  // Play animation only on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationEnabled(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
            <circle id="pattern-circle" cx="20" cy="20" r="1" fill="#000"></circle>
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern-circles)"></rect>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Column - Hero Content */}
          <div>
            {/* Animated subtle label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="inline-flex items-center rounded-full border border-gray-200 px-4 py-1.5 text-sm">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Scientific excellence in agriculture
              </div>
            </motion.div>
            
            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
            >
              {title}
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-600 mb-8 max-w-md"
            >
              {subtitle}
            </motion.p>
            
            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Button 
                size="lg"
                className="bg-black text-white hover:bg-gray-800 rounded-lg group"
              >
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-lg"
              >
                {secondaryCtaText}
              </Button>
            </motion.div>
            
            {/* Product cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="mb-3 flex items-center">
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Featured products</h2>
                <div className="ml-auto flex items-center text-sm">
                  <span className="text-gray-500 mr-1">View all</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRODUCTS.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isActive={product.id === activeProductId}
                    onClick={() => setActiveProductId(product.id)}
                    index={index}
                    animationEnabled={animationEnabled}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Visual Preview */}
          <div className="relative lg:h-[700px] flex items-center justify-center">
            {/* Background shape */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 200 200" className="absolute w-[140%] -mt-[10%] opacity-5 pointer-events-none">
                <path
                  fill={activeProduct.color}
                  d="M40.8,-70.8C54.8,-64.2,69.4,-56.8,77.9,-44.6C86.4,-32.4,88.8,-16.2,88.8,0C88.7,16.2,86.3,32.4,78.1,44.5C69.9,56.6,56,64.6,41.9,71.4C27.9,78.1,14,83.7,-0.1,83.8C-14.2,83.9,-28.4,78.6,-42.1,71.5C-55.8,64.4,-69,55.4,-77.7,42.9C-86.5,30.3,-90.7,15.2,-90.3,0.2C-89.9,-14.7,-85,-29.4,-76.2,-41.9C-67.3,-54.4,-54.6,-64.6,-40.5,-71.3C-26.5,-78,-13.2,-81.1,0.2,-81.5C13.6,-81.9,27.3,-79.5,40.8,-70.8Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
            
            {/* Product visual */}
            <div className="relative w-full h-full">
              <FloatingContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Product bottle */}
                  <motion.div
                    key={activeProduct.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-52 h-80 md:w-60 md:h-96"
                  >
                    <div 
                      className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col"
                      style={{ 
                        background: `linear-gradient(135deg, ${activeProduct.color}CC 0%, ${activeProduct.color} 100%)`,
                        boxShadow: `0 20px 40px ${activeProduct.color}22, 0 0 0 1px ${activeProduct.color}33`
                      }}
                    >
                      {/* Bottle cap */}
                      <div 
                        className="w-full h-14 relative flex justify-center"
                        style={{ 
                          backgroundColor: `${activeProduct.color}CC`, 
                          borderBottom: '2px solid rgba(255,255,255,0.2)'
                        }}
                      >
                        <div className="absolute -bottom-1 w-12 h-2 bg-white/10 rounded-full"></div>
                      </div>
                      
                      {/* Bottle body */}
                      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                        {/* Label */}
                        <div className="w-full aspect-video bg-white rounded-xl overflow-hidden p-4 flex flex-col items-center justify-center shadow-inner">
                          <div className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                            Life Scientific
                          </div>
                          <div 
                            className="text-3xl font-bold mb-1"
                            style={{ color: activeProduct.color }}
                          >
                            {activeProduct.name}
                          </div>
                          <div className="text-xs text-gray-500 mb-3">
                            {activeProduct.category}
                          </div>
                          <div className="w-full h-px bg-gray-100 mb-3"></div>
                          <div className="text-[11px] text-gray-600 line-clamp-2">
                            {activeProduct.description}
                          </div>
                        </div>
                        
                        {/* Safety indicators */}
                        <div className="mt-auto w-full">
                          <div className="flex justify-between mt-4">
                            <div className="inline-flex items-center space-x-1 bg-white/10 text-white/90 rounded-full text-[10px] px-2 py-0.5">
                              <span>5L</span>
                            </div>
                            <div className="inline-flex items-center space-x-1 bg-white/10 text-white/90 rounded-full text-[10px] px-2 py-0.5">
                              <span>ISO Certified</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </FloatingContainer>
              
              {/* Decorative elements */}
              <div className="absolute top-1/4 left-1/6 w-12 h-12 rounded-full" style={{ backgroundColor: `${activeProduct.color}22` }}></div>
              <div className="absolute bottom-1/4 right-1/6 w-20 h-20 rounded-full" style={{ backgroundColor: `${activeProduct.color}11` }}></div>
              
              {/* Visual elements showing molecular structure (optional) */}
              <motion.div 
                className="absolute bottom-10 left-10 opacity-20"
                animate={{ 
                  rotate: 360 
                }}
                transition={{ 
                  duration: 100, 
                  ease: "linear", 
                  repeat: Infinity 
                }}
              >
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="40" stroke={activeProduct.color} strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="30" stroke={activeProduct.color} strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="20" stroke={activeProduct.color} strokeWidth="0.5" />
                  <circle cx="50" cy="20" r="3" fill={activeProduct.color} />
                  <circle cx="80" cy="50" r="3" fill={activeProduct.color} />
                  <circle cx="50" cy="80" r="3" fill={activeProduct.color} />
                  <circle cx="20" cy="50" r="3" fill={activeProduct.color} />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 