import React, { useState } from "react";
import { useAuth } from 'context/authentication';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box'
import Button from "@mui/material/Button";

import PageLayout from "layouts/Containers/PageLayout";
import Logo from "layouts/Logo";
import Footer from "layouts/Footer";

import CenterCard from "pages/authentication/components/CenterCard";
import Background from "pages/authentication/components/Background";

// These would be actual image imports in a real application
// const rectangle = "rectangle.svg";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password === confirmPassword) {
                await signup(email, password);
                navigate('/', { replace: true });
            }
            else {
                console.error('Error', 'Passwords do not match')
                setError('Passwords do not match')
            }
        } catch (err) {
            console.error('Error', err);
            setError('Invalid username or password');
        }
    };

    const toLogin = () => {
        navigate('/login', { replace: true });
    };

    return (
        <PageLayout background='primary'>
            <Background />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt: '2rem',
                    px: '3rem',
                }}
            >

                <Logo color='#000000' size='md'/>
                {/* Login */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={toLogin}
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
                        LOGIN
                    </Button>
                </Box>

            </Box>

            {/* SignUp Card */}
            <CenterCard
                setEmail={setEmail}
                setPassword={setPassword}
                showPassword={showPassword}
                setConfirmPassword={setConfirmPassword}
                showConfirmPassword={showConfirmPassword}
                handleClickShowPassword={handleClickShowPassword}
                handleClickShowConfirmPassword={handleClickShowConfirmPassword}
                handleSubmit={handleSubmit}
                rememberMe={rememberMe}
                handleRememberMeChange={handleRememberMeChange}
            />

            {/* Footer */}
            <Box
                display='flex'
                justifyContent='center'
            >
                <Footer />
            </Box>

        </PageLayout >
    );
};

export default SignUp;
