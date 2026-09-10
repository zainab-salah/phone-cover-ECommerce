
import { Jomolhari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";
import { constructMetadata } from "@/lib/utils";
import { getAuthSession } from '@/auth';
import { db } from '@/db';
import VerificationBanner from '@/components/auth/VerificationBanner';



const recursive = Jomolhari({
  weight: "400",
  subsets: ["latin"]
});



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
      <body className={recursive.className}>
        <Navbar />

        <main className="flex grainy-dark text-white bg-primarydark flex-col min-h-[calc(100vh-3.5rem-1px)]">
          <div className="flex-1 flex flex-col h-full">
            <Providers>
              {user && !user.emailVerified ? <VerificationBanner email={user.email} /> : null}
              {children}
            </Providers>
          </div>
          <Footer />
        </main>

        <Toaster />
      </body>
    </html>
  );
}
