import SideLinks from './side-links';
import { Suspense } from 'react';
import { SideLinksSkeleton } from '../skeletons';

export default async function Sidenav( { categories }: { categories: string[] } ) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <Suspense fallback={<SideLinksSkeleton />}>
         <SideLinks categories={categories}/>
        </Suspense>
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
}