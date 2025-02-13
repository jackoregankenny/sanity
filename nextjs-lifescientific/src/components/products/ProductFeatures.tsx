import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Leaf, FlaskConical, LineChart } from "lucide-react"

interface Feature {
  title: string
  description: string
  icon: 'shield' | 'leaf' | 'lab' | 'chart'
}

interface ProductFeaturesProps {
  sectionTitle: string
  features: Feature[]
  className?: string
}

const iconMap = {
  shield: Shield,
  leaf: Leaf,
  lab: FlaskConical,
  chart: LineChart
}

export function ProductFeatures({
  sectionTitle,
  features,
  className
}: ProductFeaturesProps) {
  return (
    <section className={cn("py-16 bg-background", className)}>
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
          {sectionTitle}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon]
            return (
              <Card key={index} className="border-none shadow-none bg-muted/50">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 