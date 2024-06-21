import Form from '@/app/ui/products/create-form';
import Breadcrumbs from '@/app/ui/products/breadcrumbs';
import {fetchProductCategories } from '@/app/lib/data';
 
export default async function Page() {
  const categories = await fetchProductCategories();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
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