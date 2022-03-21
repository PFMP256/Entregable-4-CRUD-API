import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import axios from "axios";

export default function Form({ getUsers }) {
  const Input = styled.input`
    padding: 10px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    width: 100%;
    margin-bottom: 10px;
    transition: 0.2s ease all;
    outline: none;
    text-align: center;

    &:focus {
      border: 2px solid #3d76e9;
    }
  `;

  const Btn = styled.button`
    margin-top: 10px;
    padding: 10px 30px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
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
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        birthday: ""
      }}
      validate={(vls) => {
        let err = {};
        if (!vls.first_name) {
          err.first_name = "Por favor ingresa un nombre";
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(vls.first_name)) {
          err.first_name = "El nombre solo puede contener letras y espacios";
        }
        if (!vls.last_name) {
          err.last_name = "Por favor ingresa un apellido";
        } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(vls.last_name)) {
          err.last_name = "El apellido solo puede contener letras y espacios";
        }
        if (!vls.email) {
          err.email = "Por favor ingresa un correo electronico";
        } else if (
          !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(vls.email)
        ) {
          err.email =
            "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.";
        }
        if (!vls.password) {
          err.password = "Por favor ingresa una contraseña";
        }
        if (!vls.birthday) {
          err.birthday = "Por favor ingresa tu cumpleaños";
        }
        return err;
      }}
      onSubmit={(vls, { resetForm }) => {
        const user = {
          email: vls.email,
          password: vls.password,
          first_name: vls.first_name,
          last_name: vls.last_name,
          birthday: vls.birthday
        };
        axios
          .post("https://users-crud1.herokuapp.com/users/", user)
          .then(() => {
            getUsers();
          })
          .catch((error) => console.log(error.response));
        // console.log(vls.first_name);
        // console.log(vls.last_name);
        // console.log(vls.email);
        // console.log(vls.password);
        // console.log(vls.birthday);
        // getUsers();
        resetForm();
      }}
    >
      {({
        handleSubmit,
        values,
        handleChange,
        handleBlur,
        errors,
        touched
      }) => (
        <form onSubmit={handleSubmit}>
          <label htmlFor="first_name">Name(s)</label>
          <Input
            type="text"
            name="first_name"
            placeholder="Name"
            value={values.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.first_name && errors.first_name && (
            <div className="error">{errors.first_name}</div>
          )}
          <label htmlFor="last_name">Last name</label>
          <Input
            type="text"
            name="last_name"
            placeholder="Last name"
            value={values.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.last_name && errors.last_name && (
            <div className="error">{errors.last_name}</div>
          )}
          <label htmlFor="email">Email</label>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <div className="error">{errors.email}</div>
          )}
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && errors.password && (
            <div className="error">{errors.password}</div>
          )}
          <label htmlFor="birthday">Birthday</label>
          <Input
            type="date"
            name="birthday"
            placeholder="Birthday"
            value={values.birthday}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.birthday && errors.birthday && (
            <div className="error">{errors.birthday}</div>
          )}
          <Btn type="submit">Send</Btn>
        </form>
      )}
    </Formik>
  );
}
