import React, { useEffect, useState } from 'react';
import axios from './axios';
import { Contact } from './types';

const ContactListComponent = ({ refresh }: { refresh: boolean }) => {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        axios.get('/contact-service/contacts')
            .then(response => {
                setContacts(response.data);
            });
    }, [refresh]);

    return (
        <div>
            <h1>Contacts</h1>
            <ul className="list-group">
                {contacts.map(contact => (
                    <li key={contact.id} className="list-group-item">{contact.name} - {contact.phone}</li>
                ))}
            </ul>
        </div>
    );
};

export default ContactListComponent;
