import React from 'react';
import FormHeader from '@/components/backoffice/FormHeader';
import NewProductsForm from '@/components/backoffice/NewProductForm';
import { getData } from '@/lib/getData';

export default async function UpdateProduct({ params: { id } }) {
    // Fetch categories, users, and the product data
    const categoriesData = await getData("categories");
    const usersData = await getData("users");
    const product = await getData(`products/${id}`);

    // Check if product category ID matches any of the category IDs
    const categories = categoriesData.map(category => ({
        id: category.id,
        title: category.title,
        isSelected: category.id === product.categoryId // Set isSelected flag if it matches
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
