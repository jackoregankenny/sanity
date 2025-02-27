"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronRight, ChevronLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

type ProductType = {
  id: string;
  name: string;
  color: string;
  darkColor: string;
  description: string;
  category: string;
  usage: string;
  benefits: string[];
};

const PRODUCTS: ProductType[] = [
  { 
    id: "niantic",
    name: "Niantic",
    color: "#0052cc", 
    darkColor: "#003d99",
    description: "Advanced systemic herbicide for broad-spectrum weed control",
    category: "Herbicide",
    usage: "Apply 5ml per liter, spray directly on weed foliage during active growth",
    benefits: [
      "Long-lasting protection",
      "Weather resistant",
      "Fast acting formula",
      "Rainproof within 2 hours"
    ]
  },
  { 
    id: "tarak",
    name: "Tarak",
    color: "#d4126e", 
    darkColor: "#a60d55",
    description: "Powerful broad-spectrum solution for fungal disease prevention",
    category: "Broad Spectrum",
    usage: "Mix 15ml with 5 liters of water, apply as foliar spray every 10-14 days",
    benefits: [
      "Prevents and cures fungal infections",
      "Protects new growth",
      "Systemic action",
      "Increases resistance to stress"
    ]
  },
  { 
    id: "firestarter",
    name: "Firestarter",
    color: "#1f464d", 
    darkColor: "#0f2327",
    description: "Innovative plant activator that enhances natural defense mechanisms",
    category: "Plant Activator",
    usage: "Apply 2-3ml per liter at early growth stages for maximum effect",
    benefits: [
      "Activates plant immune system",
      "Enhances stress tolerance",
      "Improves nutrient uptake",
      "Eco-friendly formula"
    ]
  },
  { 
    id: "tomec",
    name: "Tomec",
    color: "#e63946", 
    darkColor: "#c1242f",
    description: "Specialized fungicide for protection against soil-borne pathogens",
    category: "Fungicide",
    usage: "Apply 10ml per 10 liters as soil drench or foliar spray",
    benefits: [
      "Prevents root rot",
      "Controls powdery mildew",
      "Long residual activity",
      "Safe for beneficial organisms"
    ]
  },
  { 
    id: "esker",
    name: "Esker",
    color: "#ff8c00", 
    darkColor: "#d27400",
    description: "Premium plant growth regulator for optimal crop development",
    category: "Growth Regulator",
    usage: "Apply 5ml per 10 liters during critical growth phases",
    benefits: [
      "Controls vertical growth",
      "Promotes lateral branching",
      "Increases flower formation",
      "Improves fruit set"
    ]
  },
  { 
    id: "lambda",
    name: "Lambda",
    color: "#8e44ad", 
    darkColor: "#6c3483",
    description: "Fast-acting insecticide with broad spectrum control",
    category: "Insecticide",
    usage: "Mix 2ml per liter and apply at first sign of infestation",
    benefits: [
      "Rapid knockdown effect",
      "Controls multiple pest types",
      "Extended protection period",
      "Low environmental impact"
    ]
  }
];

// Bottle component for the 3D showcase
const ProductBottle = ({ 
  product, 
  index, 
  currentIndex, 
  totalProducts, 
  onClick 
}: { 
  product: ProductType; 
  index: number; 
  currentIndex: number; 
  totalProducts: number;
  onClick: () => void;
}) => {
  // Calculate position in 3D space
  const angle = (index - currentIndex) * (2 * Math.PI / totalProducts);
  const radius = 250; // Distance from center
  
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const scale = Math.max(0.6, 1 - Math.abs(index - currentIndex) * 0.15);
  const opacity = Math.max(0.4, 1 - Math.abs(index - currentIndex) * 0.2);
  
  const isActive = index === currentIndex;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-32 h-48 cursor-pointer"
      animate={{
        x,
        z,
        scale,
        opacity,
        rotateY: angle * (180 / Math.PI), // Convert radians to degrees
        zIndex: isActive ? 10 : 5 - Math.abs(index - currentIndex)
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={onClick}
      whileHover={{ 
        scale: scale * 1.1,
        transition: { duration: 0.2 }
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div 
        className="w-full h-full rounded-lg flex flex-col overflow-hidden transform-gpu"
        style={{ 
          backgroundColor: product.color,
          boxShadow: isActive 
            ? `0 10px 30px rgba(0,0,0,0.2), 0 0 0 2px ${product.color}` 
            : '0 5px 15px rgba(0,0,0,0.1)',
          transform: `perspective(1000px) rotateY(0deg)`
        }}
      >
        {/* Bottle cap */}
        <div 
          className="h-8 w-full"
          style={{ 
            backgroundColor: product.darkColor,
            borderBottom: '2px solid rgba(255,255,255,0.2)'
          }}
        />
        
        {/* Bottle body */}
        <div className="flex-1 p-2 flex flex-col">
          {/* Label */}
          <div className="mt-1 bg-white rounded p-2 flex-1 flex flex-col items-center justify-center text-center">
            <div className="text-[8px] uppercase tracking-wider font-semibold text-gray-500">
              Life Scientific
            </div>
            <div 
              className="text-base font-bold mt-1"
              style={{ color: product.color }}
            >
              {product.name}
            </div>
            <div className="text-[7px] mt-1 text-gray-500">
              {product.category}
            </div>
          </div>
          
          {/* View details button (only on active) */}
          {isActive && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 bg-white/90 rounded-full text-[8px] py-1 text-center font-medium"
              style={{ color: product.color }}
            >
              View Details
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Product details modal
const ProductModal = ({ 
  product, 
  onClose 
}: { 
  product: ProductType; 
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-xl overflow-hidden max-w-2xl w-full max-h-[80vh] flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        {/* Product visualization */}
        <div 
          className="md:w-2/5 p-8 flex items-center justify-center relative"
          style={{ backgroundColor: `${product.color}15` }}
        >
          <div className="w-32 h-48 relative">
            <div 
              className="w-full h-full rounded-lg flex flex-col overflow-hidden"
              style={{ 
                backgroundColor: product.color,
                boxShadow: `0 10px 30px rgba(0,0,0,0.15)`
              }}
            >
              {/* Bottle cap */}
              <div 
                className="h-8 w-full"
                style={{ 
                  backgroundColor: product.darkColor,
                  borderBottom: '2px solid rgba(255,255,255,0.2)'
                }}
              />
              
              {/* Bottle body */}
              <div className="flex-1 p-2 flex flex-col">
                {/* Label */}
                <div className="mt-1 bg-white rounded p-2 flex-1 flex flex-col items-center justify-center text-center">
                  <div className="text-[8px] uppercase tracking-wider font-semibold text-gray-500">
                    Life Scientific
                  </div>
                  <div 
                    className="text-base font-bold mt-1"
                    style={{ color: product.color }}
                  >
                    {product.name}
                  </div>
                  <div className="text-[7px] mt-1 text-gray-500">
                    {product.category}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 3D rotation animation */}
            <motion.div
              className="absolute inset-0 border-2 border-dashed rounded-lg pointer-events-none"
              style={{ borderColor: product.color }}
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </div>
        </div>
        
        {/* Product details */}
        <div className="flex-1 p-6 overflow-y-auto relative">
          <button 
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center mb-2">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: product.color }}
            />
            <span className="text-sm font-medium">{product.category}</span>
          </div>
          
          <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Recommended Usage</h3>
            <p className="text-gray-700 text-sm">{product.usage}</p>
          </div>
          
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Key Benefits</h3>
            <ul className="grid grid-cols-1 gap-2">
              {product.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start">
                  <div 
                    className="w-4 h-4 rounded-full mr-2 flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: `${product.color}30` }}
                  >
                    <Plus className="w-2 h-2" style={{ color: product.color }} />
                  </div>
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-8 flex gap-3">
            <Button
              className="flex-1"
              style={{ 
                backgroundColor: product.color,
                color: 'white'
              }}
            >
              Request Sample
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              style={{ 
                borderColor: product.color,
                color: product.color
              }}
            >
              Technical Data
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function ProductShowcaseHero({
  title = "Innovative Agricultural Solutions",
  subtitle = "Explore our range of scientifically formulated agricultural products designed for optimal crop performance and protection.",
  ctaText = "Explore Products", 
  secondaryCtaText = "Contact Us" 
}: {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  secondaryCtaText?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Auto-rotate the showcase
  useEffect(() => {
    if (isRotating) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % PRODUCTS.length);
      }, 5000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRotating]);
  
  // Stop rotation when product selected
  useEffect(() => {
    if (selectedProduct) {
      setIsRotating(false);
    } else {
      setIsRotating(true);
    }
  }, [selectedProduct]);
  
  const nextProduct = () => {
    setCurrentIndex(prev => (prev + 1) % PRODUCTS.length);
  };
  
  const prevProduct = () => {
    setCurrentIndex(prev => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen overflow-hidden">
      {/* Abstract background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50" />
        <svg 
          viewBox="0 0 1000 1000" 
          className="absolute w-full h-full opacity-30"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
        <div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-blue-200 mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-purple-200 mix-blend-multiply filter blur-3xl opacity-70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button size="lg">
              {ctaText}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              {secondaryCtaText}
            </Button>
          </div>
        </div>
        
        {/* 3D Showcase */}
        <div className="relative h-[400px] md:h-[500px] mb-8">
          {/* Focus ring and platform */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <div 
                className="w-72 h-72 rounded-full border-2 border-dashed opacity-30"
                style={{ 
                  borderColor: PRODUCTS[currentIndex].color,
                  transform: "rotateX(60deg)"
                }}
              />
              <div
                className="absolute left-1/2 top-1/2 w-40 h-5 rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  backgroundColor: PRODUCTS[currentIndex].color,
                  opacity: 0.1,
                  filter: "blur(10px)",
                  transform: "rotateX(60deg) translateY(100px)"
                }}
              />
            </div>
          </div>
          
          {/* Product bottles */}
          <div className="absolute inset-0" style={{ perspective: "1000px" }}>
            {PRODUCTS.map((product, index) => (
              <ProductBottle
                key={product.id}
                product={product}
                index={index}
                currentIndex={currentIndex}
                totalProducts={PRODUCTS.length}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
          
          {/* Controls */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
              onClick={prevProduct}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-1.5">
              {PRODUCTS.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-4 bg-blue-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
              onClick={nextProduct}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Current product info */}
        <motion.div 
          className="max-w-2xl mx-auto text-center"
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
            style={{ 
              backgroundColor: `${PRODUCTS[currentIndex].color}20`,
              color: PRODUCTS[currentIndex].color
            }}
          >
            {PRODUCTS[currentIndex].category}
          </div>
          <h2 className="text-2xl font-bold mb-2">{PRODUCTS[currentIndex].name}</h2>
          <p className="text-gray-600 mb-4">{PRODUCTS[currentIndex].description}</p>
          <Button 
            variant="outline" 
            onClick={() => setSelectedProduct(PRODUCTS[currentIndex])}
            style={{ 
              borderColor: PRODUCTS[currentIndex].color,
              color: PRODUCTS[currentIndex].color
            }}
          >
            Learn More
          </Button>
        </motion.div>
      </div>
      
      {/* Product detail modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// Custom hook for media queries
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  
  return matches;
} 