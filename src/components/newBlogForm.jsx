import { useState } from "react"
import services from "../services/blogs"

const NewBlogForm = ({ user, handleNewBlog }) => {
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
        display: "flex",
        border: "red solid 2px",
        flexDirection: "column",
      }}
    >
      <h2>Create a new blog</h2>
      <div>
        <form onSubmit={handleNewBlog}>
          <label>title:</label>
          <input
            type="text"
            placeholder="title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Author:</label>
          <input
            type="text"
            placeholder="author..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label>url:</label>
          <input
            type="url"
            placeholder="url..."
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}

export default NewBlogForm
