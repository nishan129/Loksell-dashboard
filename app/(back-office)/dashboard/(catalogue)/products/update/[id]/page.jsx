import React from 'react';
import FormHeader from '@/components/backoffice/FormHeader';
import NewProductsForm from '@/components/backoffice/NewProductForm';
import { getData } from '@/lib/getData';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function UpdateProduct({ params: { id } }) {
    // Fetch categories and users data
    const categoriesData = await getData("categories")
    const usersData = await getData("users")
    const product = await getData(`products/${id}`)
    // Filter and map wholesalers
    const wholesaller = usersData
        .filter(user => user.role === "WHOLESALER")
        .map(user => ({ id: user.id, title: user.name }));

    // Map categories
    const categories = categoriesData.map(category => ({ id: category.id, title: category.title }));

    return (
        <div>
            <FormHeader title="Update Product" />
            <NewProductsForm categories={categories} wholesaller={wholesaller} updateData={product} />
        </div>
    );
}