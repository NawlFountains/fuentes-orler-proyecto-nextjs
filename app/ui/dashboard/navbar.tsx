import NavLinks from '@/app/ui/dashboard/nav-links';
import StoreLogo from '@/app/ui/store-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function Navbar() {
  return (
    <div className="grid md:flex items-center md:justify-between py-2">
        <div className="mx-auto my-2 md:w-40">
          <StoreLogo />
        </div>
      <div className="flex w-full items-center">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
