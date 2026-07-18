import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Platinum Rentals | Property Management in Kampala, Uganda",
  description:
    "Platinum Rentals gives Kampala landlords a professional, transparent alternative to informal caretaker management — tenant sourcing, rent collection, inspections and maintenance, all reported digitally.",
  keywords: [
    "property management Kampala",
    "rental management Uganda",
    "landlord services Kampala",
    "tenant sourcing Uganda",
    "rent collection Kampala",
  ],
  openGraph: {
    title: "Platinum Rentals | Property Management in Kampala, Uganda",
    description:
      "Managing your property like it's our own — tenant sourcing, rent collection, inspections and maintenance for landlords across Greater Kampala.",
    url: "https://www.platinumrentals.ug",
    siteName: "Platinum Rentals",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        <div className="bokeh-bg" aria-hidden="true">
          <div
            className="bokeh-blob"
            style={{
              top: "-10%",
              left: "-8%",
              width: "42vw",
              height: "42vw",
              background: "var(--bokeh-1)",
              animationDelay: "0s",
            }}
          />
          <div
            className="bokeh-blob"
            style={{
              top: "8%",
              right: "-12%",
              width: "36vw",
              height: "36vw",
              background: "var(--bokeh-2)",
              animationDelay: "-6s",
            }}
          />
          <div
            className="bokeh-blob"
            style={{
              bottom: "-14%",
              left: "12%",
              width: "38vw",
              height: "38vw",
              background: "var(--bokeh-3)",
              animationDelay: "-12s",
            }}
          />
          <div
            className="bokeh-blob"
            style={{
              bottom: "0%",
              right: "6%",
              width: "30vw",
              height: "30vw",
              background: "var(--bokeh-4)",
              animationDelay: "-18s",
            }}
          />
          <div
            className="bokeh-blob"
            style={{
              top: "40%",
              left: "40%",
              width: "24vw",
              height: "24vw",
              background: "var(--bokeh-5)",
              animationDelay: "-9s",
            }}
          />
        </div>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
