import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import SocialAuthButtons from "./SocialAuthButtons";
import AuthLegalNotice from "./AuthLegalNotice";
import { useRegister } from "../hooks/useRegister";
import type React from "react";
import { useNavigate } from "react-router";

function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const register = useRegister();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    register.mutate(
      {
        name: form.get("name") as string,
        email: form.get("email") as string,
        password: form.get("password") as string,
        password_confirmation: form.get("password_confirmation") as string,
      },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                />
                {register.error?.fieldError("name") && (
                  <FieldDescription className="text-red-500">
                    {register.error.fieldError("name")}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {register.error?.fieldError("email") && (
                  <FieldDescription className="text-red-500">
                    {register.error.fieldError("email")}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                    {register.error?.fieldError("password") && (
                      <FieldDescription className="text-red-500">
                        {register.error.fieldError("password")}
                      </FieldDescription>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password_confirmation">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      required
                    />
                    {register.error?.fieldError("password_confirmation") && (
                      <FieldDescription className="text-red-500">
                        {register.error.fieldError("password_confirmation")}
                      </FieldDescription>
                    )}
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={register.isPending}>
                  {register.isPending ? "Creating..." : "Create Account"}
                </Button>
                <SocialAuthButtons action="register" />
                <FieldDescription className="text-center">
                  Already have an account? <Link to="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <AuthLegalNotice />
    </div>
  );
}

export default RegisterForm;
