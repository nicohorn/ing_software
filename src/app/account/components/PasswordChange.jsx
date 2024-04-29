import React, { useState } from "react";
import { Notification } from "@/app/components/Notification";

export const PasswordChange = ({ user }) => {
  // State to manage the accordion open/closed state
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  // State to track if the new password and repeated new password match
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  // State to track the loading state during password update
  const [loadingPassword, setLoadingPassword] = useState(false);
  // State to store input errors
  const [inputErrors, setInputErrors] = useState({});
  // State variables to store input values
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");

  // Function to validate input
  const validateInput = (value) => {
    return value.trim().length >= 4;
  };

  // Function to handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    // Initialize errors object
    const errors = {};
    // Validate old password input
    if (!validateInput(oldPassword)) {
      errors.oldPassword = "Current password must be at least 4 characters";
    }
    // Validate new password input
    if (!validateInput(newPassword)) {
      errors.newPassword = "New password must be at least 4 characters";
    }
    // Validate repeated new password input
    if (!validateInput(repeatedNewPassword)) {
      errors.repeatedNewPassword =
        "Repeated password must be at least 4 characters";
    }

    // If there are errors, update the inputErrors state and return
    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    }

    // Set loading state to true
    setLoadingPassword(true);
    // Clear input errors
    setInputErrors({});

    // Check if new password and repeated new password match
    if (newPassword === repeatedNewPassword) {
      // Send API request to update password
      const res = await fetch("/api/user/update_password", {
        method: "PATCH",
        mode: "cors",
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
          email: user.email,
        }),
      });
      const result = await res.json();
      if (result.status == 200) {
        console.log(result);
        // If password update is successful, show a success notification
        setLoadingPassword(false);
        new Notification().renderNotification({
          type: "success",
          title: "Updated user password",
          description: "Successfully updated the password",
          seconds: 5,
        });
      } else {
        // If password update fails, show an error notification
        setLoadingPassword(false);
        new Notification().renderNotification({
          type: "error",
          title: "Couldn't update password",
          description: "Your current password is incorrect",
          seconds: 5,
        });
      }
    } else {
      // If new password and repeated new password don't match, set passwordsMatch to false
      setLoadingPassword(false);
      setPasswordsMatch(false);
      // Reset passwordsMatch to true after 8 seconds
      setTimeout(() => {
        setPasswordsMatch(true);
      }, 8000);
    }
  };

  return (
    <div className="bg-red-900 md:max-w-96 w-[95vw] rounded-lg shadow-lg py-3 px-6">
      <div className="accordion">
        <div className="accordion-item">
          <div
            className="accordion-header cursor-pointer rounded-xl font-bold py-3 w-full"
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          >
            Cambiar contraseña
          </div>
          {isAccordionOpen && (
            <div className="accordion-body">
              <form
                onSubmit={handlePasswordUpdate}
                className="flex flex-col gap-4 pb-3"
              >
                <input
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className={`border-gray-300 border rounded-md px-3 py-2 text-sm ${
                    inputErrors.oldPassword ? "border-red-500" : ""
                  }`}
                  type="password"
                  placeholder="Contraseña actual"
                />
                {inputErrors.oldPassword && (
                  <p className="text-red-500 text-sm">
                    {inputErrors.oldPassword}
                  </p>
                )}
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`border-gray-300 border rounded-md px-3 py-2 text-sm ${
                    inputErrors.newPassword ? "border-red-500" : ""
                  }`}
                  type="password"
                  placeholder="Nueva contraseña"
                />
                {inputErrors.newPassword && (
                  <p className="text-red-500 text-sm">
                    {inputErrors.newPassword}
                  </p>
                )}
                <input
                  value={repeatedNewPassword}
                  onChange={(e) => setRepeatedNewPassword(e.target.value)}
                  className={`border-gray-300 border rounded-md px-3 py-2 text-sm ${
                    inputErrors.repeatedNewPassword ? "border-red-500" : ""
                  }`}
                  type="password"
                  placeholder="Repetir nueva contraseña"
                />
                {inputErrors.repeatedNewPassword && (
                  <p className="text-red-500 text-sm">
                    {inputErrors.repeatedNewPassword}
                  </p>
                )}
                {!passwordsMatch && (
                  <p className="animate-pulse">
                    Las contraseñas no coinciden
                  </p>
                )}
                <button
                  className="bg-gray-200 text-black px-3 py-1 rounded-md shadow-md self-end"
                  type="submit"
                >
                  {loadingPassword ? (
                    <div className="w-4 h-4 border-2 border-black rounded-full animate-spin"></div>
                  ) : (
                    "Guardar cambios"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
