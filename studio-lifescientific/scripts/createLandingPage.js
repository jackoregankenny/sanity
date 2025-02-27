/**
 * Script to create an initial landing page in Sanity CMS
 * 
 * To use:
 * 1. Create a .env file in the studio directory with:
 *    SANITY_STUDIO_PROJECT_ID=your_project_id
 *    SANITY_STUDIO_DATASET=production
 *    SANITY_STUDIO_WRITE_TOKEN=your_write_token
 * 
 * 2. Run with:
 *    node scripts/createLandingPage.js
 */

/* eslint-env node */
/* eslint-disable no-console */

const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');

dotenv.config();

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_STUDIO_WRITE_TOKEN, // You'll need to generate this in Sanity
  useCdn: false,
});

const seedLandingPage = async () => {
  try {
    // Check if landing page already exists in English
    const existingPage = await client.fetch(
      '*[_type == "page" && slug.current == "landing" && language == "en"][0]'
    );
    
    if (existingPage) {
      console.log('Landing page already exists');
      return;
    }
    
    // Create landing page with initial sections
    const doc = {
      _type: 'page',
      title: 'Landing Page',
      slug: {
        _type: 'slug',
        current: 'landing'
      },
      language: 'en',
      translationStatus: 'up-to-date',
      lastTranslated: new Date().toISOString(),
      version: 1,
      pageBuilder: [
        // Hero section
        {
          _type: 'landingHero',
          _key: 'hero1',
          title: 'Scientific protection for optimal crop performance',
          subtitle: 'High-efficacy agricultural solutions backed by research and developed for sustainable farming practices.',
          ctaText: 'Discover Products',
          secondaryCtaText: 'Learn More'
        },
        
        // Features section
        {
          _type: 'landingFeatures',
          _key: 'features1',
          title: 'Scientific Advantage',
          subtitle: 'Our research-backed approach delivers measurable results',
          features: [
            {
              title: 'Sustainable Formulations',
              description: 'Environmentally conscious crop protection products that maintain efficacy while reducing environmental impact.',
              icon: 'leaf'
            },
            {
              title: 'Research Excellence',
              description: 'Cutting-edge scientific development ensuring the highest quality agricultural solutions.',
              icon: 'flask'
            },
            {
              title: 'Proven Reliability',
              description: 'Trusted by farmers worldwide with products tested in diverse agricultural conditions.',
              icon: 'shield'
            },
            {
              title: 'Global Expertise',
              description: 'Supporting agricultural communities across continents with localized solutions.',
              icon: 'globe'
            }
          ]
        },
        
        // Research section
        {
          _type: 'landingResearch',
          _key: 'research1',
          title: 'Research-Driven Innovation',
          subtitle: 'Our scientific approach to agricultural challenges',
          description: 'At Life Scientific, every product represents years of rigorous research and testing. Our team of scientists continuously works to develop solutions that address the evolving challenges of modern agriculture while prioritizing environmental sustainability.',
          stats: [
            { value: '15+', label: 'Years of Research' },
            { value: '98.3%', label: 'Effectiveness Rate' },
            { value: '40+', label: 'Countries Served' },
            { value: '12', label: 'Research Centers' }
          ]
        },
        
        // About section
        {
          _type: 'landingAbout',
          _key: 'about1',
          title: 'Our Mission',
          subtitle: 'Advancing agriculture through science',
          description: 'Life Scientific was founded with a clear purpose: to develop agricultural solutions that balance effectiveness with environmental responsibility. Through rigorous research and innovation, we create products that help farmers maximize productivity while preserving natural resources for future generations.',
          values: [
            'Scientific excellence',
            'Environmental stewardship',
            'Agricultural advancement',
            'Global collaboration'
          ]
        },
        
        // Contact section
        {
          _type: 'landingContact',
          _key: 'contact1',
          title: 'Connect With Our Experts',
          subtitle: 'Get personalized agricultural solutions for your specific needs',
          ctaText: 'Contact Us',
          email: 'info@lifescientific.com',
          phone: '+1 (555) 123-4567'
        }
      ]
    };
    
    await client.create(doc);
    console.log('Successfully created landing page');
  } catch (err) {
    console.error('Error creating landing page:', err);
  }
};

seedLandingPage(); 