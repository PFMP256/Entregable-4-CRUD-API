import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import Modal from "./Modal";

export default function User({
  id,
  first_name,
  last_name,
  email,
  password,
  birthday,
  getUsers
}) {
  const [modal, isModal] = useState(false);
  const deleteUser = (id) => {
    console.log("borrar usuario");
  };
  const anchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView();
      }
    }
  };
  const UserContainer = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  `;

  const Name = styled.p`
    font-weight: bold;
  `;

  const Data = styled.p`
    font-style: italic;
    color: #6b6b6b;
    margin: 5px 0;
  `;

  const Btn = styled.button`
    padding: 5px 20px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    margin: 0px 2px;
    margin-bottom: 10px;
    transition: 0.3s ease all;
    outline: none;
    background: #c4c4c4;
    color: #fff;
    font-size: 12px;

    &:hover {
      background: #3d76e9;
    }
  `;

  return (
    <UserContainer>
      <Name>
        {first_name} {last_name}
      </Name>
      <Data>{email}</Data>
      <Data>{birthday}</Data>
      <Btn onClick={() => anchor("UsersForm")}>Editar</Btn>
      <Btn onClick={() => deleteUser(id)}>Borrar</Btn>
    </UserContainer>
  );
}
