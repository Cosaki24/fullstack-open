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
	const blogWithMostLikes = (mostLikes, blog) => {
		return Math.max(mostLikes, blog.likes)
	}

	return blogs.find((b) => b.likes === blogs.reduce(blogWithMostLikes, 0))
}

module.exports = {
	dummy,
	totalLikes,
    favoriteBlog
}
