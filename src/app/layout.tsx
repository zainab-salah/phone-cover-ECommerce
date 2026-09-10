
import { Jomolhari, Manrope, Amiri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";
import { constructMetadata } from "@/lib/utils";
import { getAuthSession } from '@/auth';
import { db } from '@/db';
import VerificationBanner from '@/components/auth/VerificationBanner';
import NightSky from '@/components/art/NightSky';



const display = Jomolhari({ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' });
const body = Manrope({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const arabic = Amiri({ weight: '400', subsets: ['arabic'], variable: '--font-arabic', display: 'swap' });



export const metadata = constructMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuthSession();
  const user = session?.user?.id
    ? await db.user.findUnique({ where: { id: session.user.id }, select: { email: true, emailVerified: true } })
    : null;

  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${arabic.variable}`}>
        <a href='#main-content' className='skip-link'>Skip to content</a>
        <NightSky />
        <Navbar />

        <main id='main-content' className="flex text-white bg-primarydark flex-col min-h-[calc(100vh-5rem)]">
          <div className="flex-1 flex flex-col h-full">
            <Providers session={session}>
              {user && !user.emailVerified ? <VerificationBanner email={user.email} /> : null}
              {children}
            </Providers>
          </div>
        </main>
        <Footer />

        <Toaster />
      </body>
    </html>
  );
}
