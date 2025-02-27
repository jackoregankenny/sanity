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
      initialValue: 'Innovative Agricultural Solutions',
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
      rows: 2,
      validation: Rule => Rule.required(),
      initialValue: 'Science-driven crop protection products for modern agriculture',
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
      initialValue: 'Explore Our Products',
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
      name: 'ctaUrl',
      title: 'CTA Button URL',
      type: 'string',
      initialValue: '/products',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      description: 'Recommended size: 1920x1080px. This image will be displayed as the hero background.',
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
      subtitle: 'subtitle',
      media: 'backgroundImage'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `Hero: ${title}`,
        subtitle,
        media
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
      initialValue: 'Our Approach',
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
      initialValue: 'How we deliver exceptional agricultural solutions',
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
              rows: 3,
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
              description: 'Icon name from Lucide icons (e.g. "beaker", "leaf", "flask")',
              type: 'string',
              initialValue: 'beaker',
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
      validation: Rule => Rule.required().min(1).max(6)
    })
  ],
  preview: {
    select: {
      title: 'title',
      featuresCount: 'features.length'
    },
    prepare({ title, featuresCount = 0 }) {
      return {
        title: `Features: ${title}`,
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
      initialValue: 'Our Agricultural Solutions',
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
      initialValue: 'Scientifically proven products for sustainable farming',
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
            filter: ({ document }) => {
              const parentLanguage = document?.language;
              
              if (parentLanguage) {
                return {
                  filter: 'language == $language',
                  params: {
                    language: parentLanguage
                  }
                };
              }
              
              return {};
            }
          }
        }
      ],
      description: 'Select products that match the language of this page. Products should have images, descriptions, and supported crops.',
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
      initialValue: 'Life Scientific Research',
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
      initialValue: 'Our Scientific Approach',
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
      rows: 3,
      initialValue: 'Our products undergo rigorous research and testing to ensure they deliver exceptional performance while meeting the highest safety standards. We combine innovative formulation science with extensive field trials to create solutions that address real agricultural challenges.',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'quoteText',
      title: 'CEO Quote',
      type: 'text',
      rows: 3,
      initialValue: 'Our goal is to deliver innovative solutions that empower farmers to succeed while protecting the land they cultivate.',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'quoteAuthor',
      title: 'Quote Author',
      type: 'string',
      initialValue: 'John Smith',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'quoteRole',
      title: 'Quote Author Role',
      type: 'string',
      initialValue: 'CEO, Life Scientific',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'researchApproaches',
      title: 'Research Approaches',
      description: 'Add key research approaches. Examples: "Rigorous Testing" (Our products undergo comprehensive testing in diverse conditions), "Innovative Formulations" (We develop unique formulations that enhance efficacy), "Data-Driven Approach" (We use data analytics to optimize product performance)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Approach Title',
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
              title: 'Approach Description',
              type: 'text',
              rows: 3,
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
              title: 'title'
            },
            prepare({ title }) {
              return {
                title: title || 'Research Approach'
              }
            }
          }
        })
      ],
      validation: Rule => Rule.required().min(1).max(3)
    }),
    defineField({
      name: 'stats',
      title: 'Research Statistics',
      description: 'Add key research statistics. Examples: Value: "30+" with Label: "Research Scientists", Value: "100+" with Label: "Published Studies", Value: "1000+" with Label: "Field Trials Annually"',
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
              validation: Rule => Rule.required()
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
      validation: Rule => Rule.required().min(1).max(4)
    }),
    defineField({
      name: 'mainSectionImage',
      title: 'Main Section Image',
      description: 'Primary image showing research activities (lab, field trials, etc.)',
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
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      description: 'Additional images showcasing research activities (up to 3)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true
              },
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  description: 'Description of what this image shows',
                  options: {
                    aiAssist: {
                      translateAction: true
                    }
                  }
                }),
                defineField({
                  name: 'caption',
                  type: 'string',
                  title: 'Caption',
                  description: 'Optional caption to display with the image',
                  options: {
                    aiAssist: {
                      translateAction: true
                    }
                  }
                })
              ]
            }
          ]
        }
      ],
      validation: Rule => Rule.max(3)
    })
  ],
  preview: {
    select: {
      title: 'title',
      approachesCount: 'researchApproaches.length',
      statsCount: 'stats.length',
      media: 'mainSectionImage'
    },
    prepare({ title, approachesCount = 0, statsCount = 0, media }) {
      return {
        title: `Research: ${title}`,
        subtitle: `${approachesCount} approach(es), ${statsCount} stat(s)`,
        media
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
      initialValue: 'What Our Customers Say',
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
      initialValue: 'Hear from farmers and agricultural professionals who trust our products',
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
              name: 'quote',
              title: 'Quote',
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
              subtitle: 'quote',
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

// Landing Stats Section
export const landingStatsBlock = defineType({
  name: 'landingStats',
  title: 'Stats Section',
  type: 'object',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Key Research Statistics',
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
      initialValue: 'Our products undergo rigorous research and testing to ensure they deliver exceptional performance while meeting the highest safety standards.',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'stats',
      title: 'Research Statistics',
      description: 'Add key research statistics. Examples: Value: "30+" with Label: "Research Scientists", Value: "100+" with Label: "Published Studies", Value: "1000+" with Label: "Field Trials Annually"',
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
              validation: Rule => Rule.required()
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
      validation: Rule => Rule.required().min(1).max(4)
    })
  ],
  preview: {
    select: {
      title: 'title',
      statsCount: 'stats.length'
    },
    prepare({ title, statsCount = 0 }) {
      return {
        title: title || 'Stats Section',
        subtitle: `${statsCount} stat${statsCount === 1 ? '' : 's'}`,
        media: BarChartIcon
      }
    }
  }
})

// Landing Values Section
export const landingValuesBlock = defineType({
  name: 'landingValues',
  title: 'Values Section',
  type: 'object',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Our Company Values',
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
      initialValue: 'Our values guide our actions and decisions',
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
    })
  ],
  preview: {
    select: {
      title: 'title',
      valuesCount: 'values.length'
    },
    prepare({ title, valuesCount = 0 }) {
      return {
        title: title || 'Values Section',
        subtitle: `${valuesCount} value${valuesCount === 1 ? '' : 's'}`,
        media: InfoOutlineIcon
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
      initialValue: 'Contact Us',
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
      initialValue: 'Reach out to our team for support, inquiries, or to learn more about our products',
      options: {
        aiAssist: {
          translateAction: true
        }
      }
    }),
    defineField({
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Send Message',
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
      initialValue: 'info@lifescientific.com',
      validation: Rule => Rule.email()
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
      initialValue: '+1 (555) 123-4567'
    }),
    defineField({
      name: 'formFields',
      title: 'Form Fields',
      description: 'Customize the contact form fields (optional)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Field Name',
              description: 'Technical name for the field (no spaces)',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'label',
              title: 'Field Label',
              description: 'Display label for the field',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'type',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Text', value: 'text'},
                  {title: 'Email', value: 'email'},
                  {title: 'Textarea', value: 'textarea'},
                  {title: 'Select', value: 'select'}
                ]
              },
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: true
            }),
            defineField({
              name: 'options',
              title: 'Options',
              description: 'Options for select fields',
              type: 'array',
              of: [{type: 'string'}],
              hidden: ({parent}) => parent?.type !== 'select'
            })
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'type',
              required: 'required'
            },
            prepare({title, subtitle, required}) {
              return {
                title,
                subtitle: `${subtitle} ${required ? '(required)' : '(optional)'}`
              }
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      email: 'email'
    },
    prepare({title, email}) {
      return {
        title: `Contact: ${title}`,
        subtitle: email,
        media: LinkIcon
      }
    }
  }
})

// Landing FAQ Section
export const landingFAQBlock = defineType({
  name: 'landingFAQ',
  title: 'Landing FAQ',
  type: 'object',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Frequently Asked Questions',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Find answers to common questions about our products and services',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      description: 'Add frequently asked questions and their answers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'backgroundStyle',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
          {title: 'Gradient', value: 'gradient'},
        ],
      },
      initialValue: 'light',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      faqsCount: 'faqs.length',
      backgroundStyle: 'backgroundStyle',
    },
    prepare({title, faqsCount = 0, backgroundStyle = 'light'}) {
      return {
        title: `FAQs: ${title}`,
        subtitle: `${faqsCount} question${faqsCount === 1 ? '' : 's'} • ${backgroundStyle} background`,
      }
    },
  },
})

// Landing Partners Section
export const landingPartnersBlock = defineType({
  name: 'landingPartners',
  title: 'Landing Partners',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Our Partners & Certifications',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Collaborating with industry leaders to deliver quality agricultural solutions',
    }),
    // Partners section
    defineField({
      name: 'partnersTitle',
      title: 'Partners Section Title',
      type: 'string',
      initialValue: 'Trusted Partners',
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      description: 'Add partner organizations with their logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Partner Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Partner Logo',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Partner Website',
              type: 'url',
            }),
          ],
        },
      ],
    }),
    // Certifications section
    defineField({
      name: 'certificationsTitle',
      title: 'Certifications Section Title',
      type: 'string',
      initialValue: 'Industry Certifications',
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      description: 'Add certifications and accreditations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Certification Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Certification Logo',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'showTrustBadges',
      title: 'Show Trust Badges',
      description: 'Display the "Why Trust Life Scientific" section with quality badges',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      partnersCount: 'partners.length',
      certificationsCount: 'certifications.length',
    },
    prepare({title, partnersCount = 0, certificationsCount = 0}) {
      return {
        title: `Partners: ${title}`,
        subtitle: `${partnersCount} partner${partnersCount === 1 ? '' : 's'}, ${certificationsCount} certification${certificationsCount === 1 ? '' : 's'}`,
      }
    },
  },
})

// Export all landing page blocks
export const landingPageBlocks = [
  landingHeroBlock,
  landingFeaturesBlock,
  landingProductsBlock,
  landingResearchBlock,
  landingAboutBlock,
  landingTestimonialsBlock,
  landingStatsBlock,
  landingValuesBlock,
  landingContactBlock,
  landingFAQBlock,
  landingPartnersBlock
] 