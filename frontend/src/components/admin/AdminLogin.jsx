import React, {useEffect, useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate, Link, replace } from "react-router-dom";
import { setAuthData } from "../../redux/auth/authSlice";
import adminAxiosInstance from "../../adminaxiosconfig";
import './AdminLogin.css'
const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(''); // State for error message

    const user = useSelector((state) => state.auth.user)


    useEffect(() => {
      if (user && user.is_superuser) { // Check if the user is a superuser
          navigate('/admin/dashboard');
      }
    }, [user, navigate]);

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await adminAxiosInstance.post('/admin/token/', {email, password});
            localStorage.setItem('adminToken', response.data.admin_token);
            localStorage.setItem('adminData', JSON.stringify(response.data));

            dispatch(setAuthData(response.data));

            navigate('/admin/dashboard',{replace:true});
        } catch (error) {
            console.error('Admin login failed:', error)
            setError('Login failed. Please check your credentials.'); // Set error message

        }
    };

    return (
        <div className="admin-login-container">
          <div className="admin-login-form">
            <h2 className="admin-login-title">Admin Login</h2>
            <form onSubmit={handleAdminLogin}>
              <div className="input-container">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="input-container">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="admin-login-button">LOGIN</button>
            </form>
            {error && <div className='error-message'>{error}</div>} {/* Display error message */}

            <div className="admin-login-links">
                <div className="redirect">

              <p>Switch to User? <Link to="/login">User-Login</Link></p>
                </div>
            </div>
          </div>
        </div>
      );
}

export default AdminLogin;