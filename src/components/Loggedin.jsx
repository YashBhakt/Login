import  { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Loggedin = () => {
    const navigate = useNavigate();
    const [user, setUser ] = useState({ name: '', email: '' });

    useEffect(() => {
      
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser ({ name: userData.name, email: userData.email });
        } else {
            navigate("/"); 
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate("/");
    }

    return (
        <div className="flex items-center justify-center flex-col pt-32 pb-20 pr-4 pl-4 gap-x-28">
            <div className="w-67 h-134 flex flex-col items-center justify-center gap-28">
                <div className="flex flex-col items-center ">
                    <h1 className="text-3xl font-medium ">Welcome to</h1>
                    <span className="text-4xl font-black text-purple-700"> Unstop </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <img src="frontend/src/images/Frame 1116607307.png" alt="image" className="flex w-30 h-30 rounded-full" />
                    <p className="flex w-30">{user.name}</p>
                    <p className="w-30 flex">{user.email}</p>
                    <button onClick={handleLogout} className="rounded-lg bg-blue-600 w-28">Logout</button>
                </div>
            </div>
        </div>
    );
}

export default Loggedin;