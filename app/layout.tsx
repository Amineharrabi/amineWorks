import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

export const metadata: Metadata = {
  title: "Amine's works",
  description: "I make things.\nMainly digital things.\nthe gap between a thing that functions,\nand a thing that resonates..\nthat's where I spend most of my time.",
  keywords: "Amine Harrabi, Data Engineer, Machine Learning, Full-Stack Engineer, Content Creator, Python, Rust, C++, AI, PyTorch, Web Development",
  authors: [{ name: "Amine Harrabi" }],
  creator: "Amine Harrabi",
  publisher: "Amine Harrabi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Amine Harrabi - Data Engineer & Creator",
    description: "I make things. Mainly digital things.",
    url: "https://amineharrabi.com",
    siteName: "Amine's works",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amine Harrabi - Data Engineer & Creator",
    description: "I make things. Mainly digital things.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/weblogo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-y-none">
      <body
        className={`${soriaFont.variable} ${vercettiFont.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
