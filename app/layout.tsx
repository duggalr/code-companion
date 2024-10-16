import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin"], 
  // variable: '--font-inter'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js" async></script>
        {/* <script src="https://cdn.jsdelivr.net/npm/pyodide@0.26.2/pyodide.min.js"></script> */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}