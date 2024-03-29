"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Notification } from "@/app/components/Notification";

export default function SelectComponent({ options, placeholder, data }) {
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
          if (res.status !== 500) {
            new Notification().renderNotification({
              title: "Updated user role",
              type: "success",
              description: "The user role was successfully updated",
              seconds: 2,
            });
          }
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
