
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UnifiedConversation = () => {
    const [conversations, setConversations] = useState({});

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await axios.get('/get_messages');
                setConversations(response.data.messages);  
            } catch (error) {
                console.error("There was an error fetching conversations!", error);
            }
        };

        fetchConversations();
    }, []);

    return (
        <div>
            <h2>Unified Conversations</h2>
            {Object.keys(conversations).map(contact => (
                <div key={contact}>
                    <h3>{contact}</h3>
                    {conversations[contact].map((msg, index) => (
                        <div key={index} className={`message ${msg.platform}`}>
                            <span className="platform-icon">{getPlatformIcon(msg.platform)}</span>
                            <p>{msg.body}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

const getPlatformIcon = (platform) => {
    switch(platform) {
        case 'WhatsApp':
            return '🟢'; 
        case 'iMessage':
            return '🔵'; 
        default:
            return '💬';
    }
};

export default UnifiedConversation;
