"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Gravity, MatterBody } from "@/components/ui/gravity"
import { useEffect, useState, useRef } from "react"

type HeroSectionProps = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  learnMoreText?: string;
  newProductsText?: string;
}

// Chemical container with better visual design
const ChemicalContainer = ({ product }: { product: ProductType }) => (
  <div className="relative w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 lg:w-36 lg:h-44">
    <div className="absolute inset-0 flex flex-col items-center cursor-grab active:cursor-grabbing">
      {/* Bottle body - gradient with highlight for a 3D effect */}
      <div 
        className="w-full h-full rounded-md overflow-hidden flex flex-col" 
        style={{ 
          background: `linear-gradient(135deg, ${product.color} 0%, ${product.color}ee 60%, ${product.color}cc 100%)`,
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Bottle cap */}
        <div 
          className="w-full h-6 sm:h-7 md:h-8 rounded-t-md relative flex justify-center" 
          style={{ 
            background: `linear-gradient(to bottom, ${product.darkColor} 0%, ${product.color} 100%)`,
            borderBottom: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          {/* Cap ridges */}
          <div className="absolute bottom-0 w-2/3 h-2 flex space-x-1">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex-1 h-full bg-white/10"></div>
            ))}
          </div>
        </div>
        
        {/* Bottle content */}
        <div className="flex-1 flex flex-col p-2 sm:p-3">
          {/* Label */}
          <div className="mt-1 sm:mt-2 bg-white rounded-sm p-1 sm:p-2 flex-1 flex flex-col justify-center items-center shadow-inner">
            <div className="text-[8px] sm:text-[10px] uppercase tracking-wider font-semibold text-gray-500">
              Life Scientific
            </div>
            <div 
              className="text-sm sm:text-base font-bold mt-0.5 text-center" 
              style={{ color: product.color }}
            >
              {product.name}
            </div>
            <div className="text-[6px] sm:text-[8px] mt-1 text-gray-500 text-center">
              {product.description}
            </div>
          </div>
          
          {/* Volume indicator */}
          <div className="mt-1 sm:mt-2 mx-auto text-[6px] sm:text-[8px] text-white/80 font-mono">
            {product.volume}
          </div>
        </div>
      </div>
    </div>
  </div>
);

type ProductType = {
  name: string;
  color: string;
  darkColor: string;
  x: string;
  y: string;
  description: string;
  volume: string;
};

const PRODUCTS: ProductType[] = [
  { 
    name: "Niantic",
    color: "#0052cc", 
    darkColor: "#003d99",
    x: "25%", 
    y: "20%",
    description: "Systemic Herbicide",
    volume: "5L"
  },
  { 
    name: "Tarak",
    color: "#d4126e", 
    darkColor: "#a60d55",
    x: "35%", 
    y: "28%",
    description: "Broad Spectrum",
    volume: "10L"
  },
  { 
    name: "Firestarter",
    color: "#1f464d", 
    darkColor: "#0f2327",
    x: "48%", 
    y: "15%",
    description: "Plant Activator",
    volume: "1L"
  },
  { 
    name: "Tomec",
    color: "#e63946", 
    darkColor: "#c1242f",
    x: "72%", 
    y: "22%",
    description: "Fungicide",
    volume: "2.5L"
  },
  { 
    name: "Esker",
    color: "#ff8c00", 
    darkColor: "#d27400",
    x: "82%", 
    y: "26%",
    description: "Growth Regulator",
    volume: "5L"
  },
  { 
    name: "Lambda",
    color: "#8e44ad", 
    darkColor: "#6c3483",
    x: "60%", 
    y: "20%",
    description: "Insecticide",
    volume: "1L"
  },
  { 
    name: "Spinostar",
    color: "#2563eb", 
    darkColor: "#1d4ed8",
    x: "18%", 
    y: "25%",
    description: "Crop Defender",
    volume: "2L"
  }
];

const HeroSection = ({
  title = "Innovative Agricultural Solutions",
  subtitle = "Developing high-quality crop protection products for sustainable farming practices worldwide.",
  ctaText = "Explore Products",
  learnMoreText = "Learn more",
  newProductsText = "New products available"
}: HeroSectionProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Track scroll position to add effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Track interactions for better UX
  useEffect(() => {
    const handleMouseDown = () => setIsInteracting(true);
    const handleMouseUp = () => {
      // Short delay to avoid jumpy behavior when clicking
      setTimeout(() => setIsInteracting(false), 300);
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleMouseDown);
    window.addEventListener('touchend', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleMouseDown);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className={`min-h-screen relative bg-background overflow-auto ${isInteracting ? 'touch-none' : 'touch-pan-y'}`}
    >
      {/* Background with agricultural pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}></div>
      </div>

      {/* Content wrapper */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 py-12 md:py-24 flex flex-col">
        {/* Header with scroll indicator */}
        <div className="text-center mb-12 md:mb-16 max-w-5xl mx-auto relative">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors mb-6 hover:bg-muted/50">
            <span className="relative flex h-2 w-2 items-center justify-center mr-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {newProductsText}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            {title.split(' ').map((word, i, arr) => 
              i === arr.length - 1 ? 
                <span key={i} className="text-primary">{word} </span> : 
                <span key={i}>{word} </span>
            )}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="group">
              {ctaText}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="group">
              {learnMoreText}
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          {/* Scroll indicator */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-16 transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-2">Scroll to explore</span>
              <div className="w-5 h-9 border-2 border-muted-foreground rounded-full flex justify-center">
                <div className="w-1 h-2 bg-muted-foreground rounded-full mt-1 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive products section */}
        <div className="w-full h-[60vh] md:h-[65vh] relative mt-8 border-t border-b border-muted/30">
          {/* Lab background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-4 text-xs uppercase tracking-wider text-muted-foreground/50">
              Laboratory Preview
            </div>
            <div className="absolute bottom-4 right-4 text-xs text-muted-foreground/50">
              Click and drag to interact
            </div>
          </div>
          
          {/* Gravity container */}
          <Gravity 
            gravity={{ x: 0, y: 0.7 }} 
            className="w-full h-full"
            grabCursor={true}
            addTopWall={true}
          >
            {PRODUCTS.map((product) => (
              <MatterBody
                key={product.name}
                matterBodyOptions={{ 
                  friction: 0.4, 
                  restitution: 0.3,
                  density: 0.002
                }}
                x={product.x}
                y={product.y}
              >
                <ChemicalContainer product={product} />
              </MatterBody>
            ))}
          </Gravity>
          
          {/* Semi-transparent overlay at bottom for better text contrast */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        </div>
        
        {/* Feature highlights - below the interactive area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 md:mt-24 pb-16">
          <div className="rounded-lg p-6 border border-muted bg-card">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Precision Formulations</h3>
            <p className="text-muted-foreground">Scientifically developed products with precise concentrations for optimal effectiveness in crop protection.</p>
          </div>
          
          <div className="rounded-lg p-6 border border-muted bg-card">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Sustainable Agriculture</h3>
            <p className="text-muted-foreground">Environmentally conscious solutions that promote healthy crops while minimizing ecological impact.</p>
          </div>
          
          <div className="rounded-lg p-6 border border-muted bg-card">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Research-Backed Results</h3>
            <p className="text-muted-foreground">Products developed with extensive field testing and scientific research for proven effectiveness.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection }