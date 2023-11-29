import React, { Component } from 'react';
import projectService from '../../services/projectService';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

class RejectedProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        };
    }

    componentDidMount() {
        projectService.getRejectedProjects().then((res) => {
            console.log(res.data);
            this.setState({ projects: res.data });
        });
    }

    render() {
        const { projects } = this.state;

        return (
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
            >
                <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
                <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/bootstrap-extended.min.css" />
                <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/fonts/simple-line-icons/style.min.css" />
                <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/colors.min.css" />
                <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/bootstrap.min.css" />
                <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet" />

                <h2 className="text-center" style={{ paddingBottom: "10px" }}>REJECTED PROJECTS</h2>

                <div className="container">
                    <div className="row">
                        {projects.map((project) => (
                            <div key={project.projName} className="col-md-4 mb-3">
                                <div className="card" style={{ color: "Red", height: "250px" }}>
                                    <div className="card-header">
                                        <h3>{project.projName}</h3>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text" style={{ color: "black" }}>{project.projDesc}</p>
                                        <div className="row">
                                        <button 
  className="btn" 
  style={{ 
    backgroundColor: "#5cb85c", 
    color: "white", 
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  }}
  onMouseOver={(e) => {
    e.target.style.backgroundColor = "#006A4E";
    e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  }}
  onMouseOut={(e) => {
    e.target.style.backgroundColor = "#5cb85c";
    e.target.style.boxShadow = "none";
  }}
>
  Approve
</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    }
}

export default RejectedProjects;
