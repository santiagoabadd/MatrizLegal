import React, { useState } from "react";
import "./Landing.css";
import "../assets/global.css";
import { Modal } from "../components/Modal/Modal";
import { LoginModal } from "../features/Login/Components/LoginModal/LoginModal";

export const Landing: React.FC = () => {
  const [register, setRegister] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(true);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);

  

  const toggleRegister = () => {
    setRegister(!register);
  };

  const toggleLogin = () => {
    setLogin(!login);
    // dispatch(resetUsername);
  };

  const toggleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
  };
  return (
    <div className="home-container bg-color">
      {login ? (
        <LoginModal
          toggleForgotPassword={toggleForgotPassword}
          toggleRegister={toggleRegister}
          toggleModal={toggleLogin}
        ></LoginModal>
      ) : (
        <></>
      )}
      {forgotPassword ? <></> : <></>}
    </div>
  );
};
