import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elective Finder",
  description: "Easily find relevant electives.",
  icons: {
    icon: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{
      padding: 0,
      margin: 0, 
    }}>
      <body className={inter.className} style={{
        padding: 0,
        margin: 0, 
      }}>{children}</body>
    </html>
  );
}
