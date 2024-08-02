import React from 'react';
import Image from "next/image";

export default function ImageColumn({row , accesskey}) {
    const imageUrl = row.getValue(`${accesskey}`)
    return (
        <div className="shrink-0">
            <Image src={imageUrl}
            alt={`${accesskey}`}
             width={500}
              height={500}
               className="w-10 h-10 rounded-full object-cover" />
        </div>
    );
}
