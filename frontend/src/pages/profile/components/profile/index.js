import { useState } from "react";
import { useTheme } from "@emotion/react";

import { useAuth } from "context/authentication";

import {
    Typography,
    Box,
    Button,
} from "@mui/material";

import {
    LocationPin as LocationIcon,
    AccountCircle as ProfilePictureIcon
} from "@mui/icons-material";

import EditProfile from "pages/profile/components/profile/editProfile";

function ProfileSection() {

    //
    // Variable States
    //

    const { user } = useAuth();

    const [openEditProfile, setOpenEditProfile] = useState(false);

    //
    // Helper Functions
    //

    const theme = useTheme();

    //
    // Event Handlers
    //

    const handleOpenEditProfile = () => {
        setOpenEditProfile(true);
    }

    return (
        <>
        
            <Box
                sx={{
                    position: 'relative', // Make this a positioning context
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>

                {/* Profile Picture */}
                <Box sx={{ px: '1rem' }}>
                    <ProfilePictureIcon sx={{ fontSize: '156px' }} />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flex: 1,
                    }}>
                    <Box sx={{ mb: '2rem' }}>

                        {/* Name */}
                        <Typography
                            sx={{
                                fontWeight: 'medium',
                                fontSize: '28px',
                            }}>
                            {user.first_name || user.last_name ? `${user?.first_name} ${user?.last_name}` : 'Anonymous User'}
                        </Typography>

                        {/* Location */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <LocationIcon sx={{ fontSize: '21px', color: theme.palette.grey[600], }} />
                            <Typography
                                sx={{
                                    fontWeight: 'light',
                                    fontSize: '16px',
                                    color: theme.palette.grey[600],
                                }}>
                                {user.country ? user.country : 'Somewhere over the rainbow'}
                            </Typography>
                        </Box>

                    </Box>
                    <Box >

                        {/* Email */}
                        <Typography
                            sx={{
                                fontWeight: 'light',
                                fontSize: '16px',
                                color: theme.palette.grey[600],
                            }}>
                            {user.email}
                        </Typography>

                        {/* Phone Number */}
                        <Typography
                            sx={{
                                fontWeight: 'light',
                                fontSize: '16px',
                                color: theme.palette.grey[600],
                            }}>
                            {user.phone_number ? user.phone_number : '-'}
                        </Typography>

                    </Box>
                </Box>

                {/* Edit button */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    py: '0.4rem',
                    px: '3rem',
                }}>
                    <Button
                        variant="contained"
                        onClick={handleOpenEditProfile}
                        sx={{
                            px: '2rem',
                            py: '0.7rem',
                            borderRadius: "10px",
                            backgroundColor: "#212121",
                            fontWeight: 600,
                            fontSize: "12px",
                        }}>
                        Edit
                    </Button>
                </Box>

            </Box>

            <EditProfile
                isOpen={openEditProfile}
                setIsOpen={setOpenEditProfile}
            />

        </>

    )
}

export default ProfileSection;