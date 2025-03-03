"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LanguageSelector } from './LanguageSelector'
import { urlForImage } from '@/lib/sanity.image'
import { cn } from '@/lib/utils'
import {
  Menu,
  MenuButton,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from '@/components/ui/menu'
import { 
  ChevronDownIcon,
  Menu as MenuIcon,
  X as CloseIcon
} from 'lucide-react'

interface NavigationItem {
  text: string
  href: string
  isExternal?: boolean
  icon?: string
  children?: {
    text: string
    href: string
    isExternal?: boolean
  }[]
}

interface NavbarProps {
  logo?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  logoText?: string
  items?: NavigationItem[]
  currentLang: string
  translations?: {
    nav: {
      products: string
      about: string
      contact: string
      blog: string
      services: string
      home: string
      search: string
      language: string
    }
  }
}

export function Navbar({ 
  logo, 
  logoText = 'Life Scientific', 
  items = [], 
  currentLang,
  translations 
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    // Handle home page special case
    if (href === `/${currentLang}` && pathname === `/${currentLang}`) {
      return true
    }
    // For other pages
    return pathname.startsWith(href)
  }

  // Fallback navigation items if none are provided from Sanity
  const fallbackItems: NavigationItem[] = [
    {
      text: translations?.nav?.home || 'Home',
      href: `/${currentLang}`
    },
    {
      text: translations?.nav?.products || 'Products',
      href: `/${currentLang}/products`
    },
    {
      text: translations?.nav?.blog || 'Blog',
      href: `/${currentLang}/blog`
    },
    {
      text: translations?.nav?.about || 'About',
      href: `/${currentLang}/about`
    },
    {
      text: translations?.nav?.contact || 'Contact',
      href: `/${currentLang}/contact`
    }
  ]

  const navItems = items.length > 0 ? items : fallbackItems

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <header className={cn(
        "transition-all duration-500 backdrop-blur-md rounded-full border",
        scrolled 
          ? "w-[80%] bg-white/95 shadow-lg border-gray-200/50" 
          : "w-full bg-white/80 border-transparent"
      )}>
        <div className="flex h-14 items-center px-6">
          <div className="flex">
            <Link 
              className="flex items-center space-x-3 text-lg font-bold transition-all duration-300 hover:opacity-80" 
              href={`/${currentLang}`}
            >
              {logo ? (
                <Image 
                  src={urlForImage(logo)?.url() || ''} 
                  alt={logo.alt || logoText}
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
              ) : null}
              <span className="text-gray-900 font-semibold">{logoText}</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 items-center justify-center space-x-8">
            {navItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.children?.length ? (
                  <Menu>
                    <MenuTrigger asChild>
                      <MenuButton
                        className={cn(
                          "text-sm font-medium transition-colors",
                          "text-gray-600 hover:text-gray-900",
                          isActive(item.href) && "text-teal-600 font-semibold"
                        )}
                      >
                        <span>{item.text}</span>
                        <ChevronDownIcon className="ml-1 h-4 w-4 inline-block" />
                      </MenuButton>
                    </MenuTrigger>
                    <MenuContent className="bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-lg rounded-xl">
                      {item.children.map((child, childIndex) => (
                        <MenuItem key={childIndex}>
                          <Link
                            href={child.href}
                            className="w-full transition-colors hover:text-teal-600"
                            {...(child.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            {child.text}
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuContent>
                  </Menu>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      "text-gray-600 hover:text-gray-900",
                      isActive(item.href) && "text-teal-600 font-semibold"
                    )}
                    {...(item.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.text}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="flex items-center ml-auto">
            <LanguageSelector />
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden ml-4 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}>
          <nav className="px-6 py-4 border-t border-gray-200/50">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.children?.length ? (
                    <div className="space-y-2">
                      <div className="font-medium text-gray-900">
                        {item.text}
                      </div>
                      <div className="pl-4 space-y-2 border-l border-gray-200">
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={child.href}
                            className="block text-sm text-gray-600 hover:text-teal-600 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                            {...(child.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            {child.text}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "block text-gray-600 font-medium hover:text-teal-600 transition-colors",
                        isActive(item.href) && "text-teal-600"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                      {...(item.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {item.text}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </header>
    </div>
  )
} 