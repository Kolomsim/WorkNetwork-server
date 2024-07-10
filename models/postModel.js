import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	groupId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group',
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
})

const Post = mongoose.model('Post', postSchema, 'Posts')
export default Post
