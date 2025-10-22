import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Insert profile after successful signup
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        email,
        full_name: fullName,
      });
    }

    alert('Signup successful! Check your email to confirm.');
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="p-6 shadow-lg w-80 bg-white rounded" onSubmit={handleSignup}>
        <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
        <input type="text" placeholder="Full Name" className="w-full p-2 mb-2 border"
          value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <input type="email" placeholder="Email" className="w-full p-2 mb-2 border"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 border"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button className="bg-blue-500 text-white w-full py-2 rounded">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
