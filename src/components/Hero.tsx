import React from 'react';
import { Box, Typography, Button, Container, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                pt: 12,
                pb: 8,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 6 }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ position: 'relative' }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: -10,
                                borderRadius: '50%',
                                background: 'linear-gradient(45deg, #00D4FF, #00FFA3)',
                                opacity: 0.2,
                                filter: 'blur(15px)',
                                animation: 'pulse 4s infinite ease-in-out',
                                '@keyframes pulse': {
                                    '0%, 100%': { transform: 'scale(1)', opacity: 0.2 },
                                    '50%': { transform: 'scale(1.1)', opacity: 0.4 },
                                }
                            }}
                        />
                        <Avatar
                            src="/assets/profile.png"
                            sx={{
                                width: { xs: 300, md: 380 },
                                height: { xs: 300, md: 380 },
                                border: '4px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)'
                            }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ flex: 1 }}
                    >
                        <Typography
                            variant="overline"
                            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 3 }}
                        >
                            MISSION COMMANDER
                        </Typography>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '2.5rem', md: '4rem' },
                                mt: 1,
                                mb: 1,
                                lineHeight: 1.1,
                                fontWeight: 800
                            }}
                        >
                            Ariel Aaron <span className="gradient-text">Argomedo Madrid</span>
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'primary.light',
                                mb: 3,
                                fontWeight: 600,
                                fontFamily: 'Space Grotesk'
                            }}
                        >
                            Computer Civil Engineer & M.Sc. in Computer Engineering
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                mb: 5,
                                maxWidth: '600px',
                                fontSize: '1.1rem',
                                lineHeight: 1.7
                            }}
                        >
                            Specializing in AI Systems, MLOps, and Cloud Engineering. Applying advanced Deep Learning and Scalable Architectures to solve complex challenges in Earth and Space sectors.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                                sx={{
                                    background: 'linear-gradient(45deg, #00D4FF 30%, #00FFA3 90%)',
                                    color: '#050505',
                                    px: 4
                                }}
                            >
                                Explore Projects
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                component="a"
                                href="/assets/CV_Ariel_Argomedo.pdf"
                                target="_blank"
                                sx={{ px: 4 }}
                            >
                                Download CV
                            </Button>
                        </Box>
                    </motion.div>
                </Box>
            </Container>
        </Box>
    );
};

export default Hero;
