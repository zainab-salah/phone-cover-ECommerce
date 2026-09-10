import type { Configuration, Order } from '@prisma/client'
import Link from 'next/link'
import { ArrowRight, PackageOpen, Pencil } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { cn, formatPrice } from '@/lib/utils'

type SavedCase = Configuration & {
  orders: Pick<Order, 'id' | 'isPaid' | 'status' | 'amount' | 'createdAt'>[]
}

export default function CustomerDashboard({ configurations }: { configurations: SavedCase[] }) {
  return (
    <div className='mx-auto min-h-screen w-full max-w-6xl px-6 py-14 text-white'>
      <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-end'>
        <div>
          <p className='text-sm font-medium uppercase tracking-[0.2em] text-gold'>My account</p>
          <h1 className='mt-2 text-4xl font-bold tracking-tight'>My cases</h1>
          <p className='mt-3 max-w-xl text-muted-foreground'>Your unfinished designs and order history are saved here.</p>
        </div>
        <Link href='/configure/upload' className={buttonVariants({ className: 'w-fit' })}>
          Create a case <ArrowRight className='ml-1.5 h-4 w-4' />
        </Link>
      </div>

      {configurations.length === 0 ? (
        <div className='mt-10 rounded-2xl border border-gold/30 bg-card px-6 py-14 text-center'>
          <PackageOpen className='mx-auto h-10 w-10 text-gold' />
          <h2 className='mt-4 text-xl font-semibold'>No saved cases yet</h2>
          <p className='mt-2 text-muted-foreground'>Create a case and it will appear here while you work.</p>
        </div>
      ) : (
        <div className='mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {configurations.map((configuration) => {
            const latestOrder = configuration.orders[0]
            const isPaid = latestOrder?.isPaid
            const isComplete = Boolean(configuration.color && configuration.model && configuration.material && configuration.finish)
            const continueUrl = isComplete
              ? `/configure/preview?id=${configuration.id}`
              : `/configure/design?id=${configuration.id}`

            return (
              <article key={configuration.id} className='overflow-hidden rounded-2xl border border-border bg-card'>
                <img
                  src={configuration.croppedImageUrl ?? configuration.imageUrl}
                  alt='Saved phone case design'
                  className='h-44 w-full object-cover bg-zinc-950'
                />
                <div className='p-5'>
                  <div className='flex items-center justify-between gap-3'>
                    <h2 className='font-semibold'>{configuration.model?.replace('iphone', 'iPhone ') ?? 'Custom case'}</h2>
                    <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', isPaid ? 'bg-green-500/20 text-green-300' : 'bg-gold/20 text-gold')}>
                      {isPaid ? 'Ordered' : latestOrder ? 'Checkout ready' : 'Draft'}
                    </span>
                  </div>
                  <p className='mt-3 text-sm text-muted-foreground'>Last saved {configuration.updatedAt.toLocaleDateString()}</p>
                  {latestOrder ? (
                    <p className='mt-1 text-sm text-muted-foreground'>Order {latestOrder.isPaid ? 'paid' : 'total'}: {formatPrice(latestOrder.amount)}</p>
                  ) : null}
                  <Link href={continueUrl} className={buttonVariants({ variant: 'outline', className: 'mt-5 w-full text-foreground' })}>
                    {isPaid ? 'View design' : 'Continue editing'} <Pencil className='ml-1.5 h-4 w-4' />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
