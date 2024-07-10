import TeachNav from "../navbar/teacher/TeacherNavbar";
import { Outlet } from "react-router-dom";
import "./style.css";
import { useContext, useEffect } from "react";
import { teacherProfileContext } from "../services/providers/teacherProfilContext";
import axios from "axios";

const TeacherLayout = () => {
  const { teacherProfile, setTeacherProfile } = useContext(
    teacherProfileContext
  );
  useEffect(() => {
    axios
      .get("https://api.ilmlar.com/teacherme/", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTeacherProfile(res.data);
      });
  }, []);

  return (
    <div className="app-content">
      <TeachNav />
      <div className="teacherHomePage">
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherLayout;
