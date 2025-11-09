import { createContext } from "react";

export const AuthContext = createContext();

// GOAL: set timeout at 5minutes

// You have a function that checks for last activity and updates timestamp
// You have a function that runs every 4 minutes. The function checks for last activity timestamp and;
// If the last activity timestamp is greater that timeout of 5minutes, then you force logout (delete TOKEN and force refresh).
// Else, you use the refresh token to request for a new access token

export const AuthContextProvider = ({ children }) => {
	return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
