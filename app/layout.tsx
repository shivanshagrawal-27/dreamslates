import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastContainer } from "@/components/toast-container";
import { PreviewModal } from "@/components/preview-modal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dreamslates - Premium AI Wallpaper Platform",
  description: "Generate stunning high-resolution AI wallpapers using advanced text-to-image engines or browse endless community inspiration.",
  openGraph: {
    title: "Dreamslates - AI Wallpaper Generator",
    description: "Generate 4K desktop, mobile, and ultrawide AI wallpapers or explore stock references.",
    type: "website",
    url: "https://dreamslates.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dreamslates - AI Wallpaper Generator",
    description: "Generate 4K desktop, mobile, and ultrawide AI wallpapers.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Navbar />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
          
          {/* Global Client Elements */}
          <ToastContainer />
          <PreviewModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
