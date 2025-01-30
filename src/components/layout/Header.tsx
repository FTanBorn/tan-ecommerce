// src/components/layout/Header.tsx

import { Suspense } from 'react'

import { getCategories } from '@/app/actions/getCategories'

import HeaderActions from './HeaderActions'
import HeaderCategories from './HeaderCategories'
import HeaderContainer from './HeaderContainer'
import HeaderLogo from './HeaderLogo'

export default async function Header() {
  const categories = await getCategories()

  return (
    <HeaderContainer>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center gap-8'>
            <HeaderLogo />
            <Suspense fallback={<div className='h-10 w-32 bg-gray-100 animate-pulse rounded' />}>
              <HeaderCategories categories={categories} />
            </Suspense>
          </div>
          <HeaderActions />
        </div>
      </div>
    </HeaderContainer>
  )
}
