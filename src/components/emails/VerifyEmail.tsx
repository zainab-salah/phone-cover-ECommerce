import { Button, Container, Heading, Html, Preview, Section, Text } from '@react-email/components'

export default function VerifyEmail({ name, verifyUrl }: { name?: string | null; verifyUrl: string }) {
  return (
    <Html>
      <Preview>Verify your BSMA Case email address</Preview>
      <Section style={main}>
        <Container style={card}>
          <Heading style={heading}>Welcome to BSMA Case</Heading>
          <Text style={text}>Hi{name ? ` ${name}` : ''},</Text>
          <Text style={text}>Thanks for creating an account. Please verify your email address to keep your account secure and receive order updates.</Text>
          <Button href={verifyUrl} style={button}>Verify my email</Button>
          <Text style={muted}>This link expires in one hour. If you did not create this account, you can ignore this email.</Text>
        </Container>
      </Section>
    </Html>
  )
}

const main = { backgroundColor: '#1f2433', padding: '40px 16px', fontFamily: 'Arial, sans-serif' }
const card = { backgroundColor: '#ffffff', borderRadius: '16px', margin: '0 auto', maxWidth: '560px', padding: '40px' }
const heading = { color: '#2f1f54', fontSize: '28px', margin: '0 0 24px', textAlign: 'center' as const }
const text = { color: '#343434', fontSize: '16px', lineHeight: '1.6' }
const muted = { color: '#6b7280', fontSize: '13px', lineHeight: '1.5', marginTop: '28px' }
const button = { backgroundColor: '#a27aff', borderRadius: '8px', color: '#ffffff', display: 'block', fontSize: '16px', fontWeight: 'bold', margin: '28px auto', padding: '12px 22px', textAlign: 'center' as const, textDecoration: 'none' }
