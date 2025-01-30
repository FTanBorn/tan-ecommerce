'use client'

import React from 'react'
import Image from 'next/image'
import { Star, ShoppingCart, Plus, Minus } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { items, productStocks, addToCart, updateQuantity } = useCart()
  const { id, title, price, thumbnail, rating, stock, discountPercentage } = product

  const cartItem = items.find(item => item.product.id === id)
  const quantityInCart = cartItem?.quantity || 0
  const currentStock = productStocks[id] ?? stock

  const handleAddToCart = () => {
    addToCart(product)
  }

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(id, newQuantity)
  }

  return (
    <div className='group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-orange-50 hover:border-orange-100 hover:bg-orange-50/20 hover:-translate-y-1'>
      {/* Fotoğraf Alanı */}
      <div className='relative aspect-square'>
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-300'
            loading='lazy'
          />
        )}

        {/* Stok Badge'i */}
        {currentStock <= 2 && currentStock > 0 && (
          <div className='absolute top-3 left-3 flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs'>
            <span>Son {currentStock} ürün</span>
          </div>
        )}
      </div>

      {/* Ürün Bilgileri */}
      <div className='p-4 space-y-3'>
        {/* Başlık ve Rating kısmı */}
        <div>
          <h3 className='font-medium text-gray-800 line-clamp-2 min-h-[2.5rem]'>{title}</h3>
          <div className='flex items-center gap-1 mt-1'>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className='text-sm text-gray-500'>({rating})</span>
          </div>
        </div>

        {/* Fiyat ve Sepet Butonu için */}
        <div className='flex flex-col sm:flex-row items-end justify-between pt-2 gap-2'>
          {/* Fiyat Alanı */}
          <div className='flex-1 min-w-0'>
            {discountPercentage > 0 ? (
              <>
                <div className='flex items-baseline gap-2'>
                  <span className='text-xl font-bold text-green-600 whitespace-nowrap overflow-hidden text-ellipsis'>
                    {new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: 'TRY'
                    }).format(price * (1 - discountPercentage / 100))}
                  </span>
                </div>
                <span className='text-xs text-green-600 mt-1'>%{Math.round(discountPercentage)} indirim</span>
              </>
            ) : (
              <span className='text-xl font-bold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis'>
                {new Intl.NumberFormat('tr-TR', {
                  style: 'currency',
                  currency: 'TRY'
                }).format(price)}
              </span>
            )}
          </div>

          {/* Sepet Butonu veya Miktar Kontrolü */}
          {quantityInCart === 0 ? (
            <button
              onClick={handleAddToCart}
              disabled={stock === 0}
              className={`w-full sm:w-auto h-10 px-4 rounded-full flex items-center justify-center gap-2 
                ${stock > 0 ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-100'} 
                transition-all flex-shrink-0`}
            >
              <ShoppingCart className='w-4 h-4' />
              <span className='text-sm font-medium text-current'>{stock === 0 ? 'Stokta Yok' : 'Sepete Ekle'}</span>
            </button>
          ) : (
            <div
              className={`flex items-center gap-1 ${currentStock === 0 ? 'bg-gray-400' : 'bg-orange-500'} rounded-full p-1 w-full sm:w-auto justify-between flex-shrink-0`}
            >
              <button
                onClick={() => handleUpdateQuantity(quantityInCart - 1)}
                className='w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors'
              >
                <Minus className='w-4 h-4 text-white' />
              </button>
              <span className='w-8 text-center text-white font-medium'>{quantityInCart}</span>
              <button
                onClick={() => handleUpdateQuantity(quantityInCart + 1)}
                disabled={currentStock === 0}
                className='w-8 h-8 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:hover:bg-transparent'
              >
                <Plus className='w-4 h-4 text-white' />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
