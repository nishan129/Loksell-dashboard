import React from 'react';
import FormHeader from '@/components/backoffice/FormHeader';
import NewProductsForm from '@/components/backoffice/NewProductForm';
import { getData } from '@/lib/getData';

export default async function UpdateProduct({ params: { id } }) {
    // Fetch data for categories, users, and the specific product
    const [categoriesData, usersData, product] = await Promise.all([
        getData("categories"),
        getData("users"),
        getData(`products/${id}`)
    ]);

    // Extract and map wholesaler data
    const wholesalers = usersData
        .filter(user => user.role === "WHOLESALER")
        .map(({ id, name }) => ({ id, title: name }));

    // Use the product's categories directly
    const categories = product.categories;

    return (
        <div>
            <FormHeader title="Update Product" />
            <NewProductsForm 
                categories={categories} 
                wholesalers={wholesalers} 
                updateData={product} 
            />
        </div>
    );
}
