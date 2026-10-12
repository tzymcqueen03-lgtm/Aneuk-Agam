import "./globals.css";
import { Archivo_Black, Inter } from "next/font/google";
import { site } from "@/config/site";
import { CartProvider } from "@/components/CartProvider";
import CartBar from "@/components/CartBar";

const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://aneukagam.vercel.app"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "jasa desain",
    "jasa makalah",
    "jasa PPT",
    "desain poster",
    "jasa CV",
    "AneukAgam",
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
    siteName: site.name,
    locale: "id_ID",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/images/og-image.png"],
  },
};

export const viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${display.variable} ${sans.variable}`}>
      <body>
        <CartProvider>
          {children}
          <CartBar />
        </CartProvider>
      </body>
    </html>
  );
}
