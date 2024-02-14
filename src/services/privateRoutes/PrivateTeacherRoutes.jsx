import { Outlet, Navigate } from 'react-router-dom'

const PrivateTeacherRoutes = () => {
    let auth = localStorage.getItem("token");
    return(
        auth ? <Outlet/> : <Navigate to="/teacherlogin" />
    )
}

export default PrivateTeacherRoutes;