import React, { useState, useEffect } from "react";

import useAxios from "../utils/useAxios";
import Regester from "./RegesterManager";
import Header from "../components/Header";
const HomePage = () => {
  let [users, setUsers] = useState([]);
  let api = useAxios();

  useEffect(() => {
    getUsers();
  }, []);

  let getUsers = async () => {
    let response = await api.get("/api/users/");

    if (response.status === 200) {
      setUsers(response.data);
    }
  };

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
