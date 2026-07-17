import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

interface LogoutProps {
  onClick?: () => void;
}

function Logout({ onClick }: LogoutProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (onClick) {
      onClick();
    }
    navigate("/login");
  };

  return (
    <button type="button" className="nav-link btn btn-link" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
