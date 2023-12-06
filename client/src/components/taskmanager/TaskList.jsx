import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../redux/taskSlice';
import ListCard from './ListCard';
import './tasklist.scss';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const TaskList = () => {
	const tasks = useSelector((state) => state.task);

	const { AllTasks } = tasks;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllTasks());
	}, []);

	return (
		<Table aria-label="table" sx={{
			  paddingLeft: '65px',  
			  paddingRight: '65px',
			  borderCollapse: 'separate'
			}}>
			<TableHead sx={{ bgcolor: "#eeeeee" }}>
				<TableRow>
					<TableCell align="left">Id</TableCell>
					<TableCell align="left">Name</TableCell>
					<TableCell align="left">Description</TableCell>
					<TableCell align="center">Created Date</TableCell>
					<TableCell align="center">Status</TableCell>
					<TableCell align="center">Action</TableCell>
				</TableRow>
			</TableHead>
				{Object.values(AllTasks).map((item) => {
					return <ListCard key={item._id} item={item} />;
				})}
		</Table>
	);
};

export default TaskList;
