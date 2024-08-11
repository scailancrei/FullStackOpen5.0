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
  const [serverMessage, setServerMessage] = useState("")

  useEffect(() => {
    const getUser = async () => {
      const data = await blogService.getAll()
      if (data) {
        setBlogs(data)
        return data
      }
    }

    getUser()
  }, [blogs.length])

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (token) {
      const tokenParsed = JSON.parse(token)
      setUser(tokenParsed)
    }
  }, [])

  const handleLogin = async (e) => {
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
      console.error(error.response.data)
      setServerMessage(error.response.data.error)
      setTimeout(() => {
        setServerMessage("")
      }, 3000)
    }
  }

  const handleNewBlog = async (e, data) => {
    e.preventDefault()
    try {
      const newBlog = await blogService.saveBlog(user, data)
      setBlogs([...blogs, newBlog])
      setServerMessage(
        `A new blog added: ${newBlog.data.title}! by ${newBlog.data.author}!`
      )
      setTimeout(() => {
        setServerMessage("")
      }, 3000)
    } catch (error) {
      console.log(error)
    }
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
          {serverMessage === "" ? (
            ""
          ) : serverMessage.startsWith("A new blog added:") ? (
            <ValidationMessage serverMessage={serverMessage} />
          ) : (
            ""
          )}
          <h2>Welcome {user.username}</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          getUser={getUser}
          getPassword={getPassword}
          username={username}
          password={password}
        />
      ) : (
        <button onClick={handleLocalStorage}>logOut</button>
      )}

      {user === null ? "" : <NewBlogForm handleNewBlog={handleNewBlog} />}
      {serverMessage === "" || serverMessage.startsWith("A new blog added:") ? (
        ""
      ) : (
        <ValidationMessage serverMessage={serverMessage} />
      )}
    </div>
  )
}

export default App
