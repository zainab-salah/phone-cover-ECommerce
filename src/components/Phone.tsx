import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  dark?: boolean
}

const Phone = ({ imgSrc, className, dark = false, ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        'relative isolate pointer-events-none overflow-hidden rounded-[2rem]',
        className
      )}
      {...props}>
      <img
        src={
          dark
            ? '/phone-template-dark-edges.png'
            : '/phone-template-white-edges.png'
        }
        className='relative z-10 block w-full pointer-events-none select-none'
        alt='phone image'
      />

      <div className='absolute z-0 inset-0'>
        <img
          className='object-cover w-full h-full'
          src={imgSrc}
          alt='overlaying phone image'
        />
      </div>
    </div>
  )
}

export default Phone
