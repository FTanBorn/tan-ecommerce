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
    <div className='group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200'>
      {/* Üst Etiketler */}
      <div className='absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium'>
        En Çok Satan
      </div>

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

        {/* İndirim Yüzdesi Badge'i */}
        {discountPercentage > 0 && (
          <div className='absolute top-3 right-3 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md'>
            %{Math.round(discountPercentage)} İndirim
          </div>
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
          <h3 className='font-medium text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap'>
            {title}
          </h3>
          <div className='flex items-center gap-1 mt-1'>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className='text-sm text-gray-500'>({rating})</span>
          </div>
        </div>

        {/* Fiyat Alanı */}
        <div className='flex items-baseline gap-2 '>
          {discountPercentage > 0 && (
            <span className='text-xs md:text-sm font-medium text-gray-400 line-through'>
              {new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: 'TRY'
              }).format(price / (1 - discountPercentage / 100))}
            </span>
          )}
          <span className='text-sm md:text-lg font-bold text-gray-900'>
            {new Intl.NumberFormat('tr-TR', {
              style: 'currency',
              currency: 'TRY'
            }).format(price)}
          </span>
        </div>

        {/* Sepet Butonu veya Miktar Kontrolü */}
        <div className='flex items-center gap-2'>
          {quantityInCart === 0 ? (
            <button
              onClick={handleAddToCart}
              disabled={stock === 0}
              className={`w-full h-10 px-4 rounded-full flex items-center justify-center gap-2 
                ${stock > 0 ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-100'} 
                transition-all`}
            >
              <ShoppingCart className='w-4 h-4' />
              <span className='text-sm font-medium text-current'>
                {stock === 0 ? 'Stokta Yok' : 'Sepete Ekle'}
              </span>
            </button>
          ) : (
            <div
              className={`flex items-center gap-1 bg-orange-500 rounded-full p-1 w-full justify-between`}
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
                className='w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:hover:bg-transparent'
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
