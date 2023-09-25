import React from "react";

import { AppDispatch } from "../../../../redux/Store";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../../redux/Slices/UserSlice";
import "./LoginButton.css";
import "../../../../assets/global.css";

interface LoginButtonProps {
  username: string;
  password: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  username,
  password,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginUser({ username, password }));
  };

  return (
    <div className="login-button-container">
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
