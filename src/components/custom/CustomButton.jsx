import React from "react";
import Button from "@mui/material/Button";
import fontFamily from "../../utils/fonts";
import colors from "../../utils/colors";

const CustomButton = ({
  variant = "outlined",
  onClick,
  size = "small",
  width = "100px",
  height,
  type = "button",
  children,
  disabled,
  position,
  color = colors.green, // Default color
  borderColor = colors.green, // Default border color
  hoverColor = "white", // Default hover text color
  hoverBorderColor = colors.green, // Default hover border color
  hoverBackgroundColor = colors.green, // Default hover background color
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      onClick={onClick}
      size={size}
      disabled={disabled}
      sx={{
        textTransform: "capitalize",
        width: width,
        height: height,
        padding: "6px",
        position: position,
        border: `1px solid ${borderColor}`,
        color: color,
        fontFamily,
        "&:hover": {
          backgroundColor: hoverBackgroundColor,
          color: hoverColor,
          border: `1px solid ${hoverBorderColor}`,
        },
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
