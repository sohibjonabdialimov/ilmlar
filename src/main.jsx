import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ProfileProvider } from "./contexts/profileContext.jsx";
import { MyCoursesProvider } from "./contexts/myCoursesContext.jsx";
import { SaveCoursesProvider } from "./contexts/saveCoursesContext.jsx";
import { SubsTeacherProvider } from "./contexts/subsTeacherContext.jsx";
import { TeacherProfileProvider } from "./contexts/teacherProfilContext.jsx";
import { StudentNavbarProvider } from "./contexts/studentNavbarContext.jsx";
import { TeacherNavbarProvider } from "./contexts/teacherNavbarContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProfileProvider>
      <TeacherProfileProvider>
        <MyCoursesProvider>
          <SaveCoursesProvider>
            <SubsTeacherProvider>
              <StudentNavbarProvider>
                <TeacherNavbarProvider>
                  <App />
                </TeacherNavbarProvider>
              </StudentNavbarProvider>
            </SubsTeacherProvider>
          </SaveCoursesProvider>
        </MyCoursesProvider>
      </TeacherProfileProvider>
    </ProfileProvider>
  </BrowserRouter>
);
