import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import prev from ".././imgs/prev.svg";
import "./index.css";

function Obuna({ modalDarslar, changeModalDars, topic, me }) {
  const handleClick = () => {
    changeModalDars(false);
  };
  return (
    <div className="Nav sidebar-main-content">
      <div>
        <div
          className={
            modalDarslar
              ? "mobile__header users_subs-buttons"
              : "users_subs-buttons"
          }
        >
          <div className="profile_sidebar_wrapper">
            <div
              className={modalDarslar ? "circle" : "d-none circle"}
              onClick={handleClick}
            >
              <img src={prev} alt="prev" />
            </div>
            <NavLink to="/student/profile/subs">
              obunalar
            </NavLink>
            
            <NavLink to="/student/profile/darslar">darslar</NavLink>
          </div>
        </div>
        <div className="line-main users_subs">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Obuna;
