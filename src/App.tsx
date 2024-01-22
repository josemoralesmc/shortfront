import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Create from "./components/Create/Create";
import MyUrl from "./components/MyUrl/MyUrl";
import NotFound from "./components/NotFound/NotFound";
import  RequireAuth  from "./components/RequireAuth/RequireAuth";
import Cookies from "js-cookie";

function App() {
  const token = Cookies.get("Token")

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<RequireAuth Token={token} />}>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/myurls" element={<MyUrl />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
