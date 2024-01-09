"use client";

import { BeatLoader } from "react-spinners";

import { verifyEmail } from "@/actions/email-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import CardWrapper from "./card-wrapper";

const EmailVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      setError("Missing token");
      return;
    }

    verifyEmail(token)
      .then((res) => {
        setSuccess(res?.success);
        setError(res?.error);
      })
      .catch((err) => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center justify-center w-full">
        {!success && !error && <BeatLoader />}

        {success ? (
          <FormSuccess message={success} />
        ) : (
          <FormError message={error} />
        )}
      </div>
    </CardWrapper>
  );
};

export default EmailVerificationForm;
