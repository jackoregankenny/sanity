# Component Updates in Life Scientific Website

This document outlines recent updates to the Sanity Studio schema and Next.js components for the Life Scientific website.

## Recent Updates

### Product Component Updates
- **Updated Image Aspect Ratio**: Product images now display in a 1:1 ratio instead of 4:3 for more consistent presentation. Uses `object-contain` and padding to ensure full visibility of product images, and includes a `sizes` attribute for better performance.
- **Added Support for Displaying Crops**: Products now display supported crops in the product cards. Up to 3 crops are shown with a "+X more" indicator for additional crops. Each crop is represented as a pill badge with a checkmark icon.
- **Updated Query and Types**: The Sanity query has been modified to fetch `supportedCrops` data, and the `LandingProductItem` type has been updated to include this property with proper typing for type safety.
- **Added Default Content**: Added placeholder content and descriptions in the Sanity schema, including a default title and subtitle.

### Research Section Updates
- **Updated Title and Subtitle**: Changed the title to "Life Scientific Research" and the subtitle to "Our Scientific Approach".
- **Added Research Approaches**: Three approaches are now included: "Rigorous Testing", "Innovative Formulations", and "Data-Driven Approach".
- **Added Default Content**: Included placeholder content and descriptions, including a default research description and guidance for adding relevant statistics.
- **Multiple Images Support**: Added support for displaying multiple research images (up to 3) with optional captions.
- **CEO Quote**: Added the ability to display a CEO quote with author attribution and role.

### Contact Form Updates
- **Enhanced Form Validation**: Added comprehensive validation for all form fields, including required field checks and email format validation.
- **Improved User Feedback**: Added success and error states to provide clear visual feedback during form submission.
- **Custom Form Fields**: Admins can now customize form fields through Sanity, including field types, labels, and options for select fields.
- **Loading States**: Added loading indicators during form submission to improve user experience.
- **Mobile-Friendly Design**: Improved responsive layout for better mobile experience.

### Testimonials Section Updates
- **Fixed Image Handling**: Resolved the issue with empty `src` attributes by adding better fallback handling for avatar images.
- **Empty State Handling**: Added a message when no testimonials are available.
- **Improved Navigation**: Enhanced the navigation between testimonials and added animation transitions.

### New FAQ Section Component
- **Accordion Interface**: Added a new FAQ component with an expandable accordion interface for questions and answers.
- **Background Options**: Customizable background styles (light, dark, or gradient) to match your site's design.
- **Animated Transitions**: Smooth animations when expanding and collapsing answers.
- **Call-to-Action**: Optional CTA at the bottom for users who still have questions.

### New Partners & Certifications Component
- **Partner Showcase**: Display partner logos with optional links to their websites in a responsive grid.
- **Certification Display**: Showcase industry certifications with logos, names, and descriptions.
- **Trust Badges**: Optional trust indicators highlighting quality guarantees, awards, and regulatory compliance.
- **Visual Enhancements**: Partner logos appear in grayscale and become colored on hover, creating an interactive experience.

## How to Use These Updates

### Product Section
- Ensure product images are high quality and ideally square (1:1 ratio).
- Add categories to your products to enable proper filtering.
- Add supported crops to each product to take advantage of the new crop display feature.

### Research Section
- Use the main section image field for a primary research image.
- Add up to 3 gallery images to showcase different aspects of your research.
- Include a compelling CEO quote related to your research and development.

### Contact Form
- Customize the contact form fields in Sanity if needed.
- The default form includes name, email, company, subject (dropdown), and message fields.
- Ensure your email handling backend can process the submitted data.

### FAQ Section
1. In Sanity Studio, add the "Landing FAQ" component to your page builder.
2. Set a title and subtitle for the section.
3. Add your questions and answers.
4. Choose a background style (light, dark, or gradient).
5. The component will automatically create an accordion interface displaying all your FAQs.

### Partners Section
1. In Sanity Studio, add the "Landing Partners" component to your page builder.
2. Set titles for the main section, partners subsection, and certifications subsection.
3. Add partner organizations with their names, logos, and optional website links.
4. Add certifications with names, logos, and descriptions.
5. Toggle the "Show Trust Badges" option to display additional trust indicators.

For any questions or issues implementing these updates, please reach out to the development team. 