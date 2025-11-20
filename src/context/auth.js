import { createContext, useMemo, useState, useEffect, useRef, useCallback } from "react";
import Cookies from "universal-cookie";
import { getRefreshToken } from "../utils/apis/user/refreshToken";

export const AuthContext = createContext();

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; 
const REFRESH_INTERVAL = 4 * 60 * 1000;  

export const AuthContextProvider = ({ children }) => {
  const cookies = useMemo(() => new Cookies(), []);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const lastActivityTimeRef = useRef(null);
  const refreshTimeoutRef = useRef(null);
  const inactivityTimeoutRef = useRef(null); 
  const isMountedRef = useRef(true);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
        inactivityTimeoutRef.current = null;
      }
    };
  }, []);

  const clearTimers = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
      inactivityTimeoutRef.current = null;
    }
  }, []);

  const handleLogout = useCallback(() => {
    clearTimers();
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("REFRESH_TOKEN", { path: "/" });
    lastActivityTimeRef.current = null;
    hasInitializedRef.current = false;
    setIsAuthenticated(false);
    window.location.href = "/login";
  }, [cookies, clearTimers]);


  const scheduleInactivityTimeout = useCallback(() => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    inactivityTimeoutRef.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_TIMEOUT);
  }, [handleLogout]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const updateActivity = () => {
      lastActivityTimeRef.current = Date.now();
      scheduleInactivityTimeout(); 
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
  }, [isAuthenticated, scheduleInactivityTimeout]);

  const scheduleRefresh = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }

    refreshTimeoutRef.current = setTimeout(async () => {
      if (!isMountedRef.current) return;

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

        if (isMountedRef.current) {
          scheduleRefresh();
        }
      } catch (err) {
        console.error("Failed to refresh token", err);
        handleLogout();
      }
    }, REFRESH_INTERVAL);
  }, [cookies, handleLogout]);

  const handleLogin = useCallback((token, refreshToken) => {
    cookies.set("TOKEN", token, { path: "/", maxAge: 60 * 60 });
    cookies.set("REFRESH_TOKEN", refreshToken, {
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    setIsAuthenticated(true);
    lastActivityTimeRef.current = Date.now();
    hasInitializedRef.current = true;
    scheduleRefresh();
    scheduleInactivityTimeout(); 
  }, [cookies, scheduleRefresh, scheduleInactivityTimeout]);

  useEffect(() => {
    if (hasInitializedRef.current) return;

    const token = cookies.get("TOKEN");
    
    if (token) {
      setIsAuthenticated(true);
      lastActivityTimeRef.current = Date.now();
      hasInitializedRef.current = true;
      scheduleRefresh();
      scheduleInactivityTimeout(); 
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, [cookies, scheduleRefresh, scheduleInactivityTimeout]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      loading,
      handleLogout,
      handleLogin,
      setIsAuthenticated,
    }),
    [isAuthenticated, loading, handleLogout, handleLogin]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};