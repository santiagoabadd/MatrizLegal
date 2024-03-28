import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import "./LoginFormOne.css";
import { ValidatedDisplay } from "../../../../components/ValidatedInput/ValidatedDisplay";
import { useNavigate } from "react-router-dom";

interface LoginFormTwoProps {
  setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  forgotPassword: () => void;
}

export const LoginFormTwo: React.FC<LoginFormTwoProps> = ({
  setPassword,
  forgotPassword,
  setEmail,
}) => {
  const state = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const [active, setActive] = useState<boolean>(false);

  const [redirected, setRedirected] = useState(false);

  const toggleView = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (state.loggedIn && !redirected) {
      navigate("/home");
      setRedirected(true); // Marcar que ya se ha redirigido
    }
  }, [state.loggedIn, redirected]);


  return (
    <div className="login-form-two-container">
      <div className="login-form-content">
        <h1 className="login-form-header">Ingrese su contraseña</h1>
        <ValidatedDisplay
          label={"username"}
          value={state.username}
          handleFocus={() => {}}
        />
        <div className="login-form-two-password">
          <ValidatedTextInput
            valid={!state.error}
            label={"Password"}
            name={"password"}
            changeValue={setPassword}
            attributes={{
              minLength: 8,
              type: active ? "text" : "password",
            }}
          />
          <div onClick={toggleView} className="login-form-two-password-icon">
            {active ? (
              <VisibilityOffOutlinedIcon
                sx={{
                  fontSize: "24px",
                  color: "white",
                }}
              />
            ) : (
              <VisibilityOutlinedIcon
                sx={{
                  fontSize: "24px",
                  color: "white",
                }}
              />
            )}
          </div>
          {state.error ? (
            <p className="login-form-error color-red">Invalid password</p>
          ) : (
            <></>
          )}
          <p
            className="login-form-two-forgot link color-blue"
            onClick={forgotPassword}
          >
            Olvidaste tu contraseña?
          </p>
        </div>
      </div>
    </div>
  );
};
