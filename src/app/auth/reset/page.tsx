import NewPasswordForm from "@/components/auth/new-password-form";
import ResetForm from "@/components/auth/reset-form";
import { AppProps } from "next/app";
import React from "react";

type ResetPasswordProps = {
  searchParams: { token: string };
};

const ResetPassword = ({ searchParams: { token } }: ResetPasswordProps) => {
  if (token) return <NewPasswordForm />;

  return <ResetForm />;
};

export default ResetPassword;
