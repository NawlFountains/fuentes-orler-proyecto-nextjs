import Pagination from '@/app/ui/products/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/products/table';
import { CreateProduct } from '@/app/ui/products/buttons';
import { ProductsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchLatestsTransactions, fetchProductsPages, fetchLatestShipments } from '@/app/lib/data';
import LatestsTransactions from '../ui/products/latests-transactions';
import LatestsShipments from '../ui/products/latests-shipments';
 
const MAX_TRANSACTIONS = 5;
const MAX_SHIPMENTS = 5;
export default async function Page({searchParams,} : {searchParams?: {
  query?: string;
  page?: string;
    };
  }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchProductsPages(query);
  const transactions = await fetchLatestsTransactions(MAX_TRANSACTIONS);
  const shipments = await fetchLatestShipments(MAX_SHIPMENTS);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search products..." />
        <CreateProduct />
      </div>
       <Suspense key={query + currentPage} fallback={<ProductsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
      <div className="grid w-full grid-cols-1 gap-4">
        <div className=" col-span-1 ">
          <Suspense fallback={<ProductsTableSkeleton />}>
            <LatestsTransactions transactions={transactions} />
          </Suspense>
          </div>
        <div className="col-span-1">
          <Suspense fallback={<ProductsTableSkeleton />}>
            <LatestsShipments shipments={shipments} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}