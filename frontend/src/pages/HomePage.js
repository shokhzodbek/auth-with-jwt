import React, { useState, useEffect, useContext } from "react";
import { Col, Row } from "reactstrap";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import Regester from "./Regester";
import Header from "../components/Header";
const HomePage = () => {
  let [notes, setNotes] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  let api = useAxios();

  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await api.get("/api/users/");

    if (response.status === 200) {
      setNotes(response.data);
    }
  };

  console.log("user", localStorage.getItem("user"));

  return (
    <div style={{ width: "100vw" }}>
      <Header />
      <p>Add users</p>
      <div style={{ dislpay: "flex", background: "red", flexDirection: "row" }}>
        <div style={{ width: 400 }}>
          <Regester />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default HomePage;
