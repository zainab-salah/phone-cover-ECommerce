
import { Amiri } from "next/font/google";
import localFont from 'next/font/local';
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
import CursorMoonlight from '@/components/art/CursorMoonlight';



const harmond = localFont({
  src: [
    { path: './fonts/harmond/Harmond-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/harmond/Harmond-Italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-harmond', display: 'swap', fallback: ['Georgia'],
});
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
      <body className={`${harmond.variable} ${arabic.variable}`}>
        <a href='#main-content' className='skip-link'>Skip to content</a>
        <NightSky />
        <CursorMoonlight />
        <Navbar />

        <main id='main-content' className="flex text-white flex-col min-h-[calc(100vh-5rem)]">
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
