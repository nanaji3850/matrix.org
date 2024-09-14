import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Summary = () => {
    const [summary, setSummary] = useState('');

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                
                const response = await axios.get('/summarize_messages');
                setSummary(response.data.summary);
            } catch (error) {
                console.error("There was an error fetching the summary!", error);
            }
        };

        fetchSummary();
    }, []);

    return (
        <div>
            <h2>Message Summary</h2>
            <p>{summary}</p>
        </div>
    );
};

export default Summary;
