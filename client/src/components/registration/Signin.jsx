import './registration.scss';
import '../../styles/components/_button.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../../redux/authSlice';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';
import { Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
	const dispatch = useDispatch();

	const [state, setState] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({});

	const handleValidation = () => {
		const formFields = {...state};
		const formErrors = {};
		let formIsValid = true;
	
		// Min Email Lenght
		if(formFields["email"].length < 10){
			formIsValid = false;
			formErrors["email"] = "Email must be at least 10 chars!";
		  }

		// Min Password Lenght
		if(formFields["password"].length < 8){
			formIsValid = false;
			formErrors["password"] = "Password must be at least 8 chars!";
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
			dispatch(
				signin({
					email: state.email,
					password: state.password,
				})
			).then(() => {
				console.log('Login successfully!');
			  })
			.catch( () => { 
				toast.error('Email or password do not match!');
				console.log('Email or password do not match!');
			 });
		}
	};

	return (
		<>
			<ToastContainer />
		<div className='signup-form'>
			<div className='signup-form__wrapper'>
				<form className='form' onSubmit={handleSubmit}>
					<h4>Sign In</h4>
					<div className='form-group'>
						<TextField 
							id="outlined-basic"
							label="Enter email address"
							variant="outlined"
							type='email'
							name='email'
							onChange={handleChange}
							value={state.email}
							fullWidth
							InputProps={{
								startAdornment: (
								  <InputAdornment position="start">
									<PersonIcon />
								  </InputAdornment>
								),
							  }}
						/>
						{errors["email"] && errors["email"] ? (
						<Alert variant="filled" severity="error">
							{errors["email"]}
						</Alert> 
						) : ('')}
					</div>
					<div className='form-group'>
						<TextField 
							id="outlined-basic"
							label="Enter password"
							variant="outlined"
							type='password'
							name='password'
							onChange={handleChange}
							value={state.password}
							fullWidth
							InputProps={{
								startAdornment: (
								  <InputAdornment position="start">
									<PasswordIcon />
								  </InputAdornment>
								),
							  }}
						/>
						{errors["password"] && errors["password"] ? (
						<Alert variant="filled" severity="error">
							{errors["password"]}
						</Alert> 
						) : ('')}
					</div>
					<div className='form-group'>
						<Button 
							type="submit" 
							size="large" 
							variant="contained"
							color='warning'
							endIcon={<LoginIcon />}>
								Sign In
						</Button>
					</div>
				</form>
			</div>
		</div>
		</>
	);
};

export default Signin;
