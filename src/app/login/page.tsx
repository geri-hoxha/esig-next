"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import request from "@/request";
import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

const formSchema = z.object({
  password: z.string().min(2, {
    message: "Display Name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  totp: z.string(),
  rememberMe: z.boolean(),
});

export default function LoginPage() {
  const [mfaNotSetup, setMfaNotSetup] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      username: "",
      totp: "",
      rememberMe: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(
      "https://apigerit.esig.al/identity/auth/login",
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // mode: 'same-origin'
      }
    );
    const error = await response.json();

    console.log(error);

    if (error.value.loginResult === "MfaNotSetup") {
      setMfaNotSetup(error.value.message);
    }
  }

  return (
    <div className="border  p-4  rounded-md border-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem hidden>
                <FormLabel>rememberMe</FormLabel>
                <FormControl>
                  <Input
                    className="text-gray-600"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="text-gray-600"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input
                    className="text-gray-600"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totp"
            render={({ field }) => (
              <FormItem >
                <FormLabel>totp</FormLabel>
                <FormControl>
                  <Input
                    className="text-gray-600"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Log in</Button>
        </form>
      </Form>

      {mfaNotSetup && (
        <div
          style={{
            marginTop: 20,
            width: "100%",
          }}
        >
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={mfaNotSetup}
            viewBox={`0 0 256 256`}
          />
        </div>
      )}
    </div>
  );
}
