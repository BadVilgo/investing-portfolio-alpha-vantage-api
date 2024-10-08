import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user); // Log auth state

      if (user) {
        console.log("User is authenticated:", user);
        setAuthenticated(true); // User is logged in
      } else {
        console.log("User is not authenticated, redirecting to login");
        setAuthenticated(false); // User is logged out
        navigate("/login"); // Redirect to login if not authenticated
      }
      setLoading(false); // Finish loading after state is set
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  // Show loading screen while checking auth state
  if (loading) return <div>Loading...</div>;

  // If authenticated, show the protected content (Dashboard)
  return authenticated ? children : null;
};

export default ProtectedRoute;
