// src/components/filters/SearchBar.tsx
'use client'

import React, { useState, useEffect } from 'react'

import { Search, X, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      search ? params.set('search', search) : params.delete('search')
      router.push(`?${params.toString()}`)
      setIsLoading(false)
    }, 800)

    return () => {
      clearTimeout(delayDebounceFn)
      setIsLoading(false)
    }
  }, [search, router, searchParams])

  const clearSearch = () => {
    setSearch('')
    const params = new URLSearchParams(searchParams.toString())
    params.delete('search')
    router.push(`?${params.toString()}`)
  }

  return (
    <div className='group relative w-full mx-auto'>
      <div className='relative'>
        <input
          type='text'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Ürün ara...'
          className='w-full text-gray-700 pl-14 pr-12 py-4 bg-white border-2 border-gray-200 rounded-2xl shadow-sm
                    placeholder-gray-400
                    focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                    transition-all duration-200
                    hover:border-gray-300'
        />

        <Search className='absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-blue-500' />

        {/* Temizle/Yükleniyor Göstergesi */}
        <div className='absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2'>
          {isLoading ? (
            <Loader2 className='w-5 h-5 text-blue-500 animate-spin' />
          ) : search ? (
            <button
              onClick={clearSearch}
              className='p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
            >
              <X className='w-5 h-5 text-gray-500 hover:text-gray-700' />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default SearchBar
