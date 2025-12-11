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
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  const LogoutButton = () => {
    const navigate = useNavigate();

    const doLogout = () => {
      handleLogout();
      navigate('/login');
    };

    return <button className="btn btn-outline-primary" onClick={doLogout}>Logout</button>;
  };

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Phonebook</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                {!loggedIn && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                    </li>
                  </>
                )}
              </ul>
              {loggedIn && <LogoutButton />}
            </div>
          </div>
        </nav>

        <hr />

        <Routes>
          <Route path="/login" element={<LoginComponent onLogin={handleLogin} />} />
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
