import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import colors from '../../utils/colors';
import fontFamily from '../../utils/fonts';

const CustomDropdown = ({ label, value, onChange, sx,name, children,required,width }) => {
  return (
    <TextField
      label={label}
      fullWidth
      margin="dense"
      select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
   
      SelectProps={{
        IconComponent: KeyboardArrowDownIcon,
        MenuProps: {
          PaperProps: {
            sx: {
              maxHeight: '200px', // Customize this if needed
            },
          },
        },
      }}
      sx={{
        "&:hover .MuiOutlinedInput-root": {
          "& > fieldset": { border: `1px solid ${colors.blue}` },
        },
        "& .MuiOutlinedInput-root": {
          "& > fieldset": { border: `1px solid ${colors.blue}` },
        },
        width:{width},
        ...sx, // Spread any additional sx passed as a prop
      }}
      InputProps={{ sx: { height: '50px' }, fontFamily }}
    >
      {children}
    </TextField>
  );
};

export default CustomDropdown;
