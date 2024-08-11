import axios from "axios"
const baseUrl = "/api/blogs"

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const saveBlog = async (user, data) => {
  console.log(user)
  const response = await axios.post(baseUrl, data, {
    headers: { Authorization: `Bearer ${user.token}` },
  })
  return response
}

export default { getAll, saveBlog }
