import type { SanityDocument } from "next-sanity"
import type { getTranslations } from "@/hooks/useTranslations"

export type Translations = Awaited<ReturnType<typeof getTranslations>>

export interface ActiveIngredient {
  name: string
  amount: string
  units: string
}

export interface SupportedCrop {
  crop: string
  dosage?: {
    amount: string
    unit: string
  }
}

export interface ProductDocument extends SanityDocument {
  name: string
  slug: { current: string }
  tagline: string
  description?: string
  productImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  category: {
    value: 'pesticide' | 'herbicide' | 'fungicide' | 'insecticide'
    label: string
  }
  benefits?: Array<{
    title: string
    description?: string
  }>
  features?: Array<{
    title: string
    description?: string
  }>
  variants: Array<{
    name: string
    formulationType: {
      value: string
      label: string
    }
    activeIngredients?: ActiveIngredient[]
    containerSizes?: string[]
    registrationNumber?: string
  }>
  supportedCrops?: SupportedCrop[]
} 