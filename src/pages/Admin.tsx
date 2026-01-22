import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    Card,
    CardContent,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import { supabase, BlogPost } from '../lib/supabase';
import { Lock, Plus, Edit, Trash2, LogOut, Save, Image as ImageIcon, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'admin';
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || 'pass';

const Admin: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    // Editor State
    const [openDialog, setOpenDialog] = useState(false);
    const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        const auth = localStorage.getItem('admin_auth');
        if (auth === 'true') {
            setIsLoggedIn(true);
            fetchPosts();
        }
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching posts:', error);
        else setPosts(data || []);
        setLoading(false);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (loginData.username === ADMIN_USER && loginData.password === ADMIN_PASS) {
            setIsLoggedIn(true);
            localStorage.setItem('admin_auth', 'true');
            fetchPosts();
        } else {
            alert('Invalid credentials, seeker of truth.');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('admin_auth');
    };

    const handleSavePost = async () => {
        if (!editingPost?.title || !editingPost?.content) {
            alert('At least Spanish content is required.');
            return;
        }

        const postToSave = {
            ...editingPost,
            author: ADMIN_USER,
            tags: editingPost.tags || []
        };

        let error;
        if (editingPost.id) {
            const { error: err } = await supabase
                .from('blogs')
                .update(postToSave)
                .eq('id', editingPost.id);
            error = err;
        } else {
            const { error: err } = await supabase
                .from('blogs')
                .insert([postToSave]);
            error = err;
        }

        if (error) {
            alert('System failure during transmission: ' + error.message);
        } else {
            setOpenDialog(false);
            fetchPosts();
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to erase this knowledge?')) {
            const { error } = await supabase.from('blogs').delete().eq('id', id);
            if (error) alert('Error: ' + error.message);
            else fetchPosts();
        }
    };

    const openEditor = (post: BlogPost | null = null) => {
        setEditingPost(post || {
            title: '',
            title_en: '',
            summary: '',
            summary_en: '',
            content: '',
            content_en: '',
            main_image: '',
            tags: []
        });
        setOpenDialog(true);
    };

    const addTag = () => {
        if (newTag && editingPost && !editingPost.tags?.includes(newTag)) {
            setEditingPost({ ...editingPost, tags: [...(editingPost.tags || []), newTag] });
            setNewTag('');
        }
    };

    if (!isLoggedIn) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Paper className="glass-card" sx={{ p: 6, width: 400, textAlign: 'center' }}>
                        <Lock size={48} color="#ffd700" style={{ marginBottom: '24px' }} />
                        <Typography variant="h5" sx={{ mb: 4, color: '#ffd700', fontFamily: 'Cinzel' }}>
                            Sanctum Access
                        </Typography>
                        <form onSubmit={handleLogin}>
                            <TextField
                                fullWidth
                                label="Identity"
                                variant="outlined"
                                sx={{ mb: 3 }}
                                value={loginData.username}
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                label="Cipher"
                                type="password"
                                variant="outlined"
                                sx={{ mb: 4 }}
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            />
                            <Button fullWidth variant="contained" type="submit" sx={{ bgcolor: '#ffd700', color: '#000', '&:hover': { bgcolor: '#ccae00' } }}>
                                Authenticate
                            </Button>
                        </form>
                    </Paper>
                </motion.div>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', pt: '120px', pb: 10, bgcolor: '#050505' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                    <Typography variant="h3" sx={{ color: '#ffd700', fontFamily: 'Cinzel' }}>
                        Archives Control
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="outlined" startIcon={<Plus />} onClick={() => openEditor()} sx={{ borderColor: '#ffd700', color: '#ffd700' }}>
                            New Record
                        </Button>
                        <Button variant="text" startIcon={<LogOut />} onClick={handleLogout} sx={{ color: 'rgba(255,255,255,0.5)' }}>
                            Depart
                        </Button>
                    </Box>
                </Box>

                <Grid container spacing={4}>
                    {posts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <Card sx={{ bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,215,0,0.1)' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: '#ffd700', mb: 1 }}>{post.title}</Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 2 }}>{post.summary}</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                        <IconButton size="small" sx={{ color: '#00ffaa' }} onClick={() => openEditor(post)}>
                                            <Edit size={18} />
                                        </IconButton>
                                        <IconButton size="small" sx={{ color: '#ff4d00' }} onClick={() => handleDelete(post.id)}>
                                            <Trash2 size={18} />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Editor Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="lg" fullWidth>
                <DialogTitle sx={{ bgcolor: '#0a0a0b', color: '#ffd700', fontFamily: 'Cinzel', display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Languages size={24} /> {editingPost?.id ? 'Bilingual Decryption' : 'New Trans-Lingual Mystery'}
                </DialogTitle>
                <DialogContent sx={{ bgcolor: '#0a0a0b', pt: 2 }}>
                    <Grid container spacing={4} sx={{ mt: 1 }}>
                        {/* Common metadata */}
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                label="Main Image URL"
                                value={editingPost?.main_image || ''}
                                onChange={(e) => setEditingPost({ ...editingPost, main_image: e.target.value })}
                                InputProps={{ startAdornment: <ImageIcon size={20} style={{ marginRight: 8, opacity: 0.5 }} /> }}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                                {editingPost?.tags?.map((tag) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={() => setEditingPost({ ...editingPost, tags: editingPost.tags?.filter(t => t !== tag) })}
                                        sx={{ bgcolor: 'rgba(0, 255, 170, 0.1)', color: '#00ffaa' }}
                                    />
                                ))}
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    size="small"
                                    label="Add Tag"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                                />
                                <Button onClick={addTag} variant="outlined">Add</Button>
                            </Box>
                        </Grid>

                        <Grid item xs={12}><Divider sx={{ borderStyle: 'dashed', opacity: 0.2 }} /></Grid>

                        {/* SPANISH SECTION */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="overline" sx={{ color: '#ffd700', display: 'block', mb: 2 }}>Español (Principal)</Typography>
                            <TextField
                                fullWidth
                                label="Título (ES)"
                                value={editingPost?.title || ''}
                                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                label="Resumen (ES)"
                                multiline
                                rows={2}
                                value={editingPost?.summary || ''}
                                onChange={(e) => setEditingPost({ ...editingPost, summary: e.target.value })}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                label="Contenido (ES)"
                                multiline
                                rows={12}
                                value={editingPost?.content || ''}
                                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                            />
                        </Grid>

                        {/* ENGLISH SECTION */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="overline" sx={{ color: '#00D4FF', display: 'block', mb: 2 }}>English Version</Typography>
                            <TextField
                                fullWidth
                                label="Title (EN)"
                                value={editingPost?.title_en || ''}
                                onChange={(e) => setEditingPost({ ...editingPost, title_en: e.target.value })}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                label="Summary (EN)"
                                multiline
                                rows={2}
                                value={editingPost?.summary_en || ''}
                                onChange={(e) => setEditingPost({ ...editingPost, summary_en: e.target.value })}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                label="Content (EN)"
                                multiline
                                rows={12}
                                value={editingPost?.content_en || ''}
                                onChange={(e) => setEditingPost({ ...editingPost, content_en: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ bgcolor: '#0a0a0b', p: 3 }}>
                    <Button onClick={() => setOpenDialog(false)} sx={{ color: 'rgba(255,255,255,0.5)' }}>Cancel</Button>
                    <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={handleSavePost}
                        sx={{ bgcolor: '#ffd700', color: '#000', '&:hover': { bgcolor: '#ccae00' } }}
                    >
                        Archive Record
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Admin;
