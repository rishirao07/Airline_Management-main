import React, { useEffect, useState } from "react";
import { BiSupport } from "react-icons/bi";
import { FcAbout } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { IoHome } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user"); 
    setUser(null);
  };

  return (
    <div className="navBar flex">
      <div className="navBarOne flex">
        <div className="none flex">
          <li className="flex">
            <Link to="/"><IoHome className="icon" /> Home</Link>
          </li>
          <li className="flex">
            <FcAbout className="icon" /> About
          </li>
          <li className="flex">
            <BiSupport className="icon" /> Support
          </li>
        </div>

        <div className="atb flex">
          {user ? (
            <div className="profile-dropdown">
              <span className="profile-name">
                <CgProfile className="profile" /> {user.name}
              </span>
              <div className="dropdown-content">
                <span>{user.email}</span>
                <span onClick={handleSignOut}>Sign Out</span>
              </div>
            </div>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
