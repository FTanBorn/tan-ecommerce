// src/app/checkout/page.tsx
'use client'

import { useState, useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Components
import AddressForm from '@/components/checkout/AddressForm'
import CheckoutStepper from '@/components/checkout/CheckoutStepper'
import OrderSummary from '@/components/checkout/OrderSummary'
import PaymentForm from '@/components/checkout/PaymentForm'
import ShippingForm from '@/components/checkout/ShippingForm'
import { useCart } from '@/contexts/CartContext'

type CheckoutStep = 'address' | 'shipping' | 'payment'

// CheckoutPage bileşeni
export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address')
  const [isClient, setIsClient] = useState(false)

  // Hydration için
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Sipariş tamamlandığında çağrılır
  const handleComplete = () => {
    clearCart()
    router.push('/success')
  }

  // Adım değiştirildiğinde çağrılır
  const handleStepChange = (step: CheckoutStep) => {
    setCurrentStep(step)
    // Sayfanın üstüne yumuşak kaydırma
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Yüklenme durumu
  if (!isClient) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500' />
      </div>
    )
  }

  // Boş sepet kontrolü
  if (items.length === 0) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <div className='text-center space-y-4 p-8'>
          <h2 className='text-2xl font-semibold text-gray-900'>Sepetiniz Boş</h2>
          <p className='text-gray-500'>Ödeme yapabilmek için sepetinize ürün eklemelisiniz.</p>
          <Link
            href='/'
            className='inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-xl
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:ring-offset-2 transition-all duration-200'
          >
            Alışverişe Başla
          </Link>
        </div>
      </div>
    )
  }

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 'address':
        return <AddressForm onNext={() => handleStepChange('shipping')} />
      case 'shipping':
        return <ShippingForm onNext={() => handleStepChange('payment')} onBack={() => handleStepChange('address')} />
      case 'payment':
        return <PaymentForm onComplete={handleComplete} onBack={() => handleStepChange('shipping')} isLoading={false} />
      default:
        return null
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        {/* Adımlar */}
        <CheckoutStepper currentStep={currentStep} onStepChange={handleStepChange} />

        {/* İçerik */}
        <div className='mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12'>
          {/* Formkar */}
          <div className='lg:col-span-7'>
            <div className='bg-white rounded-2xl shadow-sm p-8'>
              <div className='mb-6'>
                <h1 className='text-2xl font-semibold text-gray-900'>
                  {currentStep === 'address' && 'Teslimat Adresi'}
                  {currentStep === 'shipping' && 'Kargo Seçimi'}
                  {currentStep === 'payment' && 'Ödeme Bilgileri'}
                </h1>
                <p className='mt-1 text-sm text-gray-500'>
                  {currentStep === 'address' && 'Siparişinizin teslim edileceği adresi girin'}
                  {currentStep === 'shipping' && 'Size en uygun teslimat yöntemini seçin'}
                  {currentStep === 'payment' && 'Güvenli ödeme için kart bilgilerinizi girin'}
                </p>
              </div>

              {/* Adım içeriği */}
              {getCurrentStepContent()}
            </div>
          </div>

          {/* Sipariş Özeti */}
          <div className='lg:col-span-5 mt-8 lg:mt-0'>
            <OrderSummary items={items} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  )
}
