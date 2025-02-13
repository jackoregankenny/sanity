import { type SanityDocument } from "next-sanity"
import { client } from "@/sanity/client"
import { urlFor } from "@/sanity/image"
import { notFound } from "next/navigation"
import { type LanguageCode } from "@/config/languages"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import { Metadata } from "next"
import { type PortableTextBlock } from "@portabletext/types"

interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
  }
  alt?: string
}

interface PageDocument extends SanityDocument {
  title: string
  content: (PortableTextBlock | SanityImage)[]
  seoTitle?: string
  seoDescription?: string
}

interface Props {
  params: {
    lang: LanguageCode
    page: string
  }
}

// Query to get a single page
const PAGE_QUERY = `*[_type == "page" && slug.current == $page && language == $lang][0]{
  _id,
  _type,
  title,
  content,
  seoTitle,
  seoDescription
}`

// Portable Text components configuration
const components = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="relative w-full aspect-video my-8">
          <Image
            src={urlFor(value).width(1200).height(675).url()}
            alt={value.alt || ' '}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )
    }
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await client.fetch<PageDocument | null>(
    PAGE_QUERY,
    { page: params.page, lang: params.lang }
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
  try {
    const page = await client.fetch<PageDocument | null>(
      PAGE_QUERY,
      { page: params.page, lang: params.lang },
      { next: { revalidate: 30 } }
    )

    if (!page) {
      notFound()
    }

    return (
      <article className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
        <div className="prose dark:prose-invert max-w-none">
          <PortableText
            value={page.content}
            components={components}
          />
        </div>
      </article>
    )
  } catch (error) {
    console.error('Error fetching page:', error)
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Error</h1>
        <p className="text-red-600">Error loading page. Please try again later.</p>
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
    page: page.slug,
  }))
} 