import './addtask.scss';
import { useState } from 'react';
import { addTask } from '../../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';

const AddTask = () => {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;
	const [state, setState] = useState({
		task: '',
		description: '',
	});
	const [errors, setErrors] = useState({});

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

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		
		if (handleValidation()) {
			dispatch(addTask(state.task, state.description, currentUser.id));
			setState({
				task: '',
				description: '',
			});
		}
	};

	return (
		<center>
			<div className='addtask'>
				{errors["task"] ? (
					<Alert variant="filled" severity="error">
						{errors["task"]}
					</Alert> 
					) : ('')}
				<form action='' onSubmit={handleSubmit}>
					<TextField 
						sx={{ml: 2, mr: 2}}
						id="outlined-basic"
						label="Enter task name"
						variant="outlined"
						type='text'
						name='task'
						onChange={handleChange}
						value={state.task}
					/>
					<TextField 
						sx={{ml: 2, mr: 2}}
						id="outlined-basic"
						label="Enter description"
						variant="outlined"
						type='text'
						name='description'
						onChange={handleChange}
						value={state.description}
					/>
					<Button 
						type="submit" 
						sx={{ml: 2, mr: 2}}
						variant="contained" 
						endIcon={<SendIcon />}>
							Add
					</Button>
				</form>
			</div>
		</center>
	);
};

export default AddTask;
