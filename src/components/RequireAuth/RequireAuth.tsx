import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

 const RequireAuth: React.FC = () => {
  const Token = Cookies.get("Token")

  if (!Token) {
    return <Navigate to={'/'}/>;
  }

  return <Outlet/>;
};

export default RequireAuth
