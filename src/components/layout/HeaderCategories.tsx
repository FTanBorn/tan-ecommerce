// src/components/layout/HeaderCategories.tsx
'use client'

import { memo } from 'react'

import { Menu, ChevronDown } from 'lucide-react'
import Link from 'next/link'

import type { Category } from '@/types'

interface HeaderCategoriesProps {
  categories: Category[]
}

const HeaderCategories = memo(function HeaderCategories({ categories }: HeaderCategoriesProps) {
  return (
    <nav className='hidden md:flex items-center gap-6'>
      <div className='relative group'>
        <button className='flex items-center gap-1 text-gray-600 hover:text-gray-900'>
          <Menu className='w-5 h-5' />
          <span>Kategoriler</span>
          <ChevronDown className='w-4 h-4' />
        </button>
        <div className='absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all'>
          <div className='py-2'>
            {categories.map(category => (
              <Link
                key={category.slug}
                href={`/?category=${category.slug}`}
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
})

export default HeaderCategories
