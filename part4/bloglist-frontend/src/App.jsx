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

  const handleLogin = async (formData) => {
    const credentials = {
      username: formData.get('username').trim(),
      password: formData.get('password').trim()
    }
    try {
      let user = await loginService.login(credentials)
      window.localStorage.setItem('blogListUser', JSON.stringify(user))
      setUser(user)
      setLoginError(null)
    }
    catch (error) {
      setLoginError(error.response?.data?.message || 'Unknown error: Login failed')
      setUser(null)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogListUser')
    setUser(null)
  }

  return (
    <>
      {user ? <BlogList user={user} blogs={blogs} handleLogout={handleLogout} /> : <LoginForm handleLogin={handleLogin} loginError={loginError} />}
    </>
  )
}

export default App