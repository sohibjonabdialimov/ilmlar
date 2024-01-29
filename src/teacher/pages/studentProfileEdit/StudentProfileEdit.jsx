import React, { useContext, useRef, useState } from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import user from "../../../imgs/user-1.png";
import camera from "../../../imgs/camera.png";
import axios from "axios";
import { profileContext } from "../../../contexts/profileContext";
import urlJoin from "url-join";
function deleteplatforma(url) {
  try {
    if (url?.includes("platforma")) {
      url = url.split("/");
      let res = "";
      for (let i = 2; i < url.length; i++) {
        res += "/" + url[i];
      }
      return res;
    } else {
      return url;
    }
  } catch (error) {
    console.log(error);
  }
}
const StudentProfileEdit = () => {
  const { profile, setProfile } = useContext(profileContext);

  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const usernameRef = useRef(null);
  const firstnameref = useRef(null);
  const lastnameref = useRef(null);
  const userimgRef = useRef(null);

  const onBack = () => {
    navigate("/student/profile/subs");
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "fullname",
      `${firstnameref.current.value} ${lastnameref.current.value}`
    );
    formData.append("username", usernameRef.current.value);
    // console.log("file", userimgRef.current.files[0]);
    formData.append("file", userimgRef.current.files[0]);
    axios
      .put("https://api.ilmlar.com/users/", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setProfile(res.data);
        console.log(res.data);
        navigate("/student/profile");
        location.reload();
      })
      .catch((error) => console.log(error));
  };
  const handlechange = () => {
    usernameRef.current.value = usernameRef.current.value.toLowerCase().trim();
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setImage(imageUrl);
  };

  return (
    <div className="app-content">
      <div className={style.edit_profile}>
        <button onClick={onBack} className={style.back}>
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>

        <form onSubmit={(e) => onHandleSubmit(e)} className={style.form}>
          <div className={style.imgs_div}>
            <div className={style.imgs_div_img_wrap}>
              {image ? (
                <img className={style.imgs_div_img} src={image} alt="" />
              ) : profile?.path ? (
                <img
                  className={style.imgs_div_img}
                  src={urlJoin(
                    "https://api.ilmlar.com",
                    `${deleteplatforma(profile?.path)}`
                  )}
                  alt=""
                />
              ) : (
                <img
                  className={style.imgs_div_img}
                  src={user}
                  alt="camera img"
                />
              )}
            </div>

            <div className={style.select_camera_wrap}>
              <img src={camera} alt="camera img" />
              <input
                type="file"
                className={style.img_file_input}
                onChange={handleImageChange}
                ref={userimgRef}
                accept="image/*"
              />
            </div>
          </div>
          <input
            ref={firstnameref}
            defaultValue={profile?.fullname?.split(" ")[0] || ""}
            min={1}
            type="text"
            placeholder="ism"
          />
          <input
            ref={lastnameref}
            defaultValue={profile?.fullname?.split(" ")[1] || ""}
            type="text"
            placeholder="familiya"
          />
          <input
            ref={usernameRef}
            defaultValue={profile?.username || ""}
            onChange={handlechange}
            type="text"
            placeholder="username"
          />
          <button type="submit">Saqlash</button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfileEdit;
