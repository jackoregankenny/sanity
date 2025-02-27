import { defineField, defineType, defineArrayMember } from 'sanity'
import { HomeIcon, TagIcon, PackageIcon, BarChartIcon, InfoOutlineIcon, DocumentIcon, LinkIcon } from '@sanity/icons'

// Landing Hero Section
export const landingHeroBlock = defineType({
  name: 'landingHero',
  title: 'Landing Hero',
  type: 'object',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'highlightWords',
      title: 'Highlight Words',
      description: 'Words in the title that should be highlighted. Leave empty for no highlight.',
      type: 'string',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'showNotification',
      title: 'Show Notification Pill',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'notificationText',
      title: 'Notification Text',
      type: 'string',
      hidden: ({ parent }) => !parent?.showNotification,
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'dataPoints',
      title: 'Data Points',
      description: 'Stats or key points to display next to the hero graphic (max 3)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required(),
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: Rule => Rule.required(),
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            })
          ],
          preview: {
            select: {
              label: 'label',
              value: 'value'
            },
            prepare({ label, value }) {
              return {
                title: label || 'Data Point',
                subtitle: value
              }
            }
          }
        })
      ],
      validation: Rule => Rule.max(3)
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary CTA Text',
      type: 'string',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    },
    prepare({ title, media }) {
      return {
        title: title || 'Landing Hero Section',
        subtitle: 'Hero section with title, subtitle, and CTA buttons',
        media: media || HomeIcon
      }
    }
  }
})

// Landing Features Section
export const landingFeaturesBlock = defineType({
  name: 'landingFeatures',
  title: 'Features Section',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: Rule => Rule.required(),
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 2,
              validation: Rule => Rule.required(),
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Leaf', value: 'leaf' },
                  { title: 'Flask', value: 'flask' },
                  { title: 'Shield', value: 'shield' },
                  { title: 'Globe', value: 'globe' },
                  { title: 'Star', value: 'star' },
                  { title: 'Chart', value: 'chart' }
                ]
              }
            })
          ],
          preview: {
            select: {
              title: 'title',
              icon: 'icon'
            },
            prepare({ title, icon }) {
              return {
                title: title || 'Feature',
                subtitle: `Icon: ${icon || 'None'}`
              }
            }
          }
        })
      ],
      validation: Rule => Rule.required().min(1)
    })
  ],
  preview: {
    select: {
      title: 'title',
      featuresCount: 'features.length'
    },
    prepare({ title, featuresCount = 0 }) {
      return {
        title: title || 'Features Section',
        subtitle: `${featuresCount} feature${featuresCount === 1 ? '' : 's'}`,
        media: TagIcon
      }
    }
  }
})

// Landing Products Section
export const landingProductsBlock = defineType({
  name: 'landingProducts',
  title: 'Products Section',
  type: 'object',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'products',
      title: 'Featured Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
          options: {
            filter: 'language == $language',
            filterParams: {
              language: 'language'
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1).max(6)
    })
  ],
  preview: {
    select: {
      title: 'title',
      productsCount: 'products.length'
    },
    prepare({ title, productsCount = 0 }) {
      return {
        title: title || 'Products Section',
        subtitle: `${productsCount} product${productsCount === 1 ? '' : 's'}`,
        media: PackageIcon
      }
    }
  }
})

// Landing Research Section
export const landingResearchBlock = defineType({
  name: 'landingResearch',
  title: 'Research Section',
  type: 'object',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'description',
      title: 'Research Description',
      type: 'text',
      rows: 4,
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required(),
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            })
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label'
            },
            prepare({ value, label }) {
              return {
                title: value || '0',
                subtitle: label || 'Statistic'
              }
            }
          }
        })
      ],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'image',
      title: 'Section Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      statsCount: 'stats.length',
      media: 'image'
    },
    prepare({ title, statsCount = 0, media }) {
      return {
        title: title || 'Research Section',
        subtitle: `${statsCount} statistic${statsCount === 1 ? '' : 's'}`,
        media: media || BarChartIcon
      }
    }
  }
})

// Landing About Section
export const landingAboutBlock = defineType({
  name: 'landingAbout',
  title: 'About Section',
  type: 'object',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'values',
      title: 'Company Values',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          validation: Rule => Rule.required(),
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        })
      ]
    }),
    defineField({
      name: 'image',
      title: 'Section Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image'
    },
    prepare({ title, media }) {
      return {
        title: title || 'About Section',
        subtitle: 'Company mission and values',
        media: media || InfoOutlineIcon
      }
    }
  }
})

// Landing Testimonials Section
export const landingTestimonialsBlock = defineType({
  name: 'landingTestimonials',
  title: 'Testimonials Section',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'content',
              title: 'Testimonial Text',
              type: 'text',
              rows: 4,
              validation: Rule => Rule.required(),
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }),
            defineField({
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'role',
              title: 'Author Role',
              type: 'string',
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }),
            defineField({
              name: 'company',
              title: 'Company',
              type: 'string',
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }),
            defineField({
              name: 'rating',
              title: 'Rating (1-5)',
              type: 'number',
              validation: Rule => 
                Rule.required()
                  .min(1)
                  .max(5)
                  .precision(1)
                  .error('Rating must be between 1 and 5')
            }),
            defineField({
              name: 'avatar',
              title: 'Author Avatar',
              type: 'image',
              options: {
                hotspot: true
              }
            })
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'company',
              media: 'avatar'
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Testimonial',
                subtitle: subtitle || '',
                media: media || DocumentIcon
              }
            }
          }
        })
      ],
      validation: Rule => Rule.required().min(1)
    })
  ],
  preview: {
    select: {
      title: 'title',
      testimonialCount: 'testimonials.length'
    },
    prepare({ title, testimonialCount = 0 }) {
      return {
        title: title || 'Testimonials Section',
        subtitle: `${testimonialCount} testimonial${testimonialCount === 1 ? '' : 's'}`,
        media: DocumentIcon
      }
    }
  }
})

// Landing Contact Section
export const landingContactBlock = defineType({
  name: 'landingContact',
  title: 'Contact Section',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: Rule => Rule.email()
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string'
    }),
    defineField({
      name: 'formFields',
      title: 'Contact Form Fields',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Field Name',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'label',
              title: 'Field Label',
              type: 'string',
              validation: Rule => Rule.required(),
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }),
            defineField({
              name: 'type',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Textarea', value: 'textarea' },
                  { title: 'Select', value: 'select' }
                ]
              },
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'required',
              title: 'Required Field',
              type: 'boolean',
              initialValue: false
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Section',
        subtitle: 'Contact information and form',
        media: LinkIcon
      }
    }
  }
})

// Export all landing page blocks
export const landingPageBlocks = [
  landingHeroBlock,
  landingFeaturesBlock,
  landingProductsBlock,
  landingResearchBlock,
  landingAboutBlock,
  landingTestimonialsBlock,
  landingContactBlock
] 