import React, { useEffect, useState } from 'react';
import axios from './axios';

const ContactListComponent = ({ refresh }: { refresh: boolean }) => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('/contact-service/contacts')
            .then(response => {
                setContacts(response.data);
            });
    }, [refresh]);

    return (
        <div>
            <h1>Contacts</h1>
            <ul>
                {contacts.map((contact: any) => (
                    <li key={contact.id}>{contact.name} - {contact.phone}</li>
                ))}
            </ul>
        </div>
    );
};

export default ContactListComponent;
