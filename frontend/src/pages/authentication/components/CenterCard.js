import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';


import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const EmailField = ({ setEmail }) => {
    return (
        <TextField
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
        <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
                id={label}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
        </FormControl>
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
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <Card
                sx={{
                    bgcolor: '#ffffff',
                    px: 6,
                    py: 5,
                    zIndex: 1
                }}>

                {/* Title */}
                <Typography
                    variant="h3"
                    color='text_light'
                    sx={{
                        fontFamily: "Roboto",
                        textAlign: "center",
                        marginBottom: 4,
                    }}
                >
                    {setConfirmPassword ? 'SIGN UP' : 'LOGIN'}
                </Typography>

                {/* Form */}
                <Box sx={{ width: "20rem" }}>
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

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            {/* Remember Me */}
                            <Box display="flex" alignItems="center" m={-1}>
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                    size="small"
                                />
                                <Typography
                                    variant='caption'
                                    fontWeight='light'
                                >
                                    Remember Me
                                </Typography>
                            </Box>

                            {/* Forget Password */}
                            {/* Wrap with Link */}
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "#616161",
                                    fontSize: 10,
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }}
                            >
                                Forgot Password?
                            </Typography>
                        </Box>

                        {/* Proceed Button */}
                        <Button
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
                        </Button>
                    </Stack>
                </Box>

                {/* OR USE divider */}
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        my: 4,
                    }}
                >
                    <Divider sx={{ flexGrow: 1, mx: 2 }} />
                    <Typography
                        variant="caption"
                        sx={{
                            color: "black",
                            fontWeight: 400,
                        }}
                    >
                        OR USE
                    </Typography>
                    <Divider sx={{ flexGrow: 1, mx: 2 }} />
                </Box>

                {/* Social Login Options */}
                {/* TODO */}
            </Card>

        </Box>

    )
}

export default CenterCard;