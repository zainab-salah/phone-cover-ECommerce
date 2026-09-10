import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { db } from '@/db'
import { formatPrice } from '@/lib/utils'
import { getAuthSession } from '@/auth'
import { notFound, redirect } from 'next/navigation'
import StatusDropdown from './StatusDropdown'
import CustomerDashboard from './CustomerDashboard'

const Page = async () => {
  const user = (await getAuthSession())?.user

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL

  if (!user?.id) {
    return redirect('/login?callbackUrl=/dashboard')
  }

  if (user.email !== ADMIN_EMAIL) {
    const configurations = await db.configuration.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        orders: {
          select: { id: true, isPaid: true, status: true, amount: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    })

    return <CustomerDashboard configurations={configurations} />
  }

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
      shippingAddress: true,
      configuration: true,
    },
  })

  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      amount: true,
    },
  })

  const lastMonthSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    _sum: {
      amount: true,
    },
  })

  const WEEKLY_GOAL = 500
  const MONTHLY_GOAL = 2500

  return (
    <div className='flex min-h-screen w-full  text-foreground'>
      <div className='max-w-7xl w-full mx-auto container flex flex-col sm:gap-4 sm:py-4'>
        <div className='flex flex-col gap-16'>
          <div className='grid gap-4 sm:grid-cols-2'>
            <Card>
              <CardHeader className='pb-2'>
                <CardDescription>Last Week</CardDescription>
                <CardTitle className='text-4xl'>
                  {formatPrice(lastWeekSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-sm text-muted-foreground'>
                  of {formatPrice(WEEKLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastWeekSum._sum.amount ?? 0) * 100) / WEEKLY_GOAL}
                />
              </CardFooter>
            </Card>
            <Card className=''>
              <CardHeader className='pb-2'>
                <CardDescription>Last Month</CardDescription>
                <CardTitle className='text-4xl'>
                  {formatPrice(lastMonthSum._sum.amount ?? 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-sm text-muted-foreground'>
                  of {formatPrice(MONTHLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  value={((lastMonthSum._sum.amount ?? 0) * 100) / MONTHLY_GOAL}
                />
              </CardFooter>
            </Card>
          </div>

          <h1 className='text-4xl font-bold tracking-tight text-white'>Ordered covers</h1>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='text-white'>Customer</TableHead>
                <TableHead className='text-white'>Cover</TableHead>
                <TableHead className='hidden sm:table-cell text-white'>Status</TableHead>
                <TableHead className='hidden sm:table-cell text-white'>
                  Purchase date
                </TableHead>
                <TableHead className='text-right text-white'>Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className='bg-accent'>
                  <TableCell>
                    <div className='font-medium'>
                      {order.shippingAddress?.name}
                    </div>
                    <div className='hidden text-sm text-muted-foreground md:inline'>
                      {order.user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <img
                        src={order.configuration.croppedImageUrl ?? order.configuration.imageUrl}
                        alt='Ordered phone case design'
                        className='h-14 w-10 rounded-md border border-border object-cover'
                      />
                      <span className='hidden font-medium sm:inline'>
                        {order.configuration.model?.replace('iphone', 'iPhone ') ?? 'Custom case'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className='hidden sm:table-cell'>
                    <StatusDropdown id={order.id} orderStatus={order.status} />
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    {order.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className='text-right'>
                    {formatPrice(order.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Page
