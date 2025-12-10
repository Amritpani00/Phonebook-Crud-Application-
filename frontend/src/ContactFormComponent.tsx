import React, { useState } from 'react';
import axios from './axios';

const ContactFormComponent = ({ onAdd }: { onAdd: () => void }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: any) => {
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
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <button type="submit">Add Contact</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default ContactFormComponent;
