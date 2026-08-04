import { useMe } from "../hooks/useMe";
import { useLocation, Navigate, Outlet } from "react-router";
import FullPageSpinner from "@/components/shared/FullPageSpinner";
import ErrorScreen from "@/components/shared/ErrorScreen";

function RequireAuth() {
  const { data: user, isPending, isError, refetch } = useMe();
  const location = useLocation();

  if (isPending) return <FullPageSpinner />;

  if (isError) return <ErrorScreen onRetry={() => refetch()} />;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
}

export default RequireAuth;
