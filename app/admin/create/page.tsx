import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchProductCategories } from '@/app/lib/data';
 
export default async function Page() {
  const categories = await fetchProductCategories();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Product', href: '/admin' },
          {
            label: 'Create product',
            href: '/admin/create',
            active: true,
          },
        ]}
      />
      <Form categories={categories} />
    </main>
  );
}