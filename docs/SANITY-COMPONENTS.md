# Sanity CMS Component Documentation

This document provides a comprehensive guide to the page builder components available in our Sanity CMS integration. Each component is explained with its purpose, fields, and usage examples.

## Available Components

1. [Landing Hero](#landing-hero)
2. [Landing Features](#landing-features)
3. [Landing Products](#landing-products)
4. [Landing Research](#landing-research)
5. [Landing About](#landing-about)
6. [Landing Testimonials](#landing-testimonials)
7. [Landing Contact](#landing-contact)

## How to Add a New Component

Adding a new component involves three steps:

1. **Create a schema in `studio-lifescientific/schemas`**
2. **Add the schema to the page builder array in `page.ts`**
3. **Create a React component in `nextjs-lifescientific/src/components/landing`**

See the [Adding New Components](#adding-new-components) section for a detailed guide.

---

## Component Details

### Landing Hero
<a id="landing-hero"></a>

**Purpose**: Main hero section at the top of the landing page.

**Fields**:
- `title` (Text) - Main headline
- `subtitle` (Text) - Supporting text below the headline
- `ctaText` (Text) - Primary call-to-action button text
- `secondaryCtaText` (Text) - Secondary button text
- `image` (Image) - Optional background image

**Preview**:
```
+-----------------------------------------+
|                                         |
|  [OPTIONAL IMAGE BACKGROUND]            |
|                                         |
|  Title                                  |
|  Subtitle                               |
|                                         |
|  [CTA Button] [Secondary Button]        |
|                                         |
+-----------------------------------------+
```

---

### Landing Features
<a id="landing-features"></a>

**Purpose**: Showcase key features or benefits of your products/services.

**Fields**:
- `title` (Text) - Section heading
- `subtitle` (Text) - Supporting text for the section
- `features` (Array) - List of feature items, each with:
  - `title` (Text) - Feature name
  - `description` (Text) - Feature description
  - `icon` (String) - Icon identifier (`leaf`, `flask`, `shield`, `globe`, `star`, `chart`)

**Preview**:
```
+-----------------------------------------+
|  Title                                  |
|  Subtitle                               |
|                                         |
|  +-------+  +-------+  +-------+        |
|  | Icon  |  | Icon  |  | Icon  |        |
|  | Title |  | Title |  | Title |        |
|  | Desc  |  | Desc  |  | Desc  |        |
|  +-------+  +-------+  +-------+        |
|                                         |
+-----------------------------------------+
```

---

### Landing Products
<a id="landing-products"></a>

**Purpose**: Display featured products from your product catalog.

**Fields**:
- `title` (Text) - Section heading
- `subtitle` (Text) - Supporting text for the section
- `products` (References) - References to product documents

**Important Notes**:
- Products are pulled from your Sanity product schema
- Each product should have a name, slug, category, and productImage
- This component automatically links to your product detail pages

**Preview**:
```
+-----------------------------------------+
|  Title                                  |
|  Subtitle                               |
|                                         |
|  +-------+  +-------+  +-------+        |
|  | Img   |  | Img   |  | Img   |        |
|  | Name  |  | Name  |  | Name  |        |
|  | Desc  |  | Desc  |  | Desc  |        |
|  | Link  |  | Link  |  | Link  |        |
|  +-------+  +-------+  +-------+        |
|                                         |
+-----------------------------------------+
```

---

### Landing Research
<a id="landing-research"></a>

**Purpose**: Showcase research data, statistics, or other numerical information.

**Fields**:
- `title` (Text) - Section heading
- `subtitle` (Text) - Supporting text for the section
- `description` (Text) - Detailed paragraph about your research
- `stats` (Array) - List of statistical data points, each with:
  - `value` (Text) - The numeric or text value (e.g., "98%")
  - `label` (Text) - Description of the value (e.g., "Success Rate")
- `image` (Image) - Optional section image

**Preview**:
```
+-----------------------------------------+
|  Title                                  |
|  Subtitle                               |
|                                         |
|  Description text...                    |
|                                         |
|  +-------+  +-------+  +-------+        |
|  | 98%   |  | 15+   |  | 40+   |        |
|  | Rate  |  | Years |  | Tests |        |
|  +-------+  +-------+  +-------+        |
|                                         |
|  [Optional Image]                       |
+-----------------------------------------+
```

---

### Landing About
<a id="landing-about"></a>

**Purpose**: Describe your company, mission, or values.

**Fields**:
- `title` (Text) - Section heading
- `subtitle` (Text) - Supporting text for the section
- `description` (Text) - Detailed paragraph about your company
- `values` (Array) - List of company values or principles
- `image` (Image) - Optional profile or team image

**Preview**:
```
+-----------------------------------------+
|  Title                                  |
|  Subtitle                               |
|                                         |
|  [Image]       Description text...      |
|                                         |
|                Values:                  |
|                • Value 1                |
|                • Value 2                |
|                • Value 3                |
|                                         |
+-----------------------------------------+
```

---

### Landing Testimonials
<a id="landing-testimonials"></a>

**Purpose**: Display customer testimonials or reviews.

**Fields**:
- `title` (Text) - Section heading
- `subtitle` (Text) - Supporting text for the section
- `testimonials` (Array) - List of testimonial items, each with:
  - `content` (Text) - The testimonial text
  - `author` (Text) - Name of the person
  - `role` (Text) - Job title or role
  - `company` (Text) - Company name
  - `rating` (Number) - Optional star rating (1-5)
  - `avatar` (Image) - Optional profile picture

**Preview**:
```
+-----------------------------------------+
|  Title                                  |
|  Subtitle                               |
|                                         |
|  +---------------+  +---------------+   |
|  | "Quote..."    |  | "Quote..."    |   |
|  |               |  |               |   |
|  | [Img] Name    |  | [Img] Name    |   |
|  | Role, Company |  | Role, Company |   |
|  | ★★★★★         |  | ★★★★☆         |   |
|  +---------------+  +---------------+   |
|                                         |
+-----------------------------------------+
```

---

### Landing Contact
<a id="landing-contact"></a>

**Purpose**: Provide contact information and possibly a contact form.

**Fields**:
- `title` (Text) - Section heading
- `subtitle` (Text) - Supporting text for the section
- `ctaText` (Text) - Button text for the contact form
- `email` (Text) - Contact email address
- `phone` (Text) - Contact phone number
- `formFields` (Array) - Optional custom form fields, each with:
  - `name` (Text) - Field name/ID
  - `label` (Text) - Field label
  - `type` (String) - Field type (`text`, `email`, `textarea`, `select`)
  - `required` (Boolean) - Whether the field is required

**Preview**:
```
+-----------------------------------------+
|  Title                                  |
|  Subtitle                               |
|                                         |
|  +---------------+  +---------------+   |
|  | Contact Info  |  | Form          |   |
|  | Email: xxx    |  | [Name]        |   |
|  | Phone: xxx    |  | [Email]       |   |
|  |               |  | [Message]     |   |
|  |               |  |               |   |
|  |               |  | [Submit]      |   |
|  +---------------+  +---------------+   |
|                                         |
+-----------------------------------------+
```

---

## Adding New Components
<a id="adding-new-components"></a>

### Step 1: Create a Schema

In `studio-lifescientific/schemas`, create a new file for your component:

```javascript
// myNewComponent.js
export default {
  name: 'landingMyNewComponent',
  title: 'My New Component',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    // Add more fields as needed
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'My New Component',
        subtitle: 'Landing Page Section',
      }
    },
  },
}
```

### Step 2: Add to Page Builder

In `studio-lifescientific/schemas/documents/page.ts`, add your component to the page builder array:

```javascript
pageBuilder: {
  title: 'Page Builder',
  name: 'pageBuilder',
  type: 'array',
  of: [
    { type: 'landingHero' },
    // ... other components
    { type: 'landingMyNewComponent' }, // Add your new component here
  ],
},
```

### Step 3: Create the React Component

In `nextjs-lifescientific/src/components/landing`, create a new file for your component:

```jsx
// MyNewComponent.tsx
import { SanityImage } from '@/types/sanity'
import { urlForImage } from '@/lib/sanity.image'
import Image from 'next/image'

interface MyNewComponentProps {
  title: string
  // Add more props as needed
  image?: SanityImage
}

export function MyNewComponent({
  title,
  // Add more props
  image
}: MyNewComponentProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        {/* Add your component JSX */}
        {image && urlForImage(image) && (
          <div className="relative w-full aspect-video">
            <Image
              src={urlForImage(image)!.url()}
              alt={image.alt || title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </section>
  )
}
```

### Step 4: Update Type Definitions

In `nextjs-lifescientific/src/types/sanity.ts`, add your new component interface:

```typescript
// Define your new component interface
export interface MyNewComponentBlock {
  _type: 'landingMyNewComponent'
  _key: string
  title: string
  // Add more properties
}

// Add to the PageBuilderBlock union type
export type PageBuilderBlock = 
  | LandingHeroBlock
  | LandingFeaturesBlock
  // ...other types
  | MyNewComponentBlock // Add your new component type
```

### Step 5: Update Page Component

In your page component, add the new component to the rendering logic:

```jsx
{block._type === 'landingMyNewComponent' && (
  <MyNewComponent 
    key={block._key}
    title={block.title}
    // Pass other props
  />
)}
```

## Best Practices

1. **Use Descriptive Names**: Name your components clearly to reflect their purpose
2. **Provide Defaults**: Always include sensible defaults for optional fields
3. **Include Preview Config**: Make sure your schema has a good preview configuration
4. **Document New Components**: Add documentation for any new components you create
5. **Keep Components Focused**: Each component should have a single, clear purpose 