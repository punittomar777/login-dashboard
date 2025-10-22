import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      return;
    }

    // Log login activity
    if (data.user) {
      await supabase.from('login_activity').insert({
        user_id: data.user.id,
      });
    }

    navigate('/dashboard');
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="p-6 shadow-lg w-80 bg-white rounded" onSubmit={handleLogin}>
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <input type="email" placeholder="Email" className="w-full p-2 mb-2 border"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 border"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button className="bg-green-500 text-white w-full py-2 rounded mb-2">Login</button>
        <button type="button" onClick={handleGoogleLogin} className="bg-red-500 text-white w-full py-2 rounded">
          Login with Google
        </button>
      </form>
    </div>
  );
}

export default Login;
