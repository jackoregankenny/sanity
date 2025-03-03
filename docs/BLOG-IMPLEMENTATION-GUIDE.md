# Blog Implementation Guide for Life Scientific

This guide explains how the blog functionality is implemented in the Life Scientific website, including the Sanity CMS setup and the Next.js frontend components.

## Table of Contents

1. [Overview](#overview)
2. [Sanity Schema](#sanity-schema)
3. [Next.js Components](#nextjs-components)
4. [Multilingual Support](#multilingual-support)
5. [Styling and UI](#styling-and-ui)
6. [Adding New Blog Posts](#adding-new-blog-posts)
7. [Customization Options](#customization-options)

## Overview

The blog implementation consists of:

- **Sanity Schema**: Defines the content structure for blog posts, categories, authors, and blog page settings
- **Next.js Components**: Renders the blog content with a responsive, accessible UI
- **Multilingual Support**: All blog content can be translated into multiple languages
- **Styling**: Matches the teal and rounded aesthetic of the rest of the site

## Sanity Schema

The blog functionality is built on four main schema types:

### 1. Blog Post (`blogPost.ts`)

The core content type for individual blog articles:

- **Title & Slug**: For identification and URL generation
- **Author**: Reference to an author document
- **Categories**: References to category documents
- **Content**: Rich text editor with support for images, code blocks, and formatting
- **Featured Image**: Main image displayed in listings and at the top of the post
- **Metadata**: Publication date, excerpt, SEO fields
- **Related Posts**: References to other blog posts

### 2. Category (`category.ts`)

Used to organize blog posts by topic:

- **Title & Slug**: For identification and URL generation
- **Description**: Short text explaining the category
- **Color**: Visual identifier (teal, green, blue, etc.)
- **Featured Image**: Optional image representing the category

### 3. Author (`author.ts`)

Represents content creators:

- **Name & Slug**: For identification and URL generation
- **Avatar**: Profile image
- **Bio**: Rich text description
- **Role**: Position or title
- **Contact**: Email and social media links

### 4. Blog Page (`blogPage.ts`)

Configures the blog landing page:

- **Title & Subtitle**: Main headings
- **Description**: Introductory text
- **Hero Image**: Optional banner image
- **Featured Posts**: Curated selection of posts to highlight
- **Settings**: Controls for sidebar widgets, posts per page, etc.
- **Subscribe Form**: Customizable newsletter signup

## Next.js Components

The blog is implemented with the following components:

### Pages

- **Blog Index** (`/src/app/[lang]/blog/page.tsx`): Lists all blog posts with featured posts section
- **Blog Post** (`/src/app/[lang]/blog/[slug]/page.tsx`): Displays a single blog post with related content
- **Category Page** (`/src/app/[lang]/blog/category/[slug]/page.tsx`): Shows posts filtered by category

### Components

- **BlogCard** (`/src/components/blog/BlogCard.tsx`): Card component for displaying blog post previews
- **BlogSidebar** (`/src/components/blog/BlogSidebar.tsx`): Sidebar with categories, recent posts, and subscribe form
- **UI Components**: Reusable UI elements like Avatar, Badge, Card, etc.

## Multilingual Support

The blog fully supports multiple languages:

- Each content type includes a `language` field to identify the language
- Translation tracking fields help manage content across languages
- The URL structure includes the language code: `/{lang}/blog/...`
- Custom hooks (`useBlogTranslations`) provide translated UI strings

## Styling and UI

The blog follows the site's design system:

- **Color Scheme**: Primarily uses teal as the accent color
- **Typography**: Consistent with the rest of the site
- **Components**: Rounded corners, subtle shadows, and clean layouts
- **Responsive Design**: Adapts to all screen sizes

## Adding New Blog Posts

To add a new blog post:

1. In Sanity Studio, go to "Blog Posts" and click "Create new"
2. Fill in the required fields (title, slug, content)
3. Add a featured image, select categories, and assign an author
4. Set the publication date
5. Add SEO metadata if needed
6. Publish the post

For multilingual content, create a separate post for each language and link them using the translation references.

## Customization Options

The blog implementation offers several customization options:

### Blog Page Settings

In Sanity Studio, edit the "Blog Page" document to:

- Change the title, subtitle, and description
- Select featured posts
- Toggle sidebar widgets (categories, recent posts, subscribe form)
- Customize the subscribe form text
- Set the number of posts per page

### Category Colors

Each category can have its own color, which is used for badges and category headers. Available colors:

- Teal (default)
- Green
- Blue
- Purple
- Red
- Orange
- Yellow
- Gray

### Author Profiles

Author profiles can include:

- Avatar image
- Biographical information
- Role/position
- Social media links

## Technical Details

### Data Fetching

The blog uses Sanity's GROQ queries to fetch data:

- Optimized queries to minimize data transfer
- References are expanded to include necessary fields
- Pagination is implemented for post listings

### SEO

Each page includes:

- Dynamic metadata based on content
- OpenGraph images for social sharing
- Proper heading structure
- Semantic HTML

### Performance

Performance optimizations include:

- Image optimization with Next.js Image component
- Lazy loading of images
- Pagination to limit initial load
- Static metadata generation 