import { Outlet, Route } from "react-router-dom";
import { Role, Router } from "src/types";
import { AuthRoute } from "./AuthRoute";
import { NonAuthRoute } from "./NonAuthRoute";

const mainRoute = (routes: Router[]) => {
  return routes.map((route, index) => {
    return (
      <Route
        key={index}
        path={route.path}
        element={route.element as JSX.Element}
      />
    );
  });
};

const authRoute = (routes: Router[]) => {
  return routes.map((route, index) => {
    return (
      <Route
        key={index}
        path={route.path}
        element={<NonAuthRoute>{route.element as JSX.Element}</NonAuthRoute>}
      />
    );
  });
};

const privateRoute = (routes: Router[]) => {
  return routes.map((route, index) => {
    return (
      <Route
        key={index}
        path={route.path}
        element={
          <AuthRoute roles={route.role as Role}>
            {route.element as JSX.Element}
          </AuthRoute>
        }
      >
        {renderSubRoutes(route.children)}
      </Route>
    );
  });
};

const renderSubRoutes = (routes: Router[] = []) => {
  if (routes.length === 0) return;
  return routes.map((router: Router, index: number) => (
    <Route
      key={index}
      path={router.path}
      element={router.children ? <Outlet /> : (router.element as JSX.Element)}
    >
      {renderSubRoutes(router.children)}
    </Route>
  ));
};

export { mainRoute, privateRoute, authRoute };
