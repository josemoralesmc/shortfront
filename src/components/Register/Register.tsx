import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    mail: "",
    password: "",
  });

  const navigate = useNavigate();
  const [checkEmail, setCheckEmail] = useState(Boolean);
  const [showWarning, setShowWarning] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setShowWarning(false);
    const isValidEmail = checkEmailInput();
    console.log(isValidEmail);
    
    setCheckEmail(isValidEmail);
    if (!isValidEmail) {
      return;
    }
    try {
      const response = await fetch("https://shorturl-qavg.onrender.com/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res = await response.json();

      if (res.success == true) {
        navigate("/");
      } else {
        setShowWarning(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  const checkEmailInput = () => {
    const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegularCorreo.test(user.mail);
  };

  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className=" mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
          <Link to={"/"}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500">
              URL SHORTENER
            </span>
          </Link>
        </h2>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-500">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-zinc-100"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="mail"
              className="block text-sm font-medium leading-6 text-zinc-100"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="mail"
                name="mail"
                type="mail"
                autoComplete="mail"
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {checkEmail == false && (
                <p className="text-red-500 text-sm mt-2">Please enter valid email</p>
              )}
              {showWarning && (
                <p className="text-red-500 text-sm mt-2">Email already exist</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-zinc-100"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
