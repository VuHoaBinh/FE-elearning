import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { selectAuthorization } from "src/reducers/authSlice";

export interface NonAuthRouteProps {
  children: JSX.Element;
}

export const NonAuthRoute: React.FC<NonAuthRouteProps> = ({ children }) => {
  const location = useLocation();

  const { isAuth, isRole } = useSelector(selectAuthorization);

  if (isAuth) {
    return <Navigate to={`/${isRole}/info`} state={{ from: location }} />;
  }

  return children;
};
