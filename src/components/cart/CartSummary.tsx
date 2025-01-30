// src/components/cart/CartSummary.tsx
'use client'

import { memo } from 'react'

import { ShoppingCart } from 'lucide-react'

interface CartSummaryProps {
  totalItems: number
  onClick: () => void
}

// memo kullanmamın sebebi, CartSummary bileşeninin yalnızca props'ları değiştiğinde yeniden render edilmesini sağlamak.
// Bu, performans optimizasyonu sağlar ve gereksiz render işlemlerini önler.
const CartSummary = memo(function CartSummary({ totalItems, onClick }: CartSummaryProps) {
  return (
    <button
      onClick={onClick}
      className='relative p-2 hover:bg-gray-50 rounded-full transition-colors'
    >
      <ShoppingCart className='h-6 w-6 text-gray-600' />
      {totalItems > 0 && (
        <span className='absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full'>
          {totalItems}
        </span>
      )}
    </button>
  )
})

export default CartSummary
