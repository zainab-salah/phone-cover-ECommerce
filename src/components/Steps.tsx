'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const STEPS = [
  {
    name: 'Step 1: Add image',
    description: 'Choose an image for your case',
    url: '/upload',
    img: '/onestar.png',
  },
  {
    name: 'Step 2: Customize design',
    description: 'Make the case yours',
    url: '/design',
    img: '/twostarts.png',
    
  },
  {
    name: 'Step 3: Summary',
    description: 'Review your final design',
    url: '/preview',
    img: '/moonstar.png',
  },
]

const Steps = () => {
  const pathname = usePathname()

  return (
    <ol className='  bg-primarydark text-white lg:flex lg:border-l lg:border-r lg:border-gray-200'>
      {STEPS.map((step, i) => {
        const isCurrent = pathname.endsWith(step.url)
        const isCompleted = STEPS.slice(i + 1).some((step) =>
          pathname.endsWith(step.url)
        )
        // const imgPath = `/snake-${i + 1}.png`
      

        return (
          <li key={step.name} className='relative overflow-hidden lg:flex-1'>
            <div>
              <span
                className={cn(
                  'absolute left-0 top-0 h-full w-1 bg-gold/60 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full',
                  {
                    'bg-gold': isCurrent,
                    'bg-primary': isCompleted,
                  }
                )}
                aria-hidden='true'
              />

              <span
                className={cn(
                  i !== 0 ? 'lg:pl-9' : '',
                  'flex items-center px-6 py-4 text-sm font-medium'
                )}>
                <span className='flex-shrink-0'>
                  <img
                    src={step.img}
                    className={cn(
                      'flex h-12 w-12 object-contain items-center justify-center',
                      {
                        'border-none': isCompleted,
                        'border-gold': isCurrent,
                      }
                    )}
                  />
                </span>

                <span className='ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center'>
                  <span
                    className={cn('text-sm font-semibold text-white/90', {
                      'text-primary': isCompleted,
                      'text-gold': isCurrent,
                    })}>
                    {step.name}
                  </span>
                  <span className='text-sm text-white/80'>
                    {step.description}
                  </span>
                </span>
              </span>

              {/* separator */}
              {i !== 0 ? (
                <div className='absolute inset-0 hidden w-3 lg:block'>
                  <svg
                    className='h-full w-full text-gray-300'
                    viewBox='0 0 12 82'
                    fill='none'
                    preserveAspectRatio='none'>
                    <path
                      d='M0.5 0V31L10.5 41L0.5 51V82'
                      stroke='currentcolor'
                      vectorEffect='non-scaling-stroke'
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default Steps