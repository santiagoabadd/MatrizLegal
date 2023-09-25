import React, { useState } from "react";

import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
//import { ModalButton } from "../../../../components/ModalButton/ModalButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/Store";
import { validatePhone, validEmail } from "../../../../services/validator";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import "./LoginFormOne.css";
import "../../../../assets/global.css";
import { verifyUsername } from "../../../../redux/Slices/UserSlice";

interface LoginFormOneProps {
  forgotPassword: () => void;
}

export const LoginFormOne: React.FC<LoginFormOneProps> = ({
  forgotPassword,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.user);

  const [credential, setCredential] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCredential(e.target.value);
  };

  const findUsername = (): void => {
    let body = {
      email: "",
      phone: "",
      username: "",
    };

    if (validEmail(credential)) {
      body.email = credential;
    } else if (validatePhone(credential)) {
      body.phone = credential;
    } else {
      body.username = credential;
    }
    console.log(body);
    dispatch(verifyUsername(body));
  };

  return (
    <div className="login-form-one-container">
      <h1 className="login-form-header">Loguearse en Hasu</h1>
      <div className="login-form-one-divider">
        <div className="login-form-one-line"></div>
        <p className="login-form-one-or">
          <KeyboardDoubleArrowDownIcon
            sx={{ color: "white", fontSize: "30px" }}
          />
        </p>
        <div className="login-form-one-line"></div>
      </div>
      <ValidatedTextInput
        valid={!state.error}
        name={"identifier"}
        label={"Correo electronico o nombre de usuario"}
        changeValue={handleChange}
      />

      {state.error ? (
        <p className="login-form-error color-red">Unable to find user</p>
      ) : (
        <></>
      )}
      <div className="login-form-one-button-container">
        <button className="login-form-one-button" onClick={findUsername}>
          Find
        </button>
      </div>

      <div className="login-form-one-button-container">
        <button className="login-form-one-button" onClick={findUsername}>
          Olvidaste tu contraseña?
        </button>
      </div>

      <p className="login-form-one-text color-gray">
        No tienes una cuenta? Contactanos
        <span className="link color-blue" onClick={() => {}}>
          Aqui
        </span>
      </p>
    </div>
  );
};
