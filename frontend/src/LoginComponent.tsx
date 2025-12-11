import React, { useState } from 'react';
import axios from './axios';
import { useNavigate } from 'react-router-dom';

const LoginComponent = ({ onLogin }: { onLogin: () => void }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('/user-service/auth/login', { username, password })
            .then(response => {
                localStorage.setItem('token', response.data);
                setError('');
                onLogin();
                navigate('/');
            })
            .catch(() => {
                setError('Invalid credentials');
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
            <button type="submit" className="btn btn-primary">Login</button>
            {error && <p className="text-danger mt-3">{error}</p>}
        </form>
    );
};

export default LoginComponent;
