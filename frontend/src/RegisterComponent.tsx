import React, { useState } from 'react';
import axios from './axios';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
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
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default RegisterComponent;
