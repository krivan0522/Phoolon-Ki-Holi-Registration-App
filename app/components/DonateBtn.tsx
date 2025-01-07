'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DonateBtn = () => {
    const pathname=usePathname();
    if(pathname==='/donation') return null;
  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 animate-bounce">
      <Link href="/donation" className="bg-blue-600 text-white px-4 py-3 text-center rounded-full shadow-lg hover:bg-red-700 transition duration-300">
          Donate &#10084;
      </Link>
    </div>
  );
};

export default DonateBtn;
