import bcrypt from 'bcrypt'
import cookie from 'cookie'
import User from '../models/userModel.js'
import { generateTokens, refreshTokenAge } from '../utils/generateTokens.js'

export const signupUser = async (req, res) => {
	try {
		const { fullname, username, email, password, confirmPassword } = req.body

		if (password !== confirmPassword) {
			return res.status(400).json({ error: 'Введенные пароли не совпадают' })
		}

		let userDetected = await User.findOne({ username })
		if (userDetected) {
			return res
				.status(400)
				.json({ error: 'Пользователь с таким логином уже зарегистрирован' })
		}

		const hashedPassword = await bcrypt.hash(password, 12)
		const newUser = new User({
			fullname,
			username,
			email,
			password: hashedPassword,
			avatar: 'avatars/profileAvatars/default.png',
		})

		const savedUser = await newUser.save()
		if (savedUser) {
			const { accessToken, refreshToken } = generateTokens(savedUser._id)

			res.setHeader(
				'Set-Cookie',
				cookie.serialize('refreshToken', refreshToken, {
					maxAge: refreshTokenAge,
					httpOnly: true,
					sameSite: 'strict',
				})
			)
			res.status(200).json({
				accessToken,
				_id: savedUser._id,
				fullName: savedUser.fullName,
				username: savedUser.username,
			})
		} else {
			return res
				.status(400)
				.json({ error: 'Ошибка при сохранении пользователя' })
		}
	} catch (error) {
		console.error('Ошибка при регистрации пользователя:', error)
		return res
			.status(500)
			.json({ error: 'Произошла ошибка при регистрации пользователя' })
	}
}

export const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body

		const user = await User.findOne({ username })

		if (!user) {
			return res
				.status(404)
				.json({ error: 'Пользователь с таким именем не найден' })
		}

		const isPasswordCorrect = await bcrypt.compareSync(password, user.password)

		if (!isPasswordCorrect) {
			return res
				.status(400)
				.json({ error: 'Неверное имя пользователя или пароль' })
		}

		const { accessToken, refreshToken } = generateTokens(user._id)

		res.setHeader(
			'Set-Cookie',
			cookie.serialize('refreshToken', refreshToken, {
				maxAge: refreshTokenAge,
				httpOnly: true,
				sameSite: 'strict',
			})
		)
		res.status(200).json({
			accessToken,
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
		})
	} catch (error) {
		res.status(500).json({ error: 'Произошла ошибка при входе в аккаунт' })
	}
}

export const logoutUser = (req, res) => {
	try {
		res.setHeader(
			'Set-Cookie',
			cookie.serialize('refreshToken', '', {
				maxAge: 0,
				httpOnly: true,
				sameSite: 'strict',
			})
		)
		res.status(200).json({ message: 'Выход произошёл успешно.' })
	} catch (error) {
		res.status(500).json({ error: 'Произошла ошибка при выходе из аккаунта' })
	}
}
