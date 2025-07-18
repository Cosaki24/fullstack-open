import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blog'
import loginService from './services/login'

const getStoredUser = () => {
	const user = window.localStorage.getItem('blogListUser')
	return user ? JSON.parse(user) : null
}

const App = () => {
	const [user, setUser] = useState(getStoredUser())
	const [loginError, setLoginError] = useState(null)
	const [message, setMessage] = useState(null)
	const [error, setError] = useState(null)
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				if (user) {
					const initialBlogs = await blogService.getAll()
					setBlogs(initialBlogs)
				}
			} catch (error) {
				console.error('Failed to fetch blogs:', error)
			}
		}
		fetchBlogs()
	}, [user])

	useEffect(() => {
		if (message || error) {
			const timer = setTimeout(() => {
				setMessage(null)
				setError(null)
			}, 5000)
			return () => clearTimeout(timer)
		}
	}, [message, error])

	const handleLogin = async (formData) => {
		const credentials = {
			username: formData.get('username').trim(),
			password: formData.get('password').trim(),
		}
		try {
			let user = await loginService.login(credentials)
			window.localStorage.setItem('blogListUser', JSON.stringify(user))
			setUser(user)
			setLoginError(null)
		} catch (error) {
			setLoginError(
				error.response?.data?.message || 'Unknown error: Login failed'
			)
			setUser(null)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('blogListUser')
		setUser(null)
	}

	const handleAddBlog = async (formData) => {
		const blogDetails = {
			title: formData.get('title').trim(),
			author: formData.get('author').trim(),
			url: formData.get('url').trim(),
		}
		try {
			const newBlog = await blogService.addBlog(blogDetails)
			if (newBlog && newBlog.id) {
				const updatedBlogs = await blogService.getAll()
				setBlogs(updatedBlogs)
				setMessage(
					`A new blog "${newBlog.title}" by ${newBlog.author} added`
				)
			}
		} catch (error) {
			setError(
				error.response?.data?.error ||
					'Unknown error: Adding blog failed'
			)
		}
	}

	return (
		<>
			{message && <p style={{ color: 'green' }}>{message}</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}
			{user ? (
				<BlogList
					handleAddBlog={handleAddBlog}
					user={user}
					blogs={blogs}
					handleLogout={handleLogout}
				/>
			) : (
				<LoginForm
					handleLogin={handleLogin}
					loginError={loginError}
				/>
			)}
		</>
	)
}

export default App
