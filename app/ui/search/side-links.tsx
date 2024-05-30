'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { fetchProductTypes } from '@/app/lib/data';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

// TODO: Dynamically import product types from DB

// TODO: make category carrusel for mobile
let links: any[] = [];
async function generateLinks() {
  try {
    const types = await fetchProductTypes();
    for (let i = 0; i < types.length; i++) {
      links[i] = { name: types[i], href: `/search/${types[i]}` };
    }
    console.log(links);
  } catch (error) {
    console.error('Error fetching product types:', error);
  }
}

export default function NavLinks() {
  const pathname = usePathname();
  generateLinks();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
               className={clsx(
              'flex v-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-align text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <p className="md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}