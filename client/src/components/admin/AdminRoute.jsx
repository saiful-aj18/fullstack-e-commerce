import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import api from "../../api/axios";


function AdminRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);


  useEffect(() => {

    let mounted = true;


    const checkAdmin = async () => {

      const token = localStorage.getItem("token");
      const role = localStorage.getItem("userRole");


      // No token
      if (!token) {

        if (mounted) {
          setAllowed(false);
          setLoading(false);
        }

        return;
      }


      // First check localStorage
      if (role === "admin") {

        if (mounted) {
          setAllowed(true);
          setLoading(false);
        }

        return;
      }


      // Verify from backend
      try {

        const res = await api.get("/auth/me");

        const userRole =
          res.data?.user?.role ||
          res.data?.role;


        if (mounted) {

          if (userRole === "admin") {

            localStorage.setItem(
              "userRole",
              "admin"
            );

            setAllowed(true);

          } else {

            setAllowed(false);

          }

          setLoading(false);
        }

      } catch (error) {

        console.error(
          "Admin verification failed:",
          error
        );

        if (mounted) {

          setAllowed(false);
          setLoading(false);

        }

      }

    };


    checkAdmin();


    return () => {
      mounted = false;
    };

  }, []);


  // Loading
  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0f0f] text-white">

        <div className="text-center">

          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white" />

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Checking Admin Access
          </p>

        </div>

      </div>
    );

  }


  // Not admin
  if (!allowed) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  return children;
}


export default AdminRoute;