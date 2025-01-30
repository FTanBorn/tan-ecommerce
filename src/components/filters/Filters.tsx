// src/components/filters/Filters.tsx
'use client'

import React, { useEffect, useState } from 'react'

import { ArrowUpDown, LayoutGrid, Package, Star, Wallet, ChevronDown, FilterX } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

// Kategori arayüzü
interface Category {
  slug: string
  name: string
}

// Sıralama seçenekleri
const SORT_OPTIONS = [
  { value: '', label: 'Sıralama' },
  { value: 'price-asc', label: 'Fiyat: Düşükten Yükseğe' },
  { value: 'price-desc', label: 'Fiyat: Yüksekten Düşüğe' },
  { value: 'rating-desc', label: 'En Çok Değerlendirilenler' },
  { value: 'discount-desc', label: 'En Yüksek İndirim' },
  { value: 'newest', label: 'En Yeni Ürünler' }
]

interface FiltersProps {
  categories: Category[] // Server tarafından gelecek data cacheden alınacak
  className?: string
}

const Filters = ({ className = '', categories }: FiltersProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Durumlar
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [minRating, setMinRating] = useState(searchParams.get('minRating') || '')
  const currentSort = searchParams.get('sort') || ''
  const currentCategory = searchParams.get('category') || ''
  const inStock = searchParams.get('inStock') === 'true'

  // Aktif filtre kontrolü
  const hasActiveFilters = Boolean(currentSort || currentCategory || inStock || minRating || minPrice || maxPrice)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const updateUrl = (params: { [key: string]: string | null }) => {
    const newParams = new URLSearchParams(searchParams.toString())
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key)
      } else {
        newParams.set(key, value)
      }
    })
    const queryString = newParams.toString()
    router.push(`?${queryString}`)
  }

  const clearAllFilters = () => {
    setMinPrice('')
    setMaxPrice('')
    setMinRating('')
    const currentSearch = searchParams.get('search')
    router.push(currentSearch ? `?search=${currentSearch}` : '/')
  }

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  const shouldShowSection = (sectionName: string) => {
    if (!isClient) return true
    return openSection === sectionName || window.innerWidth >= 1024
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 lg:p-6 space-y-6 border border-gray-100 ${className}`}>
      {/* Başlık ve Temizleme */}
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
          <FilterX className='w-5 h-5 text-blue-600' />
          Filtreler
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className='text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1'
          >
            Temizle
            <FilterX className='w-4 h-4' />
          </button>
        )}
      </div>

      {/* Sıralama */}
      <div>
        <button
          onClick={() => toggleSection('sort')}
          className='flex items-center justify-between w-full py-2 lg:cursor-default'
        >
          <div className='flex items-center gap-2 text-gray-700'>
            <ArrowUpDown className='w-5 h-5 text-blue-600' />
            <span className='font-medium'>Sırala</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 lg:hidden transition-transform ${openSection === 'sort' ? 'rotate-180' : ''}`}
          />
        </button>
        <div className={`mt-3 ${shouldShowSection('sort') ? 'block' : 'hidden'}`}>
          <select
            value={currentSort}
            onChange={e => updateUrl({ sort: e.target.value || null })}
            className='w-full px-4 py-3 text-black text-sm bg-white border-2 border-gray-200 rounded-xl cursor-pointer transition-all hover:border-blue-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kategoriler */}
      <div>
        <button
          onClick={() => toggleSection('categories')}
          className='flex items-center justify-between w-full py-2 lg:cursor-default'
        >
          <div className='flex items-center gap-2 text-gray-700'>
            <LayoutGrid className='w-5 h-5 text-blue-600' />
            <span className='font-medium'>Kategoriler</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 lg:hidden transition-transform ${openSection === 'categories' ? 'rotate-180' : ''}`}
          />
        </button>
        <div className={`mt-3 ${shouldShowSection('categories') ? 'block' : 'hidden'}`}>
          <button
            onClick={() => updateUrl({ category: '' })}
            className={`w-full p-2 text-sm rounded-lg transition-colors ${
              !currentCategory ? 'bg-blue-600 text-white font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tüm Kategoriler
          </button>
          <div className='max-h-48 overflow-y-auto mt-2 space-y-1'>
            {categories.map(category => (
              <button
                key={category.slug}
                onClick={() => updateUrl({ category: category.slug })}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  currentCategory === category.slug
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stok Durumu */}
      <div>
        <button
          onClick={() => toggleSection('stock')}
          className='flex items-center justify-between w-full py-2 lg:cursor-default'
        >
          <div className='flex items-center gap-2 text-gray-700'>
            <Package className='w-5 h-5 text-blue-600' />
            <span className='font-medium'>Stok Durumu</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 lg:hidden transition-transform ${openSection === 'stock' ? 'rotate-180' : ''}`}
          />
        </button>
        <div className={`mt-3 ${shouldShowSection('stock') ? 'block' : 'hidden'}`}>
          <label className='flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer'>
            <span className='text-sm text-gray-700'>Stokta Olanlar</span>
            <div className='relative'>
              <input
                type='checkbox'
                checked={inStock}
                onChange={() => updateUrl({ inStock: (!inStock).toString() })}
                className='sr-only peer'
              />
              <div className='w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition-colors' />
              <div className='absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5' />
            </div>
          </label>
        </div>
      </div>

      {/* Minimum Puan */}
      <div>
        <button
          onClick={() => toggleSection('rating')}
          className='flex items-center justify-between w-full py-2 lg:cursor-default'
        >
          <div className='flex items-center gap-2 text-gray-700'>
            <Star className='w-5 h-5 text-blue-600' />
            <span className='font-medium'>Minimum Puan</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 lg:hidden transition-transform ${openSection === 'rating' ? 'rotate-180' : ''}`}
          />
        </button>
        <div className={`mt-3 ${shouldShowSection('rating') ? 'block' : 'hidden'}`}>
          <div className='flex flex-wrap gap-2'>
            {[1, 2, 3, 4].map(rating => (
              <button
                key={rating}
                onClick={() => {
                  if (Number(minRating) === rating) {
                    setMinRating('')
                    updateUrl({ minRating: null })
                  } else {
                    setMinRating(rating.toString())
                    updateUrl({ minRating: rating.toString() })
                  }
                }}
                className={`flex items-center gap-1 px-2 py-2 rounded-lg text-sm transition-all ${
                  Number(minRating) === rating
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Star className={`w-4 h-4 ${Number(minRating) === rating ? 'fill-white' : 'fill-gray-300'}`} />
                {rating}+
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fiyat Aralığı */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className='flex items-center justify-between w-full py-2 lg:cursor-default'
        >
          <div className='flex items-center gap-2 text-gray-700'>
            <Wallet className='w-5 h-5 text-blue-600' />
            <span className='font-medium'>Fiyat Aralığı</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 lg:hidden transition-transform ${openSection === 'price' ? 'rotate-180' : ''}`}
          />
        </button>
        <div className={`mt-3 ${shouldShowSection('price') ? 'block' : 'hidden'}`}>
          <div className='flex-col gap-3 items-center space-y-4'>
            <input
              type='number'
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              placeholder='En az'
              className='flex-1 p-2 w-full border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
            />
            <input
              type='number'
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              placeholder='En çok'
              className='flex-1 p-2 w-full border text-black border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
            />
          </div>
          <button
            onClick={() =>
              updateUrl({
                minPrice: minPrice || null,
                maxPrice: maxPrice || null
              })
            }
            className='w-full mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors'
          >
            Fiyatı Uygula
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filters
