import React, { useState } from 'react';
import axios from 'axios';

const MessageForm = ({ contactId }) => {
    const [message, setMessage] = useState('');

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/send_message', { message });
            alert(response.data.status);
        } catch (error) {
            console.error("There was an error sending the message!", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here"
                required
            />
            <button type="submit">Send Message</button>
        </form>
    );
};

export default MessageForm;
