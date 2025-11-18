import { createContext, useMemo, useState, useEffect, useRef, useCallback } from "react";
import Cookies from "universal-cookie";
import { getRefreshToken } from "../utils/apis/user/refreshToken";

export const AuthContext = createContext();

const INACTIVITY_TIMEOUT = 5 * 60 * 1000;
const REFRESH_INTERVAL = 4 * 60 * 1000;   

export const AuthContextProvider = ({ children }) => {
  const cookies = useMemo(() => new Cookies(), []);
  const TOKEN = cookies.get("TOKEN");

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(!!TOKEN);

  const lastActivityTimeRef = useRef(Date.now());
  const refreshTimeoutRef = useRef(null);
  const inactivityIntervalRef = useRef(null);

  const handleRefreshTokenRef = useRef();


  useEffect(() => {
    handleRefreshTokenRef.current = handleRefreshToken;
  });

  useEffect(() => {
    if (!isAuthenticated) return;

    const updateActivity = () => {
      lastActivityTimeRef.current = Date.now();
    };

    const events = ["click", "mousemove", "keydown", "scroll"];
    events.forEach((event) =>
      window.addEventListener(event, updateActivity, { passive: true })
    );

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, updateActivity)
      );
    };
  }, [isAuthenticated]);

  const handleLogout = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    if (inactivityIntervalRef.current) {
      clearInterval(inactivityIntervalRef.current);
    }

    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("REFRESH_TOKEN", { path: "/" });
    setIsAuthenticated(false);
    window.location.href = "/login";
  }, [cookies]);

  const scheduleRefresh = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    refreshTimeoutRef.current = setTimeout(() => {
      const now = Date.now();
      const inactivity = now - lastActivityTimeRef.current;
      if (inactivity >= INACTIVITY_TIMEOUT) {
        handleLogout();
        return;
      }
    
      handleRefreshTokenRef.current?.();
    }, REFRESH_INTERVAL);
  }, [handleLogout]);

  const handleRefreshToken = useCallback(async () => {
    try {
      const refreshToken = cookies.get("REFRESH_TOKEN");
      if (!refreshToken) throw new Error("No refresh token found");

      const res = await getRefreshToken(refreshToken);
      const { token, refreshToken: newRefreshToken } = res;

      cookies.set("TOKEN", token, { path: "/", maxAge: 60 * 60 });
      cookies.set("REFRESH_TOKEN", newRefreshToken, {
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });

      setIsAuthenticated(true);
      scheduleRefresh();
    } catch (err) {
      console.error("Failed to refresh token", err);
      handleLogout();
    }
  }, [cookies, handleLogout, scheduleRefresh]);

  useEffect(() => {
    const token = cookies.get("TOKEN");
    if (token) {
      setIsAuthenticated(true);
      scheduleRefresh();
    } else {
      setIsAuthenticated(false);
    }
    setTimeout(() => setLoading(false), 300);
  }, [cookies, scheduleRefresh]);


  useEffect(() => {
    if (!isAuthenticated) return;

    const checkInactivity = () => {
      const now = Date.now();
      const inactivity = now - lastActivityTimeRef.current;
      if (inactivity >= INACTIVITY_TIMEOUT) {
        handleLogout();
      }
    };

    inactivityIntervalRef.current = setInterval(checkInactivity, 60 * 1000); 

    return () => {
      if (inactivityIntervalRef.current) {
        clearInterval(inactivityIntervalRef.current);
      }
    };
  }, [isAuthenticated, handleLogout]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        handleLogout,
        handleRefreshToken,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
