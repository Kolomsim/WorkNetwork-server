import Chat from '../models/chatModel.js'

export const getAllChats = async (req, res) => {
	try {
		const objectIdUserId = req.query.userId

		console.log(objectIdUserId)

		const chats = await Chat.find({
			$or: [
				{ creator: objectIdUserId },
				{ participants: { $in: [objectIdUserId] } },
			],
		})

		res.json(chats)
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Произошла ошибка при получении списка чатов' })
	}
}

export const makeNewChat = async (req, res) => {
	try {
		try {
			const { chatname, chatType, creator, participants } = req.body

			const newChat = new Chat({
				chatname,
				chatType,
				creator,
				participants,
			})

			const savedChat = await newChat.save()
			if (savedChat) {
				res.status(201).json({
					_id: savedChat._id,
					chatname: savedChat.chatname,
					chatType: savedChat.chatType,
					creator: savedChat.creator,
					participants: savedChat.participants,
				})
			}
		} catch (error) {
			return res
				.status(500)
				.json({ error: 'Произошла ошибка при регистрации пользователя' })
		}
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Произошла ошибка при получении списка чатов' })
	}
}
