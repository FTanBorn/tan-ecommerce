// src/components/checkout/ShippingForm.tsx

import { Truck, Zap, Clock } from 'lucide-react'

interface ShippingFormProps {
  onNext: () => void
  onBack: () => void
}

const SHIPPING_OPTIONS = [
  {
    id: 'standard',
    title: 'Standart Teslimat',
    description: '3-5 iş günü içinde teslimat',
    price: 'Ücretsiz',
    icon: Truck
  },
  {
    id: 'express',
    title: 'Hızlı Teslimat',
    description: '1-2 iş günü içinde teslimat',
    price: '29.90 TL',
    icon: Clock
  },
  {
    id: 'same_day',
    title: 'Aynı Gün Teslimat',
    description: 'Bugün içinde teslimat',
    price: '49.90 TL',
    icon: Zap
  }
]

export default function ShippingForm({ onNext, onBack }: ShippingFormProps) {
  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        {SHIPPING_OPTIONS.map(option => (
          <label
            key={option.id}
            className='relative block p-4 rounded-xl border-2 border-gray-200 cursor-pointer
                       hover:border-blue-500 hover:bg-blue-50 transition-all'
          >
            <input
              type='radio'
              name='shipping'
              value={option.id}
              className='absolute h-0 w-0 opacity-0'
            />
            <div className='flex items-start gap-4'>
              <div className='p-2 bg-blue-100 rounded-lg text-orange-600'>
                <option.icon className='w-6 h-6' />
              </div>
              <div className='flex-1'>
                <div className='flex justify-between items-center'>
                  <div>
                    <h3 className='font-medium text-gray-900'>{option.title}</h3>
                    <p className='text-sm text-gray-500 mt-1'>{option.description}</p>
                  </div>
                  <span className='font-medium text-gray-900'>{option.price}</span>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Kargo Notu */}
      <div className='bg-blue-50 rounded-xl p-4'>
        <div className='flex items-center gap-3 text-orange-600'>
          <Truck className='w-5 h-5 flex-shrink-0' />
          <p className='text-sm'>
            <span className='font-medium'>150 TL</span> ve üzeri siparişlerde kargo bedava!
          </p>
        </div>
      </div>

      {/* Butonlar */}
      <div className='flex justify-end gap-4 pt-4'>
        <button
          onClick={onBack}
          className='px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100
                     focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                     transition-all duration-200'
        >
          Geri
        </button>
        <button
          onClick={onNext}
          className='px-8 py-3 bg-orange-600 text-white font-medium rounded-xl hover:bg-orange-700
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                     transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
        >
          Devam Et
        </button>
      </div>
    </div>
  )
}
