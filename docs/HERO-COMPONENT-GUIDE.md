# Hero Component Guide

This document explains how to use and customize all the elements in the Hero component.

## Overview of Editable Features

The hero component now has the following editable elements:

1. **Title** - The main headline
2. **Subtitle** - Supporting text below the headline
3. **Highlight Words** - Words in the title that should be highlighted
4. **Notification Pill** - The notification banner at the top
5. **Data Points** - The three statistics shown around the graphic
6. **Call-to-Action Buttons** - Primary and secondary buttons
7. **Background Image** - Optional image for the background

## How to Edit in Sanity

### Basic Content

1. **Title and Subtitle**
   - Edit the `title` and `subtitle` fields in the Hero component
   - These are the most prominent text elements on the page

2. **Call-to-Action Buttons**
   - `ctaText`: The text for the primary green button
   - `secondaryCtaText`: The text for the outlined secondary button

### Title Highlighting

The `highlightWords` field allows you to specify words in your title that should be highlighted in the brand color.

Example:
- Title: "Scientific protection for optimal crop performance"
- Highlight Words: "optimal crop performance"
- Result: "Scientific protection for **optimal crop performance**" (with highlighted text)

### Notification Pill

The small pill at the top of the hero section can be controlled with:

1. `showNotification`: Toggle to show/hide the notification
2. `notificationText`: The text to display in the notification

### Data Points

The three statistics shown around the hero graphic can be customized:

1. Add up to 3 data points in the `dataPoints` array
2. Each data point has:
   - `label`: The category (e.g., "Effectiveness")
   - `value`: The actual statistic (e.g., "98.3%")

Example data points:
```
[
  { label: "Effectiveness", value: "98.3%" },
  { label: "Sustainability", value: "Eco-certified" },
  { label: "Research", value: "15+ years" }
]
```

## Default Values

If you don't specify values in Sanity, the component will use these defaults:

- **Title**: "Scientific protection for optimal crop performance"
- **Subtitle**: "High-efficacy agricultural solutions backed by research and developed for sustainable farming practices."
- **CTA Button**: "Discover Products"
- **Secondary CTA**: "Learn More"
- **Notification**: "New sustainable formula release"
- **Data Points**: The three examples shown above

## Tips for Effective Hero Content

1. **Keep the title concise** - Aim for 5-8 words for maximum impact
2. **Use action-oriented language** in your CTAs
3. **Choose impactful data points** that demonstrate your value proposition
4. **Use highlighting strategically** to emphasize the most important part of your message
5. **Consider mobile screens** - Very long text may wrap awkwardly on smaller devices

## Troubleshooting

- **Missing elements?** Check that you've filled out all fields in Sanity
- **Highlighting not working?** Ensure the exact text in "highlightWords" appears in your title
- **Notification not appearing?** Verify that "showNotification" is enabled
- **Data points not showing?** Make sure you've added data points in the array with both label and value 