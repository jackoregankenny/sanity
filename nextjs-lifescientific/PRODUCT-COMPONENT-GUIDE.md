# Products Section Guide

This document explains how to use the Products Section component in the landing page.

## Overview

The Products Section displays your featured products in a visually appealing grid layout. Each product is presented as a card with its image, name, category, tagline, and description.

## How to Add Products to Your Landing Page

1. **Create Products First**: 
   - Before using the Products Section, you must create products in Sanity
   - Go to the "Products" section in Sanity Studio
   - Create products with all required fields
   - Make sure they have the same language as your landing page

2. **Add a Products Section to Your Page Builder**:
   - Edit your landing page
   - Add a "Products Section" component to the Page Builder
   - Fill in the section title and subtitle
   - Select products from the reference field

## Troubleshooting Product Selection

If you're having trouble selecting products:

1. **Check Product Language**: Products must have the same language as the page you're editing.

2. **Product Creation**: Make sure products are fully created and published before trying to reference them.

3. **Reset the Filter**: If no products appear in the selection dialog:
   - Click on the filter icon in the products selection dialog
   - Make sure no unintended filters are applied

4. **Check the Schema Connection**: The filter has been fixed to correctly access the parent document's language.

## Required Product Fields for Display

For optimal display in the Products Section, each product should have:

1. **Name** (required): The product name
2. **Slug** (required): The URL path for the product detail page
3. **Category**: Displayed as a badge on the product card (uses `category.label`)
4. **Tagline**: A short marketing phrase shown below the product name
5. **Short Description**: Brief description of the product
6. **Product Image**: Main visual for the product

## Example Product Section Configuration

```
Section Title: "Our Agricultural Solutions"
Subtitle: "Scientifically proven products for sustainable farming"
Products: [Select 3-6 featured products]
```

## Design Considerations

- The section works best with 3-6 products
- Cards will automatically arrange in a responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile)
- Each product card links to its detailed product page
- Ensure product images have consistent aspect ratios for the best visual appearance 