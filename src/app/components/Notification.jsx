"use client";
import React, { useEffect } from "react";
import { animate, motion } from "framer-motion";
import { IconBug, IconCheck, IconInfoCircle } from "@tabler/icons-react";
import { createRoot } from "react-dom/client";

// Styles object defining different notification types and their corresponding styles and icons
const styles = {
  success: { style: "py-1 px-2 bg-success mb-3", icon: <IconCheck /> },
  info: { style: "py-1 px-2 bg-info mb-3", icon: <IconInfoCircle /> },
  error: { style: "py-1 px-2 bg-error mb-3", icon: <IconBug /> },
};

// Notification class with a renderNotification method
export class Notification {
  renderNotification(props) {
    const root = createRoot(document.getElementById("notifications_container"));

    // Check if a notification already exists, if so, return early
    if (document.getElementById("notification")) return;

    // Render the NotificationComponent with the provided props
    root.render(<NotificationComponent {...props} />);

    // Unmount the notification after the specified number of seconds
    setTimeout(() => {
      root.unmount();
    }, props.seconds * 1000);
  }
}

// NotificationComponent functional component
function NotificationComponent({ type, title, description, seconds }) {
  useEffect(() => {
    // Set a timer to animate the notification out after the specified number of seconds
    let timer = setTimeout(() => {
      animate("#notification", { opacity: 0, x: 200 });
    }, seconds * 1000);

    // Clean up function to clear the timer and remove the notification element
    return () => {
      clearTimeout(timer);
      document.getElementById("notification")?.remove();
    };
  }, [seconds]);

  return (
    <motion.div
      id="notification"
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-primary fixed bottom-0 right-0 z-[100] max-h-[80vh] w-screen rounded-lg px-5 py-2 shadow-lg md:bottom-10 md:right-10 md:w-96"
    >
      <div className="relative flex max-h-full flex-grow items-center justify-between overflow-hidden">
        <h2 className="mb-2 font-bold text-white">{title}</h2>
        <span className="text-white">{styles[type].icon}</span>
      </div>
      <h3
        className={`${styles[type].style} max-h-[70vh] overflow-y-auto whitespace-pre-wrap rounded text-sm text-black`}
      >
        {description}
      </h3>
    </motion.div>
  );
}
