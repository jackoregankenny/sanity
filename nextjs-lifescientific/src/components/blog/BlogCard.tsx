import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { urlForImage } from '@/lib/sanity.image'
import { BlogPost } from '@/types/sanity'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPost
  lang: string
  featured?: boolean
  className?: string
}

export function BlogCard({ post, lang, featured = false, className }: BlogCardProps) {
  // Format the date
  const formattedDate = post.publishedAt 
    ? format(new Date(post.publishedAt), 'MMM d, yyyy')
    : null

  // Get the first category for display
  const primaryCategory = post.categories && post.categories.length > 0 
    ? post.categories[0] 
    : null

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

  return (
    <Card 
      className={cn(
        'overflow-hidden transition-all duration-300 hover:shadow-md', 
        featured ? 'md:col-span-2 lg:col-span-3' : '',
        className
      )}
    >
      <div className="relative">
        <Link href={`/${lang}/blog/${post.slug.current}`}>
          <div className="relative aspect-video w-full overflow-hidden">
            {post.featuredImage ? (
              <Image
                src={urlForImage(post.featuredImage)?.url() || ''}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
        </Link>
        
        {primaryCategory && (
          <div className="absolute left-4 top-4 z-10">
            <Link href={`/${lang}/blog/category/${primaryCategory.slug.current}`}>
              <Badge className={`${getCategoryColorClass(primaryCategory.color)}`}>
                {primaryCategory.title}
              </Badge>
            </Link>
          </div>
        )}
      </div>

      <CardHeader className="p-4 pb-2">
        <Link href={`/${lang}/blog/${post.slug.current}`} className="group">
          <h3 className="line-clamp-2 text-xl font-semibold transition-colors group-hover:text-teal-600">
            {post.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        {post.excerpt && (
          <p className="line-clamp-3 text-sm text-gray-600">
            {post.excerpt}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            {post.author?.avatar ? (
              <AvatarImage 
                src={urlForImage(post.author.avatar)?.url() || ''} 
                alt={post.author.name} 
              />
            ) : (
              <AvatarFallback className="bg-teal-100 text-teal-800">
                <UserIcon className="h-4 w-4" />
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="text-xs font-medium">{post.author?.name || 'Unknown'}</p>
            {formattedDate && (
              <p className="text-xs text-gray-500">{formattedDate}</p>
            )}
          </div>
        </div>
        
        <Link 
          href={`/${lang}/blog/${post.slug.current}`}
          className="text-xs font-medium text-teal-600 hover:text-teal-800"
        >
          Read more
        </Link>
      </CardFooter>
    </Card>
  )
} 