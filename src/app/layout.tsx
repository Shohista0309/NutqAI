import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NUTQ AI — O\'zbek tilidagi AI Nutq Murabbiyi',
  description: 'O\'zbek tilida ravon, aniq, ishonchli va ta\'sirchan gapirishni o\'rgatuvchi AI nutq murabbiyi (Vaysaqi AI).',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="dark">
      <body className="antialiased bg-[#060913] text-white">
        {children}
      </body>
    </html>
  );
}
