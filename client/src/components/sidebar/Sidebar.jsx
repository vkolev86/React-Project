import './Sidebar.scss';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import TaskIcon from '@mui/icons-material/Task';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;

	return (
		<>
		<Box sx={{ overflow: 'auto' }}>
		<Divider />
          <List>
            <Link to='/dashboard'>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
				            <HomeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to='/taskmanager'>
			        <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TaskIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Tasks" />
                </ListItemButton>

              </ListItem>
            </Link>
          </List>
          {/* <Divider /> */}
        </Box>
		</>
	);
};

export default Sidebar;
