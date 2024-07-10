import Forum from '../models/forumModel.js'
import Comment from '../models/commentModel.js'

export const getComments = async (req, res) => {
	const { forumId } = req.params

	try {
		const forum = await Forum.findById(forumId).populate({
			path: 'replies',
			populate: { path: 'creator attachments' },
		})

		if (!forum) {
			return res.status(404).json({ message: 'Форум не найден' })
		}

		res.status(200).json({
			forum: {
				_id: forum._id,
				title: forum.title,
				description: forum.description,
				attachments: forum.attachments,
				creator: forum.creator,
				createdAt: forum.createdAt,
			},
			comments: forum.replies,
		})
	} catch (error) {
		console.error('Ошибка при получении комментариев:', error)
		res.status(500).json({ message: 'Ошибка при получении комментариев' })
	}
}

export const sendComment = async (req, res) => {
	const { forumId } = req.params
	const { content, creatorId, parentId, attachments } = req.body

	if (!content || !creatorId) {
		return res
			.status(400)
			.json({ message: 'Content and creatorId are required' })
	}

	try {
		const newComment = new Comment({
			content,
			creator: creatorId,
			forum: forumId,
			parent: parentId ? parentId : null,
			attachments: attachments || [],
		})

		await newComment.save()

		const forum = await Forum.findById(forumId)
		if (!forum) {
			return res.status(404).json({ message: 'Форум не найден' })
		}

		forum.replies.push(newComment._id)
		await forum.save()

		res.status(201).json(newComment)
	} catch (error) {
		console.error('Ошибка при отправке комментария:', error)
		res.status(500).json({ message: 'Ошибка при отправке комментария' })
	}
}

export const deleteComments = async (req, res) => {
	const { commentId } = req.params

	try {
		const deletedComment = await Comment.findByIdAndDelete(commentId)
		if (!deletedComment) {
			return res.status(404).json({ message: 'Комментарий не найден' })
		}

		const forum = await Forum.findOneAndUpdate(
			{ replies: commentId },
			{ $pull: { replies: commentId } },
			{ new: true }
		)

		if (!forum) {
			console.error('Форум для комментария не найден')
		}

		res.status(200).json({ message: 'Комментарий успешно удален' })
	} catch (error) {
		console.error('Ошибка при удалении комментария:', error)
		res.status(500).json({ message: 'Ошибка при удалении комментария' })
	}
}
