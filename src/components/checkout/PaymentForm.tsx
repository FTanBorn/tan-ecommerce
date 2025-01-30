// src/components/checkout/PaymentForm.tsx

import { CreditCard, Lock, LoaderCircle } from 'lucide-react'

interface PaymentFormProps {
  onBack: () => void
  onComplete: () => void
  isLoading: boolean
}

export default function PaymentForm({ onBack, onComplete, isLoading }: PaymentFormProps) {
  return (
    <div>
      {/* Güvenlik Bildirimi */}
      <div className='mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-white rounded-lg'>
            <Lock className='w-5 h-5 text-blue-600' />
          </div>
          <div>
            <p className='text-sm font-medium text-blue-900'>Güvenli Ödeme</p>
            <p className='text-sm text-blue-700 mt-0.5'>
              256-bit SSL şifrelemesi ile güvenli ödeme
            </p>
          </div>
        </div>
      </div>

      {/* Kart Bilgileri */}
      <div className='space-y-6'>
        <div className='grid grid-cols-2 gap-6'>
          {/* Kart Üzerindeki İsim */}
          <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Kart Üzerindeki İsim
            </label>
            <input
              type='text'
              placeholder='Furkan Tandoğan'
              className='w-full px-4 py-3 rounded-xl  text-black border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors'
            />
          </div>

          {/* Kart Numarası */}
          <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Kart Numarası</label>
            <div className='relative'>
              <input
                type='text'
                placeholder='4242 4242 4242 4242'
                className='w-full pl-12 pr-4 py-3 rounded-xl text-black border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors'
              />
              <CreditCard className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
            </div>
          </div>

          {/* Son Kullanma Tarihi */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Son Kullanma Tarihi
            </label>
            <input
              type='text'
              placeholder='MM/YY'
              className='w-full px-4 py-3 rounded-xl text-black border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors'
            />
          </div>

          {/* CVC */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>CVC/CVV</label>
            <input
              type='text'
              placeholder='123'
              maxLength={3}
              className='w-full px-4 py-3 rounded-xl text-black border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors'
            />
          </div>
        </div>

        {/* Taksit Seçenekleri */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Taksit Seçenekleri</label>
          <select className='w-full px-4 py-3 rounded-xl text-black border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors'>
            <option value='1'>Tek Çekim</option>
            <option value='3'>3 Taksit</option>
            <option value='6'>6 Taksit</option>
            <option value='9'>9 Taksit</option>
          </select>
        </div>

        {/* Kartı Kaydet */}
        <div className='flex items-center'>
          <input
            id='saveCard'
            type='checkbox'
            className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
          />
          <label htmlFor='saveCard' className='ml-2 block text-sm text-gray-700'>
            Bu kartı sonraki alışverişlerim için kaydet
          </label>
        </div>
      </div>

      {/* Butonlar */}
      <div className='flex justify-end gap-4 mt-8'>
        <button
          type='button'
          onClick={onBack}
          disabled={isLoading}
          className='px-6 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100
                   focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                   transition-all duration-200 disabled:opacity-50'
        >
          Geri
        </button>
        <button
          type='button'
          onClick={onComplete}
          disabled={isLoading}
          className='px-8 py-3 bg-blue-600 text-white font-medium rounded-xl
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                   focus:ring-offset-2 transition-all duration-200
                   hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50
                   disabled:hover:scale-100 flex items-center gap-2'
        >
          {isLoading ? (
            <>
              <LoaderCircle className='w-5 h-5 animate-spin' />
              İşleniyor...
            </>
          ) : (
            'Ödemeyi Tamamla'
          )}
        </button>
      </div>
    </div>
  )
}
