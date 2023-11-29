import React, { Component } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { motion } from 'framer-motion';
import projectService from '../services/projectService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './NavbarStyles.css';

class CreateAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usrName: '',
            pwd: '',
            grantFullAccess: false,
            showToast: false,
            admins: [],
        };
        this.ChangePwdHandler = this.ChangePwdHandler.bind(this);
        this.ChangeUsrNameHandler = this.ChangeUsrNameHandler.bind(this);
        this.saveAdmin = this.saveAdmin.bind(this);
        this.showAdmin = this.showAdmin.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    componentDidMount() {
        // Fetch admins data initially
        this.fetchAdminsData();
    }

    fetchAdminsData() {
        // Make a request to get admins using projectService
        projectService.getAdmins()
            .then(res => {
                // Set the admins data in the state
                this.setState({ admins: res.data });
            })
            .catch(error => {
                // Handle the error response
                console.error('Error fetching admins:', error);
            });
    }

    saveAdmin(e) {
        e.preventDefault();
        const { usrName, pwd, grantFullAccess } = this.state;

        if (!usrName || !pwd) {
            // Check if both fields are entered
            return;
        }

        // Create an admin object from the state
        let admin = { usrName, pwd, access: grantFullAccess ? 'full' : 'partial' };

        // Log the admin details to the console
        console.log('admin => ' + JSON.stringify(admin));

        // Make a request to create an admin using projectService
        projectService.createAdmin(admin)
            .then(res => {
                // Handle the successful response
                toast.success('Admin created successfully', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    className: 'toast-success',
                });

                // Clear the form after successful submission
                this.setState({ usrName: '', pwd: '', grantFullAccess: false, showToast: true });

                // Update admins data after successful submission
                this.fetchAdminsData();
            })
            .catch(error => {
                // Handle the error response
                console.error('Error creating admin:', error);

                // Add logic to handle the error, e.g., display an error message
                toast.error('Error creating admin. Please try again.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    className: 'toast-error',
                });
            });
    }

    showAdmin() {
        // Fetch admins data before navigating
        this.fetchAdminsData();
        window.location.href = "/Admins";
    }

    ChangeUsrNameHandler(event) {
        this.setState({ usrName: event.target.value });
    }

    ChangePwdHandler(event) {
        this.setState({ pwd: event.target.value });
    }

    handleCheckboxChange() {
        this.setState(prevState => ({ grantFullAccess: !prevState.grantFullAccess }));
    }

    render() {
        const { usrName, pwd, grantFullAccess, showToast, admins } = this.state;

        return (
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
            >
                <MDBContainer fluid className="p-3 my-5 h-custom">
                    <MDBRow>
                        <MDBCol col="10" md="6">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="Sample image"
                            />
                        </MDBCol>
                        <MDBCol col="4" md="6">
                            <h2 style={{ color: 'Blue' }}> Create Admin</h2>
                            <MDBInput
                                wrapperClass="mb-4"
                                label="User Name"
                                name="usrName"
                                id="formControlLg"
                                type="text"
                                size="lg"
                                value={usrName}
                                onChange={this.ChangeUsrNameHandler}
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Password"
                                name="pwd"
                                id="formControlLgPwd"
                                type="password"
                                size="lg"
                                value={pwd}
                                onChange={this.ChangePwdHandler}
                            />
                            <div className="d-flex justify-content-between mb-4">
                                <MDBCheckbox
                                    name="flexCheck"
                                    value=""
                                    id="flexCheckDefault"
                                    label="Grant Full Access"
                                    checked={grantFullAccess}
                                    onChange={this.handleCheckboxChange}
                                />
                            </div>
                            <div className="text-center text-md-start mt-4 pt-2">
                                <MDBBtn className="mb-0 px-4" size="lg" onClick={this.saveAdmin}>
                                    Create Admin
                                </MDBBtn>
                                <MDBBtn style={{ marginLeft: "13px" }} className="mb-0 px-4" size="lg" onClick={this.showAdmin}>
                                    Show Admins ({admins.length})
                                </MDBBtn>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                        <div className="text-white mb-3 mb-md-0" style={{ alignItems: 'center' }}>
                            Create Admin
                        </div>
                    </div>
                </MDBContainer>
                {showToast && (
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        className="custom-toast-container"
                    />
                )}
            </motion.div>
        );
    }
}

export default CreateAdmin;
