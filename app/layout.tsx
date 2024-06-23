import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Navbar from './ui/home/navbar';
import Footer from './ui/home/footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-dark-gray text-white `}>
        <div className='mx-4'>
          <Navbar />
          {children}
        </div>
          {/* <Footer /> */}
      </body>
    </html>
  );
}
