import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luxora.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Luxora | Aviacion privada y experiencias de lujo",
    template: "%s | Luxora",
  },
  description:
    "Reserva jets privados con operadores verificados, pagos seguros y una arquitectura preparada para un marketplace global de activos de lujo.",
  keywords: [
    "aviacion privada",
    "jets privados",
    "charter jet",
    "marketplace de lujo",
    "yates",
    "villas de lujo",
    "autos de lujo",
  ],
  authors: [{ name: "Luxora" }],
  creator: "Luxora",
  publisher: "Luxora",
  openGraph: {
    title: "Luxora | Viaja sin limites",
    description:
      "Plataforma premium para reservar aviacion privada y escalar a experiencias de lujo.",
    url: "/",
    siteName: "Luxora",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxora | Viaja sin limites",
    description:
      "Marketplace premium para aviacion privada y experiencias de lujo.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
