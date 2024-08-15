import PropTypes from "prop-types"

const LoginForm = ({
  handleLogin,
  username,
  password,
  getUser,
  getPassword,
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => getUser(e.target.value)}
          required
          placeholder="Enter username..."
        />
        <br />
        <label htmlFor="password">password:</label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => getPassword(e.target.value)}
          placeholder="Enter a password..."
        />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  getUser: PropTypes.func.isRequired,
  getPassword: PropTypes.func.isRequired,
}

export default LoginForm
