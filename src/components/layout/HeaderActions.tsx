// src/components/layout/HeaderActions.tsx
'use client'

import { memo } from 'react'

import { User2, Heart, Bell } from 'lucide-react'

import CartDrawer from '../cart/CartDrawer'

const HeaderActions = memo(function HeaderActions() {
  return (
    <div className='flex items-center gap-1'>
      <button className='relative p-2 hover:bg-gray-50 rounded-full transition-colors'>
        <Bell className='h-6 w-6 text-gray-600' />
      </button>
      <button className='relative p-2 hover:bg-gray-50 rounded-full transition-colors'>
        <Heart className='h-6 w-6 text-gray-600' />
      </button>
      <button className='p-2 hover:bg-gray-50 rounded-full transition-colors'>
        <User2 className='h-6 w-6 text-gray-600' />
      </button>
      <CartDrawer />
    </div>
  )
})

export default HeaderActions
