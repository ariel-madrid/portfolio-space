import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Home from './pages/Home';

function App() {
    return (
        <BrowserRouter>
            <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: '#050505' }}>
                <Background />
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
}

export default App;
