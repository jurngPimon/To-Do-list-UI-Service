"use client";

import React, { useEffect } from "react";

import { LoginForm } from "@/features";
import { useFirebaseStore } from "@/store";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const user = useFirebaseStore((s) => s.user);
  const router = useRouter();
  console.log({ user });
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);
  return <LoginForm />;
};

export default Login;
