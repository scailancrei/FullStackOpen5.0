import { useState } from "react"
import PropTypes from "prop-types"

const NewBlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const data = {
    title: title,
    author: author,
    url: url,
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    handleNewBlog(data)
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div
      style={{
        display: "grid",
      }}
    >
      <h2>Create a new blog</h2>
      <div style={{ width: "100%", boxSizing: "border-box" }}>
        <form onSubmit={handleSubmit}>
          <div className="formClass">
            <label>title:</label>
            <input
              type="text"
              required
              placeholder="title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="formClass">
            <label>Author:</label>
            <input
              type="text"
              placeholder="author..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="formClass">
            <label>url:</label>
            <input
              type="url"
              size="25"
              required
              placeholder="https://example.com"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />
          </div>

          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}

NewBlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
}

export default NewBlogForm
