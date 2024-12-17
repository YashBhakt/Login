import { useEffect, useState } from 'react';
import Login from './components/Login';
import Loggedin from './components/Loggedin';
import Body from "./components/Body"
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/loggedin');
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>; // Add a loading spinner or message
  }

  return (
    <div className="bg-[#F4F4F4] mt-10 min-h-screen flex flex-col">
     <Body/>
    </div>
  );
};

export default App;