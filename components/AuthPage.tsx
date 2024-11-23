"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { createAccount, signInUser } from "@/lib/actions/users.actions";
import OtpModal from "./OtpModal";

type FormType = "sign-in" | "sign-up";

const formSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

const AuthPage = ({ type }: { type: FormType }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [accountId, setAccountId] = useState(null);

  const formSchemaObj = formSchema(type);

  const form = useForm<z.infer<typeof formSchemaObj>>({
    resolver: zodResolver(formSchemaObj),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchemaObj>) => {
    setLoading(true);
    setErrorMsg("");

    try {
      const user =
        type === "sign-up"
          ? await createAccount({
              fullName: values.fullName || "",
              email: values.email,
            })
          : await signInUser({ email: values.email });
      setAccountId(user.accountId);
    } catch {
      setErrorMsg("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container w-1/3 h-screen mx-auto px-5 py-3 flex flex-col justify-center gap-2"
        >
          <h1 className="text-lg font-semibold">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="flex justify-center gap-3 mt-2"
            disabled={loading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            {loading && <LoaderCircle size={24} className="animate-spin" />}
          </Button>
          {errorMsg && <p>{errorMsg}</p>}
          {
            <div className="flex justify-center gap-2 font-light text-sm mt-1">
              <p className="text-slate-200">
                {type === "sign-in"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="hover:underline"
              >
                {type === "sign-in" ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          }
        </form>
      </Form>
      {accountId && (
        <OtpModal email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
};
export default AuthPage;
