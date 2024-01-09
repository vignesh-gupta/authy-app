"use client";

import { newPassword } from "@/actions/reset";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import CardWrapper from "./card-wrapper";
import { useSearchParams } from "next/navigation";

const NewPasswordForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: z.infer<typeof PasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(data, token || '').then((res) => {
        setError(res?.error);
        setSuccess(res?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Reset password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="*******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
