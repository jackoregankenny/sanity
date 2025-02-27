"use client"

import { Leaf, FlaskConical, Shield, Globe } from "lucide-react"
import { motion } from "framer-motion"

// Define supported icon types
type IconType = "leaf" | "flask" | "shield" | "globe"

type Feature = {
  title: string
  description: string
  icon: IconType
}

// Icon mapping
const IconMap = {
  leaf: Leaf,
  flask: FlaskConical,
  shield: Shield,
  globe: Globe
}

export function FeaturesSection({
  title = "Scientific Advantage",
  subtitle = "Our research-backed approach delivers measurable results",
  features
}: {
  title?: string
  subtitle?: string
  features: Feature[]
}) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className="py-24 bg-[#f9fafb]">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4"
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Features grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => {
            const Icon = IconMap[feature.icon]
            
            return (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 flex flex-col h-full"
                variants={featureVariants}
              >
                <div className="mb-5 rounded-full w-12 h-12 flex items-center justify-center bg-[#f0f9f6]">
                  <Icon className="h-6 w-6 text-[#0f766e]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 flex-grow">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
} 