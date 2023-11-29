// ListProjectsComp.jsx

import React, { Component } from 'react';
import projectService from '../services/projectService';
import "./NavbarStyles.css";
import { Approved, Rejected } from "./MenuData";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ListProjectsComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        };
    }

    componentDidMount() {
        projectService.getProjects().then((res) => {
            const projectsWithStatus = res.data.map((project) => ({
                ...project,
                approvalStatus: null,
                rejectionStatus: null,
            }));
            this.setState({ projects: projectsWithStatus });
        });
    }

    handleApproveClick = (projectId) => {
        projectService.approveProject(projectId).then((res) => {
            toast.success('Project approved successfully', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'toast-success',
            });

            // Manually update the state without reloading the page
            this.setState((prevState) => ({
                projects: prevState.projects.map((project) => {
                    if (project.projName === projectId) {
                        return { ...project, approvalStatus: 'approved', rejectionStatus: null };
                    }
                    return project;
                }),
            }));
        });
    };

    handleRejectClick = (projectId) => {
        projectService.rejectProject(projectId).then((res) => {
            toast.error('Project rejected successfully', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'toast-error',
            });

            // Manually update the state without reloading the page
            this.setState((prevState) => ({
                projects: prevState.projects.map((project) => {
                    if (project.projName === projectId) {
                        return { ...project, rejectionStatus: 'rejected', approvalStatus: null };
                    }
                    return project;
                }),
            }));
        });
    };

    render() {
        const { projects } = this.state;

        return (
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
            >

                <h2 className="text-center">Projects to Approve</h2>
                <div className='row' style={{ backgroundColor: "transparent" }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Project Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ color: "green" }}>
                            {projects.map((project) => (
                                <tr key={project.projName}>
                                    <td className='bg-light'>{project.projName}</td>
                                    <td>{project.projDesc}</td>
                                    <td>
                                        {project.approvalStatus === null && project.rejectionStatus === null && (
                                            <ul className="nav-menu">
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="statusBtnA"
                                                        onClick={() => this.handleApproveClick(project.projName)}
                                                    >
                                                        <i className="fa-solid fa-check"></i> Approve
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="statusBtnR"
                                                        onClick={() => this.handleRejectClick(project.projName)}
                                                    >
                                                        <i className="fa-solid fa-x"></i> Reject
                                                    </a>
                                                </li>
                                            </ul>
                                        )}
                                        {project.approvalStatus === 'approved' && (
                                            <ul className="nav-menu">
                                                {Approved.map((item, index) => (
                                                    <li key={index}>
                                                        <a href={item.url} className={item.cName}>
                                                            <i className={item.icon}></i>
                                                            {item.title}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {project.rejectionStatus === 'rejected' && (
                                            <ul className="nav-menu">
                                                {Rejected.map((item, index) => (
                                                    <li key={index}>
                                                        <a href={item.url} className={item.cName}>
                                                            <i className={item.icon}></i>
                                                            {item.title}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ToastContainer />
            </motion.div>
        );
    }
}

export default ListProjectsComp;
