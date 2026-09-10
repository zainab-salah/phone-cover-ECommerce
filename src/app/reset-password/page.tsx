import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams
  if (!token) return <p className='mx-auto mt-24 max-w-md text-white'>This reset link is invalid or has expired.</p>
  return <ResetPasswordForm token={token} />
}
