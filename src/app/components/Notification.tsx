"use client";
import React, { useEffect } from "react";
import { animate, motion } from "framer-motion";
import { IconBug, IconCheck, IconInfoCircle } from "@tabler/icons-react";
import { createRoot } from "react-dom/client";

type NotificationType = {
  type: "success" | "info" | "error";
  title?: string;
  description?: string;
  seconds: number;
};

const styles = {
  success: {
    style: "py-1 px-2 bg-success mb-3",
    icon: <IconCheck />,
  },
  info: {
    style: "py-1 px-2  bg-info mb-3",
    icon: <IconInfoCircle />,
  },
  error: {
    style: "py-1 px-2 bg-error mb-3",
    icon: <IconBug />,
  },
};

export class Notification {
  renderNotification(props: NotificationType) {
    const root = createRoot(
      document.getElementById("notifications_container")!
    );

    if (document.getElementById("notification")) return;

    root.render(<NotificationComponent {...props} />);
    setTimeout(() => {
      root.unmount();
    }, props.seconds * 1000);
  }
}

function NotificationComponent({
  type,
  title,
  description,
  seconds,
}: NotificationType) {
  useEffect(() => {
    let timer = setTimeout(() => {
      animate("#notification", { opacity: 0, x: 200 });
    }, seconds * 1000);

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
      className="bg-background fixed bottom-0 right-0 z-[100]  max-h-[80vh] w-screen rounded-xl px-5 py-2 shadow-lg md:bottom-10 md:right-10  md:w-96"
    >
      <div className="relative flex max-h-full flex-grow items-center justify-between overflow-hidden">
        <h2 className="mb-2 font-bold text-white">{title}</h2>
        <span className="text-white">{styles[type].icon}</span>
      </div>
      <h3
        className={`${styles[type].style} max-h-[70vh] overflow-y-auto whitespace-pre-wrap rounded text-sm text-white`}
      >
        {description}
      </h3>
    </motion.div>
  );
}
