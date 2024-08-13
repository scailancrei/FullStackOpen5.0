import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import services from "../services/blogs.js"

const Blog = ({ blog, user, handleDelete }) => {
  const [show, setShow] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  useEffect(() => {
    const getNewLikes = async () => {
      blog.likes = likes
      await services.modifyLikes(user, blog)
    }
    getNewLikes()
  }, [likes])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleShow = () => {
    setShow(!show)
  }

  const incrementLikes = () => {
    setLikes(likes + 1)
  }

  const deleteBlog = () => {
    handleDelete(blog)
  }

  return (
    <div style={blogStyle}>
      <div>Title: {blog.title}</div>
      <div className="toShow" style={{ display: show ? "" : "none" }}>
        <div>
          Likes: {likes} <button onClick={incrementLikes}>Like</button>
        </div>
        <div>Author: {blog.author}</div>
        <div>Url: {blog.url}</div>
        <div>
          <button onClick={deleteBlog}>Delete</button>
        </div>
      </div>
      <button onClick={handleShow}>{show ? "hide" : "show"}</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Blog
