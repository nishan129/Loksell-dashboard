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
import SelectInput from '@/components/backoffice/SelectInput';

export default function NewCategoryForm({markets, updateData={}}) {
    const initialImageUrl = updateData?.imageUrl ?? "";
    const id = updateData?.id ?? "";
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading] = useState(false);

    const {register,reset,handleSubmit,watch,formState:{errors}} = useForm({
      defaultValues: {
        isActive: true,
        ...updateData,
      },
    });

    const isActive = watch("isActive");
    const router = useRouter();
    function redirect(){
      router.push("/dashboard/categories")
    }
    async function onSubmit(data){
        
        const slug = generateSlug(data.title)
        data.slug = slug;
        data.imageUrl = imageUrl;
        // console.log(data);
        if(id){
// Make Put Request (Update)
          data.id = id
          makePutRequest(setLoading, `api/categories/${id}`,data,"Category",
             redirect,reset)
          // console.log("Update Request: ",data)
        }else{
// Make Post Request (Create)
        makePostRequest(setLoading,'api/categories',data,"Category",reset,redirect);
        setImageUrl("")
        };
        
        
    }
    {/*
        -id => auto()
        -title
        -slug => auto()
        -description
        -image
         */}
  return (
    <div>
        
        <form onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Category Title"
            name="title"
            register={register}
            errors={errors}
            className='w-full'
            />
          <SelectInput
            label="Select Markets"
            name="marketsIds"
            register={register}
            errors={errors}
            options={markets} />  
        <TextareaInput
        label="Category Description" 
        name="description"
        register={register}
        errors={errors}/>
        <ImageInput label="Category Image" imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="categoryImageUploader" />
        <ToggleInput
                        label="Publish your Category"
                        name="isActive"
                        trueTitle="Active"
                        falseTitle="Draft"
                        register={register}
                         />
          </div>

          <SubmitButton isLoading={loading}
           buttonTitle={id?"Update Category": "Create Category" } 
           LoadingButtonTitle={`${id?"Update":"Creating"} Category please wait..` }/>
        </form>
        
    </div>
  );
}
