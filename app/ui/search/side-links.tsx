'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

// TODO: Dynamically import product types from DB

export default function SideLinks( { categories }: { categories: string[] } ) {
  const pathname = usePathname();

  let links = [];
      // Generate links from the fetched types
      for (let i = 0; i < categories.length; i++) {
          links[i] = { name: categories[i], href: `/search/${categories[i]}` };
      }
      
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