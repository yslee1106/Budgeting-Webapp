import { useState, useEffect } from "react";
import { useAuth } from "context/authentication";
import { usePatchProfile } from "services/user/userMutation";

import { TextField } from "@mui/material";

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Form from "layouts/Form";
import NumberField from "layouts/Form/components/numberField";

function EditProfile({ isOpen, setIsOpen }) {

    //
    // State Variables
    //

    const { user } = useAuth();

    const [editedData, setEditedData] = useState({
        first_name: false,
        last_name: false,
        country: false,
        phone_number: false,
        date_of_birth: false,
    });

    const [editProfileData, setEditProfileData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        country: user.country,
        phone_number: user.phone_number,
        date_of_birth: user.date_of_birth,
    });

    //
    // Helpers Functions
    //

    useEffect(() => {
        setEditedData({
            first_name: editProfileData.first_name !== user.first_name,
            last_name: editProfileData.last_name !== user.last_name,
            country: editProfileData.country !== user.country,
            phone_number: editProfileData.phone_number !== user.phone_number,
            date_of_birth: editProfileData.date_of_birth !== user.date_of_birth,
        });
    }, [editProfileData, user]);

    const { mutateAsync: patchProfile, loadingPatchProfile } = usePatchProfile();

    //
    // Event Handlers
    //

    const handleEditProfileSubmit = async (event) => {
        event.preventDefault();

        const changedData = {};

        if (!editProfileData.first_name ||
            !editProfileData.last_name ||
            !editProfileData.country ||
            !editProfileData.phone_number ||
            !editProfileData.date_of_birth) {
            alert('Please fill in the required fields');
            return;
        }

        Object.keys(editedData).forEach(key => {
            if (editedData[key]) { // If this field was edited
                changedData[key] = editProfileData[key];
            }
        });

        // Check if there are actually any changes
        if (Object.keys(changedData).length === 0) {
            alert('No changes were made');
            return;
        }

        try {
            await patchProfile(changedData);
            alert('Profile updated successfully');

            setIsOpen(false);
        } catch (error) {
            console.error('Submission error:', error); // Should show any errors
            alert(error.message);
        }
    }

    const handleCloseEditProfile = () => {
        setIsOpen(false);
    }

    //
    // UI Design
    //

    return (
        <Form
            title='Edit Profile'
            formState={isOpen}
            handleCloseForm={handleCloseEditProfile}
            handleSubmit={handleEditProfileSubmit}>

            <TextField
                label='First Name'
                fullWidth
                variant='outlined'
                value={editProfileData?.first_name}
                onChange={(e) => setEditProfileData({ ...editProfileData, first_name: e.target.value })}
            />

            <TextField
                label='Last Name'
                fullWidth
                variant='outlined'
                value={editProfileData?.last_name}
                onChange={(e) => setEditProfileData({ ...editProfileData, last_name: e.target.value })}
            />

            <TextField
                label='Country'
                fullWidth
                variant='outlined'
                value={editProfileData?.country}
                onChange={(e) => setEditProfileData({ ...editProfileData, country: e.target.value })}
            />

            <NumberField
                label='Phone Number'
                dataState={editProfileData?.phone_number}
                onChange={value => setEditProfileData({ ...editProfileData, phone_number: value })}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Date of Birth"
                    value={editProfileData.date_of_birth ? dayjs(editProfileData.date_of_birth) : null}
                    onChange={value => setEditProfileData({ ...editProfileData, date_of_birth: value })}/>
            </LocalizationProvider>

        </Form>
    )

}

export default EditProfile;