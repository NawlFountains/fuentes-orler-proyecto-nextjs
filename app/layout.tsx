import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Navbar from './ui/dashboard/navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-dark-gray text-white mx-5`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
