import { Leaf, FlaskConical, Shield, Star } from "lucide-react"

const icons = {
  leaf: Leaf,
  flask: FlaskConical,
  shield: Shield,
  star: Star
} as const

interface Props {
  title: string
  features: Array<{
    title: string
    description: string
    icon: keyof typeof icons
  }>
}

export function FeaturesSection({ title, features }: Props) {
  return (
    <section className="bg-white">
      <div className="container max-w-[80%] mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center mb-16">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = icons[feature.icon]
            
            return (
              <div key={index} className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 