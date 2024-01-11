import React from "react";
import Navbar from "./_components/navbar";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="min-h-full w-full flex flex-col gap-y-5 py-5 items-center justify-center bg-custom-gradient">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
