import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import CatCursor from "@/components/ui/CatCursor";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Abhishek's Portfolio",
  description: "Creative Developer | Tech Enthusiast | Problem Solver",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              const savedTheme = localStorage.getItem('theme');
              const theme = savedTheme === 'dark' ? 'dark' : 'light';
              document.documentElement.classList.toggle('dark', theme === 'dark');
            })();`,
          }}
        />
      </head>
      <body
        className={`${poppins.className} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <CatCursor />
        {children}
      </body>
    </html>
  );
}
