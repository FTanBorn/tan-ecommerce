// src/components/layout/HeaderContainer.tsx
'use client'

import { memo, useEffect, useState } from 'react'

interface HeaderContainerProps {
  children: React.ReactNode
}

const HeaderContainer = memo(function HeaderContainer({ children }: HeaderContainerProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        isScrolled ? 'shadow-md' : 'border-b border-gray-100'
      }`}
    >
      {children}
    </header>
  )
})

export default HeaderContainer
