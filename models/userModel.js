import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema(
	{
		fullname: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		avatar: {
			type: String,
		},
		education: {
			type: String,
			default: '',
		},
		contacts: {
			type: String,
			default: '',
		},
		dateOfBirth: {
			type: Date,
		},
		workExperience: {
			type: String,
			default: '',
		},
		additionalInfo: {
			type: String,
			default: '',
		},
		subscriptions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Group',
			},
		],
	},
	{ collection: 'Users' }
)

const User = mongoose.model('User', userSchema)
export default User
