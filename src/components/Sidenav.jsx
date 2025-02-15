import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  styled,
} from '@mui/material';
import {
  ChevronLeft,
  Dashboard,
  EventSeat,
  Home,
  LocalOffer,
  Settings,
  ExpandLess,
  ExpandMore,
  LogoutOutlined,
  Menu,
} from '@mui/icons-material';
import colors from '../utils/colors';
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { fetchProperties, setSelectedPropertyUid } from "../redux/Slices/Properties/propertySlice";

const drawerWidth = 220;
const { Option } = Select;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const menuItems = [
  { text: 'Front Desk', icon: <Dashboard />, path: '/frontdesk' },
  { text: 'Reservations', icon: <EventSeat />, path: '/reservations' },
  { text: 'Properties', icon: <Home />, path: '/properties' },
  { text: 'Coupons', icon: <LocalOffer />, path: '/coupons' },

  {
    text: 'Masters',
    icon: <Settings />,
    subItems: [
      { text: 'Users', path: '/master/users' },
      { text: 'Roles', path: '/master/roles' },
      { text: 'Settings', path: '/master/settings' },
    ],
  },
];

function Sidenav({ open, toggleDrawer }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [masterOpen, setMasterOpen] = useState(false);
  const { properties, loading, error } = useSelector((state) => state.properties);
  const [selectedProperty, setSelectedProperty] = useState("");

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    // Retrieve selected property from localStorage
    const savedProperty = localStorage.getItem("selected_property_name");
    if (savedProperty) {
      setSelectedProperty(savedProperty);
    }
  }, []);



  const handlePropertyChange = (selectedPropertyName) => {
    setSelectedProperty(selectedPropertyName);

    const selectedPropertyData = properties.find(
      (property) => property.property_name === selectedPropertyName
    );

    if (selectedPropertyData) {
      dispatch(setSelectedPropertyUid(selectedPropertyData.property_uid)); // Update Redux
      localStorage.setItem("selected_property_name", selectedPropertyName);
    }
  };

  const handleNavigation = (path) => navigate(path);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 85,
        backgroundColor: "#000",
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 85,
          transition: theme => theme.transitions.create('width'),
        },
      }}
    >
      <DrawerHeader sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {open && <Box sx={{ marginLeft: "70px", marginY: "10px" }}>
          <img src="/assets/logos/hatimilogo.png" alt="" width="60px" height="auto" />
        </Box>}
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </DrawerHeader>

      {/* Dropdown of proerty */}
      <Select
        style={{ width: "93%", marginLeft: "8px" }}
        placeholder="Select Property"
        value={selectedProperty}
        onChange={handlePropertyChange}
        loading={loading}
        disabled={loading}
        getPopupContainer={(triggerNode) => triggerNode.parentNode} // Ensures dropdown appears inside the drawer
      >
        {properties?.map((property) => (
          <Option key={property._id} value={property.property_name}>
            {property.property_name}
          </Option>
        ))}
      </Select>


      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) =>
            item.subItems ? (
              <Box key={item.text}>
                <ListItemButton sx={open ? { margin: '10px !important' } : {}} onClick={() => setMasterOpen(!masterOpen)}>
                  <ListItemIcon sx={{ display: "flex", justifyContent: open ? 'initial' : 'center', }}>{item.icon}</ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                  {open && (masterOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                <Collapse in={masterOpen && open} timeout="auto" unmountOnExit>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.text}
                      sx={{
                        pl: 4, marginX: "30px",
                        borderRadius: "10px"
                      }}
                      onClick={() => handleNavigation(subItem.path)}
                      selected={location.pathname === subItem.path}
                      style={
                        location.pathname === subItem.path
                          ? { backgroundColor: colors.green, color: 'white' }
                          : null
                      }
                    >
                      {open && <ListItemText primary={subItem.text} />}
                    </ListItemButton>
                  ))}
                </Collapse>
              </Box>
            ) : (
              <ListItemButton
                key={item.text}
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  display: "flex",
                  justifyContent: open ? 'initial' : 'center',
                  alignItems: "center",
                  marginX: "10px",
                  marginY: "5px",
                  borderRadius: "10px"
                }}
                style={
                  location.pathname === item.path
                    ? { backgroundColor: colors.green, color: 'white', }
                    : null
                }
              >
                <ListItemIcon sx={{ display: "flex", justifyContent: open ? 'initial' : 'center', }}>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            )
          )}
          <ListItemButton
            onClick={() => navigate('/login')}
            sx={{
              display: "flex", justifyContent: open ? 'initial' : 'center', margin: "10px !important",
              borderRadius: "10px"
            }}
          >
            <ListItemIcon sx={{ display: "flex", justifyContent: open ? 'initial' : 'center', }}>
              <LogoutOutlined />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidenav;
