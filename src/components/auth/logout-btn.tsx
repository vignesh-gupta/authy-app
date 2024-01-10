"use client";

import { logout } from "@/actions/logout";

type LogoutButtonProps = {
  children?: React.ReactNode;
};

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const handleClick = () => {
    logout();
  };

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
};

export default LogoutButton;
