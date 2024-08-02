// Assuming you have a TextInput component
"use client";
import React, { useState } from 'react';
import TextInput from '@/components/FormInputs/TextInput';
import { useForm } from 'react-hook-form';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import { generateSlug } from '@/lib/generateSlug';
import ImageInput from '@/components/FormInputs/ImageInput';
import { makePostRequest, makePutRequest } from '@/lib/apiRequest';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { useRouter } from 'next/navigation';

export default function MarketFrom({updateData = {}}) {
    const initialImageUrl = updateData?.logoUrl || "";
    const id = updateData?.id || "";
    const [logoUrl, setlogoUrl] = useState(initialImageUrl);
    const [loading, setLoading] = useState(false);
    const {register,reset,watch,handleSubmit,formState:{errors}} = useForm({
      defaultValues: {
        isActive: true,
        ...updateData
      },
    });

    const isActive = watch("isActive");
    const router = useRouter();
    function redirect(){
      router.push("/dashboard/markets")
    }
    async function onSubmit(data){
        
        const slug = generateSlug(data.title)
        data.slug = slug;
        data.logoUrl = logoUrl;
        console.log(data);
        
        if (id) {
            data.id = id;
            await makePutRequest(setLoading, `api/markets/${id}`, data, "Market", redirect, reset);
          } else {
            await makePostRequest(setLoading, 'api/markets', data, "Market", reset, redirect);
            setImageUrl("");
          }
        
    }
    {/*
        -id => auto()
        -title
        -slug
        -image
        -discription
        -isActive
         */}
  return (

        <form onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Market Title"
            name="title"
            register={register}
            errors={errors}
           />
        
            {/* COnfigure this end point in the core js */}
        <ImageInput label="Market Logo" imageUrl={logoUrl} setImageUrl={setlogoUrl} endpoint="marketLogoUploader" />
        <TextareaInput 
        label = "Market Description"
        name = "description"
        register={register}
        errors={errors}/>

        <ToggleInput
          label="Market Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
                         />
          </div>
          <SubmitButton isLoading={loading} buttonTitle={id ? "Update Market" : "Create Market"}  LoadingButtonTitle={`${id ? "Updating" : "Creating"} Market please wait...`} />
        </form>
  );
}
