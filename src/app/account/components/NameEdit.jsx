"use client";
import React, { useState } from "react";
import { Notification } from "@/app/components/Notification";
import { useRouter } from "next/navigation";

export const NameEdit = ({ user }) => {
  // State variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingName, setLoadingName] = useState(false);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const router = useRouter();

  // Handler for updating the user's name
  const handleNameUpdate = async (e) => {
    e.preventDefault();

    // Trim the name and lastname values (removing whitespaces from the beginning or end of the string).
    const trimmedName = name.trim();
    const trimmedLastname = lastname.trim();

    // Validate name and lastname
    if (trimmedName.length === 0 || trimmedLastname.length === 0) {
      setLoadingName(false);
      new Notification().renderNotification({
        type: "info",
        title: "Empty fields",
        description: "The name and the last name can't be empty",
        seconds: 5,
      });
      return;
    }

    if (trimmedName.length < 3 || trimmedLastname.length < 3) {
      setLoadingName(false);
      new Notification().renderNotification({
        type: "info",
        title: "Invalid length",
        description:
          "The name and the last name must be at least 3 characters long",
        seconds: 5,
      });
      return;
    }

    // Check if name or lastname contains numbers
    const containsNumbers =
      /\d/.test(trimmedName) || /\d/.test(trimmedLastname);
    if (containsNumbers) {
      setLoadingName(false);
      new Notification().renderNotification({
        type: "info",
        title: "Invalid characters",
        description: "The name and the last name can't contain numbers",
        seconds: 5,
      });
      return;
    }

    // Send a PATCH request to update the user's name
    const res = await fetch("/api/user/update_name", {
      method: "PATCH",
      mode: "cors",
      body: JSON.stringify({
        name: trimmedName,
        lastname: trimmedLastname,
        email: user.email,
      }),
    });

    const result = await res.json();

    // Check if the response is successful
    if (result.status === 200) {
      // Show a success notification
      new Notification().renderNotification({
        type: "success",
        title: "Updated name",
        description: "Your name was successfully updated",
        seconds: 5,
      });
    } else {
      // Show an error notification
      new Notification().renderNotification({
        type: "error",
        title: "An error has occurred",
        description: "Couldn't update your name",
        seconds: 5,
      });
    }

    // Delay for 1 second before closing the modal and resetting the loading state
    setTimeout(() => {
      //Refresh the page to show the updated name
      router.refresh();
      setLoadingName(false);
      setIsModalOpen(false);
    }, 1000);
  };

  return (
    <div>
      <p className="text-xs">Name</p>
      <div>
        {/* Check if the user has a name */}
        {user?.name ? (
          <div className="flex justify-between items-center">
            <p>
              {user.name} {user.lastname}
            </p>
            {/* Button to open the modal for editing the name */}
            <button
              className="bg-gray-200 text-black px-3 py-1 font-normal rounded-md shadow-md"
              onClick={() => setIsModalOpen(true)}
            >
              Edit name
            </button>
          </div>
        ) : (
          // Button to open the modal for adding the name
          <button
            className="bg-gray-200 text-black px-3 py-1 rounded-md shadow-md w-full"
            onClick={() => setIsModalOpen(true)}
          >
            Add your name
          </button>
        )}
      </div>
      {/* Modal for editing/adding the name */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col gap-1 text-black mb-4">Your name</div>
            {/* Form for updating the name */}
            <form
              id="name_edit_form"
              className="flex flex-col gap-5"
              onSubmit={handleNameUpdate}
            >
              {/* Input field for name */}
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gray-300 border rounded-md px-3 py-2"
                type="text"
                placeholder="Name"
              />
              {/* Input field for lastname */}
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="border-gray-300 border rounded-md px-3 py-2"
                type="text"
                placeholder="Last name"
              />
            </form>
            <div className="flex justify-end gap-2 mt-4">
              {/* Button to close the modal */}
              <button
                className="bg-red-400 text-white px-3 py-1 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              {/* Button to submit the form */}
              <button
                onClick={() => {
                  setLoadingName(true);
                }}
                form="name_edit_form"
                type="submit"
                className="bg-green-500 text-white px-3 py-1 rounded-md"
              >
                {/* Show a loading spinner while submitting the form */}
                {loadingName ? (
                  <div className="w-4 h-4 border-2 border-white rounded-full animate-spin"></div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
