<template>
  <div class="login-page">
    <div class="login-container">
      <div class="logo">
        <h1>38μs Trading</h1>
        <span class="chinese-text" >38微秒交易</span>
        <p>Welcome Back</p>
        <p class="chinese-text" >欢迎回来</p>
      </div>

      <div v-if="errorMsg" class="message error-message">{{ errorMsg }}</div>
      <div v-if="successMsg" class="message success-message">{{ successMsg }}</div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label class="form-label" for="username">Username/账号</label>
          <input 
            type="text" 
            id="username" 
            v-model="formData.username"
            class="form-input" 
            placeholder="Enter your username/输入账号"
            required
          >
        </div>

        <div class="form-group">
          <label class="form-label" for="password">Password/密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="formData.password"
            class="form-input" 
            placeholder="Enter your password/输入密码"
            required
          >
        </div>

        <button type="submit" class="login-button">Login</button>
      </form>

      <div class="register-link">
        Don't have an account? <router-link to="/register">Sign up</router-link>
        <br>
        <span class="chinese-text">还没有账户？<router-link to="/register">立即注册</router-link></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authAPI } from '@/api'

const router = useRouter()
const errorMsg = ref('')
const successMsg = ref('')

const formData = reactive({
  username: '',
  password: ''
})

const showError = (message) => {
  errorMsg.value = message
  successMsg.value = ''
  setTimeout(() => {
    errorMsg.value = ''
  }, 5000)
}

const showSuccess = (message) => {
  successMsg.value = message
  errorMsg.value = ''
}

const handleLogin = async () => {
  if (!formData.username || !formData.password) {
    showError('Please fill in all fields')
    return
  }

  try {
    const data = await authAPI.login(formData.username, formData.password)
    
    showSuccess('Login successful! Redirecting...')
    localStorage.setItem('token', data.data.token)
    localStorage.setItem('user', JSON.stringify(data.data))
    
    setTimeout(() => {
      router.push('/index')
    }, 1500)
  } catch (error) {
    console.error('Login error:', error)
    showError(error.message || 'Login failed. Please check your credentials.')
  }
}

onMounted(() => {
  if (localStorage.getItem('token')) {
    router.push('/index')
  }
})
</script>

<style scoped>
.login-page {
  background: #0F0E20;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-container {
  background: rgba(26, 29, 46, 0.8);
  border-radius: 20px;
  border: 1px solid rgba(168, 85, 247, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  padding: 48px 40px;
  width: 100%;
  max-width: 420px;
}

.logo {
  text-align: center;
  margin-bottom: 32px;
}

.logo h1 {
  font-size: 28px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 8px;
}

.logo p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(168, 85, 247, 0.3);
  border-radius: 8px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  background: rgba(15, 14, 32, 0.5);
}

.form-input:focus {
  outline: none;
  border-color: rgba(168, 85, 247, 0.6);
  background: rgba(15, 14, 32, 0.8);
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.login-button {
  width: 100%;
  padding: 14px;
  background: rgba(168, 85, 247, 0.8);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
}

.login-button:hover {
  background: rgba(168, 85, 247, 1);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(168, 85, 247, 0.4);
}

.login-button:active {
  transform: translateY(0);
}

.register-link {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.register-link a {
  color: rgba(168, 85, 247, 0.9);
  text-decoration: none;
  font-weight: 600;
}

.register-link a:hover {
  color: rgba(168, 85, 247, 1);
}

.message {
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 20px;
}

.error-message {
  background: rgba(239, 68, 68, 0.2);
  color: rgba(252, 129, 129, 0.9);
  border: 1px solid rgba(239, 68, 68, 0.4);
}

.success-message {
  background: rgba(34, 197, 94, 0.2);
  color: rgba(134, 239, 172, 0.9);
  border: 1px solid rgba(34, 197, 94, 0.4);
}
.chinese-text{
  color: #FFFFFF
}
@media (max-width: 480px) {
  .login-container {
    padding: 40px 30px;
  }
}
</style>
