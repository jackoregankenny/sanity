# Quick Guide: Creating Pages & Navigation

## Creating a New Page

1. **In Sanity Studio:**
   - Go to "Pages"
   - Click "Create new document"
   - Select language (start with English)
   - Fill in required fields:
     - Title
     - Slug (auto-generated from title)
     - Page Builder sections

2. **Page Types:**
   - Standard Page: Use `page` type with component blocks
   - Blog Page: Use `blogPage` type with blog-specific components
   - Landing Page: Use `landingPage` type with landing-specific blocks

## Adding to Navigation

1. **Update Translations Document:**
   - Go to "Site Translations" in Sanity Studio
   - Find the Navigation section
   - Add new navigation item text for each language

2. **Update Navigation Schema:**
   - Add new link to `navigation` schema if it's a main section
   - Example: Adding "About" page
   ```typescript
   {
     name: 'about',
     type: 'object',
     fields: [
       {
         name: 'title',
         type: 'string'
       },
       {
         name: 'slug',
         type: 'string'
       }
     ]
   }
   ```

3. **Create Language Variants:**
   - Create page variants for each supported language
   - Use "Copy from English" feature
   - Update translations using AI Assist
   - Set translation status

## Best Practices

1. **Page Organization:**
   - Use meaningful slugs
   - Group related pages
   - Maintain consistent structure
   - Use appropriate components

2. **Navigation:**
   - Keep it simple and clear
   - Use consistent naming
   - Consider mobile view
   - Test all language variants

3. **SEO:**
   - Add SEO titles and descriptions
   - Use proper heading hierarchy
   - Include alt text for images
   - Set proper meta tags

4. **Translation:**
   - Start with English content
   - Use AI Assist for initial translation
   - Review translations
   - Keep versions synchronized

## Common Components

Available components for pages:
- Hero
- Features
- Content Block
- Gallery
- Video
- Call to Action
- Newsletter
- Timeline
- Contact Form

## Testing New Pages

1. **In Sanity Studio:**
   - Preview in all languages
   - Check responsive views
   - Verify all components
   - Test navigation links

2. **In Production:**
   - Test page loading
   - Verify SEO elements
   - Check analytics tracking
   - Monitor performance

## Troubleshooting

1. **Page Not Showing:**
   - Verify slug is correct
   - Check language setting
   - Confirm page is published
   - Clear cache if needed

2. **Navigation Issues:**
   - Check translations document
   - Verify slug matches
   - Clear browser cache
   - Check mobile menu

## Need Help?

Contact:
- Content Team: content@lifescientific.com
- Technical Support: support@lifescientific.com 