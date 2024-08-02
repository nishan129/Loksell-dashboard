"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import TextInput from '@/components/FormInputs/TextInput';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import ImageInput from '@/components/FormInputs/ImageInput';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { makePostRequest, makePutRequest } from '@/lib/apiRequest';

export default function NewBannerForm({ updateData = {} }) {
  const initialImageUrl = updateData?.imageUrl || "";
  const id = updateData?.id || "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
  const { register, reset, watch, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      isActive: true,
      ...updateData
    },
  });

  const router = useRouter();
  const isActive = watch("isActive");

  useEffect(() => {
    // Set form values if updateData changes
    if (Object.keys(updateData).length > 0) {
      for (const key in updateData) {
        setValue(key, updateData[key]);
      }
      setImageUrl(updateData.imageUrl || "");
    }
  }, [updateData, setValue]);

  const redirect = () => {
    router.push("/dashboard/banners");
  };

  const onSubmit = async (data) => {
    data.imageUrl = imageUrl;
    if (id) {
      data.id = id;
      await makePutRequest(setLoading, `api/banners/${id}`, data, "Banner", redirect, reset);
    } else {
      await makePostRequest(setLoading, 'api/banners', data, "Banner", reset, redirect);
      setImageUrl("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Banner Title"
          name="title"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Banner Link"
          name="link"
          type="url"
          register={register}
          errors={errors}
        />
        <ImageInput 
          label="Banner Image" 
          imageUrl={imageUrl} 
          setImageUrl={setImageUrl} 
          endpoint="bannerImageUploader" 
        />
      </div>

      <ToggleInput
        label="Publish your Banners"
        name="isActive"
        trueTitle="Active"
        falseTitle="Draft"
        register={register}
      />

      <SubmitButton 
        isLoading={loading} 
        buttonTitle={id ? "Update Banner" : "Create Banner"}  
        LoadingButtonTitle={`${id ? "Updating" : "Creating"} Banner please wait...`} 
      />
    </form>
  );
}
