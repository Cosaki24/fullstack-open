import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = ({ user, blogs, handleLogout, handleAddBlog }) => (
	<div>
		<p>Logged in as {user.username}</p>
		<p>
			<button onClick={handleLogout}>Logout</button>
		</p>
		<BlogForm handleAddBlog={handleAddBlog} />
		<h2>Blogs</h2>
		{blogs.length === 0 ? (
			<p>No blogs available</p>
		) : (
			<ol>
				{blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
					/>
				))}
			</ol>
		)}
	</div>
)

export default BlogList
