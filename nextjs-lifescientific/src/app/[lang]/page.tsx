import { type SanityDocument } from "next-sanity"
import Link from "next/link"
import { client } from "@/sanity/client"
import { languages, type LanguageCode } from "@/config/languages"
import { notFound } from "next/navigation"

interface PostDocument extends SanityDocument {
  title: string
  slug: { current: string }
  publishedAt: string
  mainImage?: {
    asset: {
      _ref: string
    }
  }
  excerpt?: string
}

interface Props {
  params: {
    lang: LanguageCode
  }
}

// This can be used to generate static params for all supported languages
export function generateStaticParams() {
  return languages.map((lang) => ({
    lang: lang.id,
  }))
}

// Validate the language parameter
function validateLanguage(lang: string): asserts lang is LanguageCode {
  if (!languages.some(l => l.id === lang)) {
    notFound()
  }
}

// Query to get posts in the current language
const getPostsQuery = `*[
  _type == "post" &&
  language == $language &&
  defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  _type,
  title,
  slug,
  publishedAt,
  mainImage,
  excerpt
}`

export default async function HomePage({ params: { lang } }: Props) {
  validateLanguage(lang)
  
  try {
    const posts = await client.fetch<PostDocument[]>(
      getPostsQuery,
      { language: lang },
      { next: { revalidate: 30 } }
    )

    if (!posts || posts.length === 0) {
      return (
        <div className="container mx-auto min-h-screen max-w-3xl p-8">
          <h1 className="text-4xl font-bold mb-8">Posts</h1>
          <p className="text-gray-600">No posts available in {languages.find(l => l.id === lang)?.title}</p>
        </div>
      )
    }

    return (
      <div className="container mx-auto min-h-screen max-w-3xl p-8">
        <h1 className="text-4xl font-bold mb-8">Posts</h1>
        <ul className="flex flex-col gap-y-4">
          {posts.map((post) => (
            <li 
              key={post._id}
              className="group hover:bg-gray-50 dark:hover:bg-gray-900 p-4 rounded-lg transition-colors"
            >
              <Link href={`/${lang}/${post.slug.current}`}>
                <article>
                  <h2 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {post.excerpt}
                    </p>
                  )}
                  <time 
                    className="text-sm text-gray-500 dark:text-gray-500 mt-2 block"
                    dateTime={post.publishedAt}
                  >
                    {new Date(post.publishedAt).toLocaleDateString(lang, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  } catch (error) {
    console.error('Error fetching posts:', error)
    return (
      <div className="container mx-auto min-h-screen max-w-3xl p-8">
        <h1 className="text-4xl font-bold mb-8">Posts</h1>
        <p className="text-red-600">Error loading posts. Please try again later.</p>
      </div>
    )
  }
} 