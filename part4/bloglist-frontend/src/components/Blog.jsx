const Blog = ({ blog }) => (
	<li key={blog.id}>
		<p>
			{blog.title} - <i>{blog.author}</i>.{' '}
			<a
				href={blog.url}
				target='_blank'
			>
				Read
			</a>
		</p>
	</li>
)

export default Blog
