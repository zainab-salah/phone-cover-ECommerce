import type { Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import Image from 'next/image'
import { buttonVariants } from './ui/button'
import Link from 'next/link'

const LoginModal = ({
  isOpen,
  setIsOpen,
  callbackUrl,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  callbackUrl: string
}) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <div className='relative mx-auto w-24 h-24 mb-2'>
            <Image
              src='/moonstar.png'
              alt='moon image'
              className='object-contain'
              fill
            />
          </div>
          <DialogTitle className='text-3xl text-center font-bold tracking-tight text-foreground'>
            Log in to continue
          </DialogTitle>
          <DialogDescription className='text-base text-center py-2'>
            <span className='font-medium text-foreground'>
              Your configuration was saved!
            </span>{' '}
            Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-2 gap-6 divide-x divide-gray-200'>
          <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className={buttonVariants({ variant: 'outline', className: 'text-foreground' })}>
            Login
          </Link>
          <Link href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`} className={buttonVariants({ variant: 'default' })}>
            Sign up
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
