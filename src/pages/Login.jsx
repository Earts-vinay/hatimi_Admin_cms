import React, { useState, useEffect } from "react";
import { TextField, Typography, Box, Alert, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Visibility, VisibilityOff } from "@mui/icons-material"; 
import axios from "axios";
import { Link } from "react-router-dom"; 
import { Button } from "antd"; // Import Ant Design button
 
import colors from '../utils/colors'
import fontFamily from "../utils/fonts";
import CustomTextField from "../components/custom/CustomTextField";

function Login() {
  const [mobile, setMobile] = useState(""); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post("https://server.hatimiretreats.com/v1/employee/login", {
        mobile_no: mobile, 
        password: password, 
      });

      if (response.data.accesstoken) {
        Cookies.set("token", response.data.accesstoken, { expires: 1 / 6 });
        navigate("/reservations");
      } else {
        setErrorMessage("Invalid credentials, please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during login. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword); 

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0e3",
        height: "100vh",
      }}
    >
        {/* Left side with image */}
        <Box sx={{width:"50%",height:"100%",backgroundColor:colors.green,display:"flex",justifyContent:"center",alignItems:"center"}}>
          <img
            src='/assets/icons/hatimigold.svg'
            alt="Login"
            style={{ width: "160px", height: "200px", objectFit: "cover"}}
          />
        </Box>

        {/* Right side with the form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          
            padding: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Typography sx={{ fontFamily,fontSize:"28px",mb:1 }} variant="h5">Welcome to Hatimi Retreats</Typography>
            <Typography sx={{ fontFamily,color:"text.secondary" }}>Login into your Account</Typography>
            
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <CustomTextField  label="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)}/>
             
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  style: {fontFamily, height: '50px',},
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
           
              {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorMessage}
                </Alert>
              )}

              {/* Ant Design Loading Button */}
              <Button
                block
                type="primary"
                loading={loading}
                disabled={loading} 
                onClick={handleLogin} 
                style={{
                  marginTop:"10px",
                  height:"45px"
                }}
              >
               Login
              </Button>

              <Typography variant="body2" align="center" sx={{ fontFamily, mt: 2 }}>
                <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
                 Forget Password?
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
 
  );
}

export default Login;
