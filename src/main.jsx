import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ProfileProvider } from "./services/providers/profileContext.jsx";
import { TeacherProfileProvider } from "./services/providers/teacherProfilContext.jsx";
import { MyCoursesProvider } from "./services/providers/myCoursesContext.jsx";
import { SaveCoursesProvider } from "./services/providers/saveCoursesContext.jsx";
import { SubsTeacherProvider } from "./services/providers/subsTeacherContext.jsx";
import { StudentNavbarProvider } from "./services/providers/studentNavbarContext.jsx";
import { TeacherNavbarProvider } from "./services/providers/teacherNavbarContext.jsx";
import "plyr-react/plyr.css"
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
