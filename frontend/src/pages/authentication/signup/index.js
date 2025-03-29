import React, { useState, useNavigate } from "react";
import { useAuth } from 'context/authentication';

import MDBox from 'components/MDBox'
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

import PageLayout from "layouts/Containers/PageLayout";

import {
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    Stack,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from '@mui/icons-material/Apple'
import LogoDevSharp from "@mui/icons-material/DeveloperMode";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleTogglePassword1 = () => {
        setShowPassword1(!showPassword1);
    };

    const handleTogglePassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(password === confirmPassword){
                await signup(email, password);
                navigate('/', { replace: true });
            }
            else{
                console.error('Error', 'Passwords do not match')
                setError('Passwords do not match')
            }
        } catch (err) {
            console.error('Error', err);
            setError('Invalid username or password');
        }
    };

    // Social login options data
    const socialLoginOptions = [
        { name: "Google", icon: GoogleIcon, alt: "Google" },
        { name: "Apple", icon: AppleIcon, alt: "Apple" },
        { name: "Facebook", icon: FacebookIcon, alt: "Facebook" },
    ];

    return (
        <PageLayout>
            <MDBox
                sx={{
                    position: "relative",
                    height: "1024px",
                    width: "100%",
                    maxWidth: "1440px",
                }}
            >
                <MDBox sx={{ position: "relative", height: "853px", width: "100%" }}>
                    {/* <MDBox
                        component="img"
                        src={rectangle}
                        alt="Rectangle"
                        sx={{
                            position: "absolute",
                            width: "100%",
                            height: "512px",
                            top: 0,
                            left: 0,
                        }} /> */}

                    <MDBox sx={{ position: "absolute", top: "42px", right: "60px" }}>
                        <MDButton
                            variant="outlined"
                            sx={{
                                border: "1.5px solid #212121",
                                borderRadius: "10px",
                                color: "#212121",
                                fontWeight: 900,
                                padding: "13px 40px",
                                fontSize: "12.8px",
                                letterSpacing: "0.7px",
                            }}
                        >
                            LOGIN
                        </MDButton>
                    </MDBox>

                    <Card
                        sx={{
                            position: "absolute",
                            width: "574px",
                            height: "710px",
                            top: "143px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            borderRadius: "10px",
                            border: "1px solid #e0e0e0",
                            boxShadow: "0px 82px 40px -14px rgba(100, 100, 100, 0.08)",
                        }}
                    >
                        <Stack
                            spacing={3}
                            sx={{
                                position: "absolute",
                                width: "382px",
                                top: "77px",
                                left: "50%",
                                transform: "translateX(-50%)",
                            }}
                        >
                            <MDTypography
                                variant="h3"
                                align="center"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: "42px",
                                    lineHeight: "37.5px",
                                }}
                            >
                                SIGN UP
                            </MDTypography>

                            <MDInput
                                id="email"
                                label="EMAIL ADDRESS"
                                type="email"
                                placeholder="test123@testmail.com"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ mt: 3 }} />

                            <MDInput
                                id="password"
                                label="PASSWORD"
                                type={showPassword1 ? "text" : "password"}
                                defaultValue="*************"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={handleTogglePassword1} edge="end">
                                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }} />

                            <MDInput
                                id="confirm-password"
                                label="PASSWORD"
                                type={showPassword2 ? "text" : "password"}
                                defaultValue="*************"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={handleTogglePassword2} edge="end">
                                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }} />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={rememberMe}
                                        onChange={handleRememberMeChange}
                                        size="small"
                                    />
                                }
                                label={
                                    <MDTypography
                                        sx={{
                                            fontSize: "14px",
                                            color: "text.primary",
                                        }}
                                    >
                                        Remember Me
                                    </MDTypography>
                                }
                            />

                            <MDButton
                                variant="contained"
                                fullWidth
                                sx={{
                                    bgcolor: "#212121",
                                    borderRadius: "10px",
                                    height: "71px",
                                    textTransform: "uppercase",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                }}
                            >
                                PROCEED
                            </MDButton>

                            <MDBox
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mt: 2,
                                }}
                            >
                                <Divider sx={{ flexGrow: 1 }} />
                                <MDTypography
                                    variant="body2"
                                    sx={{
                                        px: 1,
                                        fontSize: "12.8px",
                                        lineHeight: "22.5px",
                                    }}
                                >
                                    OR USE
                                </MDTypography>
                                <Divider sx={{ flexGrow: 1 }} />
                            </MDBox>

                            {/* Social Login Options */}
                            <Stack direction="row" spacing={2.5}>
                                {socialLoginOptions.map((option) => (
                                    <MDBox
                                        key={option.name}
                                        sx={{
                                            width: "42px",
                                            height: "42px",
                                            bgcolor: "#f5f5f5",
                                            border: "1px solid #eeeeee",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <MDBox
                                            component="img"
                                            src={option.icon}
                                            alt={option.alt}
                                            sx={{
                                                width: option.name === "Google" ? "28px" : "32px",
                                                height: option.name === "Google" ? "28px" : "32px",
                                            }} />
                                    </MDBox>
                                ))}
                            </Stack>
                        </Stack>
                    </Card>

                    <MDBox
                        sx={{
                            position: "absolute",
                            top: "12px",
                            left: "74px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <LogoDevSharp sx={{ width: 42, height: 42 }} />
                        <MDTypography
                            variant="h6"
                            sx={{
                                ml: 1.5,
                                fontSize: "20px",
                                lineHeight: "35.2px",
                            }}
                        >
                            FINANCIAL TRACKER
                        </MDTypography>
                    </MDBox>
                </MDBox>

                <MDTypography
                    variant="caption"
                    sx={{
                        position: "absolute",
                        bottom: "30px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        color: "#616161",
                        fontSize: "10.3px",
                        letterSpacing: "0.7px",
                    }}
                >
                    © 2021. - 2025 All Rights Reserved. Qpay
                </MDTypography>
            </MDBox>
        </PageLayout>
    );
};

export default SignUp;
