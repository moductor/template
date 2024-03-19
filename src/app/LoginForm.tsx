"use client";

import Card from "@/components/Card";
import FormButton from "@/components/FormButton";
import FormContent from "@/components/FormContent";
import FormTextFieldRow from "@/components/FormTextFieldRow";
import InfoBanner from "@/components/InfoBanner";
import { useState } from "react";
import { trpc } from "./_trpc/client";

export default function LoginForm() {
  const [message, setMessage] = useState<string | undefined>();
  const [isError, setIsError] = useState(false);

  const { mutate } = trpc.auth.authenticate.useMutation({
    onSuccess: () => setMessage("Logged in successfully!"),
    onError: (error) => {
      setMessage(error.message);
      setIsError(true);
    },
  });

  function handleSubmit(data: FormData) {
    const username = data.get("username")!.toString();
    const password = data.get("password")!.toString();

    setMessage(undefined);
    setIsError(false);

    mutate({ username, password });
  }

  return (
    <Card className="grid w-screen max-w-80 gap-6">
      <h1 className="text-center text-3xl font-bold">Login</h1>

      {message && (
        <InfoBanner variant={{ color: isError ? "error" : "info" }}>
          {message}
        </InfoBanner>
      )}

      <form action={handleSubmit}>
        <FormContent>
          <FormTextFieldRow
            name="username"
            type="text"
            label="User name"
            placeholder="Enter your user name"
            required={true}
          />

          <FormTextFieldRow
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            required={true}
          />

          <FormButton type="submit" className="justify-self-center">
            Login
          </FormButton>
        </FormContent>
      </form>
    </Card>
  );
}
