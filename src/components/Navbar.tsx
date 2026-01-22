import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const Navbar: React.FC = () => {
    return (
        <AppBar
            position="fixed"
            sx={{
                background: 'rgba(5, 5, 5, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <RocketLaunchIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ fontWeight: 800, letterSpacing: 1, fontFamily: 'Space Grotesk' }}
                        >
                            ASTRA<span style={{ color: '#00D4FF' }}>CORE</span>
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                        {[
                            { name: 'Home', id: 'home' },
                            { name: 'Projects', id: 'projects' },
                            { name: 'Contact', id: 'contact' }
                        ].map((item) => (
                            <Button
                                key={item.name}
                                onClick={() => {
                                    const element = document.getElementById(item.id);
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    } else if (item.id === 'home') {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }
                                }}
                                sx={{
                                    color: 'white',
                                    opacity: 0.8,
                                    '&:hover': { opacity: 1, background: 'transparent', color: 'primary.main' }
                                }}
                            >
                                {item.name}
                            </Button>
                        ))}
                    </Box>
                    <Button
                        variant="outlined"
                        color="primary"
                        component="a"
                        href="/assets/CV_Ariel_Argomedo.pdf"
                        target="_blank"
                        sx={{ fontWeight: 700 }}
                    >
                        Download CV
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
