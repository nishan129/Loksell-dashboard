import React from "react";

export default function SelectInput({
  label,
  name,
  register,
  className = "w-full md:w-1/2",
  options = [],
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          {...register(name)}
          id={name}
          name={name}
          className="block w-full rounded-md dark:bg-slate-800 border border-gray-300 py-2 px-3 dark:text-slate-50 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
        >
          <option value="" disabled>Select an option</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
