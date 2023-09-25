import React, { useEffect } from "react";
import { SideBarMenu } from "../features/SideBarMenu/components/SideBarMenuContainer/SideBarMenu";
import { NavBar } from "../features/NavBar/components/NavBarContainer/NavBar";
import { Normativas } from "../features/ListaNormativas/Components/Normativas/Normativas";
import "./Home.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/Slices/UserSlice";
import { AppDispatch, RootState } from "../redux/Store";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");
  useEffect(() => {
    if (jwt === "" && state.token !== "") {
      setJwt(state.token);
    } else if (jwt !== "" && state.token === "") {
      dispatch(setToken(jwt));
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="home-container">
      <NavBar />
      <SideBarMenu />
      <div className="lista-normativas-container">
        <Normativas />
      </div>
    </div>
  );
};
