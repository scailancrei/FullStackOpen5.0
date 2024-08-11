import axios from "axios"
const baseUrl = "/api/login"

const login = async (credentials) => {
  const data = {
    username: credentials.username,
    password: credentials.password,
  }
  const userToken = await axios.post(baseUrl, data)

  return userToken.data
}

export default { login }
