import axios from "axios"
const baseUrl = "/api/blogs"

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getBlogsByUser = async (user) => {
  if (user) {
    const response = await axios.get(baseUrl + "/user", {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    return response
  }
  return false
}

const saveBlog = async (user, data) => {
  const response = await axios.post(baseUrl, data, {
    headers: { Authorization: `Bearer ${user.token}` },
  })
  return response
}

const modifyLikes = async (user, data) => {
  const response = await axios.put(baseUrl + "/" + data.id, data, {
    headers: { Authorization: `Bearer ${user.token}` },
  })
  return response
}

const deleteBlog = async (user, blog) => {
  const response = await axios.delete(baseUrl + `/${blog}`, {
    headers: { Authorization: `Bearer ${user.token}` },
  })
  return response
}

export default { getAll, saveBlog, modifyLikes, deleteBlog, getBlogsByUser }
