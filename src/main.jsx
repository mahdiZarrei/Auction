import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AppContainer from "./AppContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ToastContainer
            position='bottom-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
        />
        <AppContainer />
    </React.StrictMode>
);
