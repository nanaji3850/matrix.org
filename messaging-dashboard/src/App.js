import React from 'react';
import MessageForm from './components/messageForm';
import MessageList from './components/messageList';
import Summary from './components/Summary';
import { Container, Typography, Box, Paper } from '@mui/material';
import './App.css';

function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        
        <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#C0C78C' }}>
        <Typography variant="h2" align="center" gutterBottom>
          Messaging Dashboard
        </Typography>
        </Paper>
        <Box sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <MessageList />
          </Paper>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#B99470' }}>
            <Summary />
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
