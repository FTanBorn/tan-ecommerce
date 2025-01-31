// src/components/products/ProductGrid.tsx
'use client'

import React, { useEffect, useState, useCallback } from 'react'

import { Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import ProductCard from './ProductCard'

import type { Product } from '@/types'

const LIMIT = 12

const ProductGrid = () => {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const { ref, inView } = useInView({ threshold: 0 })

  const sort = searchParams.get('sort') || ''
  const category = searchParams.get('category') || ''
  const search = searchParams.get('search') || ''
  const inStock = searchParams.get('inStock') || ''
  const minRating = searchParams.get('minRating') || ''
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''

  const fetchProducts = useCallback(
    async (skip: number = 0) => {
      setIsLoading(true)
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        let url = `${apiUrl}/products`
        url += `?limit=${LIMIT}&skip=${skip}`

        if (category) url += `&category=${encodeURIComponent(category)}`
        if (search) url += `&search=${encodeURIComponent(search)}`
        if (inStock === 'true') url += `&inStock=true`
        if (minRating) url += `&minRating=${minRating}`
        if (minPrice) url += `&minPrice=${minPrice}`
        if (maxPrice) url += `&maxPrice=${maxPrice}`
        if (sort) {
          const [field, order] = sort.split('-')
          url += `&sort=${field}-${order === 'desc' ? 'desc' : 'asc'}`
        }

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Ürünler yüklenirken bir hata oluştu')
        }
        const data = await response.json()
        return data
      } catch (error) {
        console.error('Ürünler yüklenirken hata oluştu:', error)
        return { products: [], total: 0 }
      } finally {
        setIsLoading(false)
      }
    },
    [category, search, inStock, minRating, minPrice, maxPrice, sort]
  )

  const loadInitialData = useCallback(async () => {
    const data = await fetchProducts(0)
    setProducts(data.products)
    setTotal(data.total)
  }, [fetchProducts])

  const loadMore = useCallback(async () => {
    if (isLoading || products.length >= total) return
    const data = await fetchProducts(products.length)
    setProducts(prev => [...prev, ...data.products])
  }, [fetchProducts, isLoading, products.length, total])

  useEffect(() => {
    setProducts([])
    loadInitialData()
  }, [sort, category, search, inStock, minRating, minPrice, maxPrice, loadInitialData])

  useEffect(() => {
    if (inView) loadMore()
  }, [inView, loadMore])

  if (isLoading && products.length === 0) {
    return (
      <div className='h-96 flex items-center justify-center'>
        <Loader2 className='w-8 h-8 animate-spin text-orange-500' />
      </div>
    )
  }

  if (!isLoading && products.length === 0) {
    return (
      <div className='h-96 flex flex-col items-center justify-center text-gray-500'>
        <div className='text-xl mb-2'>Ürün Bulunamadı</div>
        <div className='text-sm'>Lütfen filtreleri değiştirerek tekrar deneyin.</div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-2 md:px-4'>
      <div className='flex justify-between items-center mb-4 md:mb-6'>
        <h2 className='text-lg md:text-xl font-semibold text-gray-800'>
          {search ? `"${search}" sonuçları` : 'Tüm Ürünler'}
        </h2>
        <span className='text-xs md:text-sm text-gray-500'>{total} ürün</span>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols gap-3 md:gap-4'>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length < total && (
        <div ref={ref} className='flex justify-center mt-6'>
          {isLoading && <Loader2 className='w-6 h-6 md:w-8 md:h-8 animate-spin text-orange-500' />}
        </div>
      )}
    </div>
  )
}

export default ProductGrid
