'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ProductActions } from '@/components/ProductActions'
import { RelatedProducts } from '@/components/RelatedProducts'
import { urlForImage } from '@/sanity/lib/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation, TranslationKey } from '@/lib/translations'
import type { Image as SanityImage } from 'sanity'

interface ProductDetailProps {
  product: {
    _id: string
    name: string
    tagline?: string
    description?: string
    productImage?: SanityImage
    category?: {
      name: string
    }
    variants?: Array<{
      country: string
      approvalNumber?: string
      formulation?: string
      activeIngredients?: string[]
      mechanismOfAction?: string
      containerSize?: string
      cropGroup?: string
      crop?: string
    }>
  }
  relatedProducts?: Array<{
    _id: string
    name: string
    slug: {
      current: string
    }
    productImage?: SanityImage
    category?: {
      name: string
    }
    variants?: Array<{
      country: string
    }>
  }>
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const { currentLanguage } = useLanguage()
  const t = (key: TranslationKey) => getTranslation(key, currentLanguage)

  const uniqueCountries = Array.from(new Set(product.variants?.map(v => v.country) || []))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            {product.category && (
              <Badge variant="secondary" className="mb-2">
                {product.category.name}
              </Badge>
            )}
            <h1 className="mb-2 text-4xl font-bold">{product.name}</h1>
            {product.tagline && (
              <p className="text-lg text-muted-foreground">{product.tagline}</p>
            )}
          </div>

          {product.productImage && (
            <div className="mb-8 overflow-hidden rounded-lg">
              <Image
                src={urlForImage(product.productImage)?.width(500).height(500).url() || ''}
                alt={product.name}
                width={500}
                height={500}
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          )}

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t('about_product')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
          </Card>

          {product.variants && product.variants.length > 0 && (
            <div className="space-y-6">
              {product.variants.map((variant, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{t('technical_details')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {variant.country && (
                        <div>
                          <p className="font-medium">{variant.country}</p>
                        </div>
                      )}
                      {variant.approvalNumber && (
                        <div>
                          <p className="text-sm text-muted-foreground">{t('approval_number')}</p>
                          <p className="font-medium">{variant.approvalNumber}</p>
                        </div>
                      )}
                      {variant.formulation && (
                        <div>
                          <p className="text-sm text-muted-foreground">{t('formulation_type')}</p>
                          <p className="font-medium">{variant.formulation}</p>
                        </div>
                      )}
                      {variant.activeIngredients && variant.activeIngredients.length > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground">{t('active_ingredients')}</p>
                          <p className="font-medium">{variant.activeIngredients.join(', ')}</p>
                        </div>
                      )}
                      {variant.mechanismOfAction && (
                        <div>
                          <p className="text-sm text-muted-foreground">{t('mechanism_of_action')}</p>
                          <p className="font-medium">{variant.mechanismOfAction}</p>
                        </div>
                      )}
                      {variant.containerSize && (
                        <div>
                          <p className="text-sm text-muted-foreground">{t('container_size')}</p>
                          <p className="font-medium">{variant.containerSize}</p>
                        </div>
                      )}
                      {variant.cropGroup && (
                        <div>
                          <p className="text-sm text-muted-foreground">{t('crop_group')}</p>
                          <p className="font-medium">{variant.cropGroup}</p>
                        </div>
                      )}
                      {variant.crop && (
                        <div>
                          <p className="text-sm text-muted-foreground">{t('crop')}</p>
                          <p className="font-medium">{variant.crop}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ProductActions />
          {relatedProducts && relatedProducts.length > 0 && (
            <>
              <Separator className="my-8" />
              <div>
                <h2 className="mb-4 text-2xl font-semibold">
                  {t('other_products_available')} {uniqueCountries.join(', ')}
                </h2>
                <RelatedProducts 
                  products={relatedProducts} 
                  currentCountries={uniqueCountries}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 