import type { ReactNode } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function PublicRoute({ children, fallback }: PublicRouteProps) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return fallback ? <>{fallback}</> : null;
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

