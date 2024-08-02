// Assuming you have a TextInput component
"use client";
import React, { useState } from 'react';
import FormHeader from '@/components/backoffice/FormHeader';
import TextInput from '@/components/FormInputs/TextInput';
import { useForm } from 'react-hook-form';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import { makePostRequest } from '@/lib/apiRequest';
import { generateUserCode } from '@/lib/generateUserCode';
import ImageInput from '@/components/FormInputs/ImageInput';
import TextareaInput from '@/components/FormInputs/TextAreaInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';

export default function Newstaff() {
    // const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const {register,reset,watch,handleSubmit,formState:{errors}} = useForm({
      defaultValues: {
        isActive: true,
      },
    });
    // const title = watch("title")
    // const expiryDate = watch("expiryDate")
    
    // console.log(title,expiryDate,coupon)
    const isActive = watch("isActive");
    async function onSubmit(data){
        // Wholesaler Name => Nishant Borkar => NB
        // EAPP-NB-30062024-3355
        const employeeCode = generateUserCode("ASN",data.name);
        data.employeeCode = employeeCode;
        console.log(data);
        makePostRequest(setLoading,'api/staffs',data,"Staff",reset);
        
    }
    {/*
        -name
        -password
        -email
        -phone
        -physicalAddress
        -NIN
        -DOB
        -Notes
        -isActive
         */}
  return (
    <div>
        <FormHeader title="New Staff"/>
        <form onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Full Name"
            name="name"
            register={register}
            errors={errors}/>

            <TextInput
            label="Email Address"
            name="email"
            register={register}
            errors={errors}
            className='w-full'/>
          
          <TextInput
            label="Password"
            name="password"
            type="password"
            register={register}
            errors={errors}
            className='w-full'/>

            <TextInput
            label="Employee id"
            name="employee_id"
            register={register}
            errors={errors}
            className='w-full'/>

            <TextInput
            label="Date of Birth"
            name="dob"
            type="date"
            register={register}
            errors={errors}
            className='w-full'/>

          <TextInput
            label="Phone Number"
            name="phone"
            register={register}
            errors={errors}
            className='w-full'/>

            <TextInput
            label="Address"
            name="address"
            register={register}
            errors={errors}
            className='w-full'/>
            
            <TextareaInput
            label="Notes"
            name="notes"
            register={register}
            errors={errors}
            isRequired = {false}
            />

            {/* <TextInput
            label="Wholesaller Unique Code"
            name="uniqueCode"
            register={register}
            errors={errors}
            className='w-full'/> */}

            {/* <ImageInput label="Wholesaller Store Image" imageUrl={imageUrl} setImageUrl={setImageUrl} endpoint="bannerImageUploader" /> */}
            <ToggleInput
                        label="Publish your Staff"
                        name="isActive"
                        trueTitle="Active"
                        falseTitle="Draft"
                        register={register}
                         />

          </div>

          <SubmitButton isLoading={loading} buttonTitle="Create Staff" LoadingButtonTitle="Creating Staff please wait.." />
        </form>
        
    </div>
  );
}
