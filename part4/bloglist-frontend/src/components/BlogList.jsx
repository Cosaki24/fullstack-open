import Blog from './Blog'

const BlogList = ({ user, blogs }) => (
    <div>
        <p>Logged in as {user.username}</p>
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