// src/hooks/useLocalStorage.ts
'use client'

import { useState, useEffect } from 'react'

// useLocalStorage diye bir hook oluşturdum.
// Bu hook, localStorage'ı kullanarak state'i yönetmeyi kolaylaştırıyor.
export function useLocalStorage<T>(key: string, initialValue: T) {
  // storedValue diye bir state oluşturdum. Bu, localStorage'dan alınan değeri tutacak.
  // isInitialized diye bir state daha ekledim. Bu, localStorage'dan veri çekme işlemi tamamlandı mı, onu kontrol edecek.
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isInitialized, setIsInitialized] = useState(false)

  // useEffect ile component mount edildiğinde localStorage'dan veriyi çektim.
  useEffect(() => {
    try {
      const item = localStorage.getItem(key) // localStorage'dan veriyi aldım.
      if (item) {
        setStoredValue(JSON.parse(item)) // Eğer veri varsa, state'i güncelledim.
      }
      setIsInitialized(true)
    } catch (error) {
      console.log(error) // Hata olursa logladım.
      setIsInitialized(true)
    }
  }, [key]) // key değişirse tekrar çalışsın diye key'i dependency olarak ekledim.

  // setValue diye bir fonksiyon oluşturdum. Bu fonksiyon, state'i güncellemek için kullanılacak
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore) // State'i güncelledim.

      // Eğer tarayıcı ortamındaysak (window varsa), localStorage'ı güncelledim.
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.log(error) // Hata olursa logladım.
    }
  }

  // Hook'tan dönen değerler: state, setter fonksiyonu ve başlatılıp başlatılmadığı bilgisi.
  return [storedValue, setValue, isInitialized] as const
}
