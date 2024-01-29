import TeachNav from "../../navbar/teacher/TeacherNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import "../style.css";
import { useContext, useEffect } from "react";
import { teacherProfileContext } from "../../contexts/teacherProfilContext";
import axios from "axios";

const TeacherLayout = () => {
  const {teacherProfile, setTeacherProfile} = useContext(teacherProfileContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/teacherlogin");
    }
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
      <div className="pad studentNavbar-box">
        <TeachNav />
      </div>
      <div className="teacherHomePage">
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherLayout;
