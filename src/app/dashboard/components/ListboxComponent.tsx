"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectComponent({
  options,
  placeholder,
  data,
}: {
  options: { label: string; value: string }[];
  placeholder: string;
  data: any;
}) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
        onChange={async (e) => {
          //Modify user role on change
          const res = await fetch("/api/user/update_role", {
            method: "PATCH",
            mode: "cors",
            body: JSON.stringify({ email: data.email, role: e.target.value }),
          });
        }}
        aria-label="User role selector"
        placeholder={placeholder}
        className="max-w-xs"
      >
        {options.map((option) => (
          <SelectItem
            className="text-black"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
