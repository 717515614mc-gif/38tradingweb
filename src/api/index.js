const API_BASE_URL = 'http://demo01-222374-8-1400573097.sh.run.tcloudbase.com/api'

// 通用请求函数
async function request(url, options = {}) {
  const token = localStorage.getItem('token')
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed')
    }
    
    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// 认证相关 API
export const authAPI = {
  login: (username, password) => 
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    }),
    
  register: (username, password) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
}

// 文件上传相关 API
export const uploadAPI = {
  uploadFiles: (formData) =>
    fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    }).then(res => res.json())
}

// 邮箱地址提交 API
export const addressAPI = {
  submitAddress: (address) =>
    request('/submission/submit', {
      method: 'POST',
      body: JSON.stringify({ address })
    })
}

export default {
  authAPI,
  uploadAPI,
  addressAPI
}
