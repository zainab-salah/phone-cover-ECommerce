"use server"

import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { OrderStatus } from '@prisma/client'

export const changeOrderStatus = async ({
  id,
  newStatus,
}: {
  id: string
  newStatus: OrderStatus
}) => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user?.email || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error('Unauthorized')
  }

  await db.order.update({
    where: { id },
    data: { status: newStatus },
  })
}
