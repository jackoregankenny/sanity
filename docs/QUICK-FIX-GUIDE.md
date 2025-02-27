# Quick Fix Guide for Sanity Integration

You're experiencing two main issues with your Sanity integration:

1. The environment variable for your Sanity project ID isn't being loaded correctly
2. The landing page is showing all components even though you only want the hero section

## Fix 1: Set Up Your Environment Variables

The error `Dataset not found - Dataset "production" not found for project ID "placeholder-project-id"` is happening because your Next.js app can't find your Sanity project ID.

1. Create a `.env.local` file in your Next.js app root directory:

```bash
touch nextjs-lifescientific/.env.local
```

2. Add your actual Sanity project ID to this file:

```
NEXT_PUBLIC_SANITY_PROJECT_ID="your-actual-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2023-07-01"
```

You can find your project ID in your Sanity Studio's `sanity.config.ts` file.

3. Restart your Next.js app:

```bash
cd nextjs-lifescientific
npm run dev
```

## Fix 2: Set Up Your Landing Page in Sanity

To have a landing page with only the hero section:

1. Go to your Sanity Studio running at `localhost:3333`
2. Create a new "Page" document or edit the existing one
3. Make sure:
   - The title is set to "Landing Page" 
   - The slug is set to "landing"
   - The language matches what you're testing (e.g., "en")
4. In the Page Builder field:
   - **Remove any components you don't want**
   - Keep only the Hero component
   - Fill in the hero's fields (title, subtitle, etc.)
5. Save and publish

Now your Next.js app should display only the hero component when you visit `localhost:3000/en`.

## Understanding the Component System

Our landing page is built with a modular component system:

- The landing page is a container that pulls content from Sanity
- You decide which components appear by adding them to the Page Builder in Sanity
- Components are rendered in the order they appear in the Page Builder
- If you want only the hero, add only the hero to the Page Builder

See the `LANDING-PAGE-GUIDE.md` and `SANITY-COMPONENTS.md` files for more detailed documentation.

## Troubleshooting

If you're still experiencing issues:

1. **Check the browser console** for error messages
2. **Verify your Sanity project ID** is correctly set in `.env.local`
3. **Confirm your page document in Sanity** has the correct slug ("landing") and language
4. **Check the Page Builder** in Sanity to ensure only the components you want are added
5. **Restart both your Next.js app and Sanity Studio** after making changes

For development, we've added better error messages that will guide you through any issues. 