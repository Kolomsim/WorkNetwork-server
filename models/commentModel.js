import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
	content: { type: String, required: true },
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	forum: { type: mongoose.Schema.Types.ObjectId, ref: 'Forum', required: true },
	parent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
		default: null,
	},
	attachments: [
		{
			type: String,
		},
	],
	createdAt: { type: Date, default: Date.now },
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
