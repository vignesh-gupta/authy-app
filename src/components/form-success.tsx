"use client";

import { CheckCircledIcon } from "@radix-ui/react-icons";

type FormSuccessProps = {
  message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-emerald-500 w-full justify-center">
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
