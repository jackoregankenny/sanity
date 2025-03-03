import React from 'react'
import Image from 'next/image'
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
import { BlogPage, BlogPost, Category } from '@/types/sanity'

interface Props {
  params: {
    lang: string
  }
}

// Generate static params for all supported languages
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

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  validateLanguage(params.lang)
  
  const client = createClient()
  
  // Fetch blog page data from Sanity
  const blogPage = await client.fetch<BlogPage | null>(`
    *[_type == "blogPage" && language == $lang][0] {
      title,
      subtitle,
      description,
      seoTitle,
      seoDescription
    }
  `, { lang: params.lang })
  
  if (!blogPage) {
    return {
      title: 'Blog | Life Scientific',
      description: 'Explore our latest articles and insights',
    }
  }
  
  return {
    title: blogPage.seoTitle || blogPage.title || 'Blog | Life Scientific',
    description: blogPage.seoDescription || blogPage.description || 'Explore our latest articles and insights',
  }
}

export default async function BlogIndexPage({ params }: Props) {
  validateLanguage(params.lang)
  
  const client = createClient()
  
  // Get translations
  const translations = await getTranslations(params.lang)
  
  // Fetch blog page data from Sanity
  const blogPage = await client.fetch<BlogPage | null>(`
    *[_type == "blogPage" && language == $lang][0] {
      _id,
      title,
      subtitle,
      description,
      heroImage {
        asset->{
          _id,
          url
        },
        alt
      },
      postsPerPage,
      showAuthorBio,
      showCategoriesWidget,
      showRecentPostsWidget,
      showSubscribeWidget,
      subscribeFormTitle,
      subscribeFormText,
      "featuredPosts": featuredPosts[]-> {
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
  `, { lang: params.lang })
  
  // Fetch blog posts
  const posts = await client.fetch<BlogPost[]>(`
    *[_type == "blogPost" && language == $lang] | order(publishedAt desc) {
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
    }[0...${blogPage?.postsPerPage || 9}]
  `, { lang: params.lang })
  
  // Fetch categories
  const categories = await client.fetch<Category[]>(`
    *[_type == "category" && language == $lang] {
      _id,
      title,
      slug,
      color
    }
  `, { lang: params.lang })
  
  // Get recent posts for sidebar
  const recentPosts = posts.slice(0, 5)
  
  // Default values if blog page is not found
  const defaultTitle = 'Our Blog'
  const defaultSubtitle = 'Insights and updates from Life Scientific'
  
  // Check if we have a featured post
  const featuredPosts = blogPage?.featuredPosts || [];
  const hasFeaturedPost = featuredPosts.length > 0;
  const featuredPost = hasFeaturedPost ? featuredPosts[0] : null;
  const additionalFeaturedPosts = hasFeaturedPost ? featuredPosts.slice(1) : [];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Featured Post */}
      {featuredPost ? (
        <div className="relative bg-gradient-to-b from-teal-900 to-teal-700 text-white">
          <div className="absolute inset-0 opacity-20">
            {featuredPost.featuredImage && (
              <Image
                src={urlForImage(featuredPost.featuredImage)?.url() || ''}
                alt={featuredPost.featuredImage.alt || featuredPost.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
          <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="mb-4 inline-flex bg-teal-600/90 px-3 py-1 rounded-md text-sm font-medium">
                  Featured Post
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {featuredPost.title}
                </h1>
                <p className="text-xl text-teal-50 mb-6">
                  {featuredPost.excerpt}
                </p>
                <Button 
                  asChild
                  className="bg-white text-teal-800 hover:bg-teal-50"
                >
                  <a href={`/${params.lang}/blog/${featuredPost.slug.current}`}>
                    {translations.blog.readMore}
                  </a>
                </Button>
              </div>
              <div className="order-1 md:order-2">
                {featuredPost.featuredImage && (
                  <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl transform md:rotate-2 transition hover:rotate-0">
                    <Image
                      src={urlForImage(featuredPost.featuredImage)?.url() || ''}
                      alt={featuredPost.featuredImage.alt || featuredPost.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative bg-gradient-to-b from-teal-900 to-teal-700 text-white">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {blogPage?.title || defaultTitle}
              </h1>
              <p className="text-xl text-teal-50">
                {blogPage?.subtitle || defaultSubtitle}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-12">
        {/* Additional Featured Posts */}
        {additionalFeaturedPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Featured Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {additionalFeaturedPosts.map((post) => (
                <BlogCard 
                  key={post._id} 
                  post={post} 
                  lang={params.lang} 
                  featured
                  className="transform transition-transform hover:-translate-y-1 hover:shadow-lg"
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Latest Articles</h2>
            
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <BlogCard 
                      key={post._id} 
                      post={post} 
                      lang={params.lang} 
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    />
                  ))}
                </div>
                
                <div className="mt-12 flex justify-center">
                  <Button className="bg-teal-600 hover:bg-teal-700 px-8">
                    {translations.blog.loadMore}
                  </Button>
                </div>
              </>
            ) : (
              <div className="rounded-lg border border-gray-200 p-8 text-center bg-white">
                <p className="text-gray-600">{translations.blog.noResults}</p>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="sticky top-24">
              <BlogSidebar
                categories={categories}
                recentPosts={recentPosts}
                showCategories={blogPage?.showCategoriesWidget ?? true}
                showRecentPosts={blogPage?.showRecentPostsWidget ?? true}
                showSubscribe={blogPage?.showSubscribeWidget ?? true}
                subscribeTitle={blogPage?.subscribeFormTitle}
                subscribeText={blogPage?.subscribeFormText}
                lang={params.lang as LanguageCode}
                translations={translations}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 