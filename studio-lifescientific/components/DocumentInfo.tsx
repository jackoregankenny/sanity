import React from 'react'

interface InfoTextProps {
  title: string
  description: string
  instructions?: string[]
  tips?: string[]
}

export const InfoText = ({ title, description, instructions, tips }: InfoTextProps) => (
  <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '8px', marginBottom: '20px' }}>
    <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{title}</h3>
    <p style={{ margin: '0 0 15px 0', color: '#666' }}>{description}</p>
    {instructions && instructions.length > 0 && (
      <>
        <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Instructions:</h4>
        <ul style={{ margin: '0 0 15px 0', paddingLeft: '20px', color: '#666' }}>
          {instructions.map((instruction, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>{instruction}</li>
          ))}
        </ul>
      </>
    )}
    {tips && tips.length > 0 && (
      <>
        <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>💡 Tips:</h4>
        <ul style={{ margin: '0', paddingLeft: '20px', color: '#666' }}>
          {tips.map((tip, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>{tip}</li>
          ))}
        </ul>
      </>
    )}
  </div>
)

export const ProductPageInfo = () => (
  <InfoText
    title="Product Page Builder"
    description="Create and customize product pages using a flexible block-based system. Each product page can have multiple content sections that can be arranged in any order."
    instructions={[
      "Start by selecting the product this page is for",
      "Add a page title and meta description for SEO",
      "Build your page by adding content blocks:",
      "- Overview: Main product introduction and hero section",
      "- Benefits: Key product benefits and features",
      "- Specifications: Technical details and specifications",
      "- Ingredients: List of active ingredients and their details",
      "You can reorder blocks by dragging them into position"
    ]}
    tips={[
      "Use clear, descriptive titles that include your main keywords",
      "Write meta descriptions that encourage clicks from search results",
      "Start with an Overview block to introduce your product",
      "Keep content blocks focused and organized logically"
    ]}
  />
)

export const ProductBlockInfo = () => (
  <InfoText
    title="Product Content Block"
    description="Add a new content section to your product page. Each block type serves a different purpose and can be customized with its own content."
    instructions={[
      "Choose the type of block you want to add",
      "Fill in the required content fields",
      "Add any optional content or media",
      "Preview how the block will look using the preview panel"
    ]}
    tips={[
      "Keep headings clear and concise",
      "Use high-quality images with descriptive alt text",
      "Make sure translations maintain the same meaning",
      "Preview your changes to ensure everything looks correct"
    ]}
  />
)

export const ProductOverviewInfo = () => (
  <InfoText
    title="Product Overview Block"
    description="Create an engaging introduction to your product. This is typically the first section visitors will see."
    instructions={[
      "Write a compelling heading that captures attention",
      "Create a clear, benefit-focused description",
      "Add a high-quality product image",
      "Ensure all text is properly translated"
    ]}
    tips={[
      "Keep the heading concise but impactful",
      "Focus on the main value proposition in the description",
      "Use professional product photography",
      "Make sure the image has good contrast with text"
    ]}
  />
)

export const ProductBenefitsInfo = () => (
  <InfoText
    title="Product Benefits Block"
    description="Highlight the key benefits and features of your product. Help customers understand why they should choose your product."
    instructions={[
      "Create a clear section heading",
      "Add individual benefits with titles and descriptions",
      "Order benefits by importance",
      "Ensure each benefit is unique and valuable"
    ]}
    tips={[
      "Focus on customer outcomes rather than features",
      "Use clear, benefit-focused titles",
      "Keep descriptions concise but informative",
      "Use consistent tone across all benefits"
    ]}
  />
)

export const ProductSpecsInfo = () => (
  <InfoText
    title="Product Specifications Block"
    description="Present technical details and specifications in a clear, organized format."
    instructions={[
      "Add a descriptive section heading",
      "List all relevant specifications",
      "Use consistent formatting for values",
      "Group related specifications together"
    ]}
    tips={[
      "Use technical terms consistently",
      "Include units where applicable",
      "Keep labels clear and concise",
      "Ensure translations maintain technical accuracy"
    ]}
  />
)

export const ProductIngredientsInfo = () => (
  <InfoText
    title="Product Ingredients Block"
    description="Detail the active ingredients and their properties. Help customers understand what goes into your product."
    instructions={[
      "Create a clear section heading",
      "List all active ingredients",
      "Include percentages or concentrations",
      "Add descriptions explaining each ingredient's purpose"
    ]}
    tips={[
      "List ingredients in order of concentration",
      "Use proper technical names",
      "Explain benefits in simple terms",
      "Include relevant safety information"
    ]}
  />
)

export const LocalizedTextInfo = () => (
  <InfoText
    title="Translatable Text"
    description="Create content that can be translated into multiple languages while maintaining consistent meaning and structure."
    instructions={[
      "Enter the text in the default language (English)",
      "Use clear, translatable language",
      "Avoid idioms or culture-specific references",
      "Check character limits in all languages"
    ]}
    tips={[
      "Keep sentences clear and concise",
      "Consider how text length might change in other languages",
      "Use consistent terminology",
      "Preview translations to ensure proper formatting"
    ]}
  />
) 