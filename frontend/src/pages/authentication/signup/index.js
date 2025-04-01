import React, { useState } from "react";
import { useAuth } from 'context/authentication';
import { useNavigate } from 'react-router-dom';

import MDBox from 'components/MDBox'
import MDButton from "components/MDButton";

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
        <PageLayout>
            <MDBox
                sx={{
                    height: '100vh', // Full viewport height
                    width: '100vw', // Full viewport width
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#2b2b2b',
                    position: 'relative'
                }}
            >
                {/* Background */}
                <Background />

                <MDBox
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        pt: 2,
                        pl: 5,
                        pr: 5
                    }}
                >
                    {/* Logo */}
                    <MDBox
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: '1rem',
                            zIndex: 1
                        }}
                    >
                        <Logo />
                    </MDBox>

                    {/* Login */}
                    <MDBox
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <MDButton
                            variant="outlined"
                            color="primary"
                            onClick={toLogin}
                        >
                            LOGIN
                        </MDButton>
                    </MDBox>

                </MDBox>

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
                <MDBox
                    display='flex'
                    justifyContent='center'
                >
                    <Footer />
                </MDBox>

            </MDBox>
        </PageLayout>
    );
};

export default SignUp;
