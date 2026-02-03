import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: 'https://demo01-222374-8-1400573097.sh.run.tcloudbase.com/api',
  timeout: 10000
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 可以在这里添加token等认证信息
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error('API请求错误:', error)
    return Promise.reject(error)
  }
)

export const statisticsAPI = {
  // 获取每日审核通过的提交统计
  async getDailyApprovedSubmissions(startDate, endDate) {
    try {
      const response = await api.get('/statistics/daily-approved', {
        params: {
          startDate: startDate,
          endDate: endDate
        }
      })
      return response
    } catch (error) {
      console.error('获取每日统计数据失败:', error)
      throw error
    }
  },

  // 获取指定日期范围内的提交统计概览
  async getSubmissionOverview(startDate, endDate) {
    try {
      const response = await api.get('/statistics/overview', {
        params: {
          startDate: startDate,
          endDate: endDate
        }
      })
      return response
    } catch (error) {
      console.error('获取统计概览失败:', error)
      throw error
    }
  }
}

export default api
