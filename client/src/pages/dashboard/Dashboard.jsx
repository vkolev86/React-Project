import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './dashboard.scss';
import { useEffect } from 'react';
import { getAllTasks } from '../../redux/taskSlice';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Dashboard = () => {
	const tasklist = useSelector((state) => state.task);
	const { AllTasks } = tasklist;
	const user = useSelector((state) => state.auth);
	const { currentUser } = user;

	let pendingTask = [];
	let completedTask = [];
	let newTask = [];
	let doingTask = [];
	for (let i = 0; i < AllTasks.length; i++) {
		if (AllTasks[i].status === 'todo') {
			pendingTask.push(AllTasks[i]);
		} else if (AllTasks[i].status === 'done') {
			completedTask.push(AllTasks[i]);
		} else if (AllTasks[i].status === 'new') {
			newTask.push(AllTasks[i]);
		} else if (AllTasks[i].status === 'doing') {
			doingTask.push(AllTasks[i]);
		}
	}

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllTasks(currentUser.token, currentUser.id));
	}, [dispatch, currentUser.token, currentUser.id]);

	return (
		<>
		<div>
			<div className='dashboard'>
				<div className='dashboard__left'>
					<Sidebar />
				</div>
				<div className='dashboard__right'>
					<div className='dashboard__rightContent'>
						<h2>Task Status Dashboard</h2>
						<div className='taskcount'>
							<Card sx={{ minWidth: 275, bgcolor: "#bbdefb"}} >
								<CardContent>
									<Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
										New
									</Typography>
									<Typography variant="h5" component="div">
										{newTask.length}
									</Typography>
								</CardContent>
							</Card>
							<Card sx={{ minWidth: 275, bgcolor: "#80cbc4" }}>
								<CardContent>
									<Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
										Todo
									</Typography>
									<Typography variant="h5" component="div">
										{pendingTask.length}
									</Typography>
								</CardContent>
							</Card>
							<Card sx={{ minWidth: 275, bgcolor: "#dce775" }}>
								<CardContent>
									<Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
										Doing
									</Typography>
									<Typography variant="h5" component="div">
										{doingTask.length}
									</Typography>
								</CardContent>
							</Card>
							<Card sx={{ minWidth: 275, bgcolor: "#66bb6a" }}>
								<CardContent>
									<Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
										Completed
									</Typography>
									<Typography variant="h5" component="div">
										{completedTask.length}
									</Typography>
								</CardContent>
							</Card>
						</div>
							<Link to='/taskmanager'>
								<Button variant="contained" endIcon={<SendIcon />}>Viwe Task or Create New</Button>
							</Link>
					</div>
				</div>
			</div>
		</div>
		</>
	);
};

export default Dashboard;
