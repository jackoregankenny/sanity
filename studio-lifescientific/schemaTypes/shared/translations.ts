import { defineField, defineType } from 'sanity'
import { languageField } from '../../config/languages'
import { TranslateIcon } from '@sanity/icons'

export default defineType({
  name: 'translations',
  title: 'Site Translations',
  type: 'document',
  icon: TranslateIcon,
  groups: [
    { name: 'navigation', title: 'Navigation' },
    { name: 'products', title: 'Products Page' },
    { name: 'common', title: 'Common Elements' },
    { name: 'footer', title: 'Footer' },
    { name: 'blog', title: 'Blog' }
  ],
  fields: [
    languageField,
    // Navigation
    defineField({
      name: 'nav',
      title: 'Navigation',
      type: 'object',
      group: 'navigation',
      options: {
        collapsed: false,
        collapsible: true
      },
      fields: [
        defineField({
          name: 'products',
          type: 'string',
          title: 'Products Link',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'about',
          type: 'string',
          title: 'About Link',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'contact',
          type: 'string',
          title: 'Contact Link',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'blog',
          type: 'string',
          title: 'Blog Link',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'services',
          type: 'string',
          title: 'Services Link',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'home',
          type: 'string',
          title: 'Home Link',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'search',
          type: 'string',
          title: 'Search Link',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'language',
          type: 'string',
          title: 'Language Link',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        })
      ]
    }),
    // Products Page
    defineField({
      name: 'products',
      title: 'Products Page',
      type: 'object',
      group: 'products',
      options: {
        collapsed: false,
        collapsible: true
      },
      fields: [
        defineField({
          name: 'pageTitle',
          type: 'string',
          title: 'Page Title',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'pageDescription',
          type: 'text',
          title: 'Page Description',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'categoryLabels',
          type: 'object',
          title: 'Category Labels',
          options: {
            aiAssist: {
              translateAction: true
            }
          },
          fields: [
            defineField({
              name: 'pesticide',
              type: 'string',
              title: 'Pesticide'
            }),
            defineField({
              name: 'herbicide',
              type: 'string',
              title: 'Herbicide'
            }),
            defineField({
              name: 'fungicide',
              type: 'string',
              title: 'Fungicide'
            })
          ]
        }),
        defineField({
          name: 'sections',
          title: 'Section Titles',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: false
          },
          fields: [
            defineField({
              name: 'features',
              type: 'string',
              title: 'Features'
            }),
            defineField({
              name: 'benefits',
              type: 'string',
              title: 'Benefits'
            }),
            defineField({
              name: 'variants',
              type: 'string',
              title: 'Variants'
            }),
            defineField({
              name: 'documents',
              type: 'string',
              title: 'Documents'
            })
          ]
        }),
        defineField({
          name: 'labels',
          title: 'UI Labels',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: false
          },
          fields: [
            defineField({
              name: 'sku',
              type: 'string',
              title: 'SKU'
            }),
            defineField({
              name: 'activeIngredients',
              type: 'string',
              title: 'Active Ingredients'
            }),
            defineField({
              name: 'formulationType',
              type: 'string',
              title: 'Formulation Type'
            }),
            defineField({
              name: 'registrationNumber',
              type: 'string',
              title: 'Registration Number'
            }),
            defineField({
              name: 'containerSizes',
              type: 'string',
              title: 'Container Sizes'
            }),
            defineField({
              name: 'viewVariants',
              type: 'string',
              title: 'View Variants'
            }),
            defineField({
              name: 'viewFeatures',
              type: 'string',
              title: 'View Features'
            }),
            defineField({
              name: 'viewBenefits',
              type: 'string',
              title: 'View Benefits'
            })
          ]
        }),
        defineField({
          name: 'formulation',
          title: 'Formulation Types',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: false
          },
          fields: [
            defineField({
              name: 'SL',
              type: 'string',
              title: 'SL (Soluble Concentrate)'
            }),
            defineField({
              name: 'EC',
              type: 'string',
              title: 'EC (Emulsifiable Concentrate)'
            }),
            defineField({
              name: 'SC',
              type: 'string',
              title: 'SC (Suspension Concentrate)'
            }),
            defineField({
              name: 'WP',
              type: 'string',
              title: 'WP (Wettable Powder)'
            }),
            defineField({
              name: 'WG',
              type: 'string',
              title: 'WG (Water Dispersible Granules)'
            })
          ]
        })
      ]
    }),
    // Blog Translations
    defineField({
      name: 'blog',
      title: 'Blog',
      type: 'object',
      group: 'blog',
      options: {
        collapsed: false,
        collapsible: true
      },
      fields: [
        defineField({
          name: 'categories',
          type: 'string',
          title: 'Categories Label',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'recentPosts',
          type: 'string',
          title: 'Recent Posts Label',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'readMore',
          type: 'string',
          title: 'Read More Button',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'relatedPosts',
          type: 'string',
          title: 'Related Posts Label',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'subscribe',
          type: 'string',
          title: 'Subscribe Button',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'emailPlaceholder',
          type: 'string',
          title: 'Email Placeholder',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'searchPlaceholder',
          type: 'string',
          title: 'Search Placeholder',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'noResults',
          type: 'string',
          title: 'No Results Message',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'authorBy',
          type: 'string',
          title: 'Author By Label',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'publishedOn',
          type: 'string',
          title: 'Published On Label',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'backToList',
          type: 'string',
          title: 'Back To List Button',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'loadMore',
          type: 'string',
          title: 'Load More Button',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        })
      ]
    }),
    // Common Elements
    defineField({
      name: 'common',
      title: 'Common Elements',
      type: 'object',
      group: 'common',
      options: {
        collapsed: false,
        collapsible: true
      },
      fields: [
        defineField({
          name: 'loading',
          type: 'string',
          title: 'Loading Message',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'error',
          type: 'string',
          title: 'Error Message',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'noResults',
          type: 'string',
          title: 'No Results Message',
          options: {
            aiAssist: {
              translateAction: true
            }
          }
        }),
        defineField({
          name: 'newsletter',
          title: 'Newsletter',
          type: 'object',
          options: {
            collapsible: true,
            collapsed: false
          },
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }),
            defineField({
              name: 'description',
              type: 'string',
              title: 'Description',
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }),
            defineField({
              name: 'buttonText',
              type: 'string',
              title: 'Button Text',
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }),
            defineField({
              name: 'placeholder',
              type: 'string',
              title: 'Input Placeholder',
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }),
            defineField({
              name: 'successMessage',
              type: 'string',
              title: 'Success Message',
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            }),
            defineField({
              name: 'errorMessage',
              type: 'string',
              title: 'Error Message',
              options: {
                aiAssist: {
                  translateAction: true
                }
              }
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      language: 'language'
    },
    prepare({ language }) {
      const languageLabels = {
        en: '🇬🇧',
        fr: '🇫🇷',
        de: '🇩🇪',
        es: '🇪🇸',
        it: '🇮��',
        'pt-PT': '🇵🇹',
        'pt-BR': '🇧🇷'
      } as const
      
      const flag = languageLabels[language as keyof typeof languageLabels] || ''
      
      return {
        title: `Site Translations (${language.toUpperCase()})`,
        media: TranslateIcon
      }
    }
  }
}) 