import React, { useContext, useEffect, useState } from "react";
import Obuna from "../../sidebarRouters/Obuna";
import { useNavigate } from "react-router-dom";
import "./style.css";
import StudentNavbar from "../../navbar/student/StudentNavbar";
import MobileHeader from "../../components/mobileHeader/mobileHeader";
import default_img from "../../imgs/user-1.png";
import { profileContext } from "../../services/providers/profileContext";
import { formatImgUrl } from "../../utils/formatImgUrl";

function Profile() {
  const { profile } = useContext(profileContext);
  const navigate = useNavigate();

  let [modal, setModal] = useState(false);
  let [modalDarslar, setModalDarslar] = useState(false);
  const changeModal = (value) => {
    setModal(value);
  };

  const changeModalDars = (value) => {
    setModalDarslar(value);
  };

  const deleteAccount = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="main-page">
      <div className={modal ? "def modal-navbar" : "def yoq"}>
        <StudentNavbar changeModal={changeModal} modal={modal} />
      </div>
      <div
        className={
          modal || modalDarslar
            ? "blur w100 main_lesson mobile_none"
            : "w100 main_lesson mobile_none"
        }
      >
        <MobileHeader
          changeModalDars={changeModalDars}
          changeModal={changeModal}
          modal={modal}
          modalDarslar={modalDarslar}
          type={"Profile"}
        />

        <div className="profile-content">
          <div className="profile_img_wrapper">
            {profile?.path ? (
              <img src={formatImgUrl(profile?.path)} alt="" />
            ) : (
              <img src={default_img} alt="" />
            )}
          </div>

          <h1>{profile?.fullname}</h1>
          <div className="profile-content-para">
            <p>Username: {profile?.username}</p>
            <p>Email: {profile?.email}</p>
          </div>
          <div className="profile-buttons">
            <button onClick={() => navigate("/editprofil")}>
              Profilni tahrirlash
            </button>
            <button onClick={() => deleteAccount()}>Chiqib ketish</button>
          </div>
        </div>
      </div>
      <Obuna me={profile?.mycurs} />
      <div className={modalDarslar ? "defDars modalDarslar" : "defDars yoq"}>
        <Obuna
          modalDarslar={modalDarslar}
          changeModalDars={changeModalDars}
          topic="obuna"
          me={profile?.mycurs}
        />
      </div>
    </div>
  );
}

export default Profile;
