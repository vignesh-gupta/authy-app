"use client";
import { useRouter } from "next/navigation";
import React from "react";

type LoginButtonProps = {
  children?: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

const LoginButton = ({
  asChild,
  children,
  mode = "redirect",
}: LoginButtonProps) => {

  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };

  if(mode === "modal") {
    return (
      <span>
        TODO: Implement Modal
      </span>
    )
  }

  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
