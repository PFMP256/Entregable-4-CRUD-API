import React, { useState, useEffect } from "react";
import UsersForm from "./components/UsersForm";
import UsersList from "./components/UsersList";
import axios from "axios";
import ContainerApp from "./styled/ContainerApp";

export default function App() {
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err.response));
  };
  useEffect(() => {
    getUsers();
  }, []);
  const [userSelected, setUserSelected] = useState(null);
  return (
    <ContainerApp>
      <h2 className="TitleApp">Users List</h2>
      <UsersForm
        getUsers={getUsers}
        userSelected={userSelected}
        setUserSelected={setUserSelected}
      />
      <UsersList
        getUsers={getUsers}
        users={users}
        setUserSelected={setUserSelected}
        userSelected={userSelected}
      />
    </ContainerApp>
  );
}
