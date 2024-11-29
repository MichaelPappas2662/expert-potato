import './styles/globals.scss';

import { Suspense } from 'react';

import type { Metadata } from 'next';
import {
  Noto_Sans,
  Poppins,
} from 'next/font/google';

import Loading from '../app/components/Loading';
import Footer from './components/Footer';
import Header from './components/Header';

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SafetyCulture Documentation",
  description: "Learn how to use SafetyCulture products effectively",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${poppins.variable}`}>
        <Header />
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}
