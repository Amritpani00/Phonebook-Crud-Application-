import React, { useState } from 'react';
import axios from './axios';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('/user-service/auth/register', { username, password })
            .then(() => {
                setError('');
                navigate('/login');
            })
            .catch(() => {
                setError('Registration failed');
            });
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3">
            <div className="mb-3">
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-control" placeholder="Username" />
            </div>
            <div className="mb-3">
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
            {error && <p className="text-danger mt-3">{error}</p>}
        </form>
    );
};

export default RegisterComponent;
