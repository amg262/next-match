// services/agent.ts

const BASE_URL = 'https://your-api-url.com'

const get = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const post = async (url: string, body: any) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const put = async (url: string, body: any) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const del = async (url: string) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const User = {
  getUser: (id: string) => get(`/users/${id}`),
  createUser: (user: any) => post('/users', user),
  updateUser: (id: string, user: any) => put(`/users/${id}`, user),
  deleteUser: (id: string) => del(`/users/${id}`),
}