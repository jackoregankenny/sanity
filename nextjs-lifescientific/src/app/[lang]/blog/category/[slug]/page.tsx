import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/sanity.client'
import { urlForImage } from '@/lib/sanity.image'
import { BlogCard } from '@/components/blog/BlogCard'
import { BlogSidebar } from '@/components/blog/BlogSidebar'
import { Button } from '@/components/ui/button'
import { languages } from '@/config/languages'
import type { LanguageCode } from '@/hooks/useTranslations'
import { getTranslations } from '@/hooks/useTranslations'
import { BlogPost, Category } from '@/types/sanity'
import { ArrowLeftIcon } from 'lucide-react'

interface Props {
  params: {
    lang: string
    slug: string
  }
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient()
  
  // Fetch category data from Sanity
  const category = await client.fetch<Category | null>(`
    *[_type == "category" && slug.current == $slug && language == $lang][0] {
      title,
      description
    }
  `, { 
    slug: params.slug,
    lang: params.lang
  })
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }
  
  return {
    title: `${category.title} | Blog`,
    description: category.description,
  }
}

// Validate language
function validateLanguage(lang: string): asserts lang is LanguageCode {
  if (!languages.some(l => l.id === lang)) {
    notFound()
  }
}

export default async function CategoryPage({ params }: Props) {
  validateLanguage(params.lang)
  
  const client = createClient()
  
  // Get translations
  const translations = await getTranslations(params.lang)
  
  // Fetch category data
  const category = await client.fetch<Category | null>(`
    *[_type == "category" && slug.current == $slug && language == $lang][0] {
      _id,
      title,
      slug,
      description,
      color
    }
  `, { 
    slug: params.slug,
    lang: params.lang
  })
  
  if (!category) {
    notFound()
  }
  
  // Fetch posts in this category
  const posts = await client.fetch<BlogPost[]>(`
    *[
      _type == "blogPost" && 
      language == $lang && 
      $categoryId in categories[]._ref
    ] | order(publishedAt desc) {
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
    categoryId: category._id
  })
  
  // Fetch all categories for sidebar
  const categories = await client.fetch<Category[]>(`
    *[_type == "category" && language == $lang] {
      _id,
      title,
      slug,
      color
    }
  `, { lang: params.lang })
  
  // Fetch recent posts for sidebar
  const recentPosts = await client.fetch<BlogPost[]>(`
    *[_type == "blogPost" && language == $lang] | order(publishedAt desc)[0...5] {
      _id,
      title,
      slug,
      publishedAt,
      featuredImage {
        asset->{
          _id,
          url
        },
        alt
      }
    }
  `, { lang: params.lang })
  
  // Helper to get the background color class based on category color
  const getBgColorClass = (color?: string) => {
    switch (color) {
      case 'teal': return 'bg-teal-50'
      case 'green': return 'bg-green-50'
      case 'blue': return 'bg-blue-50'
      case 'purple': return 'bg-purple-50'
      case 'red': return 'bg-red-50'
      case 'orange': return 'bg-orange-50'
      case 'yellow': return 'bg-yellow-50'
      default: return 'bg-gray-50'
    }
  }
  
  // Helper to get the text color class based on category color
  const getTextColorClass = (color?: string) => {
    switch (color) {
      case 'teal': return 'text-teal-900'
      case 'green': return 'text-green-900'
      case 'blue': return 'text-blue-900'
      case 'purple': return 'text-purple-900'
      case 'red': return 'text-red-900'
      case 'orange': return 'text-orange-900'
      case 'yellow': return 'text-yellow-900'
      default: return 'text-gray-900'
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link 
          href={`/${params.lang}/blog`}
          className="inline-flex items-center text-gray-600 hover:text-teal-600"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          {translations.blog.backToList}
        </Link>
      </div>
      
      {/* Category Header */}
      <div className={`mb-12 rounded-xl ${getBgColorClass(category.color)} p-8`}>
        <h1 className={`mb-4 text-3xl font-bold ${getTextColorClass(category.color)}`}>
          {category.title}
        </h1>
        {category.description && (
          <p className="text-lg text-gray-700">
            {category.description}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            Articles in {category.title}
          </h2>
          
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post._id} post={post} lang={params.lang} />
                ))}
              </div>
              
              {posts.length > 9 && (
                <div className="mt-8 flex justify-center">
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    {translations.blog.loadMore}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600">{translations.blog.noResults}</p>
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