import type { Metadata, Viewport } from "next";
import localFont from 'next/font/local';
import { FOOTER_LINKS } from "@constants";
import SeoContent from "./components/common/SeoContent";
import "./globals.css";

const soriaFont = localFont({
  src: "../public/soria-font.ttf",
  variable: "--font-soria",
});

const vercettiFont = localFont({
  src: "../public/Vercetti-Regular.woff",
  variable: "--font-vercetti",
});

const SITE_URL = "https://amineharabi.tech";
const SITE_TITLE = "Amine Harrabi | Data Engineer & ML Developer";
const SITE_DESCRIPTION = "Amine Harrabi is a data engineer and machine learning developer from Sfax, Tunisia. I make things, mainly digital things: neural networks from scratch, generative models, simulations and full-stack apps.";

// Structured data so search engines can tie this site and these profiles to the same person.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Amine Harrabi",
  url: SITE_URL,
  image: `${SITE_URL}/weblogo.png`,
  jobTitle: "Data Engineer",
  alumniOf: "Faculty of Sciences of Sfax",
  sameAs: FOOTER_LINKS.map((link) => link.url),
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: "Amine Harrabi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SeoContent />
        {children}
      </body>
    </html>
  );
}
