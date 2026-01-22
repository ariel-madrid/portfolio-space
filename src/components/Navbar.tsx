import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Languages } from 'lucide-react';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [lang, setLang] = useState<'ES' | 'EN'>(() => (localStorage.getItem('app_lang') as 'ES' | 'EN') || 'ES');

    useEffect(() => {
        localStorage.setItem('app_lang', lang);
        window.dispatchEvent(new CustomEvent('langChange', { detail: lang }));
    }, [lang]);

    const handleNavClick = (id: string) => {
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: id } });
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else if (id === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const t = {
        ES: { projects: 'Proyectos', contact: 'Contacto', blog: 'El Archivo', cv: 'Descargar CV' },
        EN: { projects: 'Projects', contact: 'Contact', blog: 'The Archive', cv: 'Download CV' }
    }[lang];

    return (
        <AppBar
            position="fixed"
            sx={{
                background: 'rgba(5, 5, 5, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                zIndex: 1100
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        <RocketLaunchIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ fontWeight: 800, letterSpacing: 1, fontFamily: 'Space Grotesk' }}
                        >
                            ASTRA<span style={{ color: '#00D4FF' }}>CORE</span>
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, alignItems: 'center' }}>
                        {[
                            { name: 'Home', id: 'home' },
                            { name: t.projects, id: 'projects' },
                            { name: t.contact, id: 'contact' }
                        ].map((item) => (
                            <Button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                sx={{
                                    color: 'white',
                                    opacity: 0.8,
                                    '&:hover': { opacity: 1, background: 'transparent', color: 'primary.main' }
                                }}
                            >
                                {item.name}
                            </Button>
                        ))}
                        <Button
                            component={Link}
                            to="/blog"
                            sx={{
                                color: '#ffd700',
                                opacity: 0.8,
                                fontWeight: 600,
                                '&:hover': { opacity: 1, background: 'transparent', color: '#ffd700', textShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }
                            }}
                        >
                            {t.blog}
                        </Button>

                        <IconButton
                            onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}
                            sx={{
                                color: lang === 'EN' ? '#00D4FF' : '#ffd700',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                p: 0.5,
                                px: 1,
                                gap: 1
                            }}
                        >
                            <Languages size={18} />
                            <Typography variant="caption" sx={{ fontWeight: 800 }}>{lang}</Typography>
                        </IconButton>
                    </Box>
                    <Button
                        variant="outlined"
                        color="primary"
                        component="a"
                        href="/assets/CV_Ariel_Argomedo.pdf"
                        target="_blank"
                        sx={{ fontWeight: 700 }}
                    >
                        {t.cv}
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
