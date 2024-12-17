import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdKey } from "react-icons/md";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error ,setError] = useState({});

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
  const submitHandler = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
if(!input.username && !input.email && !input.password){
  setError({ message: "Please fill in all fields" });
}
    // Validation
    if (input.username !== 'emilys') {
        setError('Invalid username. Only "emilys" is accepted.');
        return;
    }

    if (!validateEmail(input.email)) {
        setError('Please enter a valid email address (e.g., example@gmail.com).');
        return;
    }

    if (input.password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
    }

    // If all validations pass, send the data to the API
    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: input.username,
                email: input.email,
                password: input.password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store user data in local storage
            
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('isLoggedIn', true);
            navigate("/loggedin");
        } else {
            setError(data.message || 'Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        setError('An error occurred. Please try again later.');
    }
};
useEffect(() => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    navigate("/loggedin");
  }
}, [navigate]);
 

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen shadow-md items-center justify-between p-4 md:p-18 bg-[#F4F4F4]">
      <div className="flex items-center justify-center flex-1 p-4 md:p-16">
        <div className="pl-4 md:pl-16 w-full md:w-30 h-auto shadow-md  ">
          <img src="./src/images/Illustration.png" alt="Image" className="w-full h-auto hidden md:block" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center shadow-md bg-[#FFFFFF] w-full h-screen">
        <div className="flex flex-col  max-w-screen-md rounded-2xl p-4 md:p-10 gap-3 w-full h-screen">
         
            <div className="flex flex-col ">
              <h1 className="font-medium text-2xl">Welcome to</h1>
              <h1 className="text-purple-600 text-3xl font-black">Unstop</h1>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button className="bg-white p-2 shadow-md rounded-md flex items-center justify-center">
                <FcGoogle size={20} />
                Login with Google
              </button>
              <button className="bg-white p-2 shadow-md rounded-md flex items-center justify-center">
                <FaFacebookF size={20} />
                Login with Facebook
              </button>
            </div>
            <form
            onSubmit={submitHandler}
            className="flex flex-col gap-3 bg-white p-6 rounded-md shadow-md w-full max-w-screen-sm"
          >
            <div className="flex items-center justify-center my-4">
          <hr className="w-full border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="w-full border-gray-300" />
        </div>
            <div className="flex flex-row shadow-md items-center border-none bg-[#F4F4F4] rounded-md px-2 py-1">
              <FaRegUserCircle size={30} className="p-1" />
              <div className="flex flex-col w-full">
                <p className="text-xs">Username</p>
                <input
                  onChange={changeHandler}
                  name="username"
                  value={input.username}
                  type="text"
                  placeholder="Username"
                  className="bg-[#F4F4F4] flex size-[100%] p-1"
                />
              </div>
            </div>
            <div className="flex flex-row shadow-md items-center border bg-[#F4F4F4] rounded-md px-2 py-1">
              <MdEmail size={20} className="p-1" />
              <div className="flex flex-col w-full">
                <p className="text-xs">Email</p>
                <input
                  onChange=
                  {changeHandler}
                  name="email"
                  value={input.email}
                  type="email"
                  placeholder="Email"
                  className="bg-[#F4F4F4] flex size-[100%] p-1"
                />
              </div>
            </div>
            <div className="flex flex-row items-center shadow-md border bg-[#F4F4F4] rounded-md px-2 py-1">
              <MdKey size={20} className="p-1" />
              <div className="flex flex-col w-full">
                <p className="text-xs">Password</p>
                <input
                  onChange={changeHandler}
                  name="password"
                  value={input.password}
                  type="password"
                  placeholder="Password"
                  className="bg-[#F4F4F4] flex size-[100%] p-1"
                />
              </div>
            </div>
            <div className="flex flex-row p-1 m-1">
              <input name="checkbox" type="checkbox" />
              <p className="flex">Remember me</p>
            </div>
            <button
              
              type="submit"
              className="bg-blue-700 p-2 text-white rounded-md"
            >
              Login
            </button>
            <p className="mt-4">
              Do not have an account?{" "}
              <Link
                to={"/register"}
                className="text-blue-600 hover:text-blue-800"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;