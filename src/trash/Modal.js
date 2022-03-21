import React from "react";
import styled from "styled-components";
import Form from "./Form";
import Formik from "formik";
import axios from "axios";
export default function Modal({
  isModal,
  id,
  email,
  password,
  first_name,
  last_name,
  birthday,
  getUsers
}) {
  const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const ModalContainer = styled.div`
    width: 500px;
    min-height: 100px;
    background: #fff;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 20px;
  `;
  const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e8e8e8;

    h3 {
      font-weight: 500;
      font-size: 16px;
      color: #1766dc;
    }
  `;
  const CloseBtn = styled.button`
    position: absolute;
    top: 15px;
    right: 20px;

    width: 30px;
    height: 30px;
    border: none;
    background: none;
    cursor: pointer;
    transition: 0.3s ease all;
    border-radius: 5px;
    color: #3d76e9;

    &:hover {
      background: #c4c4c4;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  `;

  //Componentes del formulario

  const InputModal = styled.input`
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

  const BtnModal = styled.button`
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
    <>
      <Overlay>
        <ModalContainer>
          <ModalHeader>
            <h3>Editando Usuario</h3>
          </ModalHeader>
          <CloseBtn onClick={() => isModal(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </CloseBtn>
          <Formik
            initialValues={{
              first_name,
              last_name,
              email,
              password,
              birthday
            }}
            validate={(vls) => {
              let err = {};
              if (!vls.first_name) {
                err.first_name = "Por favor ingresa un nombre";
              } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(vls.first_name)) {
                err.first_name =
                  "El nombre solo puede contener letras y espacios";
              }
              if (!vls.last_name) {
                err.last_name = "Por favor ingresa un apellido";
              } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(vls.last_name)) {
                err.last_name =
                  "El apellido solo puede contener letras y espacios";
              }
              if (!vls.email) {
                err.email = "Por favor ingresa un correo electronico";
              } else if (
                !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                  vls.email
                )
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
                // id,
                email: vls.email,
                password: vls.password,
                first_name: vls.first_name,
                last_name: vls.last_name,
                birthday: vls.birthday
              };
              axios
                .put(
                  `https://movies-crud-academlo.herokuapp.com/movies/${id}/`,
                  user
                )
                .then(() => {
                  getUsers();
                  isModal(false);
                });
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
                <InputModal
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
                <InputModal
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
                <InputModal
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
                <InputModal
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
                <InputModal
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
                <BtnModal type="submit">Send</BtnModal>
              </form>
            )}
          </Formik>
        </ModalContainer>
      </Overlay>
    </>
  );
}
