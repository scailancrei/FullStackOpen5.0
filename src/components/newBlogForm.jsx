import { useState } from "react"
import services from "../services/blogs"

const NewBlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const data = {
    title: title,
    author: author,
    url: url,
  }

  return (
    <div
      style={{
        display: "grid",
      }}
    >
      <h2>Create a new blog</h2>
      <div style={{ width: "100%", boxSizing: "border-box" }}>
        <form onSubmit={(e) => handleNewBlog(e, data)}>
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

export default NewBlogForm
