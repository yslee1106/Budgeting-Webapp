import {
    FormControlLabel,
    Switch,
} from '@mui/material';

const SwitchField = ({ label, dataState, onChange }) => {

    return (
        <FormControlLabel
            label={label}
            control={
                <Switch
                    value={dataState}
                    onChange={onChange}
                    sx={{ ml: '10px' }}
                />}
            sx={{
                pl: '5px',
                flexDirection: 'row-reverse',
                justifyContent: 'flex-end'
            }}
        />
    )
}

export default SwitchField;