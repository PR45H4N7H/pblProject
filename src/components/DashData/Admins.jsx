import React, { Component } from 'react';
import projectService from '../../services/projectService';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

class Admins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admins: [],
        };
    }

    componentDidMount() {
        projectService.getAdmins().then((res) => {
            console.log(res.data);
            this.setState({ admins: res.data });
        });
    }

    render() {
        const { admins } = this.state;

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

                <h2 className="text-center" style={{ paddingBottom: "10px", fontWeight:"bold" }}>ADMINISTRATORS</h2>

                <div className="container">
                    <div className="row">
                        {admins.map((admin) => (
                            <div key={admin.usrName} className="col-md-4 mb-3">
                                <div className="card" style={{ color: "#009fe1", height: "250px" }}>
                                    <div className="card-header">
                                        <h3>{admin.usrName}</h3>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text" style={{ color: "black" }}>Access: {admin.access}</p>
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

export default Admins;
