"use client";

import { useFirebaseStore, useLoadingStore } from "@/store";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useRouter } from "next/navigation";
import { Loading } from "@/components";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { apiController, user, isAuth } = useFirebaseStore(
    useShallow((s) => ({
      user: s.user,
      apiController: s.apiController,
      isAuth: s.isAuth,
    }))
  );
  const isLoading = useLoadingStore((s) => s.isLoading);

  useEffect(() => {
    const unsubscribe = apiController.listenToAuthChanges();
    return () => unsubscribe?.();
  }, []);

  useEffect(() => {
    const isAuthenticated = !!(user && isAuth);
    console.log({ isAuthenticated });
    if (isAuthenticated) {
      router.push("/dashboard");
    } else if (!isAuthenticated) {
      router.push("/login");
    }
  }, [user, isAuth]);

  return <>{isLoading ? <Loading /> : children}</>;
};

export default AuthProvider;
