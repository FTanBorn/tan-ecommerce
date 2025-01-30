// src/app/page.tsx
'use client'

import { Fragment, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { SlidersHorizontal, X } from 'lucide-react'

import Filters from '@/components/filters/Filters'
import SearchBar from '@/components/filters/SearchBar'
import ProductGrid from '@/components/products/ProductGrid'
import type { Category } from '@/types'

// Client-side bileşen wrapper'ı
function HomeClient({ categories }: { categories: Category[] }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Ana Container */}
      <div className='container mx-auto px-4'>
        {/* İki Sütunlu Layout */}
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Sol Sidebar - Filtreler (Desktop) */}
          <aside className='hidden lg:block w-80 shrink-0'>
            <div className='top-24 space-y-6'>
              <Filters categories={categories} />
            </div>
          </aside>

          {/* Filter Drawer (Mobile) */}
          <Transition.Root show={isFilterOpen} as={Fragment}>
            <Dialog as='div' className='relative z-50 lg:hidden' onClose={setIsFilterOpen}>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-500'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-500'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='fixed inset-0 bg-black bg-opacity-50 transition-opacity' />
              </Transition.Child>

              <div className='fixed inset-0 overflow-hidden'>
                <div className='absolute inset-0 overflow-hidden'>
                  <div className='pointer-events-none fixed inset-y-0 left-0 flex max-w-full'>
                    <Transition.Child
                      as={Fragment}
                      enter='transform transition ease-in-out duration-500'
                      enterFrom='-translate-x-full'
                      enterTo='translate-x-0'
                      leave='transform transition ease-in-out duration-500'
                      leaveFrom='translate-x-0'
                      leaveTo='-translate-x-full'
                    >
                      <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                        <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                          <div className='flex items-center justify-between px-4 py-6 border-b'>
                            <Dialog.Title className='text-lg font-semibold text-gray-900'>Filtreler</Dialog.Title>
                            <button
                              type='button'
                              className='text-gray-400 hover:text-gray-500'
                              onClick={() => setIsFilterOpen(false)}
                            >
                              <X className='h-6 w-6' />
                            </button>
                          </div>
                          <div className='p-4'>
                            <Filters categories={categories} />
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </div>
            </Dialog>
          </Transition.Root>

          <main className='flex-1'>
            {/* Başlık ve Arama */}
            <div className='space-y-0 mb-8'>
              <div className='flex items-center justify-between'>
                {/* Mobil Filter Butonu */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className='lg:hidden flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700
                           bg-white border border-gray-300 rounded-lg hover:bg-gray-50'
                >
                  <SlidersHorizontal className='w-4 h-4' />
                  Filtreler
                </button>
              </div>
              <SearchBar />
            </div>

            {/* Ürün Grid */}
            <ProductGrid />
          </main>
        </div>
      </div>
    </div>
  )
}

export default HomeClient
