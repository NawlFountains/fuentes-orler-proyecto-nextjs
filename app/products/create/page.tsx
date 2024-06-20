import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchProductCategories } from '@/app/lib/data';
 
export default async function Page() {
  const categories = await fetchProductCategories();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'products', href: '/products' },
          {
            label: 'Create Product',
            href: '/products/create',
            active: true,
          },
        ]}
      />
      <Form categories={categories} />
    </main>
  );
}