'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'
import { BlogPost, Category } from '@/types/sanity'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LanguageCode } from '@/hooks/useTranslations'

interface BlogSidebarProps {
  categories?: Category[]
  recentPosts?: BlogPost[]
  showCategories?: boolean
  showRecentPosts?: boolean
  showSubscribe?: boolean
  subscribeTitle?: string
  subscribeText?: string
  lang: LanguageCode
  translations: {
    blog: {
      categories: string
      recentPosts: string
      readMore: string
      relatedPosts: string
      subscribe: string
      emailPlaceholder: string
      searchPlaceholder: string
      noResults: string
      authorBy: string
      publishedOn: string
      backToList: string
      loadMore: string
    }
    common: {
      newsletter: {
        title: string
        description: string
        buttonText: string
        placeholder: string
        successMessage: string
        errorMessage: string
      }
    }
  }
}

export function BlogSidebar({
  categories = [],
  recentPosts = [],
  showCategories = true,
  showRecentPosts = true,
  showSubscribe = true,
  subscribeTitle,
  subscribeText,
  lang,
  translations
}: BlogSidebarProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [email, setEmail] = useState('');
  
  // Get color class based on category color
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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setSubmitSuccess(false);
    setSubmitError(false);
    
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call to newsletter service
      await new Promise(r => setTimeout(r, 1000));
      
      // Add hidden locale field value
      const formData = {
        email,
        locale: lang
      };
      
      console.log('Newsletter subscription:', formData);
      
      // On success
      setSubmitSuccess(true);
      setEmail('');
    } catch (error) {
      // On error
      setSubmitError(true);
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Categories Widget */}
      {showCategories && categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {translations.blog.categories}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link 
                  key={category._id} 
                  href={`/${lang}/blog/category/${category.slug.current}`}
                >
                  <Badge className={`${getCategoryColorClass(category.color)}`}>
                    {category.title}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Posts Widget */}
      {showRecentPosts && recentPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {translations.blog.recentPosts}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post._id} className="flex gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    {post.featuredImage ? (
                      <Image
                        src={urlForImage(post.featuredImage)?.url() || ''}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100">
                        <span className="text-xs text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <Link 
                      href={`/${lang}/blog/${post.slug.current}`}
                      className="line-clamp-2 text-sm font-medium hover:text-teal-600"
                    >
                      {post.title}
                    </Link>
                    {post.publishedAt && (
                      <p className="text-xs text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subscribe Widget */}
      {showSubscribe && (
        <Card className="bg-gradient-to-br from-teal-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {subscribeTitle || translations.common.newsletter.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600">
              {subscribeText || translations.common.newsletter.description}
            </p>
            
            {submitSuccess ? (
              <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
                {translations.common.newsletter.successMessage}
              </div>
            ) : submitError ? (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                {translations.common.newsletter.errorMessage}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <Input 
                  type="email" 
                  placeholder={translations.common.newsletter.placeholder} 
                  required 
                  className="bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : translations.common.newsletter.buttonText}
                </Button>
                <input type="hidden" name="locale" value={lang} />
              </form>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 