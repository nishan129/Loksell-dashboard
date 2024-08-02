// Assuming you have a TextInput component
"use client";
import React, { useState } from 'react';
import TextInput from '@/components/FormInputs/TextInput';
import { useForm } from 'react-hook-form';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import { makePostRequest } from '@/lib/apiRequest';
import { generateUserCode } from '@/lib/generateUserCode';
import ImageInput from '@/components/FormInputs/ImageInput';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { useRouter } from 'next/navigation';

export default function NewWholesalerForm({user}) {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const {register,reset,watch,handleSubmit,formState:{errors}} = useForm({
      defaultValues: {
        isActive: true,
        ...user,
      },
    });

    const isActive = watch("isActive");
    const router = useRouter();
    function redirect(){
      router.push("/login")
    }
    async function onSubmit(data){
        // Wholesaler Name => Nishant Borkar => NB
        // EAPP-NB-30062024-3355
        const code = generateUserCode("Eapp",data.name);
        data.code = code;
        data.userId = user.id;
        data.profileImageUrl = imageUrl;
        console.log(data);
        makePostRequest(setLoading,'api/wholesaler',data,"Wholesaler Profile",reset,redirect);
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
            label="Wholesaler's Full Name"
            name="name"
            register={register}
            errors={errors}
            className='w-full'/>
          
          <TextInput
            label="Wholesaler's Store Name"
            name="storeName"
            register={register}
            errors={errors}
            className='w-full'/>

          <TextInput
            label="Wholesaler's Phone"
            name="phone"
            type='tel'
            register={register}
            errors={errors}
            className='w-full'/>
          
          <TextInput
            label="Wholesaler's Store Phone Number"
            name="store_phone_number"
            type='tel'
            register={register}
            errors={errors}
            className='w-full'/>

            <TextInput
            label="Wholesaler's Email Address"
            name="email"
            type='email'
            register={register}
            errors={errors}
            className='w-full'/>

            <TextInput
            label="Wholesaler's Store Address"
            name="storeAddress"
            register={register}
            errors={errors}
            className='w-full'/>

            <TextInput
            label="Wholesaler's Address"
            name="address"
            register={register}
            errors={errors}
            className='w-full'/>

            <TextInput
            label="Wholesaler's Adhar Number"
            name="wholesaler_adhar_number"
            register={register}
            errors={errors}
            className='w-full'/>

            <TextInput
            label="Wholesaler's PAN Number"
            name="wholesaler_pan_number"
            register={register}
            errors={errors}
            isRequired = {false}
            className='w-full'/>

            <TextInput
            label="Wholesaler's Store GST Number"
            name="wholesaler_store_gst_number"
            register={register}
            errors={errors}
            isRequired = {false}
            className='w-full'/>


            <ImageInput label="Wholesaller Store Image" name="profileImageUrl" imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="wholesalerPorfileImage" />
          
            <ToggleInput
                        label="Wholesaller Status"
                        name="isActive"
                        trueTitle="Active"
                        falseTitle="Draft"
                        register={register}
                         />
          </div>

          <SubmitButton isLoading={loading} buttonTitle="Create Wholesaller" LoadingButtonTitle="Creating Wholesaller please wait.." />
        </form>
  );
}
