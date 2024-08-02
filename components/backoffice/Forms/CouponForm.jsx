"use client";
import React, { useState, useEffect } from 'react';
import TextInput from '@/components/FormInputs/TextInput';
import { useForm } from 'react-hook-form';
import SubmitButton from '@/components/FormInputs/SubmitButton';
import { makePostRequest, makePutRequest } from '@/lib/apiRequest';
import { generateCouponCode } from '@/lib/generateCouponCode';
import ToggleInput from '@/components/FormInputs/ToggleInput';
import { generateIsoFormattedDate } from '@/lib/generateIsoFormattedDate';
import { useRouter } from 'next/navigation';
import { convertIsoDateToNormal } from '@/lib/convertisoDatetoNormal';

export default function CouponForm({ updateData = {} }) {
  const { id = "", expiryDate: initialExpiryDate } = updateData;
  const expiryDateNormal = convertIsoDateToNormal(initialExpiryDate);
  
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  
  const { register, reset, watch, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      isActive: true,
      ...updateData,
      expiryDate: expiryDateNormal,
    },
  });

  const isActive = watch("isActive");
  const router = useRouter();

  const redirect = () => router.push("/dashboard/coupons");

  const onSubmit = async (data) => {
    const couponCode = generateCouponCode(data.title, data.expiryDate);
    const isoFormattedDate = generateIsoFormattedDate(data.expiryDate);
    
    data.expiryDate = isoFormattedDate;
    data.couponCode = couponCode;

    if (id) {
      // Make Put Request (Update)
      makePutRequest(setLoading, `api/coupons/${id}`, data, "Coupons", redirect, reset);
    } else {
      // Make Post Request (Create)
      makePostRequest(setLoading, 'api/coupons', data, "Coupons", reset, redirect);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Coupon Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Coupon Expiry Date"
          name="expiryDate"
          type="date"
          register={register}
          errors={errors}
          className="w-full"
        />
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
        buttonTitle={id ? "Update Coupon" : "Create Coupon"}
        LoadingButtonTitle={`${id ? "Updating" : "Creating"} Coupon, please wait...`}
      />
    </form>
  );
}
