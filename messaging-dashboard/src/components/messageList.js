import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MessageList.css';

const ConsolidatedMessageList = () => {
    const [messages, setMessages] = useState({});
    const [detailedMessages, setDetailedMessages] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [reply, setReply] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('/get_messages');
                const consolidatedMessages = consolidateMessages(response.data.messages || []);
                setMessages(consolidatedMessages);
            } catch (error) {
                console.error("There was an error fetching messages!", error);
            }
        };

        fetchMessages();
    }, []);

    // Function to group messages by contact
    const consolidateMessages = (messagesArray) => {
        return messagesArray.reduce((acc, message) => {
            const { contactId, platform, body } = message;

            if (!acc[contactId]) {
                acc[contactId] = [];
            }
            acc[contactId].push({ platform, body });

            return acc;
        }, {});
    };

    const handleSummaryClick = async (contactId) => {
        try {
            const response = await axios.get(`/get_detailed_messages/${contactId}`);
            setDetailedMessages(response.data.messages);
            setSelectedContact(contactId);
        } catch (error) {
            console.error("There was an error fetching detailed messages!", error);
        }
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/reply_message', { reply, contact_id: selectedContact });
            setReply(''); 
        } catch (error) {
            console.error("There was an error sending the reply!", error);
        }
    };

    const getPlatformIcon = (platform) => {
      
        const icons = {
            whatsapp: '/icons/whatsapp.png',
            slack: '/icons/slack.png',
            matrix: '/icons/matrix.png',
            unknown: '/icons/unknown.png',
        };
        return icons[platform] || icons['unknown'];
    };

    return (
        <div className="message-list-container">
            <h2>Consolidated Conversations</h2>
            {Object.keys(messages).length > 0 ? (
                Object.keys(messages).map((contactId) => (
                    <div key={contactId} onClick={() => handleSummaryClick(contactId)}>
                        <h3>Contact: {contactId}</h3>
                        <ul>
                            {messages[contactId].map((msg, index) => (
                                <li key={index} className={`message-entry ${msg.platform}`}>
                                    <img
                                        src={getPlatformIcon(msg.platform)}
                                        alt={msg.platform}
                                        className="message-icon"
                                    />
                                    <div className="message-content">
                                        <span>{msg.platform}: </span>
                                        {msg.body}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No messages available.</p>
            )}

            {selectedContact && (
                <div>
                    <h3>Detailed Messages for {selectedContact}</h3>
                    <ul>
                        {detailedMessages.map((msg, index) => (
                            <li key={index} className={`message-entry ${msg.platform}`}>
                                <img
                                    src={getPlatformIcon(msg.platform)}
                                    alt={msg.platform}
                                    className="message-icon"
                                />
                                <div className="message-content">
                                    <span>{msg.platform}: </span>
                                    {msg.body}
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Reply Form */}
                    <div className="reply-form">
                        <h4>Reply to Contact</h4>
                        <form onSubmit={handleReplySubmit}>
                            <textarea
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                placeholder="Type your reply here"
                            />
                            <button type="submit">Send Reply</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsolidatedMessageList;
