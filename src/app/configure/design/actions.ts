'use server'

import { db } from '@/db'
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from '@prisma/client'
import { getAuthSession } from '@/auth'

export type SaveConfigArgs = {
  color: CaseColor
  finish: CaseFinish
  material: CaseMaterial
  model: PhoneModel
  configId: string
}

export async function saveConfig({
  color,
  finish,
  material,
  model,
  configId,
}: SaveConfigArgs) {
  const user = (await getAuthSession())?.user
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
    select: { userId: true },
  })

  if (!configuration || (configuration.userId && configuration.userId !== user?.id)) {
    throw new Error('Configuration not found')
  }

  await db.configuration.update({
    where: { id: configId },
    data: { color, finish, material, model, ...(user?.id ? { userId: user.id } : {}) },
  })
}
