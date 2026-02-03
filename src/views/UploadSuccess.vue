<template>
  <div class="success-container">
    <div class="content">
      <div class="success-icon">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(168, 85, 247, 0.3)" stroke-width="4"/>
          <path d="M30 50 L45 65 L70 35" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"
                  class="checkmark"/>
        </svg>
      </div>
      
      <div class="text-section">
        <p class="status-text-en">Upload successful!</p>
        <p class="status-text-zh">上传成功!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/processing')
  }, 1500)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.success-container {
  width: 100%;
  height: 100vh;
  background: #0F0E20;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.success-icon {
  width: 120px;
  height: 120px;
}

.success-icon svg {
  width: 100%;
  height: 100%;
}

.checkmark {
  animation: drawCheck 0.5s ease-in-out forwards;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}

@keyframes drawCheck {
  to {
    stroke-dashoffset: 0;
  }
}

.text-section {
  text-align: center;
}

.status-text-en {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 8px 0;
  font-weight: 400;
}

.status-text-zh {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}
</style>
