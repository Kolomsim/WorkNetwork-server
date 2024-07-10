import mongoose from 'mongoose'
const { Schema } = mongoose

const chatSchema = new Schema(
	{
		chatname: {
			type: String,
		},
		chatType: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{ timestamps: true }
)

const Chat = mongoose.model('Chat', chatSchema, 'Chats')
export default Chat
