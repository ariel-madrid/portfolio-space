import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, TextField, Button } from '@mui/material';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard, { Project } from './components/ProjectCard';
import Background from './components/Background';
import { motion } from 'framer-motion';

const INITIAL_PROJECTS: Project[] = [
    {
        id: 'AI-SYS-01',
        title: 'Multi-Agent RAG Platform',
        description: 'Orchestrated intelligent agents using LangGraph and RAG with Pinecone for complex conversational flows.',
        details: `• Developed high-availability backend APIs using FastAPI, focused on rapid and stable production deployments.
• Designed and modeled relational databases, optimizing schemas and queries for high-traffic applications.
• Built intelligent agents using LangGraph, including state management, tool execution, and complex conversational flows.
• Implemented RAG (Retrieval-Augmented Generation) systems using Pinecone as a vector database.
• Integrated and orchestrated multiple LLMs, including OpenAI, Anthropic, and Gemini, selecting models based on cost, latency, and output quality.
• Containerized and deployed services using Docker.`,
        tags: ['LangGraph', 'LLMs', 'Pinecone', 'FastAPI'],
        images: []
    },
    {
        id: 'CLD-OPS-02',
        title: 'OSR',
        description: 'Centralized control system for thousands of POS devices with real-time diagnostics via Golang and Redis.',
        details: `• Designed and developed a Retail Operations System (OSR) to centralize control of thousands of devices (POS terminals, scales) across large retail chains.
• Developed the main management application (ReactJS/NextJS) and optimized performance using Redis to achieve high availability and sub-second response times.
• Designed a diagnostic pipeline using Golang to execute remote routines running scripts on POS systems for automated log extraction and real-time health diagnostics.
• Established robust infrastructure monitoring by configuring Zabbix agents across all devices and integrating webhooks with the Next.js backend.
• Modeled and built PostgreSQL databases and later created BigQuery tables to feed Power BI dashboards.
• Deployed a resilient 24/7 API using Cloud Run Services and configured Cloud Run Jobs for scheduled tasks.`,
        tags: ['Golang', 'Next.js', 'Redis', 'GCP', 'BigQuery'],
        images: [
            '/assets/projects/osr-1.png',
            '/assets/projects/osr-2.png'
        ]
    },
    {
        id: 'ASTRO-AI-03',
        title: 'Protoplanetary Disk Analysis',
        description: 'Swin Transformer-based model to infer physical parameters from interferometric images of space.',
        details: `• Developed a Swin Transformer-based model to infer physical parameters of protoplanetary disks from interferometric images.
• Built a robust preprocessing pipeline for FITS image data using NumPy and PyTorch.
• Implemented multi-GPU training using SLURM and DDP on an HPC cluster.
• Research conducted at University of Santiago of Chile (USACH).`,
        tags: ['PyTorch', 'Transformers', 'HPC', 'Computer Vision'],
        images: [
            '/assets/projects/astro-analysis-1.png',
            '/assets/projects/astro-analysis-2.png',
            '/assets/projects/astro-analysis-3.png',
            '/assets/projects/astro-analysis-4.png'
        ]
    },
    {
        id: 'ML-OPS-04',
        title: 'SMU Recommender System',
        description: 'Distributed training pipelines for e-commerce recommendation systems using PyTorch DDP.',
        details: `• Contributed to the development of a neural-network-based recommendation system using PyTorch.
• Designed distributed training pipelines with SLURM and PyTorch DDP, reducing model training time by 40%.
• Optimization of e-commerce algorithms for large-scale datasets.`,
        tags: ['PyTorch', 'DDP', 'RecSys', 'Data Science'],
        images: [
            '/assets/projects/smu-recommender.png'
        ]
    }
];

function App() {
    const [projects, setProjects] = useState<Project[]>(() => {
        const saved = localStorage.getItem('portfolio_projects_v8');
        return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    });

    useEffect(() => {
        localStorage.setItem('portfolio_projects_v8', JSON.stringify(projects));
    }, [projects]);

    const handleUpdateProject = (updatedProject: Project) => {
        setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    };

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            <Background />
            <Navbar />

            <Box
                sx={{
                    bgcolor: 'rgba(0, 212, 255, 0.03)',
                    borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
                    py: 1.5,
                    mt: '80px', // Below navbar
                    textAlign: 'center',
                    backdropFilter: 'blur(5px)',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <Typography
                    variant="caption"
                    sx={{
                        color: 'primary.main',
                        fontSize: '0.75rem',
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        opacity: 0.9
                    }}
                >
                    <span style={{
                        display: 'inline-block',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#00D4FF',
                        boxShadow: '0 0 10px #00D4FF',
                        animation: 'pulse 2s infinite'
                    }} />
                    Development in Progress: Incorporating [Anomaly Detection Engine, Mission Control Core, Ground Station Simulator]
                </Typography>
            </Box>

            <Hero />

            <Container maxWidth="lg" sx={{ py: 15 }} id="projects">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <Typography variant="h2" sx={{ mb: 2 }}>
                        Strategic <span style={{ color: '#00D4FF' }}>Payloads</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 8, maxWidth: '600px' }}>
                        A selection of mission-critical engineering projects.
                    </Typography>
                </motion.div>

                <Grid container spacing={4}>
                    {projects.map((project, index) => (
                        <Grid item xs={12} sm={6} key={project.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <ProjectCard
                                    project={project}
                                    onUpdate={handleUpdateProject}
                                />
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Box sx={{ py: 15, background: 'rgba(255, 77, 0, 0.02)' }} id="contact">
                <Container maxWidth="md">
                    <Typography variant="h2" textAlign="center" sx={{ mb: 2 }}>
                        Establish <span style={{ color: '#FF4D00' }}>Communication</span>
                    </Typography>
                    <Typography variant="body1" textAlign="center" sx={{ color: 'text.secondary', mb: 8 }}>
                        Interested in collaboration or professional inquiries? Signal the mission control.
                    </Typography>

                    <ContactForm />
                </Container>
            </Box>

            <Box sx={{ py: 6, textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    © 2026 Professional Portfolio - Ariel Aaron Argomedo Madrid.
                </Typography>
            </Box>
        </Box>
    );
}

// Contact Form Component with AJAX submission
const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('https://formspree.io/f/mlggkzon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className="glass-card" sx={{ p: 4 }}>
            {status === 'success' && (
                <Box sx={{
                    mb: 3,
                    p: 2,
                    bgcolor: 'rgba(0, 255, 163, 0.1)',
                    border: '1px solid rgba(0, 255, 163, 0.3)',
                    borderRadius: 2,
                    textAlign: 'center'
                }}>
                    <Typography sx={{ color: '#00FFA3', fontWeight: 600 }}>
                        ✓ Transmission Successful! Message received at Mission Control.
                    </Typography>
                </Box>
            )}

            {status === 'error' && (
                <Box sx={{
                    mb: 3,
                    p: 2,
                    bgcolor: 'rgba(255, 77, 0, 0.1)',
                    border: '1px solid rgba(255, 77, 0, 0.3)',
                    borderRadius: 2,
                    textAlign: 'center'
                }}>
                    <Typography sx={{ color: '#FF4D00', fontWeight: 600 }}>
                        ⚠ Transmission Failed. Please try again or contact directly.
                    </Typography>
                </Box>
            )}

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Official Name"
                        variant="outlined"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={status === 'submitting'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Return Signal (Email)"
                        variant="outlined"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={status === 'submitting'}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Encrypted Message"
                        variant="outlined"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={status === 'submitting'}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={status === 'submitting'}
                        sx={{
                            mt: 2,
                            background: status === 'submitting' ? '#666' : '#FF4D00',
                            '&:hover': { background: status === 'submitting' ? '#666' : '#CC3D00' }
                        }}
                    >
                        {status === 'submitting' ? 'Transmitting...' : 'Send Transmission'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default App;
