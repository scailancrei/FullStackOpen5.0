const LoginForm = ({
  handleSubmit,
  username,
  password,
  getUser,
  getPassword,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
