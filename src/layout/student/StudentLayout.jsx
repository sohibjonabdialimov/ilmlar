import { Outlet, useNavigate } from "react-router-dom";
import "../style.css";
import StudentNavbar from "../../navbar/student/StudentNavbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { profileContext } from "../../contexts/profileContext";
import { myCoursesContext } from "../../contexts/myCoursesContext";
import { saveCoursesContext } from "../../contexts/saveCoursesContext";
import { subsTeacherContext } from "../../contexts/subsTeacherContext";

function StudentLayout() {
  const navigate = useNavigate();
  const {profile, setProfile} = useContext(profileContext);
  const {setMyCourses} = useContext(myCoursesContext);
  const {setSave} = useContext(saveCoursesContext);
  const {setSubsTeacher} = useContext(subsTeacherContext);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    axios
      .get("https://api.ilmlar.com/usersme", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setProfile(res.data);
      });
  }, []);


  useEffect(() => {
    const fetchMyCourses= async () => {
      const fetchedMyCourseData = [];
      for (let i = 0; i < profile?.mycurs.length; i++) {
        const response = await axios.get(
          "https://api.ilmlar.com/courses/" + profile.mycurs[i].cursId,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        fetchedMyCourseData.push(response.data);
      }
      setMyCourses(fetchedMyCourseData);
    };
    if (profile?.mycurs.length) {
      fetchMyCourses();
    }
  }, [profile?.mycurs.length]);

  useEffect(() => {
    const fetchSaveTeachers = async () => {
      const fetchedTeacherData = [];
      for (let i = 0; i < profile?.savecurss.length; i++) {
        const response = await axios.get(
          "https://api.ilmlar.com/courses/" + profile?.savecurss[i],
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        fetchedTeacherData.push(response.data);
      }
      setSave(fetchedTeacherData);
    };

    if (profile?.savecurss.length) {
      fetchSaveTeachers();
    }
  }, [profile?.savecurss.length]);
  useEffect(() => {
    const fetchTeachers = async () => {
      const fetchedTeacherData = [];
      for (let i = 0; i < profile?.teachers.length; i++) {
        const response = await axios.get(
          "https://api.ilmlar.com/teacherinfo/" + profile?.teachers[i]
        );
        fetchedTeacherData.push(response.data);
      }
      setSubsTeacher(fetchedTeacherData);
    };

    if (profile?.teachers) {
      fetchTeachers();
    }
  }, [profile?.teachers.length]);

  return (
    <>
      <div className="app-content">
        <div className="studentNavbar-box">
          <StudentNavbar />
        </div>
        <div className="homepage">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default StudentLayout;
