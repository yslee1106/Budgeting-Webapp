import React, { useState } from "react";
import { useAuth } from 'context/authentication';
import { useNavigate, useLocation } from 'react-router-dom';

import { Typography, Box, Button } from "@mui/material";

import PageLayout from "layouts/Containers/PageLayout";
import Logo from "layouts/Logo";
import Footer from "layouts/Footer";

import CenterCard from "pages/authentication/components/CenterCard";
import Background from "pages/authentication/components/Background";

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            // Redirect to the originally requested page or home
            navigate(location.state?.from?.pathname || '/budget', { replace: true });
        } catch (err) {
            console.error('Error', err);
            alert('Invalid username or password');
        }
    };

    const toSignUp = () => {
        navigate('/signup', { replace: true });
    };

    return (
        <PageLayout background='primary'>
            {/* Background */}
            <Background />

            {/* Top Row */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt: '2rem',
                    px: '3rem',
                }}
            >
                {/* Logo */}
                <Logo color='#000000' size='md'/>
                {/* Sign Up MDButton */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={toSignUp}
                        sx={{
                            borderColor: '#000000',
                            borderWidth: '2px',
                            borderRadius: '10px',
                            color: '#000000',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            px: '30px',
                            py: '12px'
                        }}
                    >
                        SIGN UP
                    </Button>
                </Box>

            </Box>

            {/* Login Card */}
            <CenterCard
                setEmail={setEmail}
                setPassword={setPassword}
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
                handleSubmit={handleSubmit}
                rememberMe={rememberMe}
                handleRememberMeChange={handleRememberMeChange}
            />

            {/* Footer */}
            <Footer />
        </PageLayout>
    );

};

export default LogIn;
