// Assuming you have a TextInput component
"use client";
import React, { useState } from 'react';
import TextInput from '@/components/FormInputs/TextInput';
import { useForm } from 'react-hook-form';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import { makePostRequest, makePutRequest } from '@/lib/apiRequest';
import { generateUserCode } from '@/lib/generateUserCode';
import ImageInput from '@/components/FormInputs/ImageInput';
import { useRouter } from 'next/navigation';

export default function CustomerForm({user}) {
    console.log(user);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const {register,reset,watch,handleSubmit,formState:{errors}} = useForm({
      defaultValues: {
        ...user,
      },
    });
    const router = useRouter();
    function redirect(){
      router.push("/dashboard/customers")
    }
    async function onSubmit(data){  
        data.userId = user.id;
        data.profileImageUrl = imageUrl;
        console.log(data);
        makePutRequest(setLoading,`api/customers/${user.id}`,data,"Kirana Profile",redirect);
        setImageUrl("")
        
    }
    {/*
        -id => auto()
        -title
        -code => auto()
        -Expire Date
         */}
  return (
    <form onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Owner Full Name"
            name="name"
            register={register}
            errors={errors}
            className='w-full'/>
          
          <TextInput
            label="Store Name"
            name="storeName"
            register={register}
            errors={errors}
            className='w-full'/>

          <TextInput
            label="Phone"
            name="phone"
            type='tel'
            register={register}
            errors={errors}
            className='w-full'/>

            <TextInput
            label="Email Address"
            name="email"
            type='email'
            register={register}
            errors={errors}
            className='w-full'/>

            <TextInput
            label="Store Address"
            name="storeAddress"
            register={register}
            errors={errors}
            className='w-full'/>

            <TextInput
            label="Owner Adhar Number"
            name="adhar_number"
            register={register}
            errors={errors}
            className='w-full'/>

            <TextInput
            label="Owner PAN Number"
            name="pan_number"
            register={register}
            errors={errors}
            isRequired = {false}
            className='w-full'/>

            <TextInput
            label="Store GST Number"
            name="store_gst_number"
            register={register}
            errors={errors}
            isRequired = {false}
            className='w-full'/>

            <ImageInput label="Store Image" name="profileImageUrl" imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="customerPorfileImage" />
          </div>

          <SubmitButton isLoading={loading} buttonTitle="Update Customer" LoadingButtonTitle="Updating please wait.." />
        </form>
  );
}
