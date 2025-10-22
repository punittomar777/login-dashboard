import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate('/login');
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl">Welcome, {user?.email}</h1>
    </div>
  );
};

export default Dashboard;
