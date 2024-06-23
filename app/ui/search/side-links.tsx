'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// TODO: Dynamically import product types from DB

export default function SideLinks({ categories }: { categories: string[] }) {
  const pathname = usePathname();

  const links = categories.map((category) => ({
    name: category,
    href: `/search/${category}`,
  }));

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            'flex h-12 items-center justify-center gap-2 rounded-md p-3 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-blue-50 hover:text-gray-900 md:justify-start md:p-2 md:px-3',
            {
              'bg-blue-100 text-gray-600 shadow-md': pathname === link.href,
            },
          )}
        >
          <p className="md:block">{link.name.charAt(0).toUpperCase() + link.name.slice(1)}</p>
        </Link>
      ))}
    </>
  );
}
