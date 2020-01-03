import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'
let token = null
let config = {}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (blogId, updateObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${blogId}`, updateObject, config)
  return response.data
}

const remove = (blogId) => {
  const request = axios.delete(`${baseUrl}/${blogId}`, config)
  return request.then(response => response.data)
}

export default { getAll, create, setToken, update, remove }
