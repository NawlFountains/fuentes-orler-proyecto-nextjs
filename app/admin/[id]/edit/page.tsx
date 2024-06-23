import Form from '@/app/ui/products/edit-form';
import Breadcrumbs from '@/app/ui/products/breadcrumbs';
import { fetchProduct,fetchProductCategories } from '@/app/lib/data';
import { notFound} from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [product, categories] = await Promise.all([fetchProduct(id),fetchProductCategories()]);

    if (!product) {
        notFound();
    }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Admin', href: '/admin' },
          {
            label: 'Edit a product',
            href: `/admin/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form product={product} categories={categories} />
    </main>
  );
}