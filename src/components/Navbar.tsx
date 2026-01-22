import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Languages, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [lang, setLang] = useState<'ES' | 'EN'>(() => (localStorage.getItem('app_lang') as 'ES' | 'EN') || 'ES');
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('app_lang', lang);
        window.dispatchEvent(new CustomEvent('langChange', { detail: lang }));
    }, [lang]);

    const handleNavClick = (id: string) => {
        setMobileOpen(false);
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
        ES: { projects: 'Proyectos', contact: 'Contacto', blog: 'El Archivo', cv: 'Descargar CV', home: 'Inicio' },
        EN: { projects: 'Projects', contact: 'Contact', blog: 'The Archive', cv: 'Download CV', home: 'Home' }
    }[lang];

    const menuItems = [
        { name: t.home, id: 'home' },
        { name: t.projects, id: 'projects' },
        { name: t.contact, id: 'contact' }
    ];

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
                        <RocketLaunchIcon sx={{ color: 'primary.main', fontSize: { xs: 24, md: 28 } }} />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ fontWeight: 800, letterSpacing: 1, fontFamily: 'Space Grotesk', fontSize: { xs: '1rem', md: '1.25rem' } }}
                        >
                            ARGOMEDO<span style={{ color: '#00D4FF' }}> SYSTEMS</span>
                        </Typography>
                    </Box>

                    {/* Desktop Menu */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, alignItems: 'center' }}>
                        {menuItems.map((item) => (
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

                    {/* Mobile Menu Button */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
                        <IconButton
                            onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}
                            sx={{
                                color: lang === 'EN' ? '#00D4FF' : '#ffd700',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '6px',
                                p: 0.5,
                                px: 1
                            }}
                        >
                            <Typography variant="caption" sx={{ fontWeight: 800 }}>{lang}</Typography>
                        </IconButton>
                        <IconButton
                            color="inherit"
                            onClick={() => setMobileOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    <Button
                        variant="outlined"
                        color="primary"
                        component="a"
                        href="/assets/CV_Ariel_Argomedo.pdf"
                        target="_blank"
                        sx={{ fontWeight: 700, display: { xs: 'none', md: 'inline-flex' } }}
                    >
                        {t.cv}
                    </Button>
                </Toolbar>
            </Container>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                PaperProps={{
                    sx: {
                        width: '80%',
                        maxWidth: '300px',
                        background: 'rgba(5, 5, 5, 0.95)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        p: 3
                    }
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
                    <IconButton onClick={() => setMobileOpen(false)} color="inherit">
                        <X size={24} />
                    </IconButton>
                </Box>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton onClick={() => handleNavClick(item.id)} sx={{ py: 2 }}>
                                <ListItemText primary={item.name} primaryTypographyProps={{ fontWeight: 600, letterSpacing: 1 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/blog" onClick={() => setMobileOpen(false)} sx={{ py: 2 }}>
                            <ListItemText primary={t.blog} primaryTypographyProps={{ color: '#ffd700', fontWeight: 800, letterSpacing: 1 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
                <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    component="a"
                    href="/assets/CV_Ariel_Argomedo.pdf"
                    target="_blank"
                    sx={{ py: 1.5, fontWeight: 700 }}
                >
                    {t.cv}
                </Button>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
