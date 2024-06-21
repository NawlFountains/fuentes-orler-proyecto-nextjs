'use client';

import {
  HomeIcon,
  BuildingStorefrontIcon,
  IdentificationIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  {
    name: 'Products', 
    href: '/search', 
    auth: false,
    icon: BuildingStorefrontIcon,
  },
  {
    name: 'Admin panel',
    href: '/admin',
    auth: true,
    icon: IdentificationIcon ,
  },
];

export default function NavLinks({
  logged,
}: {
  logged: boolean;
}) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {

        if (link.auth) {
          if (!logged) {
            return null;
          }
        }
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
               className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-white hover:text-black md:flex-none md:justify-start md:p-2 md:px-3 mx-1 my-3',
              {
                'bg-white text-black': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
