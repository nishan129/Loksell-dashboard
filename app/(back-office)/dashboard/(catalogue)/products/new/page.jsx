import React from 'react';
import NewProductsForm from '@/components/backoffice/NewProductForm';
import { getData } from '@/lib/getData';
import FormHeader from '@/components/backoffice/FormHeader';
export default async function NewProduct() {
    // Categories and Wholesalers
    const categoriesData = await  getData("categories")
    const usersData = await getData("users")
    const wholesallerdata = usersData.filter((user) => user.role === "WHOLESALER")
    const wholesaller = wholesallerdata.map((user) => {
        return {
            id: user.id,
            title: user.name
        }
    })
    const categories = categoriesData.map((category) => {
        return {
            id: category.id,
            title: category.title
        }
    })
    return   (<div>
    <FormHeader title="New Product" /> 
    <NewProductsForm categories={categories} wholesaller={wholesaller} />
    </div>);
    
}
