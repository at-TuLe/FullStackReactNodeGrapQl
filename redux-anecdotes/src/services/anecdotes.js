import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (content) => {
  return {
    content,
    id: getId(),
    votes: 0
  }
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async content => {
    const object = asObject(content)
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

export default { getAll, createNew, update }
