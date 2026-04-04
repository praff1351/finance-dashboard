import { Geist, Geist_Mono, Merriweather, Space_Grotesk } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/providers/tanstack-provider";

const spaceGroteskHeading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });

const merriweather = Merriweather({ subsets: ['latin'], variable: '--font-serif' });

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontSans.variable, fontMono.variable, "font-serif", merriweather.variable, spaceGroteskHeading.variable)}
    >
      <body>
        <ThemeProvider>
          <TanstackProvider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html >
  )
}
