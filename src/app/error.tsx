// src/app/error.tsx
'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2 className='text-2xl font-bold text-red-600 mb-4'>Bir hata oluştu!</h2>
      <p className='text-gray-600 mb-4'>{error.message}</p>
      <button
        onClick={() => reset()}
        className='px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600'
      >
        Tekrar Dene
      </button>
    </div>
  )
}
