import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gestão Simples - Simplifique a gestão do seu negócio',
  description: 'Plataforma completa de gestão empresarial que simplifica seus processos e aumenta sua produtividade. Experimente gratuitamente!',
  keywords: 'gestão empresarial, software de gestão, ERP, gestão financeira, gestão de negócios, PME',
  authors: [{ name: 'Gestão Simples' }],
  openGraph: {
    title: 'Gestão Simples - Simplifique a gestão do seu negócio',
    description: 'Plataforma completa de gestão empresarial que simplifica seus processos e aumenta sua produtividade.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}