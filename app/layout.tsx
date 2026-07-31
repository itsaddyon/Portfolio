import type { Metadata } from "next";
import { display, body } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://itsaddyon.vercel.app"),
  title: "Adarsh Arya",
  description:
    "Adarsh Arya — Systems & Applied ML Engineer. B.Tech Computer Science, Roorkee Institute of Technology. Creator of IRIS, MediBridge, AEGIS, and SidekickAI.",
  icons: {
    icon: "/images/favicon.png?v=2",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "Adarsh Arya | Systems & Applied ML Engineer",
    description: "Systems & Applied ML Engineer. Co-organizer GDGoC RIT, Lead Team Grey Hats. Creator of IRIS, MediBridge, AEGIS, and SidekickAI.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Adarsh Arya — Systems & Applied ML Engineer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adarsh Arya | Systems & Applied ML Engineer",
    description: "Systems & Applied ML Engineer. Co-organizer GDGoC RIT, Lead Team Grey Hats. Creator of IRIS, MediBridge, AEGIS, and SidekickAI.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
