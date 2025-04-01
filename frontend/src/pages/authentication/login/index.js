import React, { useState } from "react";
import { useAuth } from 'context/authentication';
import { useNavigate, useLocation } from 'react-router-dom';

import MDBox from 'components/MDBox'
import MDButton from "components/MDButton";

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
            setError('Invalid username or password');
        }
    };

    const toSignUp = () => {
        navigate('/signup', { replace: true });
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
                <Background/>

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

                    {/* Sign Up MDButton */}
                    <MDBox
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <MDButton
                            variant="outlined"
                            color="primary"
                            onClick={toSignUp}
                        >
                            SIGN UP
                        </MDButton>
                    </MDBox>

                </MDBox>

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
                <MDBox
                    display='flex'
                    justifyContent='center'
                >
                    <Footer/>
                </MDBox>

            </MDBox>
        </PageLayout>
    );

};

export default LogIn;
