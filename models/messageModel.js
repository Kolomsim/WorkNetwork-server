import mongoose from 'mongoose'
const { Schema } = mongoose

const messageSchema = new Schema(
	{
		chatId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chat',
			required: true,
		},
		creatorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		receivers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
		],
		content: {
			type: String,
		},
		attachments: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true }
)

const Message = mongoose.model('Message', messageSchema, 'Messages')
export default Message
