import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return navigate("/login");
      setUser(user);

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile.role !== "admin") {
        alert("Access Denied");
        return navigate("/dashboard"); // redirect normal user
      }

      setProfile(profile);
    };

    fetchUser();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl">Admin Dashboard</h1>
      <p>Welcome, {profile?.full_name}</p>

      {/* Embed Metabase dashboard */}
      <iframe
        src="https://spined-riptide.metabaseapp.com/public/dashboard/7fe4221f-6859-4a7a-9ee9-422e1d70ad87"
        frameBorder="0"
        width="100%"
        height="600px"
      ></iframe>
    </div>
  );
};

export default AdminDashboard;
