# Adding a New Component - Practical Example

This document provides a practical step-by-step example of adding a new component to the Life Scientific website. This example shows how to add a "Timeline" component that can be used on various pages, not just the landing page.

## Step 1: Define the Component Purpose and Structure

Before creating any files, let's define what our Timeline component will do:

- Display a chronological history of events with years, titles, descriptions, and optional images
- Support vertical layout with alternating left/right content
- Include translation support
- Follow the site's design system

## Step 2: Create the React Component

First, let's create the React component in the appropriate directory:

1. Create a new file at `nextjs-lifescientific/src/components/sections/timeline/TimelineSection.tsx`
2. Implement the component with TypeScript types and translation support:

```tsx
"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlForImage } from '@/lib/sanity.image'
import { useTranslations } from '@/hooks/useTranslations'

type TimelineEvent = {
  year: string
  title: string
  description?: string
  image?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
}

type TimelineSectionProps = {
  title: string
  subtitle?: string
  events: TimelineEvent[]
}

export function TimelineSection({ title, subtitle, events = [] }: TimelineSectionProps) {
  const { t } = useTranslations()
  
  if (!events || events.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title || t('timeline.defaultTitle')}</h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
          <div className="mt-10 p-8 bg-gray-100 rounded-lg max-w-3xl mx-auto">
            <p>{t('timeline.noEvents')}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#0f766e]"></div>

          {events.map((event, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex items-center mb-20 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                {index % 2 === 0 ? (
                  <>
                    <h3 className="text-2xl font-bold text-[#0f766e]">{event.year}</h3>
                    <h4 className="text-xl font-semibold mt-2">{event.title}</h4>
                    {event.description && (
                      <p className="mt-2 text-gray-600">{event.description}</p>
                    )}
                  </>
                ) : event.image && urlForImage(event.image) ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={urlForImage(event.image)!.url()}
                      alt={event.image.alt || event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>

              <div className="relative z-10">
                <div className="w-5 h-5 bg-[#0f766e] rounded-full border-4 border-white shadow-md"></div>
              </div>

              <div className={`w-1/2 ${index % 2 !== 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                {index % 2 !== 0 ? (
                  <>
                    <h3 className="text-2xl font-bold text-[#0f766e]">{event.year}</h3>
                    <h4 className="text-xl font-semibold mt-2">{event.title}</h4>
                    {event.description && (
                      <p className="mt-2 text-gray-600">{event.description}</p>
                    )}
                  </>
                ) : event.image && urlForImage(event.image) ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={urlForImage(event.image)!.url()}
                      alt={event.image.alt || event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## Step 3: Add TypeScript Type Definitions

Update the Sanity types in `nextjs-lifescientific/src/types/sanity.ts`:

```typescript
// Timeline Event Type
export interface TimelineEvent {
  year: string
  title: string
  description?: string
  image?: SanityImage
}

// Timeline Section Block
export interface TimelineSectionBlock {
  _type: 'timeline'
  _key: string
  title: string
  subtitle?: string
  events: TimelineEvent[]
}

// Add to the PageBuilderBlock union type
export type PageBuilderBlock = 
  | LandingHeroBlock
  | LandingFeaturesBlock
  // ... other existing blocks
  | TimelineSectionBlock
```

## Step 4: Create Translation Files

Add timeline-specific translations to your locale files:

```json
// locales/en.json
{
  "timeline": {
    "defaultTitle": "Our History",
    "noEvents": "No timeline events have been added yet.",
    "readMore": "Read more"
  }
}

// locales/fr.json
{
  "timeline": {
    "defaultTitle": "Notre Histoire",
    "noEvents": "Aucun événement n'a encore été ajouté à la chronologie.",
    "readMore": "Lire plus"
  }
}
```

## Step 5: Define the Sanity Schema

Create the schema definition in `studio-lifescientific/schemaTypes/blocks/timelineBlock.ts`:

```typescript
import { defineField, defineType, defineArrayMember } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const timelineBlock = defineType({
  name: 'timeline',
  title: 'Timeline Section',
  type: 'object',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Our History',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Key milestones in our journey',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'events',
      title: 'Timeline Events',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'year',
              title: 'Year',
              type: 'string',
              validation: Rule => Rule.required(),
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }),
            defineField({
              name: 'title',
              title: 'Event Title',
              type: 'string',
              validation: Rule => Rule.required(),
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }),
            defineField({
              name: 'description',
              title: 'Event Description',
              type: 'text',
              rows: 3,
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }),
            defineField({
              name: 'image',
              title: 'Event Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'year',
              media: 'image',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Event',
                subtitle: subtitle || '',
                media: media,
              }
            },
          },
        }),
      ],
      validation: Rule => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eventsCount: 'events.length',
    },
    prepare({ title, eventsCount = 0 }) {
      return {
        title: `Timeline: ${title}`,
        subtitle: `${eventsCount} event${eventsCount === 1 ? '' : 's'}`,
      }
    },
  },
})
```

## Step 6: Export the Schema

Import and export your new schema in the main schema file:

1. Add to `studio-lifescientific/schemaTypes/index.ts`:

```typescript
import { timelineBlock } from './blocks/timelineBlock'

export const schemaTypes = [
  // ...existing schemas
  timelineBlock,
]
```

2. Add to the page schema in `studio-lifescientific/schemaTypes/page.ts`:

```typescript
// In the pageBuilder field
defineField({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    // ...existing block types
    { type: 'timeline' }, // Add your new component type
  ],
})
```

## Step 7: Update the Page Component

Update `nextjs-lifescientific/src/app/[lang]/page.tsx` to handle the new component:

1. Import the component:

```typescript
import { TimelineSection } from "@/components/sections/timeline/TimelineSection"
```

2. Add to the component map:

```typescript
const componentMap: Record<string, React.ComponentType<any>> = {
  // ...existing components
  timeline: TimelineSection,
}
```

3. Update the query to include timeline fields:

```typescript
const query = `*[_type == "page" && slug.current == "landing" && language == $lang][0]{
  // ...existing fields
  pageBuilder[]{
    // ...existing fields
    events[] {
      year,
      title,
      description,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    },
  }
}`
```

4. Add a case handler for your component:

```typescript
case 'timeline':
  return (
    <TimelineSection
      key={block._key}
      title={block.title}
      subtitle={block.subtitle}
      events={block.events || []}
    />
  )
```

## Step 8: Restart Sanity Studio and Test

1. Restart your Sanity Studio server to load the new schema
2. Add the Timeline component to a page
3. Add some timeline events
4. Publish the page and view it in your Next.js frontend

## Using the Component on Other Pages

This component can now be used on any page, not just the landing page. To use it on other pages:

1. Add the Timeline section to the page builder of any page in Sanity Studio
2. The component will automatically be rendered using the same case statement logic in your page components

This pattern can be followed for any new component you want to add to the project! 