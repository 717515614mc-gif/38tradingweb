<template>
  <div class="upload-container">
    <div class="content">
      <div class="upload-area" @click="triggerFileInput">
        <input 
          ref="fileInput"
          type="file" 
          accept="image/*,video/*" 
          multiple
          style="display: none"
          @change="handleFileSelect"
        />
        <div class="upload-icon">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="8" y="16" width="40" height="32" rx="4"/>
            <circle cx="20" cy="28" r="4"/>
            <path d="M8 40 L20 28 L32 40"/>
            <line x1="48" y1="12" x2="48" y2="24"/>
            <line x1="54" y1="18" x2="42" y2="18"/>
          </svg>
        </div>
        <p class="upload-text-en">Add image or video</p>
        <p class="upload-text-zh">添加图或视频</p>
      </div>

      <div v-if="uploadedFiles.length > 0" class="uploaded-files-section">
        <div v-for="(file, index) in uploadedFiles" :key="index" class="file-item">
          <div class="file-preview">
            <img v-if="file.type.startsWith('image/')" :src="file.preview" :alt="file.name" />
            <div v-else class="video-placeholder">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <button class="delete-button" @click="removeFile(index)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="text-input-section">
        <textarea 
          v-model="memoryText"
          class="memory-input"
          placeholder="Please write down your cherished memories...
请写下您珍贵的回忆..."
        ></textarea>
      </div>

      <div class="bottom-section">
        <label class="agreement-checkbox">
          <input type="checkbox" v-model="agreedToTerms" @change="updateUploadButton" />
          <span class="checkbox-custom"></span>
          <span class="agreement-text">
            <span class="text-en" style="color: #a855f7; cursor: pointer; text-decoration: underline;" @click.prevent="showAgreement">Agree to the relativistic arbitrage agreement</span>
            <br/>
            <span class="text-zh" style="color: #a855f7; cursor: pointer; text-decoration: underline;" @click.prevent="showAgreement">同意相对论套利协议</span>
          </span>
        </label>

        <button 
          class="upload-button" 
          :disabled="!canUpload"
          @click="handleUpload"
        >
          <div class="upload-icon-circle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </div>
          <span class="button-text-en">Click to Upload</span>
          <span class="button-text-zh">点击上传</span>
        </button>
      </div>
    </div>

    <!-- 协议模态框 -->
    <div v-if="agreementModalVisible" class="agreement-modal" @click.self="hideAgreement">
      <div class="modal-content">
        <button @click="hideAgreement" class="close-button">×</button>
        
        <h2 class="modal-title">相对论套利协议 / Relativistic Arbitrage Agreement</h2>
        
        <div class="modal-body">
          <h3>一、协议核心声明 Core Statement of the Agreement</h3>
          
          <p>1. Protocol nature: This protocol is a decentralized time asset trading protocol based on the physical effects of special relativity and general relativity, aiming to convert the unique 38μs/day relativity time surplus in space into tradable digital assets (STIME tokens) through the difference in gravitational force between the satellite and the ground, providing users with a physical path to break free from the consensus time constraint of Earth. This agreement is not a financial product, but a derivative application of relativistic physical effects, possessing both philosophical significance and technical realization. All transaction behaviors are based on the physical rights granted by the laws of the universe and do not rely on the endorsement of any centralized institution.</p>
          <p>1. 协议性质:本协议是基于狭义相对论与广义相对论物理效应构建的去中心化时间资产交易协议,旨在通过卫星与地面的引力差,将太空独有的38μs/日相对论时间盈余转化为可交易的数字资产(STIME代币),为用户提供挣脱地球共识时间奴役的物理路径。本协议并非金融理财产品,而是一项兼具哲学意义与技术实现的物理实验衍生应用,所有交易行为均基于宇宙法则赋予的物理权利,不依赖任何中心化机构背书。</p>
          
          <p>2. Core Asset Definition: STIME tokens (relativistic time coins) are the core assets of this protocol. Each token corresponds to the ownership of 1 microsecond of time that is not accounted for in the Earth's consensus time system but actually passes in the weak gravitational environment of geosynchronous orbit satellites. The generation of this asset is rigidly guaranteed by the relativistic effect, with a fixed daily output of 38 tokens, which cannot be forged or minted further, endowing it with absolute scarcity and physical anchor attributes.</p>
          <p>2. 核心资产定义:STIME代币(相对论时间币)是本协议的核心资产,每一枚代币对应在地球共识时间体系中不存在、但在地球同步轨道卫星弱引力环境下真实流逝的1微秒时间所有权。该资产的生成由相对论效应刚性保障,每日固定产量为38枚,不可伪造、不可增发,具备绝对稀缺性与物理锚定属性。</p>
          
          <p>3. User Commitment: The user confirms that they fully understand the physical principle of relativistic time difference, the asset generation mechanism, and the memory-erasure cost mechanism associated with the transaction, and voluntarily participates in asset transactions under this agreement. The user acknowledges that the essence of the transaction is to exchange existing existence for free time in space, and voluntarily accepts the direct consequence of "the permanent erasure of my personal digital files uploaded to the platform" without any objection.</p>
          <p>3. 用户承诺:用户确认已充分理解相对论时间差的物理原理、资产生成机制及交易伴随的记忆抹除代价机制,自愿参与本协议下的资产交易;认可交易本质是以既有存在换取太空自由时间的套利行为,自愿接受"本人主动上传至平台的个人数字档案被永久抹除"的直接影响,无任何异议。</p>
          
          <h3>二、交易代价机制 Transaction Consideration Mechanism</h3>
          <p>1. Memory Erasure Cost: For every 1 microsecond of STIME tokens traded, a personal digital file (including but not limited to photos, diaries, manuscripts, etc.) actively uploaded to the trading platform will be permanently and irreversibly deleted through the application background system. The erasure log is synchronized to the platform in real time, and users can view the cumulative amount of sacrificed memories and related records. This mechanism embodies the core philosophy that arbitrage necessitates the cost of depriving existing existence.</p>
          <p>1. 记忆抹除代价:每成交1微秒对应的STIME代币,用户的主动上传至本交易平台的一段个人数字档案(包括但不限于照片、日记、手稿等)将通过APP后台系统进行永久、不可逆的物理抹除。抹除日志实时同步至平台,用户可查看累计献祭记忆数量及相关记录。该机制体现套利需以剥夺既有存在为代价的核心哲学。</p>
        </div>
        
        <div class="modal-buttons">
          <button @click="disagreeAgreement" class="disagree-button">Disagree / 不同意</button>
          <button @click="agreeAgreement" class="agree-button">Agree / 同意</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const fileInput = ref(null)
const uploadedFiles = ref([])
const memoryText = ref('')
const agreedToTerms = ref(false)
const agreementModalVisible = ref(false)

const canUpload = computed(() => {
  return agreedToTerms.value && uploadedFiles.value.length > 0
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedFiles.value.push({
        name: file.name,
        type: file.type,
        preview: e.target.result,
        file: file
      })
    }
    reader.readAsDataURL(file)
  })
  
  event.target.value = ''
}

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
}

const updateUploadButton = () => {
  // This is called when checkbox changes
}

const handleUpload = () => {
  if (!agreedToTerms.value) {
    alert('请同意相对论套利协议')
    return
  }
  
  if (uploadedFiles.value.length === 0) {
    alert('请至少上传一张图片或视频')
    return
  }
  
  console.log('Uploading...', {
    files: uploadedFiles.value.map(f => f.name),
    memory: memoryText.value
  })
  
  localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles.value))
  localStorage.setItem('memoryText', memoryText.value)
  
  router.push('/uploading')
}

const showAgreement = () => {
  agreementModalVisible.value = true
  document.body.style.overflow = 'hidden'
}

const hideAgreement = () => {
  agreementModalVisible.value = false
  document.body.style.overflow = 'auto'
}

const disagreeAgreement = () => {
  agreedToTerms.value = false
  hideAgreement()
}

const agreeAgreement = () => {
  agreedToTerms.value = true
  hideAgreement()
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.upload-container {
  width: 100%;
  min-height: 100vh;
  background: #0F0E20;
  overflow-y: auto;
}

.content {
  padding: 60px 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 0;
  min-height: calc(100vh - 100px);
}

.upload-area {
  background: rgba(26, 29, 46, 0.6);
  border: 2px dashed rgba(168, 85, 247, 0.4);
  border-radius: 20px;
  padding: 80px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.upload-area:hover {
  border-color: rgba(168, 85, 247, 0.6);
  background: rgba(26, 29, 46, 0.8);
}

.upload-icon {
  width: 70px;
  height: 70px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 16px;
}

.upload-icon svg {
  width: 100%;
  height: 100%;
  stroke-width: 1.5;
}

.upload-text-en {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  font-weight: 400;
}

.upload-text-zh {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.uploaded-files-section {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.file-item {
  position: relative;
}

.file-preview {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(26, 29, 46, 0.6);
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.file-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
}

.video-placeholder svg {
  width: 40px;
  height: 40px;
}

.delete-button {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 28px;
  height: 28px;
  background: rgba(239, 68, 68, 0.9);
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 0;
}

.delete-button:hover {
  background: rgba(239, 68, 68, 1);
  transform: scale(1.1);
}

.delete-button svg {
  width: 14px;
  height: 14px;
}

.text-input-section {
  margin-bottom: 40px;
}

.memory-input {
  width: 100%;
  min-height: 80px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-family: inherit;
  resize: none;
  outline: none;
  padding: 0;
  line-height: 1.6;
}

.memory-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.6;
}

.bottom-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding: 0;
  flex: 1;
  justify-content: center;
}

.agreement-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.agreement-checkbox input[type="checkbox"] {
  display: none;
}

.checkbox-custom {
  width: 24px;
  height: 24px;
  min-width: 24px;
  border: 2px solid rgba(168, 85, 247, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin-top: 2px;
}

.agreement-checkbox input[type="checkbox"]:checked + .checkbox-custom {
  background: rgba(168, 85, 247, 0.3);
  border-color: rgba(168, 85, 247, 0.8);
}

.agreement-checkbox input[type="checkbox"]:checked + .checkbox-custom::after {
  content: '';
  width: 10px;
  height: 10px;
  background: #a855f7;
  border-radius: 50%;
}

.agreement-text {
  font-size: 13px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
}

.agreement-text .text-en {
  display: block;
}

.agreement-text .text-zh {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.upload-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.upload-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.upload-button:not(:disabled):hover .upload-icon-circle {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(168, 85, 247, 0.6);
}

.upload-icon-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 3px solid rgba(168, 85, 247, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(168, 85, 247, 0.5);
  background: rgba(168, 85, 247, 0.1);
}

.upload-icon-circle svg {
  width: 36px;
  height: 36px;
  stroke-width: 2.5;
}

.button-text-en {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  letter-spacing: 0.3px;
}

.button-text-zh {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.agreement-modal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 14, 32, 0.95);
  z-index: 1000;
  overflow-y: auto;
}

.modal-content {
  position: relative;
  max-width: 800px;
  margin: 50px auto;
  background: rgba(26, 29, 46, 0.95);
  border: 2px solid rgba(168, 85, 247, 0.4);
  padding: 40px;
  border-radius: 20px;
  color: white;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #a855f7;
  font-size: 24px;
  cursor: pointer;
}

.modal-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #a855f7;
}

.modal-body {
  line-height: 1.8;
  font-size: 14px;
}

.modal-body h3 {
  margin-top: 20px;
  margin-bottom: 10px;
  color: #a855f7;
}

.modal-body p {
  margin-bottom: 10px;
}

.modal-buttons {
  text-align: center;
  margin-top: 40px;
  display: flex;
  gap: 20px;
  justify-content: center;
}

.disagree-button {
  padding: 15px 30px;
  background: transparent;
  color: #ef4444;
  border: 2px solid #ef4444;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
}

.agree-button {
  padding: 15px 30px;
  background: #a855f7;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
}

@media (max-width: 480px) {
  .upload-area {
    padding: 40px 30px;
  }

  .upload-icon {
    width: 60px;
    height: 60px;
  }
}
</style>
