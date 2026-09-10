"use server"

import { db } from '@/db'
import { getAuthSession } from '@/auth'
import { OrderStatus } from '@prisma/client'

export const changeOrderStatus = async ({
  id,
  newStatus,
}: {
  id: string
  newStatus: OrderStatus
}) => {
  const user = (await getAuthSession())?.user

  if (!user?.email || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error('Unauthorized')
  }

  await db.order.update({
    where: { id },
    data: { status: newStatus },
  })
}
