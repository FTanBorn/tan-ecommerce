// src/app/page.tsx
'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { SlidersHorizontal, X } from 'lucide-react'

import Filters from '@/components/filters/Filters'
import SearchBar from '@/components/filters/SearchBar'
import ProductGrid from '@/components/products/ProductGrid'
import type { Category } from '@/types'

function HomeClient({ categories }: { categories: Category[] }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Desktop Filters Sidebar */}
          <aside className='hidden lg:block w-80 shrink-0'>
            <div className='top-24 space-y-6'>
              <Filters categories={categories} />
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
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
                            <Dialog.Title className='text-lg font-semibold text-gray-900'>
                              Filtreler
                            </Dialog.Title>
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
            <div className='mb-8 flex items-center gap-2 lg:gap-0'>
              <button
                onClick={() => setIsFilterOpen(true)}
                className='lg:hidden p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-orange-200'
              >
                <SlidersHorizontal className='w- h-8 text-gray-700' />
              </button>

              <div className='flex-1'>
                <SearchBar />
              </div>
            </div>

            <ProductGrid />
          </main>
        </div>
      </div>
    </div>
  )
}

export default HomeClient
