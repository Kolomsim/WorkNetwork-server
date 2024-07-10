import mongoose from 'mongoose'

const forumSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	attachments: [
		{
			type: String,
		},
	],
	replies: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment',
		},
	],
})

const Forum = mongoose.model('Forum', forumSchema, 'Forums')
export default Forum
