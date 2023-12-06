const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
	{
		task: { type: String },
		description: {
			type: String,
		},
		status: {
			type: String,
			enum: ['new', 'todo', 'doing', 'done'],
			default: 'new',
		},
		cretedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamp: true }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
