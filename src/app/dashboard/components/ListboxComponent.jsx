"use client";
import React from "react";
import { Notification } from "@/app/components/Notification";

export default function SelectComponent({ options, placeholder, data }) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <select
        onChange={async (e) => {
          // Modify user role on change
          const res = await fetch("/api/user/update_role", {
            method: "PATCH",
            mode: "cors",
            body: JSON.stringify({
              email: data.email,
              role: e.target.value,
            }),
          });

          const result = await res.json();

          // Check if the response status is not 500 (indicating a successful update)
          if (result.status === 200) {
            // Render a success notification using the Notification component
            new Notification().renderNotification({
              title: "Updated user role",
              type: "success",
              description: "The user role was successfully updated",
              seconds: 2,
            });
          } else {
            new Notification().renderNotification({
              title: "Error updating role",
              type: "error",
              description:
                "There was an error updating the user role. Try again.",
              seconds: 2,
            });
          }
        }}
        aria-label="User role selector"
        defaultValue={placeholder} // Set the default value to the placeholder prop
        className="max-w-xs rounded-md text-black p-1"
      >
        {/* Render the options for the select component */}
        {options.map((option) => (
          <option
            className="text-black"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
