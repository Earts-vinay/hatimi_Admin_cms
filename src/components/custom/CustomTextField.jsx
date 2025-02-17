import React from 'react';
import TextField from '@mui/material/TextField';
import colors from '../../utils/colors';
import fontFamily from '../../utils/fonts';

const CustomTextField = ({ label, value, onChange, hasBorder,type,width, ...rest }) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={(e) => {
        onChange(e);
        // setHasBorder(e.target.value !== ''); // Set hasBorder based on whether there is a value
      }}
      margin="dense"
      variant="outlined"
      fullWidth
      sx={{
        "&:hover .MuiOutlinedInput-root": {
            "& > fieldset": { border: hasBorder ? `1px solid ${colors.blue}` : `1px solid ${colors.blue}` }, // Apply green border if hasBorder is true, otherwise default border color
          },
        "& .MuiOutlinedInput-root": {
            "& > fieldset": { border: hasBorder ? `1px solid ${colors.blue}` : `1px solid ${colors.blue}` }, // Apply green border if hasBorder is true, otherwise default border color
          },
          width:{width}
      }}
      InputLabelProps={{
        style: { fontFamily },
      }}
      inputProps={{ autoComplete: 'off' }}
      InputProps={{
        style: {
         fontFamily,
          padding: '10px',
          height: '50px',
        },
      }}
      {...rest}
    />
  );
};

export default CustomTextField;
