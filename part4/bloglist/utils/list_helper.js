const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const sumOfLikes = (sum, blog) => {
		return sum + blog.likes
	}

	return blogs.reduce(sumOfLikes, 0)
}

const favoriteBlog = (blogs) => {
	const blogWithMostLikes = (blogWithMostLikes, blog) => {
		return blog.likes > blogWithMostLikes.likes ? blog : blogWithMostLikes
	}

	return blogs.reduce(blogWithMostLikes)
}

const mostBlogs = (blogs) => {
	const findAuthorBlogCount = (arr, blog) => {
		const authorItem = arr.find((item) => item.author === blog.author)
		if (authorItem) {
			authorItem.blogs += 1
		} else {
			arr.push({ author: blog.author, blogs: 1 })
		}

		return arr
	}

	const authorBlogCountArr = blogs.reduce(findAuthorBlogCount, [])
	const authorWithMostBlog = authorBlogCountArr.reduce((max, curr) => {
		return curr.blogs > max.blogs ? curr : max
	})

	return authorWithMostBlog
}

const mostLikes = (blogs) => {
	// assumption is that we are accumulating likes from all blogs rather than which blog has the most likes
	const findAuthorLikesCount = (arr, blog) => {
		const authorItem = arr.find((item) => item.author === blog.author)

		if (authorItem) {
			authorItem.likes += blog.likes
		} else {
			arr.push({ author: blog.author, likes: blog.likes })
		}

		return arr
	}

	const authorLikesCountArr = blogs.reduce(findAuthorLikesCount, [])
	const authorWithMostLikes = authorLikesCountArr.reduce((max, curr) => {
		return curr.likes > max.likes ? curr : max
	})

	return authorWithMostLikes
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
}
