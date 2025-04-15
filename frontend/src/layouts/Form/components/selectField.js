// src/components/CategorySelect.js
import React from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { useCategories } from 'context/helpers/budgetCategories';


const SelectField = ({ modelType, label, dataState, onChange, disabled }) => {
    const { categories, loading, error } = useCategories();

    const getOptions = () => {
        if (!categories) return [];

        switch (modelType) {
            case 'income':
                return Object.entries(categories.income).map(([value, label]) => ({ value, label }));
            case 'expense':
                return Object.entries(categories.expenses).map(([value, label]) => ({ value, label }));
            case 'goal':
                return Object.keys(categories.goals).map((key) => ({
                    value: key,
                    label: categories.goals[key]
                  }));
            case 'frequency':
                return Object.entries(categories.frequency).map(([value, label]) => ({ value, label }));
            default:
                return [];
        }
    };

      if (error) return <div className="error">{error}</div>;
      if (loading) return <div>Loading {label}...</div>;

    return (
        <FormControl fullWidth disabled={disabled}>
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                value={dataState}
                onChange={(e) => onChange(e.target.value)}
            >
                <MenuItem value="">-----</MenuItem>
                {getOptions().map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectField;