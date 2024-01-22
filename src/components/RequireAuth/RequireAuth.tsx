import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
interface RequireAuthProps {
    Token: string | undefined;
  }
  
 const RequireAuth: React.FC<RequireAuthProps> = ({Token}) => {

  if (!Token) {
    return <Navigate to={'/'}/>;
  }

  return <Outlet/>;
};

export default RequireAuth
