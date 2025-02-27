# Sanity CMS Integration for Landing Page

This document guides you through setting up the Sanity CMS integration for the landing page.

## Prerequisites

1. Sanity Studio running on `localhost:3333`
2. Next.js app running on `localhost:3000`
3. A Sanity project with the schemas we've created

## Setup Steps

### 1. Install Required Dependencies

```bash
# In the Next.js app directory
npm install next-sanity @sanity/image-url
```

### 2. Configure Environment Variables

Create a `.env.local` file in the Next.js app directory:

```bash
cp .env.local.example .env.local
```

Edit the `.env.local` file to include your actual Sanity project ID:

```
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2023-07-01"
```

You can find your project ID in the Sanity Studio's `sanity.config.ts` file.

### 3. Configure CORS in Sanity

Allow your Next.js app to fetch data from Sanity by adding it to the CORS origins:

```bash
# In the Sanity Studio directory
npx sanity cors add http://localhost:3000
```

If you have a production URL, add that as well.

### 4. Create the Landing Page in Sanity

#### Method 1: Manual Creation

1. Start your Sanity Studio (`npm run dev` in studio directory)
2. Go to `http://localhost:3333`
3. Create a new "Page" document
4. Set the title to "Landing Page"
5. Set the slug to "landing"
6. Choose your language (e.g., "en")
7. Use the Page Builder to add landing page sections in any order
8. Fill in the content for each section
9. Publish the document

#### Method 2: Using the Seed Script

1. Generate a write token in Sanity:
   - Go to your [Sanity project dashboard](https://www.sanity.io/manage)
   - Navigate to API > Tokens
   - Create a new token with Editor permissions
   
2. Create a `.env` file in the Sanity Studio directory:
   ```
   SANITY_STUDIO_PROJECT_ID=your_project_id
   SANITY_STUDIO_DATASET=production
   SANITY_STUDIO_WRITE_TOKEN=your_write_token
   ```

3. Run the seed script:
   ```bash
   # In the studio-lifescientific directory
   npm install @sanity/client dotenv
   node scripts/createLandingPage.js
   ```

### 5. View the Landing Page

1. Start your Next.js app (`npm run dev` in the Next.js directory)
2. Go to `http://localhost:3000/en` (or another language code)
3. You should see your landing page rendered with data from Sanity

## Component Documentation

A comprehensive guide to all available landing page components is available in the `SANITY-COMPONENTS.md` file. This documentation includes:

- Purpose and function of each component
- All available fields for each component
- Visual previews of component layouts
- Instructions for creating new components

**Please refer to this documentation when adding or editing landing page content.**

## Working with Products

The Products section component automatically pulls and displays products from your Sanity CMS. For this to work properly:

1. Ensure your product schema in Sanity includes the following fields:
   - `name` (string)
   - `slug` (slug)
   - `category` (string)
   - `tagline` or `shortDescription` (string)
   - `productImage` (image)

2. Add a "Landing Products" section to your page in Sanity Studio
   - Set the title and subtitle
   - Select your products from the product reference field

3. The component will automatically:
   - Display product images with proper optimization
   - Link to individual product pages
   - Show category tags
   - Display a placeholder when no products are selected

## Creating Translations

1. Create additional page documents with the same "landing" slug but different language settings
2. Use Sanity's AI translation tools by clicking the "AI Assist" button for each field

## Troubleshooting

- **If images aren't displaying**: Check that you've properly uploaded images to Sanity and that the `urlForImage` helper is correctly implemented.
- **If data isn't loading**: Check your browser console for errors and verify your CORS settings in Sanity. Make sure your environment variables are set correctly in `.env.local`.
- **If page returns 404**: Make sure the language parameter is valid and that you've created a page document with the correct slug ("landing").
- **If you see "Configuration must contain projectId" error**: Double-check your `.env.local` file and make sure it contains the correct `NEXT_PUBLIC_SANITY_PROJECT_ID` value.

## Next Steps

- Consider implementing preview mode to view drafts
- Set up incremental static regeneration for better performance
- Add more component types to the page builder
- Implement SEO metadata from Sanity 