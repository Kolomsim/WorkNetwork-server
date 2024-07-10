import mongoose from 'mongoose'
const groupSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	header: {
		type: String,
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	admins: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	members: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	subscribers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	forums: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Forum',
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

const Group = mongoose.model('Group', groupSchema, 'Groups')
export default Group
