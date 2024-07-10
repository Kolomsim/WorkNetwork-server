import mongoose from 'mongoose'
const fileSchema = new mongoose.Schema({
	filename: {
		type: String,
		required: true,
	},
	path: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const File = mongoose.model('File', fileSchema, 'Files')
export default File
