import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface Benefit {
  title: string
  description: string
}

interface ProductBenefitsProps {
  sectionTitle: string
  benefits: Benefit[]
  className?: string
}

export function ProductBenefits({
  sectionTitle,
  benefits,
  className
}: ProductBenefitsProps) {
  return (
    <section className={cn("py-16 bg-muted", className)}>
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
          {sectionTitle}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-primary/50" />
              <CardContent className="pt-8">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 