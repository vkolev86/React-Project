import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initalTask = localStorage.getItem('task')
	? JSON.parse(localStorage.getItem('task'))
	: null;

const initialState = {
	TaskData: initalTask,
	AllTasks: {},
};
export const taskSlice = createSlice({
	name: 'Task',
	initialState,

	reducers: {
		taskAddedSuccessfully: (state, action) => {
			state.TaskData = action.payload;
		},
		taskAddFailure: (state) => {
			return state;
		},
		getAllTaskSuccess: (state, action) => {
			state.AllTasks = action.payload;
		},
		getAllTaskFailure: (state) => {
			return state;
		},

		editTaskSuccess: (state, action) => {
			state.TaskData = action.payload;
		},

		editfail: (state) => {
			return state;
		},

		deleteSuccess: (state, action) => {
			state.TaskData = action.payload;
		},
		deletefail: (state) => {
			return state;
		},
	},
});

export const {
	taskAddFailure,
	taskAddedSuccessfully,
	getAllTaskFailure,
	getAllTaskSuccess,
	deleteSuccess,
	deletefail,
	editTaskSuccess,
} = taskSlice.actions;

export default taskSlice.reducer;

export const addTask = (task, description, id) => async (dispatch) => {
	const taskData = {
		task,
		description,
		id,
	};
	const response = await axios.post('http://localhost:4000/task/add', taskData);
	if (response) {
		localStorage.setItem('task', JSON.stringify(response.data));

		return dispatch(taskAddedSuccessfully(response.data));
		// toast.success('task added successfully');
		// window.location.reload();
	} else {
		return dispatch(taskAddFailure());
	}
};

export const editTask = (id, task, description) => async () => {
	let taskData = {
		id: id,
		taskName: task,
		taskDesc: description,
	};
	
	try {
		let response = await axios.put(
			`http://localhost:4000/task/edit/${taskData.id}`,
			taskData
		);
		if (response) {
			// window.location.reload();
			return response;
		}
	} catch (error) {
		return error;
	}
};

export const getAllTasks = (token, id) => async (dispatch) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			id,
		},
	};

	try {
		const response = await axios.get(
			'http://localhost:4000/task/tasks',
			config
		);

		if (response) {
			dispatch(getAllTaskSuccess(response.data));
		}
	} catch (error) {
		if (error.response.status === 400) {
			dispatch(getAllTaskFailure());
		}
	}
};

export const arrowClick = (item, string) => async () => {
	let taskData = {
		id: item._id,
		status: item.status,
		string,
	};

	try {
		let response = await axios.put(
			`http://localhost:4000/task/${taskData.id}`,
			taskData
		);

		if (response) {
			// window.location.reload();
			return response;
		}
	} catch (error) {
		return error;
	}
};

export const deleteItem = (id) => async (dispatch) => {
	let res = await axios.delete(`http://localhost:4000/task/${id}`);

	if (res) {
		return dispatch(deleteSuccess());
		// window.location.reload();
	} else {
		return dispatch(deletefail());
	}
};
