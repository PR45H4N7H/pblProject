import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListProjectsComp from "../components/ListProjectsComp";
import Dash from "../components/Dash";
import CreateAdmin from "../components/CreateAdmin"
import TotalProjects from "../charts/TotalProjects";
import Seekings from "../components/Seekings"
import ApprovedProjects from "../components/DashData/ApprovedProjects";
import RejectedProjects from "../components/DashData/RejectedProjects";
import TotalProjPosted from "../components/DashData/TotalProjPosted";
import User from "../components/DashData/User";
import Flag from "../components/DashData/Flag";
import Liked from "../components/DashData/Liked";
import Admins from "../components/DashData/Admins";
import FlaggedProj from "../components/DashData/FlaggedProj";
// import AdminLogin from "../components/AdminLogin";




import { AnimatePresence } from "framer-motion";

const AppRouter = () => {
    return (
        <Router>
            <AnimatePresence>
                <Routes>
                    <Route path="/Dash" element={<Dash />} />
                    <Route path="/" element={<ListProjectsComp />} />
                    <Route path="/Create" element={<CreateAdmin />} />
                    <Route path="/Stats" element={<TotalProjects/>}/>
                    <Route path="/Seekings" element={<Seekings/>}/>
                    <Route path="/ApprovedProjects" element={<ApprovedProjects/>}/>
                    <Route path="/RejectedProjects" element={<RejectedProjects/>}/>
                    <Route path="/TotalProjPosted" element={<TotalProjPosted/>}/>
                    <Route path="/User" element={<User/>}/>
                    <Route path="/Flag" element={<Flag/>}/>
                    <Route path="/Liked" element={<Liked/>}/>
                    <Route path="/Admins" element={<Admins/>}/>
                    <Route path="/FlaggedProj" element={<FlaggedProj/>}/>
                    {/* <Route path="/AdminLogin" element={<AdminLogin/>}/> */}
                   
                </Routes>
            </AnimatePresence>
        </Router>
    );
}

export default AppRouter;
