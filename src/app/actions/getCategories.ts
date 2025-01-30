// src/app/actions/getCategories.ts

import { cache } from 'react'

import type { Category } from '@/types'

// Ben `getCategories` fonksiyonuyum. Kategorileri almak için bir API isteği yapıyorum.
// Ayrıca `cache` fonksiyonu ile sarmalanarak, sonucumu önbelleğe alıyorum.
export const getCategories = cache(async () => {
  try {
    // .env dosyasındaki API URL'sini kullanıyoruz
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    // API isteğini yapıyoruz
    const response = await fetch(`${apiUrl}/categories`, {
      next: {
        revalidate: 3600 // 1 saat boyunca önbellekte tutacağız
      }
    })

    // Eğer yanıt başarılı değilse, bir hata fırlatıyorum.
    if (!response.ok) throw new Error('Kategoriler yüklenirken bir hata oluştu')

    // Yanıt başarılı ise, JSON verisini alıyorum.
    const data = await response.json()

    // Aldığım veriyi, `slug` ve `name` özelliklerini içeren yeni bir nesne dizisine dönüştürüyorum.
    // Sonra bu diziyi `Category` türünde döndürüyorum.
    return Object.values(data).map((category: any) => ({
      slug: category.slug,
      name: category.name
    })) as Category[]
  } catch (error) {
    // Eğer bir hata oluşursa, hatayı konsola yazdırıyorum ve boş bir dizi döndürüyorum.
    console.error('Kategori getirme hatası:', error)
    return []
  }
})
