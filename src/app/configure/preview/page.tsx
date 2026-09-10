import { db } from '@/db'
import { notFound } from 'next/navigation'
import DesignPreview from './DesignPreview'
import { getAuthSession } from '@/auth'

interface PageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams

  if (!id || typeof id !== 'string') {
    return notFound()
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  })

  if(!configuration) {
    return notFound()
  }

  const isAuthenticated = Boolean((await getAuthSession())?.user?.id)

  return <DesignPreview configuration={configuration} isAuthenticated={isAuthenticated} />
}

export default Page
