import { Button } from "@/components/ui/button";
import { AppleIcon, GoogleIcon } from "./Icons";
import { FieldSeparator } from "@/components/ui/field";

function SocialAuthButtons({ action }: { action: "login" | "register" }) {
  const verb = action === "login" ? "Log in" : "Sign up";

  return (
    <>
      <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-2">
        Or continue with
      </FieldSeparator>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button">
          <AppleIcon />
          <span className="sr-only">{verb} with Apple</span>
        </Button>
        <Button variant="outline" type="button">
          <GoogleIcon />
          <span className="sr-only">{verb} with Google</span>
        </Button>
      </div>
    </>
  );
}

export default SocialAuthButtons;
