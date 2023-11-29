import React, { Component } from 'react';
import projectService from '../../services/projectService';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredUsers: [],
            hoveredId: null,
            searchQuery: '',
        };
    }

    componentDidMount() {
        projectService.getUsers().then((res) => {
            console.log(res.data);
            this.setState({ users: res.data, filteredUsers: res.data });
        });
    }

    blockUser = (userId, blocked) => {
        const action = blocked === 'y' ? 'unblock' : 'block';

        projectService.updateBlockedStatus(userId, blocked)
            .then(() => {
                // Show a success toast
                toast.success(`User ${action}ed successfully`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });

                // Manually update the state without reloading the page
                this.setState((prevState) => ({
                    users: prevState.users.map((user) => {
                        if (user.id === userId) {
                            return { ...user, blocked: blocked === 'y' ? 'n' : 'y' };
                        }
                        return user;
                    }),
                }));
            })
            .catch((error) => {
                console.error(`Error ${action}ing user:`, error);
                // Show an error toast
                toast.error(`Error ${action}ing user`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            });
    };

    handleMouseEnter = (userId) => {
        this.setState({ hoveredId: userId });
    };

    handleMouseLeave = () => {
        this.setState({ hoveredId: null });
    };

    handleSearch = (event) => {
        const searchQuery = event.target.value.toLowerCase();
        const { users } = this.state;

        const filteredUsers = users.filter((user) => {
            return (
                (user.usrName && user.usrName.toLowerCase().includes(searchQuery)) ||
                (user.email && user.email.toLowerCase().includes(searchQuery)) ||
                (user.fname && user.fname.toLowerCase().includes(searchQuery)) ||
                (user.lname && user.lname.toLowerCase().includes(searchQuery))
            );
        });

        this.setState({ filteredUsers, searchQuery });
    };

    render() {
        const { filteredUsers, searchQuery, hoveredId } = this.state;

        return (
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
            >
                <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
                <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/fonts/simple-line-icons/style.min.css" />
                <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet" />

                <h2 className="text-center" style={{ paddingBottom: "20px", color: "#34495e" }}>
                    Users List
                    <input
                        type="text"
                        placeholder="Search Users"
                        value={searchQuery}
                        onChange={this.handleSearch}
                        style={{
                            width: "88%",
                            height: "40px",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontSize: "16px",
                            marginLeft: "10px",
                            marginBottom: "20px",
                        }}
                    />
                    <i className="icon-magnifier" style={{ fontSize: "20px", marginLeft: "10px", color: "#34495e" }}></i>
                </h2>

                <div className="container">
                    <div className="row">
                        {filteredUsers.map((user) => (
                            <div key={user.id} className="col-md-4 mb-4">
                                <motion.div
                                    className="card shadow-lg rounded"
                                    style={{
                                        height: "100%",
                                        transform: hoveredId === user.id ? "scale(1.05)" : "scale(1)",
                                        transition: "transform 0.3s ease-in-out",
                                    }}
                                    onMouseEnter={() => this.handleMouseEnter(user.id)}
                                    onMouseLeave={this.handleMouseLeave}
                                >
                                    <div className="card-body">
                                        <h4 className="card-title text-primary" style={{ textTransform: "uppercase" }}>{user.usrName}</h4>
                                        <p className="card-text">
                                            <strong>Email:</strong> {user.email}<br />
                                            <strong>First Name:</strong> {user.fname}<br />
                                            <strong>Last Name:</strong> {user.lname}<br />
                                            <strong>Mobile Number:</strong> {user.mNumber}
                                        </p>
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className={`btn btn-${user.blocked === 'y' ? 'success' : 'danger'} btn-block`}
                                                onClick={() => this.blockUser(user.id, user.blocked)}
                                            >
                                                {user.blocked === 'y' ? 'Unblock User' : 'Block User'}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
                <ToastContainer />
            </motion.div>
        );
    }
}

export default User;
