import React, { useEffect, useState } from 'react';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import bcLogo from './bcLogo.png';
import professionalVideo from './PROFESSIONAL.mp4';
import adminBgVideo from './adminBg.mp4';

const useCustomTypewriter = () => {
  return useTypewriter({
    words: [' Approve Projects', ' Reject Projects', ' See Stats', ' &More'],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 70,
  });
};

const TypewriterEffect = () => {
  const [text] = useCustomTypewriter();

  return (
    <p className="info" style={{ padding: '25px', color:"white", fontSize: '20px', textAlign: 'center', margin: '40px', position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      You can{' '}
      <span style={{ fontWeight: 'bold', color: 'green' }}>
        {text}
      </span>
      <span style={{ color: 'red' }}>
        <Cursor cursorStyle='|' />
      </span>
    </p>
  );
};

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the duration as needed

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);

  const adminLogin = () => {
    var usrId = document.getElementById('usrId').value;
    var pwd = document.getElementById('pwd').value;

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: usrId, password: pwd }),
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.href = '#'; // You can redirect to a new page if needed
        } else {
          alert('Login Unsuccessful');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Login Unsuccessful');
      });
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', height: '100vh', display: 'flex' }}>
      {isLoading && (
        <div id="preloader" style={{ position: 'fixed', width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '9999', top: '40%' }}>
          <div id="loader" style={{ width: '180px', height: '180px', position: 'absolute', top: '0%' }}>
            <video autoPlay loop muted id="loaderVideo" style={{ width: '100%', height: '100%' }}>
              <source src={professionalVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="left-section" style={{ width: '35%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: '2' }}>
            <p className="admin-text" style={{ fontFamily: 'Roboto', color: '#006747', fontWeight: 800, fontSize: '24px', textAlign: 'center', position: 'absolute', top: '5%', zIndex: '3' }}>
              Welcome Admin
            </p>
            <img id="logo" src={bcLogo} alt="Logo" style={{ maxWidth: '40%', maxHeight: '40%', zIndex: '3', position: 'absolute', top: '15%' }} />
            <div className="login-container" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', zIndex: '3' }}>
              <input type="text" id="usrId" className="login-input" placeholder="User ID" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }} />
              <input type="password" id="pwd" className="login-input" placeholder="Password" style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }} />
              <button className="login-button" onClick={adminLogin} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Login
              </button>
            </div>
          </div>

          <div className="right-section" style={{ position: 'relative', overflow: 'hidden', height: '100vh', width: '65%', flex: '1', zIndex: '1' }}>
            <div className="video-container" style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '-1', overflow: 'hidden' }}>
              <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={adminBgVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div id="root" style={{ position: 'relative', zIndex: '2', height: '100%' }}>
              <TypewriterEffect />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLogin;
