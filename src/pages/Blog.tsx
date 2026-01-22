import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Chip, IconButton, Skeleton, useMediaQuery, useTheme, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase, BlogPost } from '../lib/supabase';
import { Sparkles, Eye, Ghost, Hexagon, ScrollText, Calendar, Rocket, ArrowLeft } from 'lucide-react';

const Ufo = () => (
    <motion.div
        animate={{
            x: [0, 80, -80, 40, -40, 0],
            y: [0, -20, 15, -30, 25, 0],
            rotate: [0, 10, -10, 15, -15, 0]
        }}
        transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        style={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            color: '#00ffaa',
            filter: 'drop-shadow(0 0 10px #00ffaa)',
            zIndex: 0,
            opacity: 0.4,
            pointerEvents: 'none'
        }}
    >
        <Rocket size={50} style={{ transform: 'rotate(225deg)' }} />
    </motion.div>
);

const Blog: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState<'ES' | 'EN'>(() => (localStorage.getItem('app_lang') as 'ES' | 'EN') || 'ES');
    const [showContentOnMobile, setShowContentOnMobile] = useState(false);

    useEffect(() => {
        fetchPosts();
        const handleLang = (e: any) => setLang(e.detail);
        window.addEventListener('langChange', handleLang);
        return () => window.removeEventListener('langChange', handleLang);
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error);
        } else {
            setPosts(data || []);
            if (data && data.length > 0 && !isMobile) {
                setSelectedPost(data[0]);
            }
        }
        setLoading(false);
    };

    const handlePostSelect = (post: BlogPost) => {
        setSelectedPost(post);
        if (isMobile) {
            setShowContentOnMobile(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const t = {
        ES: { title: 'ANOMALÍAS COGNITIVAS', footer: 'STREAM DE DATOS TERMINADO | LA VERDAD ESTÁ AHÍ FUERA', select: 'SELECCIONA UNA FRECUENCIA', back: 'Volver a la lista' },
        EN: { title: 'COGNITIVE ANOMALIES', footer: 'DATA STREAM TERMINATED | THE TRUTH IS OUT THERE', select: 'SELECT A FREQUENCY', back: 'Back to list' }
    }[lang];

    return (
        <Box sx={{
            minHeight: '100vh',
            background: '#050505',
            backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(26, 16, 37, 1) 0%, rgba(5, 5, 5, 1) 100%),
                url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
            `,
            backgroundRepeat: 'repeat',
            backgroundBlendMode: 'overlay',
            pt: { xs: '80px', md: '100px' },
            color: '#e0e0e0',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Scanline / CRT Effect */}
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02))',
                zIndex: 5,
                backgroundSize: '100% 2px, 1px 100%',
                pointerEvents: 'none',
                opacity: 0.6
            }} />

            <Ufo />

            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, pb: 4 }}>
                {/* Centered Title */}
                <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <Typography variant="h3" sx={{
                            fontFamily: 'Cinzel, serif',
                            color: '#ffd700',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 2,
                            letterSpacing: { xs: 3, md: 6 },
                            textShadow: '0 0 20px rgba(255, 215, 0, 0.4)',
                            fontSize: { xs: '1.2rem', md: '1.8rem' }
                        }}>
                            <Ghost size={isMobile ? 20 : 28} /> {t.title} <Ghost size={isMobile ? 20 : 28} />
                        </Typography>
                    </motion.div>
                </Box>

                {/* Mobile Back Button */}
                {isMobile && showContentOnMobile && (
                    <Button
                        startIcon={<ArrowLeft size={18} />}
                        onClick={() => setShowContentOnMobile(false)}
                        sx={{ color: '#ffd700', mb: 2, fontWeight: 700 }}
                    >
                        {t.back}
                    </Button>
                )}

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 4,
                    height: { xs: 'auto', md: 'calc(100vh - 200px)' }
                }}>

                    {/* LEFT PANEL: Blog List (Hidden on mobile if content is shown) */}
                    <Box sx={{
                        display: { xs: showContentOnMobile ? 'none' : 'block', md: 'block' },
                        flex: { xs: '1', md: '0 0 350px' },
                        overflowY: { xs: 'visible', md: 'auto' },
                        pr: { xs: 0, md: 2 },
                        '&::-webkit-scrollbar': { width: '2px' },
                        '&::-webkit-scrollbar-thumb': { background: 'rgba(255, 215, 0, 0.2)', borderRadius: '10px' }
                    }}>
                        {loading ? (
                            Array.from(new Array(3)).map((_, i) => (
                                <Skeleton key={i} variant="rectangular" height={150} sx={{ mb: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.05)' }} />
                            ))
                        ) : (
                            posts.map((post) => (
                                <motion.div key={post.id} whileHover={{ x: 6 }} onClick={() => handlePostSelect(post)}>
                                    <Card sx={{
                                        mb: 2,
                                        cursor: 'pointer',
                                        background: selectedPost?.id === post.id ? 'rgba(255, 215, 0, 0.1)' : 'rgba(15, 15, 20, 0.6)',
                                        border: `1px solid ${selectedPost?.id === post.id ? '#ffd700' : 'rgba(255, 215, 0, 0.15)'}`,
                                        borderLeft: selectedPost?.id === post.id ? '4px solid #ffd700' : '1px solid rgba(255, 215, 0, 0.15)',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <CardMedia
                                            component="img"
                                            height="120"
                                            image={post.main_image}
                                            alt={lang === 'EN' ? post.title_en : post.title}
                                            sx={{ opacity: selectedPost?.id === post.id ? 1 : 0.5 }}
                                        />
                                        <CardContent sx={{ p: 2 }}>
                                            <Typography variant="h6" sx={{ color: '#ffd700', fontWeight: 700, mb: 1, fontFamily: 'Cinzel, serif', fontSize: '1rem' }}>
                                                {lang === 'EN' ? post.title_en : post.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 2, lineClamp: 2, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', fontFamily: 'Crimson Text', fontSize: '0.95rem' }}>
                                                {lang === 'EN' ? post.summary_en : post.summary}
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {post.tags.slice(0, 3).map(tag => (
                                                    <Chip key={tag} label={tag} size="small" sx={{ bgcolor: 'rgba(0, 255, 170, 0.05)', color: '#00ffaa', border: '1px solid rgba(0, 255, 170, 0.2)', fontSize: '0.65rem', height: '18px' }} />
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))
                        )}
                    </Box>

                    {/* RIGHT PANEL: Post Content (Hidden on mobile if content is not shown) */}
                    <Box sx={{
                        display: { xs: showContentOnMobile ? 'block' : 'none', md: 'block' },
                        flex: 1,
                        bgcolor: 'rgba(10, 10, 15, 0.7)',
                        borderRadius: 2,
                        border: '1px solid rgba(255, 215, 0, 0.1)',
                        p: { xs: 2.5, md: 6 },
                        overflowY: { xs: 'visible', md: 'auto' },
                        position: 'relative',
                        backdropFilter: 'blur(20px)',
                        '&::-webkit-scrollbar': { width: '2px' },
                        '&::-webkit-scrollbar-thumb': { background: 'rgba(0, 255, 170, 0.2)', borderRadius: '10px' }
                    }}>
                        <AnimatePresence mode="wait">
                            {selectedPost ? (
                                <motion.div
                                    key={selectedPost.id + lang}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Box>
                                            <Typography variant="h4" sx={{
                                                fontFamily: 'Cinzel, serif',
                                                color: '#ffd700',
                                                mb: 1,
                                                textShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
                                                fontSize: { xs: '1.5rem', md: '2.2rem' }
                                            }}>
                                                {lang === 'EN' ? selectedPost.title_en : selectedPost.title}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'rgba(255,255,255,0.4)' }}>
                                                <Typography variant="body2" sx={{ fontFamily: 'Crimson Text', fontSize: '0.9rem' }}>
                                                    {new Date(selectedPost.created_at).toLocaleDateString()}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#00ffaa', fontWeight: 600, fontFamily: 'Cinzel', fontSize: '0.8rem', letterSpacing: 1 }}>
                                                    • {selectedPost.author.toUpperCase()}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <IconButton size="small" sx={{ color: '#ffd700', border: '1px solid rgba(255, 215, 0, 0.2)' }}>
                                            <Sparkles size={18} />
                                        </IconButton>
                                    </Box>

                                    <Box sx={{
                                        width: '100%',
                                        height: { xs: '200px', md: '350px' },
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        mb: 4,
                                        border: '1px solid rgba(255, 215, 0, 0.2)',
                                        boxShadow: '0 0 30px rgba(0,0,0,0.5)'
                                    }}>
                                        <img src={selectedPost.main_image} alt={selectedPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                                    </Box>

                                    <Box sx={{
                                        fontFamily: 'Crimson Text, serif',
                                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                                        lineHeight: 1.7,
                                        color: 'rgba(255,255,255,0.85)',
                                        textAlign: 'justify',
                                        '& p': { mb: 3 }
                                    }}>
                                        <Typography variant="body1" sx={{ whiteSpace: 'pre-line', fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit' }}>
                                            {lang === 'EN' ? selectedPost.content_en : selectedPost.content}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(255, 215, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                                        <ScrollText size={18} color="#ffd700" opacity={0.5} />
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic', letterSpacing: 2, fontFamily: 'Cinzel', fontSize: '0.7rem', textAlign: 'center' }}>
                                            {t.footer}
                                        </Typography>
                                        <ScrollText size={18} color="#ffd700" opacity={0.5} />
                                    </Box>
                                </motion.div>
                            ) : (
                                <Box sx={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.2 }}>
                                    <Hexagon size={80} color="#ffd700" />
                                    <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Cinzel', letterSpacing: 3 }}>
                                        {t.select}
                                    </Typography>
                                </Box>
                            )}
                        </AnimatePresence>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Blog;
