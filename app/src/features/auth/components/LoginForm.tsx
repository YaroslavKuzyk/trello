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
import { useLocation, useNavigate } from "react-router";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { formValue } from "@/lib/form";

function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useLogin();

  const from = (location.state as { from?: { pathname: string } } | null)?.from
    ?.pathname;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    login.mutate(
      {
        email: formValue(form, "email"),
        password: formValue(form, "password"),
      },
      {
        onSuccess: () => {
          navigate(from ?? "/", { replace: true });
        },
      },
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
                {login.error?.fieldError("email") && (
                  <FieldDescription className="text-red-500">
                    {login.error.fieldError("email")}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    to="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" required />
                {login.error?.fieldError("password") && (
                  <FieldDescription className="text-red-500">
                    {login.error.fieldError("password")}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={login.isPending}>
                  {login.isPending ? "Logging in..." : "Login"}
                </Button>
                <SocialAuthButtons action="login" />
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to="/register">Sign up</Link>
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

export default LoginForm;
