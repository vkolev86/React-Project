import './header.scss';
import '../../styles/components/_button.scss';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from '../../redux/authSlice';
import history from '../../history';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Header = () => {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => ({ ...state }));

	const handleClick = (e) => {
		e.preventDefault();
		dispatch(logoutSuccess());
		localStorage.removeItem('auth');
		history.push('/signin');
		window.location.reload();
	};

	return (
		<>
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ bgcolor: "#e65100" }}>
				<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					<TaskAltIcon /> Task Manager
				</Typography>
				{auth.currentUser && auth.currentUser.token ? (
						<Button to='/signin' onClick={handleClick} color="inherit">
							{auth.currentUser.username} - Sign Out
						</Button>
					) : (
						<>
							{/* <Button to='/signin' color="inherit">Sign In</Button> */}
							<Link to='/signin' className='button'>
								Sign In
							</Link>
							<Link to='/signup' className='button'>
								Sign Up
							</Link>
							{/* <Button to='/signup' color="inherit">Sign Up</Button> */}
						</>
					)}
				</Toolbar>
			</AppBar>
		</Box>
{/* 	
		<div>
			<nav className='header'>
				<div className='header__logo'>
					<h5>Task Manager</h5>
				</div>
				<div className='header__buttons'>
					{auth.currentUser && auth.currentUser.token ? (
						<Link to='/signin' className='button' onClick={handleClick}>
							SignOut
						</Link>
					) : (
						<>
							<Link to='/signin' className='button'>
								SignIn
							</Link>
							<Link to='/signup' className='button'>
								SignUp
							</Link>
						</>
					)}
				</div>
			</nav>
		</div> */}
		</>
	);
};

export default Header;
