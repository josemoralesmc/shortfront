import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import  Cookies  from "js-cookie";


const Login = () => {
  const [user, setUser] = useState({
    mail: "",
    password: "",
  });
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleChange = (e: any) => {
    
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    


    try {
      const response = await fetch('https://shorturl-qavg.onrender.com/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json(); 
      console.log(data.token, data);
      
      
      if (data.success == true) {
        Cookies.set("Token", data.token)
        navigate('/create')
      } else {
        setError('Wrong email or password');
      }
      
      
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500">
              URL SHORTENER
            </span>
          </h2>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-500">
          Sign in to your account
          </h2> 
         
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleLogin}>
           

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
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               Sign in
              </button>
            </div>
          </form>

         
            <p className="mt-10 text-center text-sm text-gray-500 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              <Link to={'/register'}>Create account</Link>
            </p>
         
        </div>
      </div>
    </>
  );
};

export default Login;
