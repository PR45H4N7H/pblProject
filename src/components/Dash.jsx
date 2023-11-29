// import React from 'react';
import {motion} from "framer-motion"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NavbarStyles.css'



const Dash = () => {
  const [projects, setProjects] = useState([]);
  const [approvedProjects, setApprovedProjects] = useState([]);
  const [rejectedProjects, setRejectedProjects] = useState([]);
  const [likedProjects, setLikedProjects] = useState([]);
  const [flaggedProjects, setFlaggedProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from your API when the component mounts
    axios.get('http://localhost:8081/api/v1/Projects').then((response) => {
      setProjects(response.data);
    });
  }, []);

  useEffect(() => {
    // Set approvedProjects when projects are loaded
    const approvedProjects = projects.filter((project) => project.approved === 'a');
    setApprovedProjects(approvedProjects);
  }, [projects]);



  useEffect(()=>{
    const rejectedProjects = projects.filter((project) => project.approved === 'r');
    setRejectedProjects(rejectedProjects);
  }, [projects]
  );

  useEffect(()=>{
    const likedProjects = projects.filter((project) => project.likes > 25);
    setLikedProjects(likedProjects);
  }, [projects]
  );



  useEffect(() => {
    // Set approvedProjects when projects are loaded
    const flaggedProjects = projects.filter((project) => project.flags > 10);
    setFlaggedProjects(flaggedProjects);
  }, [projects]);


  useEffect(()=>{
    const totalProjects = projects.filter((project) => project.projName);
    setTotalProjects(totalProjects);
  }, [projects]
  );



  const showRejected = () => {
    // Filter and display only rejected projects
    
  };

  return (
    <motion.div
    initial={{width: 0}}
    animate={{width:"100%"}}
    exit={{x:window.innerWidth, transition:{duration:0.1}}}
    
    >
      <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
      <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/bootstrap-extended.min.css" />
      <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/fonts/simple-line-icons/style.min.css" />
      <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/colors.min.css" />
      <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/bootstrap.min.css" />
      <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet" />
      

      <div className="grey-bg container-fluid">
        <section id="minimal-statistics">
          <div className="row">
            <div className="col-12 mt-3 mb-1">
              <h4 className="text-uppercase">ADMIN DASHBOARD</h4>
              <p>Acces at Ease</p>
            </div>
          </div>
          <div className="row" >
            <div className="col-xl-3 col-sm-6 col-12" >
              <a href="/ApprovedProjects">
                <div className="card" id="Ad-Div">
                  <div className="card-content">
                    <div className="card-body">
                      <div className="media d-flex">
                        <div className="align-self-center">
                          <i className="icon-check success font-large-2 float-left"></i>
                        </div>
                        <div className="media-body text-right">
                          <h3>{approvedProjects.length !== undefined ? approvedProjects.length : 'Loading...'}</h3>
                          <span>Approved Projects</span>
                          <tbody>
                            {/* Your project list mapping code */}
                          </tbody>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            
            <div className="col-xl-3 col-sm-6 col-12" >
            <a href="/RejectedProjects">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="align-self-center">
                        <i className="icon-close warning font-large-2 float-left"></i>
                      </div>
                      <div className="media-body text-right">
                        <h3>{rejectedProjects.length}</h3>
                        <span>Rejected Projects</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </a>
            </div>

            <div className="col-xl-3 col-sm-6 col-12">
            <a href="/Liked">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="align-self-center">
                        <i className="icon-heart danger font-large-2 float-left"></i>
                      </div>
                      <div className="media-body text-right">
                        <h3>{likedProjects.length}</h3>
                        <span>Most Liked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </a>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
            <a href="/Flag">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="align-self-center">
                        <i className="icon-flag warning font-large-2 float-left"></i>
                      </div>
                      <div className="media-body text-right">
                        <h3>{flaggedProjects.length}</h3>
                        <span>Most Flagged</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </a>
            </div>
            {/* Add more card components as needed */}
          </div>
        </section>

        <section id="stats-subtitle">
          <div className="row">
            <div className="col-12 mt-3 mb-1">
              <h4 className="text-uppercase">HEADING 2</h4>
              <p>Users and Projects</p>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-6 col-md-12">
              <a href="/User">
              <div className="card overflow-hidden">
                <div className="card-content">
                  <div className="card-body cleartfix">
                    <div className="media align-items-stretch">
                      <div className="align-self-center">
                        <i className="icon-user primary font-large-2 mr-2"></i>
                      </div>
                      <div className="media-body">
                        <h4>Block User</h4>
                        <span>You can Block users by clicking</span>
                      </div>
                      <div className="align-self-center">
                        {/* <h1>18,000</h1> */}
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              </a>
            </div>
            <div className="col-xl-6 col-md-12">
            <a href="/TotalProjPosted">
              <div className="card">
                <div className="card-content">
                  <div className="card-body cleartfix">
                    <div className="media align-items-stretch">
                      <div className="align-self-center">
                        <i className="icon-speech primary font-large-2 mr-2"></i>
                      </div>
                      <div className="media-body">
                        <h4>Total Projects</h4>
                        <span>Monthly projects posted</span>
                      </div>
                      <div className="align-self-center"> 
                        <h1>{totalProjects.length}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </a>
            </div>
            {/* Add more subtitle card components as needed */}
          </div>

          <div className="row">
            {/* Add more rows or components as needed */}
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Dash;
