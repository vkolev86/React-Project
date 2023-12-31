import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '../history';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const initialUser = localStorage.getItem('auth')
	? JSON.parse(localStorage.getItem('auth'))
	: null;

const initialState = {
	isLoading: false,
	currentUser: initialUser,
	error: null,
};
export const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isLoading = false;
		},
		loginFailure: (state, action) => {
			state.error = action.payload;
		},
		registerSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isLoading = false;
		},
		registerFailure: (state, action) => {
			state.error = action.payload;
		},
		logoutSuccess: (state) => {
			state.currentUser = null;
		},
	},
});

export const {
	loginFailure,
	loginSuccess,
	registerFailure,
	registerSuccess,
	logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;

export const register = (user) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'content-type': 'application/json',
			},
		};

		const response = await axios.post(
			'http://localhost:4000/auth/register',
			user,
			config
		);

		if (response) {
			localStorage.setItem('auth', JSON.stringify(response.data));
			dispatch(registerSuccess(response.data));
			toast.success('Register successfull');
			useNavigate('/dashboard');
			
		} else {
			dispatch(registerFailure());
			toast.error('Registration failed');
		}
	} catch (error) {
		// console.log(error);
		// dispatch(registerFailure());
		throw new Error(error);
	}
};

export const signin = (user) => async (dispatch) => {
	// console.log(user);
	try {
		const userData = {
			email: user.email,
			password: user.password,
		};
		const response = await axios.post(
			'http://localhost:4000/auth/signin',
			userData
		);
		if (response) {
			localStorage.setItem('auth', JSON.stringify(response.data));
			dispatch(loginSuccess(response.data));

			history.push('/dashboard');
			console.log('Login successfully!');

			// window.location.reload();
		} else {
			dispatch(loginFailure());
			console.log('Login unsuccessfully!');
		}
	} catch (error) {
		console.log(error);
		dispatch(loginFailure());
		throw new Error(error);
	}
};
