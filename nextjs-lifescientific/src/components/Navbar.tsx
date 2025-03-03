"use client"

import React, { useState } from 'react'
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
  FileTextIcon, 
  HomeIcon, 
  InfoIcon, 
  MailIcon, 
  PackageIcon, 
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
  const pathname = usePathname()

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'home':
        return <HomeIcon className="h-4 w-4" />
      case 'package':
        return <PackageIcon className="h-4 w-4" />
      case 'file-text':
        return <FileTextIcon className="h-4 w-4" />
      case 'mail':
        return <MailIcon className="h-4 w-4" />
      case 'info':
        return <InfoIcon className="h-4 w-4" />
      default:
        return null
    }
  }

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
      href: `/${currentLang}`,
      icon: 'home'
    },
    {
      text: translations?.nav?.products || 'Products',
      href: `/${currentLang}/products`,
      icon: 'package'
    },
    {
      text: translations?.nav?.blog || 'Blog',
      href: `/${currentLang}/blog`,
      icon: 'file-text'
    },
    {
      text: translations?.nav?.about || 'About',
      href: `/${currentLang}/about`,
      icon: 'info'
    },
    {
      text: translations?.nav?.contact || 'Contact',
      href: `/${currentLang}/contact`,
      icon: 'mail'
    }
  ]

  const navItems = items.length > 0 ? items : fallbackItems

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:max-w-[80%]">
        <div className="mr-4 flex">
          <Link 
            className="mr-6 flex items-center space-x-2 text-xl font-bold hover:text-primary transition-colors" 
            href={`/${currentLang}`}
          >
            {logo ? (
              <Image 
                src={urlForImage(logo)?.url() || ''} 
                alt={logo.alt || logoText}
                width={40}
                height={40}
                className="h-8 w-auto"
              />
            ) : null}
            <span>{logoText}</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-between space-x-4 md:justify-end">
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.children?.length ? (
                <Menu>
                  <MenuTrigger asChild>
                    <MenuButton
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                        isActive(item.href) && "text-primary"
                      )}
                    >
                      {getIcon(item.icon)}
                      <span>{item.text}</span>
                      <ChevronDownIcon className="h-4 w-4" />
                    </MenuButton>
                  </MenuTrigger>
                  <MenuContent>
                    {item.children.map((child, childIndex) => (
                      <MenuItem key={childIndex}>
                        <Link
                          href={child.href}
                          className="w-full"
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
                    "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                    isActive(item.href) && "text-primary"
                  )}
                  {...(item.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {getIcon(item.icon)}
                  <span>{item.text}</span>
                </Link>
              )}
            </React.Fragment>
          ))}
          <div className="ml-4 flex items-center">
            <LanguageSelector />
          </div>
        </nav>
        
        {/* Mobile Navigation */}
        <div className="flex md:hidden flex-1 justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
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
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white border-b">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.children?.length ? (
                  <div className="space-y-2">
                    <div className="font-medium text-gray-900 flex items-center">
                      {getIcon(item.icon)}
                      <span className="ml-1">{item.text}</span>
                    </div>
                    <div className="pl-5 space-y-2 border-l border-gray-200">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href}
                          className="block text-sm text-gray-600 hover:text-primary"
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
                      "flex items-center text-gray-900 font-medium hover:text-primary",
                      isActive(item.href) && "text-primary"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                    {...(item.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {getIcon(item.icon)}
                    <span className="ml-1">{item.text}</span>
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-2 border-t border-gray-200">
              <LanguageSelector />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
} 