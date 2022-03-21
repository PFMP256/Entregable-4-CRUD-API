import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import axios from "axios";
import InputForm from "../styled/InputForm";
import BtnForm from "../styled/BtnForm";

export default function UsersForm({ getUsers, userSelected, setUserSelected }) {
  const anchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView();
      }
    }
  };
  return userSelected ? (
    <Formik
      initialValues={{
        first_name: userSelected.first_name,
        last_name: userSelected.last_name,
        email: userSelected.email,
        password: userSelected.password,
        birthday: userSelected.birthday
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
          .put(
            `https://users-crud1.herokuapp.com/users/${userSelected.id}/`,
            user
          )
          .then(() => {
            anchor(userSelected.id);
            getUsers();
            setUserSelected(null);
          })
          .catch((error) => console.log(error.response));
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
        <form onSubmit={handleSubmit} id="UsersForm">
          <label htmlFor="first_name">Name(s)</label>
          <InputForm
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
          <InputForm
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
          <InputForm
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
          <InputForm
            type="text"
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
          <InputForm
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
          <BtnForm type="submit">Send</BtnForm>
        </form>
      )}
    </Formik>
  ) : (
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
        <form onSubmit={handleSubmit} id="UsersForm">
          <label htmlFor="first_name">Name(s)</label>
          <InputForm
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
          <InputForm
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
          <InputForm
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
          <InputForm
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
          <InputForm
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
          <BtnForm type="submit">Send</BtnForm>
        </form>
      )}
    </Formik>
  );
}
