import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectField = ({ label, dataState, onChange, options = [], disabled }) => {
    return (
        <FormControl fullWidth disabled={disabled}>
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                value={dataState}
                onChange={(e) => onChange(e.target.value)}
            >
                <MenuItem value="">-----</MenuItem>
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectField;