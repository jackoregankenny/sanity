"use client"

import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    // Ireland
    { location: [53.3498, -6.2603], size: 0.05 }, // Dublin
    { location: [51.8985, -8.4756], size: 0.04 }, // Cork
    
    // UK
    { location: [52.2054, 0.1132], size: 0.05 }, // Cambridge
    
    // Canada
    { location: [51.0447, -114.0719], size: 0.05 }, // Calgary
    
    // USA Agricultural Regions
    { location: [41.8781, -87.6298], size: 0.07 }, // Middle America (Chicago)
    
    // Europe
    { location: [48.8566, 2.3522], size: 0.05 }, // Paris
    { location: [52.5200, 13.4050], size: 0.05 }, // Berlin, Germany
    { location: [52.3676, 4.9041], size: 0.05 }, // Amsterdam, Netherlands
    { location: [38.7223, -9.1393], size: 0.04 }, // Lisbon, Portugal
    { location: [40.4168, -3.7038], size: 0.05 }, // Madrid, Spain
    { location: [59.4370, 24.7536], size: 0.03 }, // Tallinn, Estonia
    { location: [43.6000, 3.8667], size: 0.04 }, // Languedoc region
    
    // Eastern Europe
    { location: [50.0755, 14.4378], size: 0.04 }, // Prague, Czech Republic
    { location: [47.4979, 19.0402], size: 0.04 }, // Budapest, Hungary
    
    // South America
    { location: [-23.5505, -46.6333], size: 0.1 }, // São Paulo, Brazil
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      setR(delta / 200)
    }
  }

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005
      state.phi = phi + r
      state.width = width * 2
      state.height = width * 2
    },
    [r],
  )

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth
    }
  }

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    })

    setTimeout(() => (canvasRef.current!.style.opacity = "1"))
    return () => globe.destroy()
  }, [])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
