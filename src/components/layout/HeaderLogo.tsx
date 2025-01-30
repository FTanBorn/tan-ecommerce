// src/components/layout/HeaderLogo.tsx

import { memo } from 'react'

import Link from 'next/link'

const HeaderLogo = memo(function HeaderLogo() {
  return (
    <Link href='/' className='flex items-center gap-2'>
      <span className='text-2xl font-bold text-blue-600'>Yetiş Çarşı</span>
    </Link>
  )
})

export default HeaderLogo
