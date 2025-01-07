/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getDataPrivate, logoutAPI } from "../utils/api";
import { jwtStorage } from "../utils/jwt_storage";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [role, setRole] = useState(""); // Store the user's role
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);

  const navigate = useNavigate();

  const getDataProfile = () => {
    getDataPrivate("/api/v1/protected/data")
      .then((resp) => {
        setIsLoadingScreen(false);
        if (resp?.user_logged) {
          setUserProfile(resp);
          setRole(resp?.roles || ""); // Store role (admin, owner, renter)
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        setIsLoadingScreen(false);
        setIsLoggedIn(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getDataProfile();
  }, []);

  const login = (access_token, role) => {
    jwtStorage.storeToken(access_token);
    getDataProfile();
    if (role === "Admin") {
      navigate("/dashboard-admin");
    } else if (role === "Renter") {
      navigate("/dashboard-renter");
    } else if (role === "Owner") {
      navigate("/dashboard-owner");
    } else {
      message.error("Role not recognized. Contact support.");
    }
  };

  // const logout = async () => {
  //   try {
  //     const resp = await logoutAPI();
  //     if (resp?.isLoggedOut) {
  //       // Pastikan token dihapus
  //       await jwtStorage.removeItem();
  //       // Reset state
  //       setIsLoggedIn(false);
  //       setRole("");
  //       setUserProfile({});
  //       // Redirect dan reload halaman
  //       window.location.href = '/login';
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const logout = () => {
    logoutAPI()
      .then((resp) => {
        if (resp?.isLoggedOut) {
          jwtStorage.removeItem();
          setIsLoggedIn(false);
          navigate("/login", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  // Navigate based on the user role after login
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     if (role === "admin") {
  //       navigate("/dashboard-admin", { replace: true });
  //     } else if (role === "owner") {
  //       navigate("/dashboard-owner", { replace: true });
  //     } else if (role === "renter") {
  //       navigate("/dashboard-renter", { replace: true });
  //     }
  //   }
  // }, [isLoggedIn, role, navigate]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userProfile, role, setIsLoadingScreen }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
