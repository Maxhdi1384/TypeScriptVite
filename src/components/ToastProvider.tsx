import {
  useState,
  type ReactNode,
} from "react";

import { ToastContext } from "./ToastContext";
import "./Toast.css";

interface ToastProviderProps {
  children: ReactNode;
}

function ToastProvider({
  children,
}: ToastProviderProps) {
  const [message, setMessage] = useState("");

  function showToast(newMessage: string) {
    setMessage(newMessage);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      {children}

      {message && (
        <div className="custom-toast">
          <i className="bi bi-check-circle-fill"></i>

          <span>{message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export default ToastProvider;