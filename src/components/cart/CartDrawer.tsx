// src/components/cart/CartDrawer.tsx
'use client'

import { Fragment, useEffect, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { ShoppingCart, X, ShoppingBag, PackageCheck, ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { useCart } from '@/contexts/CartContext'

import CartItem from './CartItem'
import CartSummary from './CartSummary'

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart()
  const [isClient, setIsClient] = useState(false)

  const handleQuantityChange = (productId: number, quantity: number) => {
    updateQuantity(productId, quantity)
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId)
  }

  const handleClearCart = () => {
    clearCart()
  }

  if (!isClient) {
    return (
      <button className='relative p-2 hover:bg-gray-50 rounded-full transition-colors'>
        <ShoppingCart className='h-6 w-6 text-gray-600' />
      </button>
    )
  }

  return (
    <>
      {/* Sepet Butonu */}
      <CartSummary totalItems={totalItems} onClick={() => setIsOpen(true)} />

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-500'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-500'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                    <div className='flex h-full flex-col bg-white shadow-xl'>
                      {/* Header */}
                      <div className='flex items-center justify-between px-4 py-6 sm:px-6 border-b border-gray-100'>
                        <div className='flex items-center gap-3'>
                          <Dialog.Title className='text-lg font-medium text-gray-900'>
                            Sepetim
                          </Dialog.Title>
                          <div className='flex items-center text-sm text-gray-500'>
                            ({totalItems} ürün)
                          </div>
                        </div>
                        <div className='flex items-center gap-4'>
                          {items.length > 0 && (
                            <button
                              onClick={handleClearCart}
                              className='text-sm text-red-500 hover:text-red-600 transition-colors'
                            >
                              Sepeti Temizle
                            </button>
                          )}
                          <button
                            onClick={() => setIsOpen(false)}
                            className='text-gray-400 hover:text-gray-500 transition-colors'
                          >
                            <X className='h-6 w-6' />
                          </button>
                        </div>
                      </div>

                      {/* İçerik */}
                      <div className='flex-1 overflow-y-auto px-4 py-4 sm:px-6'>
                        {items.length === 0 ? (
                          <div className='flex flex-col items-center justify-center h-full text-gray-500 py-12'>
                            <ShoppingBag className='h-16 w-16 mb-4 text-gray-400' />
                            <p className='text-lg font-medium mb-2'>Sepetiniz boş</p>
                            <p className='text-sm text-gray-400 text-center'>
                              Sepetinizde henüz ürün bulunmuyor. <br />
                              Ürünleri incelemeye başlayabilirsiniz.
                            </p>
                            <button
                              onClick={() => setIsOpen(false)}
                              className='mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100'
                            >
                              Alışverişe Başla
                            </button>
                          </div>
                        ) : (
                          <div className='space-y-6'>
                            {items.map(item => (
                              <CartItem
                                key={item.product.id}
                                item={item}
                                onUpdateQuantity={handleQuantityChange}
                                onRemove={handleRemoveItem}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Özet & Ödeme */}
                      {items.length > 0 && (
                        <div className='border-t border-gray-200 px-4 py-6 sm:px-6 space-y-4'>
                          {/* Kargo Bilgisi */}
                          <div className='flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg'>
                            <PackageCheck className='h-5 w-5 flex-shrink-0' />
                            <p className='text-sm'>150₺ üzeri siparişlerde kargo bedava!</p>
                          </div>

                          {/* Fiyat Özeti */}
                          <div className='space-y-2'>
                            <div className='flex justify-between text-base'>
                              <span className='text-gray-500'>Ara Toplam</span>
                              <span className='text-gray-900 font-medium'>
                                {new Intl.NumberFormat('tr-TR', {
                                  style: 'currency',
                                  currency: 'TRY'
                                }).format(totalPrice)}
                              </span>
                            </div>
                            <div className='flex justify-between text-base'>
                              <span className='text-gray-500'>Kargo</span>
                              <span className='text-green-600 font-medium'>Ücretsiz</span>
                            </div>
                            <div className='flex justify-between text-lg font-bold border-t border-gray-100 pt-2'>
                              <span>Toplam</span>
                              <span>
                                {new Intl.NumberFormat('tr-TR', {
                                  style: 'currency',
                                  currency: 'TRY'
                                }).format(totalPrice)}
                              </span>
                            </div>
                          </div>

                          <Link
                            href='/checkout'
                            className='w-full flex items-center justify-center gap-2 rounded-lg border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 transition-colors'
                            onClick={() => setIsOpen(false)} // Sepet drawer'ı kapansın
                          >
                            Ödemeye Geç
                            <ArrowRight className='h-5 w-5' />
                          </Link>
                          <button
                            onClick={() => setIsOpen(false)}
                            className='w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors'
                          >
                            veya alışverişe devam et
                          </button>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
