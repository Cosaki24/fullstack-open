const BlogForm = ({ handleAddBlog }) => {
	return (
		<>
			<h2>Add new blog</h2>
			<form action={handleAddBlog}>
				<div>
					<input
						type='text'
						name='title'
						placeholder='Title'
                        required
					/>
				</div>
				<div>
					<input
						type='text'
						name='author'
						placeholder='Author'
						required
					/>
				</div>
				<div>
					<input
						type='text'
						name='url'
						placeholder='URL'
						required
					/>
				</div>
				<button type='submit'>add blog</button>
			</form>
		</>
	)
}

export default BlogForm
