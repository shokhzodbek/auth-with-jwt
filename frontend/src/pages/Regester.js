/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from "reactstrap";
import axios from "axios";
import React, { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

const Register = () => {
  const [name, setName] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState("");
  const [datas, setData] = useState();
  const [count, setCount] = useState(0);
  const postFunc = async (e) => {
    e.preventDefault();
    let { data } = await axios.post("http://127.0.0.1:8000/api/user/register", {
      username: name,
      password: password,
      fullname: fullname,
      user_type: selected,
    });
    setData(data);
    setFullname("");
    setCount(count + 1);

    setName("");
    setPassword("");
    setSelected("");
  };

  console.log(datas);
  let [notes, setNotes] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  let api = useAxios();

  useEffect(() => {
    getNotes();
  }, [count]);

  let getNotes = async () => {
    let response = await api.get("/api/users/");

    if (response.status === 200) {
      setNotes(response.data);
    }
  };

  return (
    <>
      <div
        style={{
          padding: 30,
          display: "flex",
        }}
      >
        <Card
          className="bg-secondary shadow border-0"
          style={{ background: "green", padding: 50 }}
        >
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    style={{ padding: 10, margin: 10 }}
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Fullname"
                    style={{ padding: 10, margin: 10 }}
                    type="text"
                    autoComplete="new-email"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    style={{ padding: 10, margin: 10 }}
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <select
                  value={selected}
                  style={{ padding: 10, margin: 10 }}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value="">Select role</option>
                  <option value="1">Admin</option>
                  <option value="2">Manager</option>
                  <option value="3">Operator</option>
                </select>
              </FormGroup>

              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="button"
                  onClick={postFunc}
                  style={{ padding: 10, margin: 10 }}
                >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/* <div style={{ background: "#fff", padding: 10, marginLeft: 40 }}>
          <h1>Admin</h1>
          {notes.filter((note) => (
            <>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: 10, color: "red" }} key={note.id}>
                  {note.user_type}
                </p>
                <p>{note.username}</p>
              </div>
            </>
          ))}
        </div> */}
        <div style={{ background: "#fff", padding: 10, marginLeft: 40 }}>
          <h1>Admin</h1>
          {notes
            .filter((note) => note.user_type === "Админ")
            .map((item) => (
              <>
                <div style={{ display: "flex" }}>
                  <p style={{ marginRight: 10, color: "red" }} key={item.id}>
                    {item.user_type}
                  </p>
                  <p>{item.username}</p>
                </div>
              </>
            ))}
        </div>
        <div style={{ background: "#fff", padding: 10, marginLeft: 40 }}>
          <h1>Manager</h1>
          {notes
            .filter((note) => note.user_type === "Mенеджер")
            .map((item) => (
              <>
                <div style={{ display: "flex" }}>
                  <p style={{ marginRight: 10, color: "red" }} key={item.id}>
                    {item.user_type}
                  </p>
                  <p>{item.username}</p>
                </div>
              </>
            ))}
        </div>
        <div style={{ background: "#fff", padding: 10, marginLeft: 40 }}>
          <h1>Operator</h1>
          {notes
            .filter((note) => note.user_type === "Оператор")
            .map((item) => (
              <>
                <div style={{ display: "flex" }}>
                  <p style={{ marginRight: 10, color: "red" }} key={item.id}>
                    {item.user_type}
                  </p>
                  <p>{item.username}</p>
                </div>
              </>
            ))}
        </div>
        {/* <div style={{ background: "#fff", padding: 10, marginLeft: 40 }}>
          <h1>Operator</h1>
          {notes.filter((note) => (
            <>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: 10, color: "red" }} key={note.id}>
                  {note.user_type}
                </p>
                <p>{note.username}</p>
              </div>
            </>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default Register;
// ''),
//     ('2', ),
//     ('3', 'Оператор
