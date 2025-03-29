import { createContext, useEffect } from "react";
import useRoutesCustom from "./hooks/useRoutesCustom";
import { Bounce, ToastContainer, toast } from "react-toastify";

// B1: Khởi tạo 1 context
export const NotificationContext = createContext();

function App() {
  const routes = useRoutesCustom();

  const showNotification = (content, type = "default", duration = 4000) => {
    toast[type](content, {
      position: "top-right",
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  return (
    <>
      <NotificationContext.Provider
        value={{
          showNotification: showNotification,
        }}
      >
        <ToastContainer />
        {routes}
      </NotificationContext.Provider>
    </>
  );
}

export default App;
