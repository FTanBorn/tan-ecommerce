// src/app/success/page.tsx

import { CheckCircle2, Package, ArrowRight, Home, FileText } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className='min-h-screen w-full bg-gray-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-lg mx-auto'>
        {/* Başarı Kartı */}
        <div className='bg-white rounded-2xl shadow-sm p-6 sm:p-8 md:p-12 mx-4 sm:mx-0'>
          {/* Başarı İkonu */}
          <div className='flex justify-center'>
            <div
              className='w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center
                          transform transition-transform hover:scale-105'
            >
              <CheckCircle2 className='w-8 h-8 sm:w-10 sm:h-10 text-green-500' />
            </div>
          </div>

          {/* Başarı Mesajı */}
          <div className='mt-5 sm:mt-6 text-center'>
            <h1 className='text-xl sm:text-2xl font-semibold text-gray-900'>Siparişiniz Alındı!</h1>
            <p className='mt-2 text-sm sm:text-base text-gray-600'>
              Sipariş numaranız: <span className='font-medium text-gray-900'>#34562</span>
            </p>
          </div>

          {/* Sipariş Bilgisi */}
          <div className='mt-6 sm:mt-8'>
            <div
              className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4
                          transform transition-all hover:scale-[1.02]'
            >
              <div className='flex items-center gap-3'>
                <div className='flex-shrink-0'>
                  <Package className='w-5 h-5 text-orange-600' />
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='text-sm font-medium text-orange-900 truncate'>Tahmini Teslimat</p>
                  <p className='text-sm text-orange-700 mt-0.5'>27 Ocak 2025, Pazartesi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Eylem Butonları */}
          <div className='mt-6 sm:mt-8 space-y-3'>
            {/* Siparişlerim Button */}
            <Link
              href='/'
              className='w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3
                       bg-orange-600 text-white font-medium rounded-xl text-sm sm:text-base
                       hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500
                       focus:ring-offset-2 transition-all active:scale-[0.98]'
            >
              <FileText className='w-4 h-4 sm:w-5 sm:h-5' />
              <span>Siparişlerim</span>
              <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5' />
            </Link>

            {/* Ana Sayfa Button */}
            <Link
              href='/'
              className='w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3
                       bg-gray-100 text-gray-700 font-medium rounded-xl text-sm sm:text-base
                       hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500
                       focus:ring-offset-2 transition-all active:scale-[0.98]'
            >
              <Home className='w-4 h-4 sm:w-5 sm:h-5' />
              <span>Alışverişe Devam Et</span>
            </Link>
          </div>

          {/* Mail Bilgisi */}
          <div className='mt-6 sm:mt-8 text-center'>
            <p className='text-xs sm:text-sm text-gray-500'>
              Sipariş detaylarınız mail adresinize gönderildi.
            </p>
          </div>

          {/* Destek ile İletişime Geçin */}
          <div className='mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100'>
            <p className='text-xs sm:text-sm text-center text-gray-500'>
              Sorunuz mu var?{' '}
              <Link
                href='/'
                className='text-blue-600 hover:text-blue-700 font-medium
                         inline-flex items-center hover:underline'
              >
                Müşteri hizmetleriyle iletişime geçin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
