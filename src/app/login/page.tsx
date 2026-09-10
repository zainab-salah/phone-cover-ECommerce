import AuthForm from '@/components/auth/AuthForm'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }) {
  const { callbackUrl } = await searchParams
  const safeCallbackUrl = callbackUrl?.startsWith('/') && !callbackUrl.startsWith('//') ? callbackUrl : '/'
  return <AuthForm mode='login' callbackUrl={safeCallbackUrl} googleEnabled={Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)} />
}
