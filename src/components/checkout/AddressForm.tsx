// src/components/checkout/AddressForm.tsx

interface AddressFormProps {
  onNext: () => void
}

export default function AddressForm({ onNext }: AddressFormProps) {
  return (
    <div className='space-y-6'>
      {/* Ad Soyad */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-1'>
          <label className='text-sm font-medium text-gray-700'>Ad</label>
          <input
            type='text'
            placeholder='Furkan'
            className='w-full px-4 py-2.5 rounded-xl  text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
          />
        </div>
        <div className='space-y-1'>
          <label className='text-sm font-medium text-gray-700'>Soyad</label>
          <input
            type='text'
            placeholder='Tandoğan'
            className='w-full px-4 py-2.5 rounded-xl  text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
          />
        </div>
      </div>

      {/* İletişim */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-1'>
          <label className='text-sm font-medium text-gray-700'>E-posta</label>
          <input
            type='email'
            placeholder='furkantandogan@example.com'
            className='w-full px-4 py-2.5 rounded-xl text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
          />
        </div>
        <div className='space-y-1'>
          <label className='text-sm font-medium text-gray-700'>Telefon</label>
          <input
            type='tel'
            placeholder='5XX XXX XX XX'
            className='w-full px-4 py-2.5 rounded-xl text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
          />
        </div>
      </div>

      {/* Adres */}
      <div className='space-y-1'>
        <label className='text-sm font-medium text-gray-700'>Adres</label>
        <textarea
          rows={3}
          placeholder='Teslimat adresi...'
          className='w-full px-4 py-2.5 rounded-xl text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
        />
      </div>

      {/* İl/İlçe/Posta Kodu */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='space-y-1'>
          <label className='text-sm font-medium text-gray-700'>İl</label>
          <input
            type='text'
            placeholder='İstanbul'
            className='w-full px-4 py-2.5 rounded-xl text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
          />
        </div>
        <div className='space-y-1'>
          <label className='text-sm font-medium text-gray-700'>İlçe</label>
          <input
            type='text'
            placeholder='Kadıköy'
            className='w-full px-4 py-2.5 rounded-xl text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
          />
        </div>
        <div className='space-y-1'>
          <label className='text-sm font-medium text-gray-700'>Posta Kodu</label>
          <input
            type='text'
            placeholder='34700'
            className='w-full px-4 py-2.5 rounded-xl text-black border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all'
          />
        </div>
      </div>

      {/* İlerle Butonu */}
      <div className='flex justify-end pt-4'>
        <button
          onClick={onNext}
          className='px-8 py-3 bg-orange-600 text-white font-medium rounded-xl hover:bg-orange-700
                       focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                       transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'
        >
          Devam Et
        </button>
      </div>
    </div>
  )
}
