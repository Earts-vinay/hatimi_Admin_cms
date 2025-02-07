// HeaderLayout.js

import { Box, Toolbar } from '@mui/material';

function HeaderLayout({ open, children }) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${open ? 220 : 85}px)` },
        ml: `${open ? 220 : 85}px`,
        transition: theme => theme.transitions.create(['width', 'margin-left'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <Toolbar />
      {children}
    </Box>
  );
}

export default HeaderLayout;