import './listcard.scss';
import { useState, useEffect } from 'react';
// import Moment from 'react-moment';
import { arrowClick, deleteItem, editTask, getAllTasks } from '../../redux/taskSlice';
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { blue, red, brown, orange } from '@mui/material/colors';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Badge } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ListCard = (items) => {
	const { item } = items;
	const { auth } = useSelector((state) => ({ ...state }));

	const [state, setState] = useState({
		id: item._id,
		task: item.task,
		description: item.description,
	});

	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [errors, setErrors] = useState({});

	const dispatch = useDispatch();

	const ArrowClick = (string) => {
		dispatch(arrowClick(item, string)).then(() => {
			toast.success('Task status update successfully! 👌');
			console.log('Task status update successfully!');
			setTimeout(() => {
				dispatch(getAllTasks());
			}, 100);
		  })
		.catch( () => { 
			toast.error('Task status is not updated!');
			console.log('Task status is not updated!');
		 });
	};

	const handleClickOpenEdit = () => {
		setOpenEdit(true);
	};

	const handleClickOpenDelete = () => {
		setOpenDelete(true);
	};

	const handleCloseEdit = () => {
		setOpenEdit(false);
	};

	const handleCloseDelete = () => {
		setOpenDelete(false);
	};
	
	const handleDelete = () => {
		dispatch(deleteItem(item._id))
		.then(() => {
			setOpenDelete(false);
			toast.success('Task deleted successfully! 👌');
			console.log('Task deleted successfully!');
			setTimeout(() => {
				dispatch(getAllTasks());
			}, 100);
		  })
		.catch( () => { 
			setOpenDelete(false);
			toast.error('Task is not deleted!');
			console.log('Task is not deleted!');
		 });
	};

	const handleValidation = () => {
		const formFields = {...state};
		const formErrors = {};
		let formIsValid = true;
	
		// Min Lenght for task name and description
		if (formFields["task"].length < 5 || formFields["description"].length < 5) {
			formIsValid = false;
			formErrors["task"] = "Task name and description must be at least 5 letters long!";
		}
	
		setErrors(formErrors)
		return formIsValid;
	  }

	const handleEditSubmit = (e) => {
		e.preventDefault();

		dispatch(editTask(state.id, state.task, state.description)).then(() => {
			setOpenEdit(false);
			toast.success('Task edited successfully! 👌');
			console.log('Task edited successfully!');
			setTimeout(() => {
				dispatch(getAllTasks());
			}, 100);
		  })
		.catch( () => { 
			setOpenEdit(false);
			toast.error('Task is not edited!');
			console.log('Task is not edited!');
		 });
	};

	const handleChangeEdit = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
        <TableBody>
			<ToastContainer />
            <TableRow
              key={item._id}
              sx={{ '&:last-child td, &:last-child th': '' }}
			  hover
            >
			  <TableCell component="th" scope="row">{item._id}</TableCell>
              <TableCell align="left">{item.task}</TableCell>
              <TableCell align="left">{item.description}</TableCell>
              <TableCell align="center">
				{/* <Moment format="YYYY/MM/DD"> */}
					{item.createdDate}
				{/* </Moment> */}
			  </TableCell>
              <TableCell align="center">
				<Badge
					color={item.status && item.status == "done" ? ( "success") : ("warning")}
					badgeContent={item.status}>
				</Badge>
			  </TableCell>
              <TableCell align="center">
				{auth.currentUser && auth.currentUser.id ==  item.cretedBy ? (
					<>
						<Link
							disabled={item.status === 'new'}
							onClick={() => ArrowClick('left')}
						>
							<ArrowCircleLeftIcon 
								sx={item.status && item.status == "new" ? ({color: brown[50] }) : ({ color: blue[500] })}
							/>
						</Link>
						<Link
							disabled={item.status === 'done'}
							onClick={() => ArrowClick('right')}
						>
							<ArrowCircleRightIcon
								sx={item.status && item.status == "done" ? ({color: brown[50] }) : ({ color: blue[500] })}
							/>
						</Link>
						<Link onClick={handleClickOpenEdit} id='edit'>
							<EditIcon sx={{ color: orange[500] }} />
						</Link>
						<Link onClick={handleClickOpenDelete} id='delete'>
							<DeleteForeverIcon sx={{ color: red[500] }} />
						</Link>
					</>
					) : (
					<>
						<Link disabled >
							<ArrowCircleLeftIcon sx={{ color: brown[50] }} />
						</Link>
						<Link disabled >
							<ArrowCircleRightIcon sx={{ color: brown[50] }} />
						</Link>
						<Link disabled >
							<EditIcon sx={{ color: brown[50] }} />
						</Link>
						<Link disabled >
							<DeleteForeverIcon sx={{ color: brown[50] }} />
						</Link>
					</>
				)}
			  </TableCell>
            </TableRow>
        </TableBody>
		<Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="delete"
        aria-describedby="delete"
      >
        <DialogTitle id="delete">
          {"Are you sure you want to delete this task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete">
		  	Task: {item.task}
			Description: {item.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>CANCEL</Button>
          <Button onClick={handleDelete} autoFocus>DELETE</Button>
        </DialogActions>
      </Dialog>

	  <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
		id='edit'
        aria-labelledby="edit"
        aria-describedby="edit"
		maxWidth='lg'
		fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit task name and description."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="edit">
		  	<form action='' autoComplete="off">
				<TextField
					helperText="Task name"
					variant="outlined"
					color='warning'
					type='text'
					name='task'
					fullWidth
					onChange={handleChangeEdit}
					value={state.task}
				/>
				<TextField
					helperText="Task description"
					variant="outlined"
					color='warning'
					type='text'
					name='description'
					fullWidth
					onChange={handleChangeEdit}
					value={state.description}
				/>
			</form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>CANCEL</Button>
          <Button onClick={handleEditSubmit} autoFocus>EDIT</Button>
        </DialogActions>
      </Dialog>
		</> 
	);
};

export default ListCard;
