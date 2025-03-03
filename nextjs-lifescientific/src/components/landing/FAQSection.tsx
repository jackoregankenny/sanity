import React from 'react'

type FAQ = {
  question: string
  answer: string
}

type FAQSectionProps = {
  title: string
  subtitle?: string
  questions: FAQ[]
  backgroundStyle?: 'light' | 'dark' | 'gradient'
}

export function FAQSection({ 
  title, 
  subtitle, 
  questions = [],
  backgroundStyle = 'light'
}: FAQSectionProps) {
  const getBgColor = () => {
    switch (backgroundStyle) {
      case 'dark':
        return 'bg-gray-800 text-white'
      case 'gradient':
        return 'bg-gradient-to-br from-blue-500 to-indigo-700 text-white'
      default:
        return 'bg-white text-gray-800'
    }
  }

  return (
    <section className={`py-20 ${getBgColor()}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg opacity-80 max-w-3xl mx-auto">{subtitle}</p>}
        </div>

        {questions.length > 0 ? (
          <div className="max-w-3xl mx-auto divide-y">
            {questions.map((faq, index) => (
              <details 
                key={index} 
                className="group py-4 cursor-pointer"
                open={index === 0} // Open the first FAQ by default
              >
                <summary className="list-none font-medium text-xl flex justify-between items-center">
                  {faq.question}
                  <span className="ml-4 transition-transform group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className="mt-3 text-lg leading-relaxed opacity-80">{faq.answer}</div>
              </details>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-gray-100 rounded-lg max-w-3xl mx-auto">
            <p>Add FAQ items in Sanity Studio to display them here.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-lg">
            Can't find what you're looking for? 
            <a href="/contact" className="font-medium underline ml-2 hover:opacity-80">
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
} 