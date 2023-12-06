import './home.scss';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;
	return (
		<div className='home'>
			<div className='home__container'>
				{/* <h2>Task Manager</h2>
				<p>organize your task</p> */}

				{currentUser && currentUser.token ? (
					<Link to='/dashboard' className='button'>
						View Task
					</Link>
				) : (
					<Link to='/signin' className='button'>
						View Task
					</Link>
				)}
			</div>
		</div>
	);
};

export default Home;
