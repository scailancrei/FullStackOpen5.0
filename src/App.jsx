import { useState, useEffect } from "react"
import Blog from "./components/blog.jsx"
import LoginForm from "./components/loginForm.jsx"
import blogService from "./services/blogs"
import ValidationMessage from "./components/validationMessage.jsx"
import loginService from "./services/login"
import NewBlogForm from "./components/newBlogForm.jsx"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (token) {
      const tokenParsed = JSON.parse(token)
      setUser(tokenParsed)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("token", JSON.stringify(token))
      setUser(token)
      setUsername("")
      setPassword("")
    } catch (error) {
      console.error(error.response.data.error)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage("")
      }, 2000)
    }
  }

  const handleNewBlog = async (e) => {
    e.preventDefault()
    try {
    } catch (error) {}
  }

  const handleLocalStorage = () => {
    window.localStorage.removeItem("token")
    setUser(null)
  }

  const getUser = (user) => {
    setUsername(user)
  }

  const getPassword = (pass) => {
    setPassword(pass)
  }
  return (
    <div>
      {user === null ? (
        ""
      ) : (
        <div>
          <h2>Blogs</h2>
          <h2>Welcome {user.username}</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
      {user === null ? (
        <LoginForm
          handleSubmit={handleSubmit}
          getUser={getUser}
          getPassword={getPassword}
          username={username}
          password={password}
        />
      ) : (
        <button onClick={handleLocalStorage}>logOut</button>
      )}

      {user === null ? (
        ""
      ) : (
        <NewBlogForm user={user} handleNewBlog={handleNewBlog} />
      )}
      {message === "" ? "" : <ValidationMessage message={message} />}
    </div>
  )
}

export default App
