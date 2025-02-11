import { NextResponse } from 'next/server'
import { Translator } from 'deepl-node'

// Initialize the translator with the correct server URL for free accounts
const translator = new Translator(process.env.DEEPL_API_KEY || '', { 
  serverUrl: 'https://api-free.deepl.com'
})

// Define allowed origins
const allowedOrigins = ['http://localhost:3333', 'http://localhost:3000']

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: Request) {
  console.log('Translation API called')

  try {
    const body = await request.json()
    console.log('Received translation request:', body)

    const { fromLang, toLang, document } = body

    // Verify API key is set
    if (!process.env.DEEPL_API_KEY) {
      throw new Error('DeepL API key is not configured')
    }

    // Test the API connection
    try {
      await translator.getUsage()
      console.log('DeepL API connection successful')
    } catch (error: any) {
      console.error('DeepL API connection error:', error)
      throw new Error(`DeepL API connection failed: ${error?.message || 'Unknown error'}`)
    }

    // Translate each field
    const translatedFields = await Promise.all(
      Object.entries(document.fields).map(async ([field, text]) => {
        console.log(`Translating field "${field}" from ${fromLang} to ${toLang}`)
        try {
          const result = await translator.translateText(
            text as string,
            fromLang as 'en',
            toLang === 'pt' ? 'pt-PT' : toLang as 'fr' | 'de' | 'es' | 'it' | 'pt-PT' | 'pt-BR',
            {
              preserveFormatting: true,
              formality: 'more'
            }
          )
          console.log(`Translation result for "${field}":`, result)
          return [field, result.text]
        } catch (error: any) {
          console.error(`Translation error for field "${field}":`, error)
          throw new Error(`Failed to translate field "${field}": ${error?.message || 'Unknown error'}`)
        }
      })
    )

    // Create the translated document
    const translatedDoc = {
      ...document,
      fields: Object.fromEntries(translatedFields)
    }

    console.log('Translation completed:', translatedDoc)

    return NextResponse.json({ document: translatedDoc }, { headers: corsHeaders })
  } catch (error) {
    console.error('Translation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Translation failed' },
      { status: 500, headers: corsHeaders }
    )
  }
} 