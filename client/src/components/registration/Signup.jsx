import './registration.scss';
import '../../styles/components/_button.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/authSlice';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Button } from '@mui/material';
import { Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';

const Signup = () => {
	const dispatch = useDispatch();
	const [state, setState] = useState({
		email: '',
		password: '',
		username: '',
	});
	const [errors, setErrors] = useState({});

	const handleValidation = () => {
		const formFields = {...state};
		const formErrors = {};
		let formIsValid = true;
	
		// Min Username Lenght
		if (formFields["username"].length < 5) {
			formIsValid = false;
			formErrors["username"] = "Username must be at least 5 chars!";
		}

		// Min Email Lenght
		if (formFields["email"].length < 10) {
			formIsValid = false;
			formErrors["email"] = "Email must be at least 10 chars!";
		}

		// Min Password Lenght
		if (formFields["password"].length < 8) {
			formIsValid = false;
			formErrors["password"] = "Password must be at least 8 chars!";
		}
	
		setErrors(formErrors)
		return formIsValid;
	  }

	const handleSubmit = (e) => {
		e.preventDefault();

		if (handleValidation()) {
			dispatch(
				register({
					username: state.username,
					password: state.password,
					email: state.email,
				})
			);
		}
	};
	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	console.log(state.email, state.password, state.username);
	return (
		<div className='signup-form'>
			<div className='signup-form__wrapper'>
				<form className='form' onSubmit={handleSubmit}>
					<h4>Sign up</h4>

					<div className='form-group'>
						{/* <input
							type='text'
							placeholder='Enter Name'
							name='username'
							value={state.username}
							onChange={handleChange}
						/> */}
						<TextField 
							id="outlined-basic"
							label="Enter your username"
							variant="outlined"
							type='text'
							name='username'
							onChange={handleChange}
							value={state.username}
							fullWidth
							InputProps={{
								startAdornment: (
								  <InputAdornment position="start">
									<PersonIcon />
								  </InputAdornment>
								),
							  }}
						/>
						{errors["username"] && errors["username"] ? (
						<Alert variant="filled" severity="error">
							{errors["username"]}
						</Alert> 
						) : ('')}
					</div>
					<div className='form-group'>
						{/* <input
							type='email'
							name='email'
							value={state.email}
							id=''
							placeholder='Enter Email'
							onChange={handleChange}
						/> */}
						<TextField 
							id="outlined-basic"
							label="Enter your email address"
							variant="outlined"
							type='email'
							name='email'
							onChange={handleChange}
							value={state.email}
							fullWidth
							InputProps={{
								startAdornment: (
								  <InputAdornment position="start">
									<EmailIcon />
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
						{/* <input
							type='password'
							name='password'
							value={state.password}
							id=''
							placeholder='Enter Password'
							onChange={handleChange}
						/> */}
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
						{/* <button className='button'>Sing Up</button> */}
						<Button 
							type="submit" 
							variant="contained" 
							endIcon={<AppRegistrationIcon />}>
								Sing Up
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
