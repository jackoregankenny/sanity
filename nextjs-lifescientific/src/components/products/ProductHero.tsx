import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ProductHeroProps {
  heading: string
  subheading: string
  ctaText: string
  image?: {
    url: string
    alt: string
  }
  className?: string
}

export function ProductHero({
  heading,
  subheading,
  ctaText,
  image,
  className
}: ProductHeroProps) {
  return (
    <section className={cn(
      "relative overflow-hidden bg-background py-24",
      className
    )}>
      <div className="container relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              {heading}
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl">
              {subheading}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          {image && (
            <div className="relative aspect-square lg:aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src={image.url}
                alt={image.alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    </section>
  )
} 