# Landing Page Structure Guide

This document explains how the landing page structure works in our Sanity CMS integration.

## Key Concepts

1. **The landing page is modular** - it can contain one or more components
2. **Components are added via the Page Builder** in Sanity
3. **Each component is independent** but they are rendered in sequence

## How It Works

The landing page fetches data from Sanity using the following structure:

```
Page Document (slug: "landing")
│
└── pageBuilder (array of components)
    ├── Component 1 (e.g., Hero)
    ├── Component 2 (e.g., Features)
    ├── Component 3 (e.g., Products)
    └── ... and so on
```

### If you want ONLY the hero section:

If you only want the hero section on your landing page, you should:

1. Create a Page document in Sanity with slug "landing"
2. Add ONLY the Hero component to the Page Builder
3. Do not add any other components

When your Next.js app renders the page, it will only show the Hero section without any other components.

## Adding and Removing Components

### To add a component:

1. Edit your page in Sanity Studio
2. Click the "Add Item" button in the Page Builder field
3. Select the component type you want to add
4. Fill in the component's fields
5. Save and publish

### To remove a component:

1. Edit your page in Sanity Studio
2. Find the component in the Page Builder
3. Click the delete button (trash icon)
4. Save and publish

## Troubleshooting

### Problem: The page shows more components than expected

**Check in Sanity Studio:**
- Are there multiple components in the Page Builder?
- Did you accidentally add components you didn't intend to?

**Solution:** Remove any unwanted components from the Page Builder.

### Problem: Components appear in the wrong order

**Solution:** Drag and drop components in the Page Builder to reorder them.

## Important Notes

1. Each component has its own settings - changing one doesn't affect others
2. The overall page layout is determined by which components you add and in what order
3. If you want a minimal landing page, just add the components you need (even if it's just one)

For more details on each component, refer to the `SANITY-COMPONENTS.md` file. 