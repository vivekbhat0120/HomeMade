import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/admin.scss';

const ADMIN_ID = 'admin';
const ADMIN_PASSWORD = 'admin123';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('isAdmin') === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (adminId === ADMIN_ID && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid admin ID or password');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <label>Admin ID</label>
          <input value={adminId} onChange={(e) => setAdminId(e.target.value)} placeholder="admin" />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />

          {error && <div className="admin-error">{error}</div>}

          <button type="submit" className="btn-primary">Sign In</button>

          <div className="admin-help">Default: ID <strong>admin</strong> / Password <strong>admin123</strong></div>

          <div className="back-link"><Link to="/">Back to site</Link></div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
