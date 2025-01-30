// src/components/cart/CartItem.tsx
'use client'

import React from 'react'

import { Trash2, Plus, Minus } from 'lucide-react'
import Image from 'next/image'

import { useCart } from '@/contexts/CartContext'
import type { CartItem as ICartItem } from '@/types'

interface CartItemProps {
  item: ICartItem
  onUpdateQuantity: (productId: number, quantity: number) => void
  onRemove: (productId: number) => void
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const { product, quantity } = item
  const { productStocks } = useCart()
  const currentStock = productStocks[product.id] ?? product.stock

  return (
    <div className='flex gap-4 py-4 border-b border-gray-100 last:border-none'>
      {/* Ürün Resmi */}
      <div className='relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50'>
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className='object-cover object-center'
        />
      </div>

      {/* Ürün Detayları */}
      <div className='flex flex-1 flex-col'>
        <div className='flex justify-between gap-4'>
          <h3 className='text-sm font-medium text-gray-900 line-clamp-2'>{product.title}</h3>
          <button
            onClick={() => onRemove(product.id)}
            className='text-gray-400 hover:text-red-500 transition-colors p-1'
          >
            <Trash2 className='h-5 w-5' />
          </button>
        </div>

        <div className='mt-auto flex items-end justify-between'>
          {/* Fiyat */}
          <div className='text-sm'>
            <div className='font-medium text-gray-900'>
              {new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: 'TRY'
              }).format(product.price * quantity)}
            </div>
            {quantity > 1 && (
              <div className='text-xs text-gray-500'>
                Birim:{' '}
                {new Intl.NumberFormat('tr-TR', {
                  style: 'currency',
                  currency: 'TRY'
                }).format(product.price)}
              </div>
            )}
          </div>

          {/* Miktar Kontrolü */}
          <div className='flex items-center border border-gray-200 rounded-lg'>
            <button
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
              className='p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-l-lg disabled:text-gray-400 disabled:hover:bg-transparent transition-colors'
            >
              <Minus className='h-4 w-4' />
            </button>
            <span className='w-10 text-center text-sm font-medium'>{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              disabled={currentStock === 0}
              className='p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-r-lg disabled:text-gray-400 disabled:hover:bg-transparent transition-colors'
            >
              <Plus className='h-4 w-4' />
            </button>
          </div>
        </div>

        {/* Stok Bilgisi */}
        {currentStock < 3 && currentStock > 0 && (
          <div className='mt-2 text-xs text-red-500'>Son {currentStock} adet kaldı!</div>
        )}
      </div>
    </div>
  )
}

export default CartItem
