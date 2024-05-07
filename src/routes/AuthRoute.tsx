import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import AccessDenied from "src/pages/MainPage/ErrorPage/AccessDenied";
import { selectAuthorization } from "src/reducers/authSlice";
import { Role } from "src/types";

export interface AuthRouteProps {
  children: JSX.Element;
  roles: Role;
}

export const AuthRoute: React.FC<AuthRouteProps> = ({ children, roles }) => {
  let location = useLocation();

  const { isAuth, isRole } = useSelector(selectAuthorization);

  const userHasRequiredRole = roles.includes(isRole);

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (isAuth && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return children;
};
