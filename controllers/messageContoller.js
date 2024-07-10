import Messages from '../models/messageModel.js'
export const getMessages = async (req, res) => {
	try {
		const { chatId } = req.params
		const messages = await Messages.find({ chatId })
		res.json(messages)
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Произошла ошибка при получении сообщений для чата' })
	}
}

export const sendMessage = async (req, res) => {
	const { chatId, creatorId, receivers, content, attachments } = req.body
	try {
		const newMessage = new Messages({
			chatId,
			creatorId,
			receivers,
			content,
			attachments,
		})

		const savedChat = await newMessage.save()
		if (savedChat) {
			res.status(201).json({
				_id: newMessage._id,
				chatId: newMessage.chatId,
				creatorId: newMessage.creatorId,
				receivers: newMessage.receivers,
				content: newMessage.content,
				attachments: newMessage.attachments,
			})
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Произошла ошибка при отправке сообщения в чат' })
	}
}

export const deleteMessage = async (req, res) => {
	const messageId = req.params.messageId
	console.log('delete-mess ', messageId)
	try {
		await Messages.findByIdAndDelete(messageId)
		res.status(200).send({ message: 'Сообщение успешно удалено' })
	} catch (error) {
		console.error('Ошибка при удалении сообщения:', error)
		res.status(500).send({ error: 'Произошла ошибка при удалении сообщения' })
	}
}
