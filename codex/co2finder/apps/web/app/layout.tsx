import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CO₂ Finder',
  description: '企業のカーボンニュートラル情報を素早く検索するためのインターフェース'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
