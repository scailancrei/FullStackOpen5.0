import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog.jsx"
import LoginForm from "./components/loginForm.jsx"
import blogService from "./services/blogs"
import ValidationMessage from "./components/validationMessage.jsx"
import loginService from "./services/login"
import NewBlogForm from "./components/newBlogForm.jsx"
import Togglable from "./components/togglable.jsx"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [serverMessage, setServerMessage] = useState("")
  const blogFormRef = useRef()

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

  const handleNewBlog = async (data) => {
    try {
      const newBlog = await blogService.saveBlog(user, data)

      setBlogs([...blogs, newBlog.data])
      setServerMessage(
        `A new blog added: ${newBlog.data.title}! by ${newBlog.data.author}!`
      )
      setTimeout(() => {
        setServerMessage("")
      }, 3000)
      blogFormRef.current.handleToggleVisibility()
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
  const handleDelete = async (blogToDelete) => {
    try {
      if (
        window.confirm(`do you want delete this blog ${blogToDelete.title}?`)
      ) {
        await blogService.deleteBlog(user, blogToDelete.id)
        setBlogs(blogs.filter((e) => e.id !== blogToDelete.id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      {user === null ? (
        ""
      ) : (
        <div>
          {serverMessage === "" ? (
            ""
          ) : serverMessage.startsWith("A new blog added:") ? (
            <ValidationMessage serverMessage={serverMessage} />
          ) : (
            ""
          )}
          <h2>Welcome {user.username}</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                user={user}
                handleDelete={handleDelete}
                blog={blog}
              />
            ))}
        </div>
      )}
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            getUser={getUser}
            getPassword={getPassword}
            username={username}
            password={password}
          />
        </Togglable>
      ) : (
        <button
          style={{
            color: "white",
            fontSize: "20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4286f6",
          }}
          onClick={handleLocalStorage}
        >
          logOut
        </button>
      )}

      {user === null ? (
        ""
      ) : (
        <Togglable buttonLabel="newNote" ref={blogFormRef}>
          <NewBlogForm handleNewBlog={handleNewBlog} />
        </Togglable>
      )}

      {serverMessage === "" || serverMessage.startsWith("A new blog added:") ? (
        ""
      ) : (
        <ValidationMessage serverMessage={serverMessage} />
      )}
    </div>
  )
}

export default App
