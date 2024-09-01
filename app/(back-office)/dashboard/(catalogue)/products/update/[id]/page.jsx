import React from 'react';
import FormHeader from '@/components/backoffice/FormHeader';
import NewProductsForm from '@/components/backoffice/NewProductForm';
import { getData } from '@/lib/getData';

export default async function UpdateProduct({ params: { id } }) {
    // Fetch categories, users, and product data
    const usersData = await getData("users");
    const product = await getData(`products/${id}`);
    const categoriesData = await getData("categories");

    // Map categories and check if they match the product's category ID
    const categories = categoriesData.map(category => ({
        id: category.id,
        title: category.title,
        isSelected: category.id === product.categoryId, // Check if category matches product's categoryId
    }));

    // Filter and map wholesalers
    const wholesaller = usersData
        .filter(user => user.role === "WHOLESALER")
        .map(user => ({ id: user.id, title: user.name }));

    return (
        <div>
            <FormHeader title="Update Product" />
            <NewProductsForm
                categories={categories}
                wholesaller={wholesaller}
                updateData={product}
            />
        </div>
    );
}
