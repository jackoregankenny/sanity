import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/sanity.client'
import { urlForImage } from '@/lib/sanity.image'
import { PortableText } from '@portabletext/react'
import { BlogSidebar } from '@/components/blog/BlogSidebar'
import { BlogCard } from '@/components/blog/BlogCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { languages } from '@/config/languages'
import type { LanguageCode } from '@/hooks/useTranslations'
import { getTranslations } from '@/hooks/useTranslations'
import { BlogPost, Category } from '@/types/sanity'
import { UserIcon, CalendarIcon, ArrowLeftIcon } from 'lucide-react'

interface Props {
  params: {
    lang: string
    slug: string
  }
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient()
  
  try {
    // Validate language
    if (!languages.some(l => l.id === params.lang)) {
      return {
        title: 'Not Found',
      }
    }
    
    // Fetch blog post
    const post = await client.fetch<BlogPost | null>(`
      *[_type == "blogPost" && slug.current == $slug && language == $lang][0] {
        title,
        excerpt,
        "author": author-> {
          name
        },
        featuredImage {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    `, { 
      slug: params.slug,
      lang: params.lang
    })
    
    if (!post) {
      return {
        title: 'Post Not Found',
      }
    }
    
    return {
      title: post.title,
      description: post.excerpt,
      authors: post.author ? [{ name: post.author.name }] : undefined,
      openGraph: post.featuredImage?.asset ? {
        images: [{ 
          url: urlForImage(post.featuredImage)?.url() || '',
          alt: post.featuredImage?.alt || post.title
        }]
      } : undefined
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Blog Post'
    }
  }
}

// Validate language
function validateLanguage(lang: string): asserts lang is LanguageCode {
  if (!languages.some(l => l.id === lang)) {
    notFound()
  }
}

// Get color class for category badge
const getCategoryColorClass = (color?: string) => {
  switch (color) {
    case 'teal': return 'bg-teal-100 text-teal-800 hover:bg-teal-200'
    case 'green': return 'bg-green-100 text-green-800 hover:bg-green-200'
    case 'blue': return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    case 'purple': return 'bg-purple-100 text-purple-800 hover:bg-purple-200'
    case 'red': return 'bg-red-100 text-red-800 hover:bg-red-200'
    case 'orange': return 'bg-orange-100 text-orange-800 hover:bg-orange-200'
    case 'yellow': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
    default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
  }
}

export default async function BlogPostPage({ params }: Props) {
  validateLanguage(params.lang)
  
  const client = createClient()
  
  // Get translations
  const translations = await getTranslations(params.lang)
  
  // Fetch blog post
  const post = await client.fetch<BlogPost | null>(`
    *[_type == "blogPost" && slug.current == $slug && language == $lang][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      content,
      "author": author-> {
        _id,
        name,
        slug,
        bio,
        avatar {
          asset->{
            _id,
            url
          }
        }
      },
      "categories": categories[]-> {
        _id,
        title,
        slug,
        color
      },
      featuredImage {
        asset->{
          _id,
          url
        },
        alt
      },
      "relatedPosts": relatedPosts[]-> {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        featuredImage {
          asset->{
            _id,
            url
          },
          alt
        },
        "author": author-> {
          _id,
          name,
          slug,
          avatar {
            asset->{
              _id,
              url
            }
          }
        },
        "categories": categories[]-> {
          _id,
          title,
          slug,
          color
        }
      }
    }
  `, { 
    slug: params.slug,
    lang: params.lang
  })
  
  if (!post) {
    notFound()
  }
  
  // Fetch categories and recent posts for sidebar
  const categories = await client.fetch<Category[]>(`
    *[_type == "category" && language == $lang] {
      _id,
      title,
      slug,
      color
    }
  `, { lang: params.lang })
  
  const recentPosts = await client.fetch<BlogPost[]>(`
    *[_type == "blogPost" && language == $lang && _id != $postId] | order(publishedAt desc)[0...5] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      featuredImage {
        asset->{
          _id,
          url
        },
        alt
      },
      "author": author-> {
        _id,
        name,
        slug,
        avatar {
          asset->{
            _id,
            url
          }
        }
      },
      "categories": categories[]-> {
        _id,
        title,
        slug,
        color
      }
    }
  `, { 
    lang: params.lang,
    postId: post._id
  })
  
  // Component for rendering portable text
  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return null
        }
        return (
          <div className="my-8 overflow-hidden rounded-lg">
            <Image
              src={urlForImage(value)?.url() || ''}
              alt={value.alt || ''}
              width={800}
              height={500}
              className="w-full object-cover"
            />
            {value.caption && (
              <div className="bg-gray-50 p-2 text-center text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        )
      },
      code: ({ value }: any) => {
        return (
          <pre className="my-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white">
            <code>{value.code}</code>
          </pre>
        )
      }
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link 
          href={`/${params.lang}/blog`}
          className="mb-8 inline-flex items-center text-gray-600 hover:text-teal-600"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          {translations.blog.backToList}
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Featured Image */}
          {post.featuredImage?.asset && (
            <div className="mb-8 overflow-hidden rounded-xl">
              <Image
                src={urlForImage(post.featuredImage)?.url() || ''}
                alt={post.featuredImage.alt || post.title}
                width={1200}
                height={675}
                className="w-full object-cover"
              />
            </div>
          )}
          
          {/* Title and Meta */}
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              {post.title}
            </h1>
            
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories?.map((category) => (
                <Link 
                  key={category._id} 
                  href={`/${params.lang}/blog/category/${category.slug.current}`}
                >
                  <Badge className={`${getCategoryColorClass(category.color)}`}>
                    {category.title}
                  </Badge>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              {post.author && (
                <div className="flex items-center">
                  <UserIcon className="mr-1 h-4 w-4" />
                  <span>{translations.blog.authorBy}</span>&nbsp;
                  <Link 
                    href={`/${params.lang}/blog/author/${post.author.slug?.current}`}
                    className="font-medium text-teal-600 hover:underline"
                  >
                    {post.author.name}
                  </Link>
                </div>
              )}
              
              {post.publishedAt && (
                <div className="flex items-center">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  <span>{translations.blog.publishedOn}</span>&nbsp;
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <PortableText value={post.content} components={portableTextComponents} />
          </div>
          
          {/* Author Bio */}
          {post.author?.bio && (
            <div className="mt-12 rounded-xl border border-gray-100 bg-gray-50 p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  {post.author.avatar?.asset ? (
                    <AvatarImage src={urlForImage(post.author.avatar)?.url() || ''} alt={post.author.name} />
                  ) : (
                    <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{post.author.name}</h3>
                  <div className="mt-2 text-gray-600">
                    <PortableText value={post.author.bio} />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                {translations.blog.relatedPosts}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {post.relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost._id} post={relatedPost} lang={params.lang} />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div>
          <BlogSidebar
            categories={categories}
            recentPosts={recentPosts}
            showCategories={true}
            showRecentPosts={true}
            showSubscribe={true}
            lang={params.lang}
            translations={translations}
          />
        </div>
      </div>
    </div>
  )
} 