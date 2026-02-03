<template>
  <div class="dashboard-container" @click="goToUpload">
    <section class="dashboard-title-section">
      <h1 class="main-title">Daily Submission Statistics</h1>
      <p class="main-subtitle">每日提交统计</p>
    </section>

    <!-- 日期选择器 -->
    <section class="date-selector-section" @click.stop>
      <div class="date-controls">
        <div class="date-input-group">
          <label>开始日期/State Date:</label>
          <input 
            type="date" 
            v-model="startDate" 
            @change="fetchData"
            @click.stop
            class="date-input"
          />
        </div>
        <div class="date-input-group">
          <label>结束日期/End Date:</label>
          <input 
            type="date" 
            v-model="endDate" 
            @change="fetchData"
            @click.stop
            class="date-input"
          />
        </div>
        <button @click.stop="setQuickRange('7days')" class="quick-btn">最近7天/Last 7 days</button>
        <button @click.stop="setQuickRange('14days')" class="quick-btn">最近14天/Last 14 days</button>
        <button @click.stop="setQuickRange('30days')" class="quick-btn">最近30天/Last 30 days</button>
      </div>
    </section>

    <section class="chart-section">
      <div class="glitch-overlay"></div>
      
      <div class="chart-container">
        <div v-if="loading" class="loading-overlay">
          <div class="loading-spinner"></div>
          <p>加载数据中...</p>
        </div>
        <canvas ref="bottomChartCanvas" class="bottom-chart-canvas"></canvas>
      </div>
      
      <div class="chart-description">
        <p class="desc-en">Daily approved submissions (Max: 38)</p>
        <p class="desc-zh">每日审核通过的提交数量（最高：38）</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { statisticsAPI } from '@/api/statistics'

const router = useRouter()
const bottomChartCanvas = ref(null)
const loading = ref(false)
const chartData = ref([])

// 日期选择
const startDate = ref('')
const endDate = ref('')

const goToUpload = () => {
  router.push('/upload')
}

// 设置快速日期范围
const setQuickRange = (range) => {
  const today = new Date()
  const end = new Date(today)
  let start = new Date(today)
  
  switch (range) {
    case '7days':
      start.setDate(today.getDate() - 6)
      break
    case '14days':
      start.setDate(today.getDate() - 13)
      break
    case '30days':
      start.setDate(today.getDate() - 29)
      break
  }
  
  startDate.value = start.toISOString().split('T')[0]
  endDate.value = end.toISOString().split('T')[0]
  fetchData()
}

// 获取真实数据
const fetchData = async () => {
  if (!startDate.value || !endDate.value) return
  
  loading.value = true
  try {
    const response = await statisticsAPI.getDailyApprovedSubmissions(
      startDate.value, 
      endDate.value
    )
    
    if (response.code === 200 && response.data) {
      chartData.value = response.data
    } else {
      // 如果API返回错误或无数据，使用模拟数据
      chartData.value = generateFallbackData()
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
    // API调用失败时使用模拟数据
    chartData.value = generateFallbackData()
  } finally {
    loading.value = false
    drawBottomChart(1)
  }
}

// 生成模拟数据作为后备
const generateFallbackData = () => {
  const data = []
  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const value = Math.floor(Math.random() * 39) // 0-38
    const isHighlight = value >= 35
    
    data.push({
      date: new Date(d),
      time: `${d.getMonth() + 1}/${d.getDate()}`,
      value: value,
      highlight: isHighlight
    })
  }
  
  return data
}

const generateBottomChartData = () => {
  // 使用真实数据或模拟数据
  return chartData.value.length > 0 ? chartData.value : []
}

const drawBottomChart = (progress = 1) => {
  const canvas = bottomChartCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr)
  
  const width = rect.width
  const height = rect.height
  const padding = { top: 60, right: 40, bottom: 50, left: 40 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  
  ctx.clearRect(0, 0, width, height)
  ctx.globalAlpha = progress
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
  ctx.lineWidth = 1
  
  for (let i = 0; i <= 5; i++) {
    const x = padding.left + (chartWidth / 5) * i
    ctx.beginPath()
    ctx.moveTo(x, padding.top)
    ctx.lineTo(x, height - padding.bottom)
    ctx.stroke()
  }
  
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartHeight / 4) * i
    ctx.beginPath()
    ctx.moveTo(padding.left, y)
    ctx.lineTo(width - padding.right, y)
    ctx.stroke()
  }
  
  const data = generateBottomChartData()
  const minValue = 0
  const maxValue = 38
  const valueRange = maxValue - minValue
  
  const drawPoints = Math.floor(data.length * progress)
  if (drawPoints > 1) {
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom)
    gradient.addColorStop(0, 'rgba(168, 85, 247, 0.4)')
    gradient.addColorStop(1, 'rgba(168, 85, 247, 0.05)')
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    
    data.slice(0, drawPoints).forEach((point, i) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * i
      const y = height - padding.bottom - ((point.value - minValue) / valueRange) * chartHeight
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    
    ctx.lineTo(padding.left + (chartWidth / (data.length - 1)) * (drawPoints - 1), height - padding.bottom)
    ctx.lineTo(padding.left, height - padding.bottom)
    ctx.closePath()
    ctx.fill()
  }
  
  ctx.strokeStyle = '#a855f7'
  ctx.lineWidth = 2.5
  ctx.shadowBlur = 15
  ctx.shadowColor = 'rgba(168, 85, 247, 0.9)'
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  
  ctx.beginPath()
  data.slice(0, drawPoints).forEach((point, i) => {
    const x = padding.left + (chartWidth / (data.length - 1)) * i
    const y = height - padding.bottom - ((point.value - minValue) / valueRange) * chartHeight
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()
  
  ctx.shadowBlur = 0
  
  data.slice(0, drawPoints).forEach((point, i) => {
    const x = padding.left + (chartWidth / (data.length - 1)) * i
    const y = height - padding.bottom - ((point.value - minValue) / valueRange) * chartHeight
    
    if (point.highlight) {
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, 15)
      glowGradient.addColorStop(0, 'rgba(168, 85, 247, 0.8)')
      glowGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.3)')
      glowGradient.addColorStop(1, 'rgba(168, 85, 247, 0)')
      
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(x, y, 15, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.strokeStyle = '#a855f7'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.stroke()
      
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 16px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(`${point.value}`, x, y - 20)
    }
  })
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.font = '13px Arial'
  ctx.textAlign = 'center'
  
  // 显示所有日期标签
  data.forEach((point, index) => {
    const x = padding.left + (chartWidth / (data.length - 1)) * index
    
    // 根据数据长度调整字体大小和显示策略
    if (data.length <= 7) {
      // 7天以内，显示所有日期
      ctx.font = '12px Arial'
      ctx.fillText(point.time, x, height - padding.bottom + 30)
    } else if (data.length <= 14) {
      // 14天以内，显示所有日期但字体更小
      ctx.font = '10px Arial'
      ctx.fillText(point.time, x, height - padding.bottom + 30)
    } else {
      // 超过14天，显示所有日期但字体很小，可能会重叠
      ctx.font = '8px Arial'
      ctx.fillText(point.time, x, height - padding.bottom + 30)
    }
  })
  
  // 显示今日(最后一天)的提交数
  const todayValue = data[data.length - 1]?.value || 0
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)'
  ctx.fillRect(width - 120, 20, 100, 60)
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 20px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('今日/Today', width - 70, 40)
  ctx.font = 'bold 24px Arial'
  ctx.fillText(`${todayValue}μs`, width - 70, 65)
  
  ctx.globalAlpha = 1
}

let resizeHandler = null

onMounted(() => {
  // 初始化为最近14天
  setQuickRange('14days')
  
  const duration = 2000
  const startTime = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeProgress = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2
    
    drawBottomChart(easeProgress)
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  // 延迟动画，等待数据加载
  setTimeout(() => {
    animate()
  }, 500)
  
  resizeHandler = () => {
    drawBottomChart(1)
  }
  window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard-container {
  width: 100%;
  height: 100vh;
  background: #0F0E20;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  position: relative;
  cursor: pointer;
}

.dashboard-title-section {
  text-align: center;
  margin-bottom: 20px;
}

.date-selector-section {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.date-controls {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(26, 29, 46, 0.5);
  padding: 15px 25px;
  border-radius: 10px;
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.date-input-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-input-group label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  white-space: nowrap;
}

.date-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.4);
  border-radius: 6px;
  padding: 8px 12px;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.date-input:focus {
  border-color: #a855f7;
}

.quick-btn {
  background: rgba(168, 85, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.5);
  border-radius: 6px;
  padding: 8px 16px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.quick-btn:hover {
  background: rgba(168, 85, 247, 0.4);
  border-color: #a855f7;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 14, 32, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(168, 85, 247, 0.3);
  border-top: 3px solid #a855f7;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-overlay p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.main-title {
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.main-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
}

.chart-section {
  width: 100%;
  max-width: 1200px;
  position: relative;
}

.chart-container {
  background: rgba(26, 29, 46, 0.5);
  border: 1px solid rgba(168, 85, 247, 0.3);
  padding: 0;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.bottom-chart-canvas {
  width: 100%;
  height: 450px;
  display: block;
}

.glitch-overlay {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
  height: 200px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(6, 182, 212, 0.1) 20%,
    rgba(217, 70, 239, 0.2) 40%,
    rgba(168, 85, 247, 0.1) 60%,
    transparent 100%
  );
  animation: glitchScan 2s linear infinite;
  pointer-events: none;
  z-index: 10;
}

@keyframes glitchScan {
  0% {
    transform: translateY(-50%) translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-50%) translateX(100%);
    opacity: 0;
  }
}

.chart-description {
  margin-top: 25px;
  text-align: center;
}

.desc-en,
.desc-zh {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin: 4px 0;
}

.desc-zh {
  font-size: 13px;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 22px;
  }

  .main-subtitle {
    font-size: 16px;
  }

  .bottom-chart-canvas {
    height: 350px;
  }

  .desc-en {
    font-size: 12px;
  }

  .desc-zh {
    font-size: 11px;
  }
}
</style>
