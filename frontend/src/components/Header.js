import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  let users = JSON.parse(localStorage.getItem("user"));
  console.log(users);
  return (
    <div>
      <span> | </span>
      {user ? (
        <p style={{ cursor: "pointer", color: "red" }} onClick={logoutUser}>
          Logout
        </p>
      ) : (
        <Link to="/login">Login</Link>
      )}

      {user && <p>Hello {users?.results?.user?.username}</p>}
    </div>
  );
};

export default Header;
