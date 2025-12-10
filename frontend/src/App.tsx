import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import ContactListComponent from './ContactListComponent';
import ContactFormComponent from './ContactFormComponent';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [refresh, setRefresh] = useState(false);

  const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };

    return <button onClick={handleLogout}>Logout</button>;
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/" element={
            <ProtectedRoute>
              <div>
                <ContactFormComponent onAdd={() => setRefresh(!refresh)} />
                <ContactListComponent refresh={refresh} />
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
