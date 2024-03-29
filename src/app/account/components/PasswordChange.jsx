import React, { useRef, useState } from "react";
import { Notification } from "@/app/components/Notification";

export const PasswordChange = ({ user }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const repeatedNewPasswordRef = useRef(null);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const oldPassword = oldPasswordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;
    const repeatedNewPassword = repeatedNewPasswordRef.current?.value;

    setLoadingPassword(true);

    if (newPassword === repeatedNewPassword) {
      const res = await fetch("/api/user/update_password", {
        method: "PATCH",
        mode: "cors",
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
          email: user.email,
        }),
      });
      console.log(res);

      if (res.status === 200) {
        setLoadingPassword(false);
        new Notification().renderNotification({
          type: "success",
          title: "Updated user password",
          description: "Successfully updated the password",
          seconds: 5,
        });
      } else {
        setLoadingPassword(false);
        new Notification().renderNotification({
          type: "error",
          title: "Couldn't update password",
          description: "Your current password is incorrect",
          seconds: 5,
        });
      }
    } else {
      setLoadingPassword(false);
      setPasswordsMatch(false);
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
            Change password
          </div>
          {isAccordionOpen && (
            <div className="accordion-body">
              <form
                onSubmit={handlePasswordUpdate}
                className="flex flex-col gap-4 pb-3"
              >
                <input
                  ref={oldPasswordRef}
                  className="border-gray-300 border rounded-md px-3 py-2 text-sm"
                  type="password"
                  placeholder="Current password"
                />
                <input
                  ref={newPasswordRef}
                  className="border-gray-300 border rounded-md px-3 py-2 text-sm"
                  type="password"
                  placeholder="New password"
                />
                <input
                  ref={repeatedNewPasswordRef}
                  className="border-gray-300 border rounded-md px-3 py-2 text-sm"
                  type="password"
                  placeholder="Repeat new password"
                />
                {!passwordsMatch && (
                  <p className="animate-pulse">
                    Passwords don&apos;t match, try again
                  </p>
                )}
                <button
                  className="bg-gray-200 text-black px-3 py-1 rounded-md shadow-md self-end"
                  type="submit"
                >
                  {loadingPassword ? (
                    <div className="w-4 h-4 border-2 border-black  rounded-full animate-spin"></div>
                  ) : (
                    "Save changes"
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
