import React, { useRef } from "react";
import search from "../../imgs/search.png";
import mobileBurger from "../../imgs/mobile-burger.svg";
import mobileMenu from "../../imgs/mobile_menu.svg";
import "./style.css";
function MobileHeader({
  changeModalDars,
  changeModal,
  modal,
  modalDarslar,
  type,
  query,
  where,
  wherey,
  setquery,
}) {
  const handleClickDarslar = () => {
    changeModalDars(!modalDarslar);
  };
  const handleClick = () => {
    changeModal(!modal);
  };
  const searchRef = useRef();
  return (
    <div className="mobile-for">
      <div className={wherey=="teach" ? "burger d-none" : "burger"} onClick={handleClick}>
        <div className="burger-box">
          <img src={mobileBurger} alt="burger" />
        </div>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        setquery(searchRef.current.value)
      }} className="search-div">
          <input
            ref={searchRef}
            defaultValue={query}
            className={type == "search" ? "search-main" : "d-none"}
            placeholder="Qidiruv..."
          />
          <button
          type="submit"
            className={type == "search" ? "search-img-box" : "d-none"}
          >
            <img src={search} alt="" />
          </button>
          <button
            type="submit"
            
            className={type != "search" ? "search-main" : "d-none"}
          >
            {type}
          </button>
      </form>
      <div
        className={where ? "burger d-none" : "burger"}
        onClick={handleClickDarslar}
      >
        <div className="burger-box">
          <img src={mobileMenu} alt="burger" />
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
