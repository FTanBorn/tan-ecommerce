// src/components/checkout/CheckoutStepper.tsx

import { Check } from 'lucide-react'

type CheckoutStep = 'address' | 'shipping' | 'payment'

interface StepperProps {
  currentStep: CheckoutStep
  onStepChange: (step: CheckoutStep) => void
}

const steps = [
  {
    id: 'address' as const,
    title: 'Adres',
    description: 'Teslimat Bilgileri'
  },
  {
    id: 'shipping' as const,
    title: 'Kargo',
    description: 'Teslimat Yöntemi'
  },
  {
    id: 'payment' as const,
    title: 'Ödeme',
    description: 'Ödeme Bilgileri'
  }
]

export default function CheckoutStepper({ currentStep, onStepChange }: StepperProps) {
  return (
    <div className='w-full py-6 sm:py-8 px-4'>
      <div className='max-w-3xl mx-auto'>
        <nav aria-label='Progress'>
          <ol className='flex items-center justify-between w-full relative'>
            {/* Arka plan çizgisi */}
            <div className='absolute top-1/2 transform -translate-y-1/2 left-8 right-8 h-[2px] bg-gray-200 -z-1' />

            {steps.map((step, index) => {
              const isCompleted = steps.findIndex(s => s.id === currentStep) > index
              const isCurrent = currentStep === step.id

              return (
                <li
                  key={step.id}
                  className={`relative flex flex-col items-center ${
                    index === 0 ? 'flex-1' : index === steps.length - 1 ? 'flex-1' : 'flex-1'
                  }`}
                >
                  {/* Bağlantı çizgisi */}
                  <div
                    className={`absolute left-0 right-0 top-[15px] h-[2px] -translate-y-1/2 transition-colors duration-300 ease-in-out
                      ${isCompleted ? 'bg-blue-600' : 'bg-gray-200'}`}
                    style={{ width: 'calc(100% - 20px)', left: '10px' }}
                  />

                  {/* Stepper butonu */}
                  <button
                    onClick={() => onStepChange(step.id)}
                    className={`
                      relative flex items-center justify-center w-10 h-10 rounded-full border-2
                      transition-all duration-300 ease-in-out z-10 bg-white
                      ${
                        isCompleted
                          ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                          : isCurrent
                            ? 'border-blue-600 text-blue-600'
                            : 'border-gray-300 text-gray-500'
                      }
                      ${!isCurrent ? 'cursor-pointer hover:border-blue-400' : 'cursor-default'}
                    `}
                  >
                    <span className='flex items-center justify-center'>
                      {isCompleted ? (
                        <Check className='w-5 h-5' />
                      ) : (
                        <span className='text-sm font-medium'>{index + 1}</span>
                      )}
                    </span>
                  </button>

                  {/* Başlık ve Açıklama */}
                  <div className='mt-4 space-y-1 text-center'>
                    <span
                      className={`block text-sm font-medium transition-colors duration-300
                        ${isCurrent ? 'text-blue-600' : 'text-gray-500'}`}
                    >
                      {step.title}
                    </span>
                    <span className='hidden sm:block text-xs text-gray-400'>
                      {step.description}
                    </span>
                  </div>
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </div>
  )
}
