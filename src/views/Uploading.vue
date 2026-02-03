<template>
  <div class="uploading-container">
    <div v-if="uploadedImageUrl" class="uploaded-image">
      <img :src="uploadedImageUrl" alt="Uploaded" />
    </div>
    
    <div class="content">
      <div class="loading-circle">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(168, 85, 247, 0.2)" stroke-width="8"/>
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" stroke-width="8" 
                  stroke-dasharray="283" stroke-dashoffset="70" stroke-linecap="round"
                  class="progress-circle"/>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#a855f7;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#d946ef;stop-opacity:1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div class="text-section">
        <p class="status-text-en">Uploading</p>
        <p class="status-text-zh">上传中</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const uploadedImageUrl = ref('')

onMounted(() => {
  const storedFiles = localStorage.getItem('uploadedFiles')
  if (storedFiles) {
    const files = JSON.parse(storedFiles)
    if (files && files.length > 0) {
      uploadedImageUrl.value = files[0].preview
    }
  }

  setTimeout(() => {
    router.push('/upload-success')
  }, 2000)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.uploading-container {
  width: 100%;
  height: 100vh;
  background: #0F0E20;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.uploaded-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0.2;
  z-index: 1;
}

.uploaded-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(8px);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  position: relative;
  z-index: 2;
}

.loading-circle {
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 40px;
  z-index: 2;
  animation: rotate 1.5s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loading-circle svg {
  width: 100%;
  height: 100%;
}

.progress-circle {
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes dash {
  0% {
    stroke-dashoffset: 283;
  }
  50% {
    stroke-dashoffset: 70;
  }
  100% {
    stroke-dashoffset: 283;
  }
}

.text-section {
  text-align: center;
  position: relative;
  z-index: 2;
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
