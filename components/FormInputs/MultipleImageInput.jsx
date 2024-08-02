import { UploadDropzone } from "@/lib/uploadthing";
import { Pencil, XCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default function MultipleImageInput({
  label,
  imageUrls = [],
  setImageUrls,
  className = "col-span-full",
  endpoint = "multipleProductUploader",
}) {
  function handleImageRemove(imageIndex) {
    const updateImages = imageUrls.filter(
      (image, index) => index !== imageIndex
    );
    setImageUrls(updateImages)
  }
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 dark:text-slate-50 text-gray-900 mb-2"
        >
          {label}
        </label>
        
      </div>
      {imageUrls.length>0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            imageUrls.map((imageUrl, i) => {
              return (<div key={i} className="relative"> 
                  <button onClick={()=>handleImageRemove(i)} className="bg-slate-100 absolute -top-2 -right-2 rounded-full text-slate-800"><XCircle /></button>
                  <Image
          src={imageUrl}
          alt="Item image"
          width={1000}
          height={667}
          className="w-full h-32 object-contain"
        />
                </div>
              );
            })
          }
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log(res)
            const urls = res.map((item) => item.url)
            setImageUrls(urls)
            console.log("Upload Completed")
          }}
          onUploadError={(error) => {
            toast.error("Image Upload Failed, Try Again");
            // Do something with the error.
            console.log(`ERROR! ${error.message}`, error)
          }}
        />
      )}
    </div>
  );
}
