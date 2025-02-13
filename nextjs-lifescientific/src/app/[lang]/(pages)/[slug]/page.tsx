import { type SanityDocument } from "next-sanity"
import { client } from "@/sanity/client"
import { notFound } from "next/navigation"
import { type LanguageCode } from "@/hooks/useTranslations"
import { getTranslations } from "@/hooks/useTranslations"
import { languages } from "@/config/languages"
import { Metadata } from "next"
import Hero from "@/components/blocks/Hero"
import Features from "@/components/blocks/Features"
import Gallery from "@/components/blocks/Gallery"
import Video from "@/components/blocks/Video"

type BlockProps = {
  hero: Parameters<typeof Hero>[0]
  features: Parameters<typeof Features>[0]
  gallery: Parameters<typeof Gallery>[0]
  video: Parameters<typeof Video>[0]
}

type PageBlock = 
  | ({ _type: 'pageHero'; _key: string } & BlockProps['hero'])
  | ({ _type: 'pageFeatures'; _key: string } & BlockProps['features'])
  | ({ _type: 'pageGallery'; _key: string } & BlockProps['gallery'])
  | ({ _type: 'pageVideo'; _key: string } & BlockProps['video'])

interface PageDocument extends SanityDocument {
  title: string
  pageBuilder: PageBlock[]
  seoTitle?: string
  seoDescription?: string
}

interface Props {
  params: {
    lang: string
    slug: string
  }
}

// Validate the language parameter
function validateLanguage(lang: string): asserts lang is LanguageCode {
  if (!languages.some(l => l.id === lang)) {
    notFound()
  }
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  validateLanguage(params.lang)

  const page = await client.fetch<PageDocument | null>(
    `*[_type == "page" && slug.current == $slug && language == $lang][0]`,
    { slug: params.slug, lang: params.lang }
  )

  if (!page) {
    return {
      title: 'Page Not Found'
    }
  }

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription
  }
}

export default async function Page({ params }: Props) {
  validateLanguage(params.lang)
  const translations = await getTranslations(params.lang)

  try {
    const page = await client.fetch<PageDocument | null>(
      `*[_type == "page" && slug.current == $slug && language == $lang][0]`,
      { slug: params.slug, lang: params.lang },
      { next: { tags: ['page'] } }
    )

    if (!page) {
      notFound()
    }

    return (
      <main>
        {page.pageBuilder.map((block) => {
          const { _key } = block
          
          switch (block._type) {
            case 'pageHero': {
              const props: BlockProps['hero'] = {
                title: block.title,
                subtitle: block.subtitle,
                backgroundImage: block.backgroundImage,
                cta: block.cta
              }
              return <Hero key={_key} {...props} />
            }
            case 'pageFeatures': {
              const props: BlockProps['features'] = {
                title: block.title,
                subtitle: block.subtitle,
                features: block.features,
                layout: block.layout
              }
              return <Features key={_key} {...props} />
            }
            case 'pageGallery': {
              const props: BlockProps['gallery'] = {
                title: block.title,
                subtitle: block.subtitle,
                images: block.images,
                columns: block.columns
              }
              return <Gallery key={_key} {...props} />
            }
            case 'pageVideo': {
              const props: BlockProps['video'] = {
                title: block.title,
                subtitle: block.subtitle,
                url: block.url,
                type: block.type,
                poster: block.poster
              }
              return <Video key={_key} {...props} />
            }
            default:
              return null
          }
        })}
      </main>
    )
  } catch (error) {
    console.error('Error fetching page:', error)
    return (
      <div className="container mx-auto min-h-screen max-w-3xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">{translations.common.error}</h1>
      </div>
    )
  }
}

// Generate static params for all pages in all languages
export async function generateStaticParams() {
  const pages = await client.fetch<Array<{ slug: { current: string }, language: string }>>(
    `*[_type == "page" && defined(slug.current)]{
      "slug": slug.current,
      "language": language
    }`
  )

  return pages.map((page) => ({
    lang: page.language,
    slug: page.slug,
  }))
} 