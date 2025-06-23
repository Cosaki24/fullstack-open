import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blog'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
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
  }, [])

  const handleLogin = async (formData) => {
    const credentials = {
      username: formData.get('username').trim(),
      password: formData.get('password').trim()
    }
    try {
      let user = await loginService.login(credentials)
      setUser(user)
      setLoginError(null)
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    catch (error) {
      setLoginError(error.response.data.message || 'Unknown error: Login failed')
      setUser(null)
    }
  }

  return (
    <>
      {user ? <BlogList user={user} blogs={blogs} /> : <LoginForm handleLogin={handleLogin} loginError={loginError} />}
    </>
  )
}

export default App