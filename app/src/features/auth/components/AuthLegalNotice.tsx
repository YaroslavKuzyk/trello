import { FieldDescription } from "@/components/ui/field";
import { Link } from "react-router";

function AuthLegalNotice() {
  return (
    <FieldDescription className="px-6 text-center">
      By clicking continue, you agree to our{" "}
      <Link to="/terms-of-service">Terms of Service</Link> and{" "}
      <Link to="/privacy-policy">Privacy Policy</Link>.
    </FieldDescription>
  );
}

export default AuthLegalNotice;
