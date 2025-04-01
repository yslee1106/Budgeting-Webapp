import MDBox from 'components/MDBox'
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const EmailField = ({ setEmail }) => {
    return (
        <MDInput
            id="Email"
            label="Email Address"
            variant="outlined"
            type="email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
        />
    )
}

const PasswordField = ({
    label,
    setPassword,
    showPassword,
    handleClickShowPassword
}) => {
    return (
        <MDInput
            id={label}
            label={label}
            variant="outlined"
            type={showPassword ? "text" : "password"}
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
    )
}

const Fields = ({
    setEmail,
    setPassword,
    setConfirmPassword,
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword
}) => {
    return (
        <>
            <EmailField setEmail={setEmail} />
            <PasswordField
                label='Password'
                setPassword={setPassword}
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword} />

            {setConfirmPassword && (
                <PasswordField
                    label='Confirm Password'
                    setPassword={setConfirmPassword}
                    showPassword={showConfirmPassword}
                    handleClickShowPassword={handleClickShowConfirmPassword} />
            )}
        </>
    )
}

function CenterCard({
    setEmail,
    setPassword,
    setConfirmPassword,
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    handleSubmit,
    rememberMe,
    handleRememberMeChange
}) {
    return (
        <MDBox
            sx={{
                flex: 1, // Takes up remaining space
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Card sx={{ bgcolor: '#ffffff', px: 6, py: 4 }}>
                
                {/* Title */}
                <MDTypography
                    variant="h3"
                    color='text_light'
                    sx={{
                        fontFamily: "Roboto",
                        fontWeight: 500,
                        textAlign: "center",
                        marginBottom: 4,
                    }}
                >
                    {setConfirmPassword ? 'SIGN UP' : 'LOGIN'}
                </MDTypography>

                {/* Form */}
                <MDBox sx={{ width: "20rem" }}>
                    <Stack spacing={2}>
                        <Fields
                            setEmail={setEmail}
                            setPassword={setPassword}
                            setConfirmPassword={setConfirmPassword}
                            showPassword={showPassword}
                            showConfirmPassword={showConfirmPassword}
                            handleClickShowPassword={handleClickShowPassword}
                            handleClickShowConfirmPassword={handleClickShowConfirmPassword}
                        />

                        <MDBox
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            {/* Remember Me */}
                            <MDBox display="flex" alignItems="center" m={-1}>
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                    size="small"
                                />
                                <MDTypography
                                    variant='caption'
                                    fontWeight='light'
                                >
                                    Remember Me
                                </MDTypography>
                            </MDBox>

                            {/* Forget Password */}
                            {/* Wrap with Link */}
                            <MDTypography
                                variant="caption"
                                sx={{
                                    color: "#616161",
                                    fontSize: 10,
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }}
                            >
                                Forgot Password?
                            </MDTypography>
                        </MDBox>

                        {/* Proceed Button */}
                        <MDButton
                            variant="contained"
                            type='submit'
                            color='primary'
                            onClick={handleSubmit}
                            fullWidth
                            sx={{
                                p: 2
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
                        variant="caption"
                        sx={{
                            color: "black",
                            fontWeight: 400,
                        }}
                    >
                        OR USE
                    </MDTypography>
                    <Divider sx={{ flexGrow: 1, mx: 2 }} />
                </MDBox>

                {/* Social Login Options */}
                {/* TODO */}
            </Card>

        </MDBox>

    )
}

export default CenterCard;