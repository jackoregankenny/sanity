# Life Scientific Workspace Overview

## Project Structure

The workspace consists of two primary directories:
- `studio-lifescientific/`: Sanity CMS Studio
- `nextjs-lifescientific/`: Next.js Frontend Application

### Sanity Studio (`studio-lifescientific/`)

#### Key Configuration Files
- `sanity.config.ts`: Sanity configuration
- `sanity.cli.ts`: Sanity CLI configuration
- `tsconfig.json`: TypeScript configuration
- `.env` and `.env.development`: Environment configuration

#### Project Details
- **Name**: lifescientific
- **Version**: 1.0.0
- **License**: UNLICENSED

#### Key Dependencies
- Sanity CMS (v3.74.1)
- React (v18.2.0)
- DeepL Translation (v1.16.0)

#### Available Scripts
- `dev`: Start development server
- `start`: Start Sanity studio
- `build`: Build Sanity studio
- `deploy`: Deploy Sanity studio
- `deploy-graphql`: Deploy GraphQL schema

#### Notable Directories
- `schemaTypes/`: Sanity content model definitions
- `actions/`: Custom Sanity actions
- `static/`: Static assets

### Next.js Frontend (`nextjs-lifescientific/`)

#### Key Configuration Files
- `next.config.mjs`: Next.js configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration

#### Project Details
- **Name**: nextjs-lifescientific
- **Version**: 0.1.0

#### Key Dependencies
- Next.js (v15.1.6)
- React (v19.0.0)
- Tailwind CSS
- Radix UI Components
- Next Sanity (v9.8.54)

#### Available Scripts
- `dev`: Start development server with Turbopack
- `build`: Build production application
- `start`: Start production server
- `lint`: Run ESLint

#### Notable Directories
- `src/`: Application source code
- `public/`: Public assets
- `components/`: Reusable React components

## Development Environment

### Tools and Technologies
- TypeScript
- React
- Sanity CMS
- Next.js
- Tailwind CSS
- ESLint
- Prettier

### Translation Support
Both projects include DeepL translation capabilities.

## Deployment Considerations
- Separate deployments for Sanity Studio and Next.js frontend
- Environment-specific configurations available
- GraphQL schema deployment support

## Recommended Workflow
1. Start Sanity Studio: `cd studio-lifescientific && npm run dev`
2. Start Next.js Frontend: `cd nextjs-lifescientific && npm run dev`

## Notes
- Ensure all environment variables are properly configured
- Use provided scripts for development, building, and deployment 