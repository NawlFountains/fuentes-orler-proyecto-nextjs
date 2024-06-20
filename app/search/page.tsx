import { fetchProducts, fetchProductCategories } from "../lib/data";
import { CardSkeleton } from "../ui/skeletons";
import { Suspense } from "react";
import Card from "../ui/search/card";
export default async function Products() {
    const products = await fetchProducts();
    return (
        <div >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Suspense fallback={<CardSkeleton />}>
                {products.map((product) => {
                    return (
                        <Card key={product.id} id = {product.id} name={product.name} price={product.price} imageURL={product.image_url}></Card> )
                        } )}
                </Suspense>
            </div>
        </div>
    );
}