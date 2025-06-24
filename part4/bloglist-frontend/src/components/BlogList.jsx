import Blog from './Blog'

const BlogList = ({ user, blogs, handleLogout }) => (
    <div>
        <p>Logged in as {user.username}</p>
        <p><button onClick={handleLogout}>Logout</button></p>
        <h2>Blogs</h2>
        {blogs.length === 0 ? <p>No blogs available</p> : (
            <ol>
                {blogs.map(blog => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </ol>
        )}
    </div>
)

export default BlogList