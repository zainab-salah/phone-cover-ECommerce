import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { z } from 'zod'
import sharp from 'sharp'
import { db } from '@/db'
import { getAuthSession } from '@/auth'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      const user = (await getAuthSession())?.user
      return { input, userId: user?.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input

      const res = await fetch(file.ufsUrl)
      const buffer = await res.arrayBuffer()

      const imgMetadata = await sharp(buffer).metadata()
      const { width, height } = imgMetadata

      if (!configId) {
        const configuration = await db.configuration.create({
          data: {
            imageUrl: file.ufsUrl,
            height: height || 500,
            width: width || 500,
            userId: metadata.userId,
          },
        })

        return { configId: configuration.id }
      } else {
        const configuration = await db.configuration.findUnique({
          where: { id: configId },
          select: { userId: true },
        })

        if (!configuration || (configuration.userId && configuration.userId !== metadata.userId)) {
          throw new Error('Configuration not found')
        }

        const updatedConfiguration = await db.configuration.update({
          where: {
            id: configId,
          },
          data: {
            croppedImageUrl: file.ufsUrl,
            ...(metadata.userId ? { userId: metadata.userId } : {}),
          },
        })

        return { configId: updatedConfiguration.id }
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
