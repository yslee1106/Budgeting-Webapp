import {
    FormControl,
    InputLabel,
    InputAdornment,
    OutlinedInput,
    Icon,
} from '@mui/material';

const NumberField = ({ label, startAdornment, dataState, onChange }) => {

    return (
        <FormControl
            fullWidth>
            <InputLabel>{label}</InputLabel>
            <OutlinedInput
                label={label}
                value={dataState}

                startAdornment={
                    startAdornment ?
                        < InputAdornment position="start">
                            <Icon>{startAdornment}</Icon>
                        </InputAdornment>
                        :
                        null
                }

                inputProps={{
                    inputMode: 'decimal',
                    min: 0
                }}

                onKeyDown={(e) => {
                    // Block all non-numeric keys except Backspace, Tab, etc.
                    if (!/[0-9.]/.test(e.key) &&
                        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                        e.preventDefault();
                    }
                }}

                onChange={(event) => {
                    const value = event.target.value;
                    // Validate only one decimal point and numbers
                    if (/^\d*\.?\d*$/.test(value)) {
                        onChange(value)
                    }
                }}
            />
        </FormControl>
    )
}

export default NumberField;