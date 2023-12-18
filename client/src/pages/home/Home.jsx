import './home.scss';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Home = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;
	return (
		<div className='home'>
			<div className='home__container'>
				{currentUser && currentUser.token ? (
					<Link to='/dashboard' className='button'>
						View Task
					</Link>
				) : (
					<Link to='/signin'>
						<Button size="large" variant="contained" color='warning' endIcon={<SendIcon />}>View Task</Button>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Home;
