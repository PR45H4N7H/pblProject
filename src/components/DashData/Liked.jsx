import React, { Component } from 'react';
import projectService from '../../services/projectService';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

class Liked extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        };
    }

    componentDidMount() {
        projectService.getAllProjects().then((res) => {
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

                <h2 className="text-center" style={{ paddingBottom: "10px", fontWeight:"bold", color: "red" }}>MOST LIKED PROJECTS</h2>

                <div className="container">
                    <div className="row">
                        {projects.map((project) => (
                             project.likes >= 10 && (
                                <div key={project.projName} className="col-md-4 mb-3">
                                <div className="card" style={{height: "250px"}}>
                                    <div className="card-header"style={{ color: "red", fontWeight:"bold", }}>
                                        <h3>{project.projName}</h3>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text" style={{ color: "black" }}>{project.projDesc}</p>
                                        <p className="card-text" style={{ color: "black" }}><i className="icon-heart danger font-medium-2" style={{marginRight:"4px", top:"1px"}}></i>{project.likes}</p>
                                        <div className="row">
                                            {/* <a style={{color:"red"}}>Reject</a> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                             )
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    }
}

export default Liked;