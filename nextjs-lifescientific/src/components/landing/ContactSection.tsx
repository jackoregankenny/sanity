"use client"

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Send, Check, AlertCircle, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'textarea' | 'select'
  required: boolean
  options?: string[]
}

interface ContactSectionProps {
  title: string
  subtitle?: string
  ctaText: string
  email?: string
  phone?: string
  formFields?: FormField[]
}

export function ContactSection({
  title = "Contact Us",
  subtitle = "Reach out to our team for support, inquiries, or to learn more about our products",
  ctaText = "Send Message",
  email = "info@lifescientific.com",
  phone = "+1 (555) 123-4567",
  formFields
}: ContactSectionProps) {
  const [formState, setFormState] = useState<{[key: string]: string}>({})
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  // Default form fields if none are provided
  const defaultFormFields: FormField[] = [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'company', label: 'Company', type: 'text', required: false },
    { name: 'subject', label: 'Subject', type: 'select', required: true, options: [
      'Product Inquiry',
      'Technical Support',
      'Partnership Opportunity',
      'Distribution Information',
      'Other'
    ]},
    { name: 'message', label: 'Message', type: 'textarea', required: true }
  ]

  const fieldsToUse = formFields && formFields.length > 0 ? formFields : defaultFormFields

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    let isValid = true

    fieldsToUse.forEach(field => {
      if (field.required && (!formState[field.name] || formState[field.name].trim() === '')) {
        newErrors[field.name] = `${field.label} is required`
        isValid = false
      }

      if (field.type === 'email' && formState[field.name] && !/^\S+@\S+\.\S+$/.test(formState[field.name])) {
        newErrors[field.name] = 'Please enter a valid email address'
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    // Simulate form submission
    try {
      // Replace with actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Successful submission
      setSubmitStatus('success')
      setFormState({})
      if (formRef.current) formRef.current.reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderFormField = (field: FormField) => {
    const { name, label, type, required, options } = field
    const hasError = Boolean(errors[name])
    
    const baseClasses = `w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0f766e]/50 transition-colors`
    const inputClasses = `${baseClasses} ${hasError ? 'border-red-300' : 'border-gray-200'}`
    
    switch (type) {
      case 'textarea':
        return (
          <div className="mb-5" key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              id={name}
              name={name}
              rows={4}
              className={inputClasses}
              value={formState[name] || ''}
              onChange={handleChange}
              aria-invalid={hasError}
            />
            {hasError && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors[name]}
              </p>
            )}
          </div>
        )
      case 'select':
        return (
          <div className="mb-5" key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
              id={name}
              name={name}
              className={inputClasses}
              value={formState[name] || ''}
              onChange={handleChange}
              aria-invalid={hasError}
            >
              <option value="">Please select</option>
              {options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {hasError && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors[name]}
              </p>
            )}
          </div>
        )
      default:
        return (
          <div className="mb-5" key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              className={inputClasses}
              value={formState[name] || ''}
              onChange={handleChange}
              aria-invalid={hasError}
            />
            {hasError && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors[name]}
              </p>
            )}
          </div>
        )
    }
  }

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              {title}
            </motion.h2>
            
            {subtitle && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-gray-600 max-w-3xl mx-auto"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
          
          <div className="grid md:grid-cols-5 gap-10">
            {/* Contact information */}
            <div className="md:col-span-2">
              <div className="bg-gray-50 rounded-xl p-8 h-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Get in touch</h3>
                
                <div className="space-y-6">
                  {email && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="flex items-start"
                    >
                      <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                        <Mail className="h-5 w-5 text-[#0f766e]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                        <a href={`mailto:${email}`} className="text-gray-900 hover:text-[#0f766e] hover:underline transition-colors">
                          {email}
                        </a>
                      </div>
                    </motion.div>
                  )}
                  
                  {phone && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="flex items-start"
                    >
                      <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                        <Phone className="h-5 w-5 text-[#0f766e]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                        <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-gray-900 hover:text-[#0f766e] hover:underline transition-colors">
                          {phone}
                        </a>
                      </div>
                    </motion.div>
                  )}
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-start"
                  >
                    <div className="bg-white p-3 rounded-lg shadow-sm mr-4">
                      <Globe className="h-5 w-5 text-[#0f766e]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Global Presence</h4>
                      <p className="text-gray-900">Serving customers in 40+ countries worldwide</p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-12">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Follow Us</h4>
                  <div className="flex space-x-3">
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-[#0f766e] hover:text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-[#0f766e] hover:text-white transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-[#0f766e] hover:text-white transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a message</h3>
                
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  {fieldsToUse.map(renderFormField)}
                  
                  {/* Success/Error messages */}
                  {submitStatus === 'success' && (
                    <div className="mb-5 p-4 bg-green-50 border border-green-100 rounded-lg flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-green-800 font-medium">Message sent successfully!</p>
                        <p className="text-green-600 text-sm">Thank you for contacting us. We'll get back to you shortly.</p>
                      </div>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-red-800 font-medium">Failed to send message</p>
                        <p className="text-red-600 text-sm">Please try again later or contact us directly via email or phone.</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    className="w-full py-3 px-6 bg-[#0f766e] text-white font-medium rounded-lg flex items-center justify-center hover:bg-[#0f766e]/90 focus:outline-none focus:ring-2 focus:ring-[#0f766e]/50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        {ctaText} <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </motion.button>
                  
                  {/* Privacy notice */}
                  <p className="mt-4 text-xs text-gray-500 text-center">
                    By submitting this form, you agree to our <a href="#" className="text-[#0f766e] hover:underline">Privacy Policy</a> and consent to being contacted regarding your inquiry.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 