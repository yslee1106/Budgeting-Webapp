import React, { useState } from "react";
import { useAuth } from 'context/authentication';
import { useNavigate, useLocation } from 'react-router-dom';

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

// Import images
// Note: In a real implementation, you would need to ensure these images are available
// const rectangle = "/rectangle.svg";

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
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <MDBox
                    sx={{
                        position: "relative",
                        height: "1024px",
                        width: "100%",
                        maxWidth: "1440px",
                    }}
                >
                    <MDBox sx={{ position: "relative", height: "793px", width: "100%" }}>
                        {/* Background image */}
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
                            }}
                        /> */}

                        {/* Sign Up MDButton */}
                        <MDButton
                            variant="outlined"
                            sx={{
                                position: "absolute",
                                top: "40px",
                                right: "60px",
                                borderRadius: "10px",
                                borderColor: "#212121",
                                color: "#212121",
                                fontWeight: 900,
                                padding: "13px 39px",
                                fontSize: "12.8px",
                                letterSpacing: "0.7px",
                                lineHeight: "22.5px",
                            }}
                        >
                            SIGN UP
                        </MDButton>

                        {/* Login Card */}
                        <Card
                            sx={{
                                position: "absolute",
                                width: "574px",
                                height: "650px",
                                top: "143px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                borderRadius: "10px",
                                border: "1px solid #e0e0e0",
                                boxShadow: "0px 82px 40px -14px rgba(100, 100, 100, 0.08)",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "40px 0",
                            }}
                        >
                            {/* Login Title */}
                            <MDTypography
                                variant="h3"
                                sx={{
                                    fontFamily: "Roboto",
                                    fontWeight: 700,
                                    fontSize: "42px",
                                    textAlign: "center",
                                    marginBottom: 4,
                                }}
                            >
                                LOGIN
                            </MDTypography>

                            {/* Login Form */}
                            <MDBox sx={{ width: "380px" }}>
                                <Stack spacing={2.5}>
                                    <MDInput
                                        id="email"
                                        label="EMAIL ADDRESS"
                                        variant="outlined"
                                        type="email"
                                        defaultValue="test1@gmail.com"
                                        fullWidth
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <MDInput
                                        id="password"
                                        label="PASSWORD"
                                        variant="outlined"
                                        type={showPassword ? "text" : "password"}
                                        defaultValue="test1Password"
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            ),
                                        }}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <MDBox
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
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
                                        <MDTypography
                                            variant="body2"
                                            sx={{
                                                color: "#616161",
                                                fontSize: "11px",
                                                textDecoration: "underline",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Forgot Password?
                                        </MDTypography>
                                    </MDBox>

                                    <MDButton
                                        variant="contained"
                                        type='submit'
                                        onClick={handleSubmit}
                                        fullWidth
                                        sx={{
                                            bgcolor: "#212121",
                                            color: "white",
                                            borderRadius: "10px",
                                            height: "71px",
                                            fontSize: "16px",
                                            fontWeight: 500,
                                            marginTop: 1,
                                            "&:hover": {
                                                bgcolor: "#333333",
                                            },
                                        }}
                                    >
                                        PROCEED
                                    </MDButton>
                                </Stack>
                            </MDBox>

                            {/* OR USE divider */}
                            <MDBox
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    my: 4,
                                }}
                            >
                                <Divider sx={{ flexGrow: 1, mx: 2 }} />
                                <MDTypography
                                    variant="body2"
                                    sx={{
                                        fontSize: "12.8px",
                                        color: "black",
                                        fontWeight: 400,
                                    }}
                                >
                                    OR USE
                                </MDTypography>
                                <Divider sx={{ flexGrow: 1, mx: 2 }} />
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
                                            }}
                                        />
                                    </MDBox>
                                ))}
                            </Stack>
                        </Card>

                        {/* Logo and App Name */}
                        <MDBox
                            sx={{
                                position: "absolute",
                                top: "48px",
                                left: "74px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <LogoDevSharp sx={{ width: "42px", height: "42px" }} />
                            <MDTypography
                                variant="h6"
                                sx={{
                                    ml: 1.5,
                                    fontFamily: "Zen Kaku Gothic Antique",
                                    fontWeight: 400,
                                    fontSize: "20px",
                                    lineHeight: "35.2px",
                                }}
                            >
                                FINANCIAL TRACKER
                            </MDTypography>
                        </MDBox>
                    </MDBox>

                    {/* Footer */}
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
                            textAlign: "center",
                        }}
                    >
                        © 2021. - 2025 All Rights Reserved. Qpay
                    </MDTypography>
                </MDBox>
            </MDBox>
        </PageLayout>
    );

};

export default LogIn;
