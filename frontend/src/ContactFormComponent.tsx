import React, { useState } from 'react';
import axios from './axios';

const ContactFormComponent = ({ onAdd }: { onAdd: () => void }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post('/contact-service/contacts', { name, phone, email })
            .then(() => {
                onAdd();
                setName('');
                setPhone('');
                setEmail('');
                setError('');
            })
            .catch(() => {
                setError('Failed to add contact');
            });
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3 mb-3">
            <div className="mb-3">
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" placeholder="Name" />
            </div>
            <div className="mb-3">
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="form-control" placeholder="Phone" />
            </div>
            <div className="mb-3">
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" />
            </div>
            <button type="submit" className="btn btn-primary">Add Contact</button>
            {error && <p className="text-danger mt-3">{error}</p>}
        </form>
    );
};

export default ContactFormComponent;
