<template>
  <div class="destroying-container">
    <div class="content">
      <div class="image-preview" :class="{ glitch: showGlitch }">
        <img :src="uploadedImageUrl" alt="Uploaded" />
        <div class="glitch-overlay"></div>
      </div>
      
      <div class="progress-section">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <div class="text-section">
          <p class="status-text-en">Destroying...</p>
          <p class="status-text-zh">销毁中</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const uploadedImageUrl = ref('https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=500&fit=crop')
const progress = ref(0)
const showGlitch = ref(false)

onMounted(() => {
  const storedFiles = localStorage.getItem('uploadedFiles')
  if (storedFiles) {
    const files = JSON.parse(storedFiles)
    if (files && files.length > 0) {
      uploadedImageUrl.value = files[0].preview
    }
  }

  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 2
      
      if (progress.value > 30) {
        showGlitch.value = Math.random() > 0.7
      }
    } else {
      clearInterval(interval)
      setTimeout(() => {
        router.push('/complete')
      }, 500)
    }
  }, 50)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.destroying-container {
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
  gap: 60px;
  padding: 0 30px;
}

.image-preview {
  width: 320px;
  height: 400px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  position: relative;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-preview.glitch img {
  animation: imageGlitch 0.1s infinite;
}

@keyframes imageGlitch {
  0%, 100% {
    transform: translate(0);
  }
  25% {
    transform: translate(-3px, 2px);
  }
  50% {
    transform: translate(3px, -2px);
  }
  75% {
    transform: translate(-2px, -3px);
  }
}

.glitch-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(239, 68, 68, 0.1) 20%,
    rgba(217, 70, 239, 0.2) 40%,
    rgba(239, 68, 68, 0.1) 60%,
    transparent 100%
  );
  animation: glitchScan 0.8s linear infinite;
  pointer-events: none;
}

@keyframes glitchScan {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-section {
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: rgba(26, 29, 46, 0.8);
  border-radius: 6px;
  border: 1px solid rgba(239, 68, 68, 0.4);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.text-section {
  text-align: center;
}

.status-text-en {
  font-size: 18px;
  color: rgba(239, 68, 68, 0.9);
  margin: 0 0 6px 0;
  font-weight: 400;
}

.status-text-zh {
  font-size: 14px;
  color: rgba(239, 68, 68, 0.7);
  margin: 0;
}

@media (max-width: 480px) {
  .image-preview {
    width: 280px;
    height: 350px;
  }
}
</style>
