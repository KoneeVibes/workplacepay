import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/index";
import { AuthContextProvider } from "./context/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
	    <AuthContextProvider>
			<ContextProvider>
				<App />
			</ContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);
