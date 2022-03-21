import React from "react";
import axios from "axios";
import UsersContainer from "../styled/UsersContainer";
import UserContainer from "../styled/UserContainer";
import Name from "../styled/Name";
import Data from "../styled/Data";
import Btn from "../styled/Btn";

export default function UsersList({ users, setUserSelected, getUsers }) {
  const deleteUser = (id, user) => {
    axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`, user)
      .then(() => {
        getUsers();
      })
      .catch((error) => console.log(error.response));
  };
  const anchor = (anchorName, user) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView();
      }
    }
    setUserSelected(user);
  };
  return (
    users.length > 0 && (
      <UsersContainer>
        {users.map((user) => (
          <UserContainer id={user.id} key={user.id}>
            <Name>
              {user.first_name} {user.last_name}
            </Name>
            <Data>{user.email}</Data>
            <Data>{user.birthday}</Data>
            <Btn onClick={() => anchor("UsersForm", user)}>Edit</Btn>
            <Btn onClick={() => deleteUser(user.id, user)}>Delete</Btn>
          </UserContainer>
        ))}
      </UsersContainer>
    )
  );
}
