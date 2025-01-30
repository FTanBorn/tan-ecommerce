// src/components/checkout/OrderSummary.tsx

import { Truck } from 'lucide-react'
import Image from 'next/image'

import type { CartItem } from '@/types'

interface OrderSummaryProps {
  items: CartItem[]
  totalPrice: number
  shippingPrice?: number
}

export default function OrderSummary({ items, totalPrice, shippingPrice = 0 }: OrderSummaryProps) {
  return (
    <div className='bg-white rounded-2xl shadow-lg p-6 sticky top-24'>
      <h3 className='text-lg font-semibold text-gray-900 pb-4 border-b'>Sipariş Özeti</h3>

      {/* Ürün Listesi */}
      <div className='mt-6 space-y-4 max-h-[400px] overflow-y-auto pr-2'>
        {items.map(item => (
          <div
            key={item.product.id}
            className='flex gap-4 py-2 hover:bg-gray-50 rounded-lg -mx-2 px-2 transition-colors'
          >
            <div className='relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100'>
              <Image
                src={item.product.thumbnail}
                alt={item.product.title}
                fill
                className='object-cover object-center'
              />
            </div>
            <div className='flex-1 min-w-0'>
              <h4 className='text-sm font-medium text-gray-900 line-clamp-2'>
                {item.product.title}
              </h4>
              <div className='mt-1 flex items-center gap-2 text-sm text-gray-500'>
                <span>{item.quantity} adet</span>
                <span>×</span>
                <span>
                  {new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                  }).format(item.product.price)}
                </span>
              </div>
            </div>
            <div className='text-sm font-medium text-gray-900'>
              {new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: 'TRY'
              }).format(item.product.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      {/* Fiyat Özeti */}
      <div className='mt-6 space-y-4'>
        <div className='flex justify-between text-sm'>
          <span className='text-gray-500'>Ara Toplam</span>
          <span className='text-black font-medium'>
            {new Intl.NumberFormat('tr-TR', {
              style: 'currency',
              currency: 'TRY'
            }).format(totalPrice)}
          </span>
        </div>

        <div className='flex justify-between text-sm'>
          <span className='text-gray-500'>Kargo</span>
          <span className='font-medium text-green-600'>
            {shippingPrice === 0 ? 'Ücretsiz' : `${shippingPrice} TL`}
          </span>
        </div>

        <div className='flex text-black justify-between text-base font-semibold pt-4 border-t'>
          <span>Toplam</span>
          <span>
            {new Intl.NumberFormat('tr-TR', {
              style: 'currency',
              currency: 'TRY'
            }).format(totalPrice + shippingPrice)}
          </span>
        </div>
      </div>

      {/* Kargo Bilgisi */}
      <div className='mt-6'>
        <div className='rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4'>
          <div className='flex items-center gap-3'>
            <Truck className='w-5 h-5 text-orange-600' />
            <div>
              <p className='text-sm font-medium text-orange-900'>Ücretsiz Kargo</p>
              <p className='text-sm text-orange-700 mt-0.5'>Tahmini Teslimat: 3-5 iş günü</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
