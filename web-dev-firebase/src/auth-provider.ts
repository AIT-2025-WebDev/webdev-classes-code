import { useEffect, useRef, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const refreshUserData = useCallback(async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      // Don't clear user on refresh failure - might be temporary network issue
    }
  }, [setUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setUser(null);
        }
        setLoading(false);

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(refreshUserData, REFRESH_INTERVAL_MS);
      } else {
        setUser(null);
        setLoading(false);

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    });

    return () => {
      unsubscribe();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [setUser, setLoading, refreshUserData]);

  return <>{children}</>;
}
