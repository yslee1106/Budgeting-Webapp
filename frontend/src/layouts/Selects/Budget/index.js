// src/components/CategorySelect.js
import React from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { useCategories } from 'context/helpers/budgetCategories';


const BudgetCategorySelect = ({ modelType, value, onChange }) => {
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
      if (loading) return <div>Loading categories...</div>;

    return (
        <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
                label="Category"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <MenuItem value="">Select a category</MenuItem>
                {getOptions().map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default BudgetCategorySelect;