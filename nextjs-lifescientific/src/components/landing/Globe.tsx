 // Start of Selection
import { Globe } from "@/components/ui/globe"
import Link from "next/link"

export function GlobeDemo() {
  return (
    <section className="relative container mx-auto h-[600px] py-16 px-4">
      {/* Globe Background */}
      <div className="absolute inset-0">
        <Globe className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-6 text-white">
        <h2 className="text-5xl font-extrabold">
          Our Global Locations
        </h2>
        <p className="text-xl max-w-2xl">
          Discover where our solutions make a difference around the world
        </p>
        <Link 
          href="/locations" 
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primary-dark transition-colors"
        >
          View All Locations
        </Link>
      </div>
    </section>
  )
}
