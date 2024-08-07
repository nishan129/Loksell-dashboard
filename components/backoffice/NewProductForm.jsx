"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import TextInput from '@/components/FormInputs/TextInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import SelectInput from '@/components/backoffice/SelectInput';
import ArrayItemsInput from '../FormInputs/ArrayItemsinput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { generateSlug } from '@/lib/generateSlug';
import { makePostRequest,makePutRequest } from '@/lib/apiRequest';
import { useRouter } from 'next/navigation';
import { calculateDiscountedPrice } from '@/lib/calculateDiscountPrice';
import { calculateTotalPackets } from '@/lib/calculatePackets';
import { generateUserCode } from '@/lib/generateUserCode';
import MultipleImageInput from '../FormInputs/MultipleImageInput';

export default function NewProductsForm({categories,wholesaller, updateData = {}}) {
    
    const initialImageUrl = updateData?.imageUrl || "";
    const initialTags = updateData?.tags || [];
    const id = updateData?.id || "";
    const [productImages, setProductImages] = useState([])
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [tags, setTags] = useState(initialTags);
    const [loading, setLoading] = useState(false);
    const [discountedPrice, setDiscountedPrice] = useState(null);
    const [totalPackets, setTotalPackets] = useState(null);


    const { register, reset, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            isActive: true,
            ...updateData
        },
    });

    const isActive = watch("isActive");
    const productPrice = watch("product_price");
    const discount = watch("discount");
    const numberOfBoxes = watch("boxes");
    const packetsPerBox = watch("packets_per_box");
    const router = useRouter();

    useEffect(() => {
        if (productPrice && discount) {
            const calculatedDiscountedPrice = calculateDiscountedPrice(parseFloat(productPrice), parseFloat(discount));
            setDiscountedPrice(calculatedDiscountedPrice);
        } else {
            setDiscountedPrice(null);
        }
    }, [productPrice, discount]);

    useEffect(() => {
        if (numberOfBoxes && packetsPerBox) {
            const calculatedTotalPackets = calculateTotalPackets(parseInt(numberOfBoxes), parseInt(packetsPerBox));
            setTotalPackets(calculatedTotalPackets);
        } else {
            setTotalPackets(null);
        }
    }, [numberOfBoxes, packetsPerBox]);

    function redirect() {
        router.push("/dashboard/products");
    }
    

    async function onSubmit(data) {
        const slug = generateSlug(data.title);
        const productCode = generateUserCode(slug,data.title)
        data.slug = slug;
        data.productImages = productImages;
        data.productCode = productCode
        data.tags = tags;
        data.discountedPrice = discountedPrice;
        data.totalPackets = totalPackets;

        console.log(data);
        if (id) {
            data.id = id;
            await makePutRequest(setLoading, `api/products/${id}`, data, "Products", redirect, reset);
          } else {
            console.log(productImages)
            await makePostRequest(setLoading, 'api/products', data, "Products", reset, redirect);
            setTags([]); // Clear tags after successful submission
            setProductImages([]);
          }
    }

    return (
            <form onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <TextInput
                        label="Product Name"
                        name="title"
                        register={register}
                        errors={errors}
                        className='w-full' />
                    <TextInput
                        label="Product SKU"
                        name="sku"
                        register={register}
                        errors={errors}
                        className='w-full' />
                    <TextInput
                        label="Product Barcode"
                        name="barcode"
                        register={register}
                        errors={errors}
                        className='w-full' />
                    <TextInput
                        label="Brand"
                        name="brand"
                        register={register}
                        errors={errors}
                        className='w-full' />
                    <TextInput
                        label="Product Price"
                        name="product_price"
                        type='number'
                        register={register}
                        errors={errors}
                        className='w-full' />
                    <TextInput
                        label="Discount Percentage %"
                        type='number'
                        name="discount"
                        isRequired = {false}
                        register={register}
                        errors={errors}
                        className='w-full' />
                    {discountedPrice !== null && (
                        <div className='w-full'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Discounted Price</label>
                            <div className="p-2.5 w-full text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300">
                                ${discountedPrice.toFixed(2)}
                            </div>
                        </div>
                    )}
                    <TextInput
                        label="Extra Offers"
                        name="offers"
                        register={register}
                        errors={errors}
                        className='w-full' />
                    <TextInput
                        label="Packets/Box/Peti"
                        name="packets_box_peti"
                        register={register}
                        errors={errors}
                        className='w-full' />
                    <TextInput
                        label="Number of Piece"
                        name="no_piece"
                        type='number'
                        register={register}
                        errors={errors}
                        className='w-full' />
                    <TextInput
                        label="Piece Price"
                        name="piece_price"
                        type='number'
                        register={register}
                        errors={errors}
                        className='w-full' />
                    <TextInput
                        label="Number of Boxes"
                        name="boxes"
                        type='number'
                        register={register}
                        errors={errors}
                        className='w-full' />
                    <TextInput
                        label="Packets Per Box"
                        name="packets_per_box"
                        type='number'
                        register={register}
                        errors={errors}
                        className='w-full' />
                    {totalPackets !== null && (
                        <div className='w-full'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Total Packets</label>
                            <div className="p-2.5 w-full text-sm text-gray-900 bg-gray-200 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300">
                                {totalPackets}
                            </div>
                        </div>
                    )}
                    <TextInput
                        label="Unit of Measurement (eg Kilograms grams)"
                        name="unit"
                        register={register}
                        errors={errors}
                        className='w-full'
                      />
                      <TextInput
                        label="Self Life"
                        name="life"
                        register={register}
                        errors={errors}
                        className='w-full'
                      />
                    <SelectInput
                        label="Select Category"
                        name="categoryIds"
                        register={register}
                        errors={errors}
                        className='w-full'
                        options={categories} />
                    <SelectInput
                        label="Select Wholesaller"
                        name="wholesallerId"
                        register={register}
                        errors={errors}
                        className='w-full'
                        options={wholesaller} />

                <MultipleImageInput label="Product Images"
                        imageUrls={productImages}
                        setImageUrls={setProductImages}
                        endpoint="multipleProductUploader"/>
                    <ArrayItemsInput
                        setItems={setTags}
                        items={tags}
                        itemTitle="Tags" />
                    <TextareaInput
                        label="Product Description"
                        name="description"
                        register={register}
                        errors={errors} />
                    <ToggleInput
                        label="Publish your Product"
                        name="isActive"
                        trueTitle="Active"
                        falseTitle="Draft"
                        register={register}
                         />
                </div>
                <SubmitButton
                    isLoading={loading}
                    buttonTitle={id ? "Update Product" : "Create Product"}
                    LoadingButtonTitle={`${id ? "Updating" : "Creating"} Product please wait...`}  />
            </form>
    );
}
