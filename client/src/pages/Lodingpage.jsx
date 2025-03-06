import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/LoadingPage.css'; // Import the CSS file

function LoadingPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const response = await axios.get("http://localhost:4000/autologin", {
          withCredentials: true, // Ensures cookies are sent
        });

        if (response.data.success) {
          sessionStorage.setItem("islogedin", true);
          sessionStorage.setItem("Username", response.data.username);
          navigate("/chats");
        } else {
          navigate('/login');
          console.log("No Token provided")
        }
      } catch (error) {
        setMessage("Please login manually.");
        navigate('/login'); // Redirect if auto-login fails
      }
    };

    autoLogin();
  }, [navigate]); // Added `navigate` as a dependency

  return (
    <div className="loading-container">
      <img src="just-frd-logo.png" alt="Just Friend Logo" className="loading-logo" />
      {message && <p className="error-message">{message}</p>}
    </div>
  );
}

export default LoadingPage;