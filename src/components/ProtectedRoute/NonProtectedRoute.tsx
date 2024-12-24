import useAccessToken from "@customHooks/useAccessToken";
import { ROUTES } from "@utils/Utils";
import { Navigate } from "react-router-dom";
// TO BE IMPLEMENTED LATER
// type ProtectedRouteProps = {
// }
const NonProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // WILL BE USED LATER WHEN COMPONENT GETS IMPLEMENTED
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const accessToken = useAccessToken();
  console.log("ACCESS TOKEN", accessToken)
  if (accessToken) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  return children;
};

export default NonProtectedRoute;
