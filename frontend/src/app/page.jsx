"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/auth/LoginForm";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (user) {
      router.push("/products");
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <div className="w-full max-w-md px-4">
        <LoginForm />
      </div>
    </div>
  );
}
