import axios from "axios"
const baseUrl = "/api/blogs"

let token = {}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const saveBlog = () => {
  const data = axios.post(baseUrl)
}

export default { getAll }
