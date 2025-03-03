# Adding New Components Guide

This guide explains the step-by-step process for adding new components to the Life Scientific website, which uses Sanity as a CMS and Next.js for the frontend.

## Overview

The website is built with a component-based architecture where:
1. Components are defined in the Sanity schema
2. Content editors can add and arrange these components in the Sanity Studio
3. The Next.js frontend renders these components based on the data from Sanity

## Complete Process for Adding a New Component

### Step 1: Define the Sanity Schema

First, create the schema definition for your component in `studio-lifescientific/schemaTypes/blocks/landingPageBlocks.ts`:

```typescript
// Example: Add a Timeline Component
export const landingTimelineBlock = defineType({
  name: 'landingTimeline',  // This is the internal type name
  title: 'Timeline Section', // This appears in the Sanity Studio UI
  type: 'object',
  icon: ClockIcon, // Use an appropriate icon from @sanity/icons
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Our History',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Key milestones in our journey',
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
            }),
            defineField({
              name: 'title',
              title: 'Event Title',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Event Description',
              type: 'text',
              rows: 3,
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

### Step 2: Export the New Component

After defining your component schema, add it to the exported array at the end of the `landingPageBlocks.ts` file:

```typescript
// Export all landing page blocks
export const landingPageBlocks = [
  landingHeroBlock,
  landingFeaturesBlock,
  landingProductsBlock,
  landingResearchBlock,
  landingAboutBlock,
  landingTestimonialsBlock,
  landingStatsBlock,
  landingValuesBlock,
  landingContactBlock,
  landingFAQBlock,
  landingPartnersBlock,
  landingTimelineBlock, // Add your new component here
]
```

### Step 3: Add the Component to the Page Schema

Update the `studio-lifescientific/schemaTypes/page.ts` file to include your new component type in the page builder array:

```typescript
defineField({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  group: 'content',
  of: [
    // Landing Page Sections
    { type: 'landingHero' },
    { type: 'landingFeatures' },
    { type: 'landingProducts' },
    { type: 'landingResearch' },
    { type: 'landingAbout' },
    { type: 'landingTestimonials' },
    { type: 'landingContact' },
    { type: 'landingFAQ' },
    { type: 'landingPartners' },
    { type: 'landingTimeline' }, // Add your new component here
    
    // Standard Page Blocks
    // ...
  ],
  validation: Rule => Rule.required().min(1)
})
```

### Step 4: Create the React Component

Create a new file for your React component in `nextjs-lifescientific/src/components/landing/`:

```tsx
// nextjs-lifescientific/src/components/landing/TimelineSection.tsx
import React from 'react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity.image'

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

export function TimelineSection({ title, subtitle, events }: TimelineSectionProps) {
  if (!events || events.length === 0) {
    return null
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
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-500"></div>

          {events.map((event, index) => (
            <div 
              key={index} 
              className={`flex items-center mb-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className="w-1/2 pr-8 text-right">
                {index % 2 === 0 ? (
                  <>
                    <h3 className="text-2xl font-bold text-blue-600">{event.year}</h3>
                    <h4 className="text-xl font-semibold mt-2">{event.title}</h4>
                    {event.description && (
                      <p className="mt-2 text-gray-600">{event.description}</p>
                    )}
                  </>
                ) : event.image && urlForImage(event.image) ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={urlForImage(event.image)!.url()}
                      alt={event.image.alt || event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>

              <div className="relative">
                <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
              </div>

              <div className="w-1/2 pl-8">
                {index % 2 !== 0 ? (
                  <>
                    <h3 className="text-2xl font-bold text-blue-600">{event.year}</h3>
                    <h4 className="text-xl font-semibold mt-2">{event.title}</h4>
                    {event.description && (
                      <p className="mt-2 text-gray-600">{event.description}</p>
                    )}
                  </>
                ) : event.image && urlForImage(event.image) ? (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={urlForImage(event.image)!.url()}
                      alt={event.image.alt || event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Step 5: Update TypeScript Types (Optional but Recommended)

If you have TypeScript types for your Sanity data, update them in `nextjs-lifescientific/src/types/sanity.ts`:

```typescript
// Define your new component interface
export interface TimelineEvent {
  year: string
  title: string
  description?: string
  image?: SanityImage
}

export interface LandingTimelineBlock {
  _type: 'landingTimeline'
  _key: string
  title: string
  subtitle?: string
  events: TimelineEvent[]
}

// Add to the PageBuilderBlock union type
export type PageBuilderBlock = 
  | LandingHeroBlock
  | LandingFeaturesBlock
  | LandingProductsBlock
  | LandingResearchBlock
  | LandingAboutBlock
  | LandingTestimonialsBlock
  | LandingContactBlock
  | LandingFAQBlock
  | LandingPartnersBlock
  | LandingTimelineBlock // Add your new component type
```

### Step 6: Update the Page Component

Add your new component to the page.tsx file by:

1. First, importing your component:

```typescript
import { TimelineSection } from "@/components/landing/TimelineSection"
```

2. Add the component to the componentMap:

```typescript
const componentMap: Record<string, React.ComponentType<any>> = {
  landingHero: MinimalHero,
  landingFeatures: FeaturesSection,
  landingProducts: ProductsSection, 
  landingResearch: ResearchSection,
  landingTestimonials: TestimonialsSection,
  landingAbout: AboutSection,
  landingContact: ContactSection,
  landingFAQ: FAQSection,
  landingPartners: PartnersSection,
  landingTimeline: TimelineSection, // Add your new component here
}
```

3. Update the query to include fields for your component:

```typescript
// Add your component's fields to the query
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
```

4. Add a case handler for your component:

```typescript
case 'landingTimeline':
  return (
    <TimelineSection
      key={block._key}
      title={block.title}
      subtitle={block.subtitle}
      events={block.events || []}
    />
  )
```

### Step 7: Restart Sanity Studio

After making all these changes, restart your Sanity Studio to see the new component in the page builder:

```bash
cd studio-lifescientific
npm run dev
```

## Testing Your New Component

1. Go to Sanity Studio and open or create a page
2. Add your new component using the page builder
3. Fill in the required fields
4. Publish the page
5. View the page in your Next.js frontend to ensure the component renders correctly

## Best Practices

1. **Provide Default Values**: Always use `initialValue` for important fields to guide content editors
2. **Add Validation**: Use `validation` rules to ensure content quality
3. **Make Preview Useful**: Configure a helpful preview to make the component easy to identify in the Studio
4. **Handle Missing Data**: Always handle cases where data might be missing in your React component
5. **Responsive Design**: Ensure your component looks good on all device sizes
6. **Match Design System**: Follow the project's design system for consistency
7. **Write Documentation**: Document your component's purpose and required fields

By following this guide, you can add new components to the Life Scientific website that are both easy for content editors to use and provide a great experience for end users. 