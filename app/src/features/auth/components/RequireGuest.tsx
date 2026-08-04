import { useMe } from "../hooks/useMe";
import { Navigate, Outlet } from "react-router";
import FullPageSpinner from "@/components/shared/FullPageSpinner";

function RequireGuest() {
  const { data: user, isPending, isError } = useMe();

  if (isPending) return <FullPageSpinner />;

  if (isError) return <Outlet />;

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default RequireGuest;
