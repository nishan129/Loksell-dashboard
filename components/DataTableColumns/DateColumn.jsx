import React from 'react'

export default function DateColumn({row, accessorkey} ) {
    const createdAt = row.getValue(accessorkey);
    const originalDate = new Date(createdAt)

    const day = originalDate.getDate();
    const month = originalDate.toLocaleString("default",{
        month: "short"
    });
    const year = originalDate.getFullYear();

    const formatted = `${day}th ${month} ${year}`
    return (
        <div className="">
            {formatted}
        </div>);

}
