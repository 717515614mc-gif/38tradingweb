<template>
  <div class="dashboard-container" @click="goToChart2">
    <section class="chart-section">
      <h2 class="section-title">Causal Rift Fluctuation</h2>
      <p class="section-subtitle">因果裂缝波动图</p>
      
      <div class="chart-container">
        <canvas ref="chartCanvas" class="chart-canvas"></canvas>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const chartCanvas = ref(null)

const goToChart2 = () => {
  router.push('/chart2')
}

const generateChartData = () => {
  const data = []
  const points = 200
  
  for (let i = 0; i < points; i++) {
    let value = 0
    
    if (i >= 70 && i <= 110) {
      const localPos = (i - 70) / 40
      value = Math.random() * 3000 + Math.sin(localPos * Math.PI * 8) * 5000 + 5000
    } else if (i >= 115 && i <= 125) {
      const localPos = (i - 115) / 10
      value = Math.sin(localPos * Math.PI) * 6000 + 4000
    } else if (i >= 140 && i <= 175) {
      const localPos = (i - 140) / 35
      value = Math.random() * 2000 + Math.sin(localPos * Math.PI * 6) * 4000 + 4000
    } else {
      value = Math.random() * 200 + 100
    }
    
    data.push(Math.max(0, value))
  }
  
  return data
}

const drawChart = (progress = 1) => {
  const canvas = chartCanvas.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const dpr = window.devicePixelRatio || 1
  
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr)
  
  const width = rect.width
  const height = rect.height
  
  ctx.clearRect(0, 0, width, height)
  ctx.globalAlpha = progress
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
  ctx.lineWidth = 0.5
  
  for (let i = 0; i <= 6; i++) {
    const y = (height / 6) * i
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
  
  for (let i = 0; i <= 10; i++) {
    const x = (width / 10) * i
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  ctx.font = '11px Arial'
  ctx.textAlign = 'left'
  const yLabels = [12000, 10000, 8000, 6000, 4000, 2000, 0]
  yLabels.forEach((label, i) => {
    const y = (height / 6) * i
    ctx.fillText(label.toString(), 5, y + 15)
  })
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.font = '10px Arial'
  ctx.fillText('Microseconds (μs)', 5, 25)
  
  const refY = height * 0.65
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)'
  ctx.lineWidth = 1
  ctx.setLineDash([5, 5])
  ctx.beginPath()
  ctx.moveTo(0, refY)
  ctx.lineTo(width, refY)
  ctx.stroke()
  ctx.setLineDash([])
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.font = '11px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('地球共识时间 (UTC)', 50, 50)
  ctx.font = '9px Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  ctx.fillText('(虚线)', 50, 62)
  
  ctx.fillStyle = 'rgba(168, 85, 247, 0.9)'
  ctx.font = '12px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('主权时间', width * 0.5, 35)
  ctx.font = '10px Arial'
  ctx.fillText('(sovereign time)', width * 0.5, 48)
  ctx.font = '9px Arial'
  ctx.fillStyle = 'rgba(168, 85, 247, 0.7)'
  ctx.fillText('↓ 紫色曲线', width * 0.5, 60)
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.font = '11px Arial'
  ctx.textAlign = 'right'
  ctx.fillText('因果裂缝', width - 50, refY - 15)
  ctx.font = '10px Arial'
  ctx.fillText('(Causal Crack)', width - 50, refY - 3)
  ctx.font = '9px Arial'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  ctx.fillText('← 折线波动', width - 50, refY + 10)
  
  const data = generateChartData()
  const maxValue = 12000
  
  ctx.strokeStyle = '#a855f7'
  ctx.lineWidth = 1.5
  ctx.shadowBlur = 8
  ctx.shadowColor = 'rgba(168, 85, 247, 0.8)'
  
  ctx.beginPath()
  const drawPoints = Math.floor(data.length * progress)
  data.forEach((value, i) => {
    if (i > drawPoints) return
    
    const x = (width / (data.length - 1)) * i
    const y = height - (value / maxValue) * height
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.stroke()
  
  ctx.shadowBlur = 0
  ctx.globalAlpha = 1
}

let resizeHandler = null

onMounted(() => {
  const duration = 1500
  const startTime = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeProgress = progress < 0.5 
      ? 2 * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 2) / 2
    
    drawChart(easeProgress)
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  
  animate()
  
  resizeHandler = () => {
    drawChart(1)
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
  cursor: pointer;
  padding: 40px 20px;
}

.chart-section {
  width: 100%;
  max-width: 1200px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;
  text-align: center;
}

.section-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 40px;
  text-align: center;
}

.chart-container {
  background: rgba(26, 29, 46, 0.5);
  border: 1px solid rgba(168, 85, 247, 0.3);
  padding: 0;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.chart-canvas {
  width: 100%;
  height: 500px;
  display: block;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 22px;
  }

  .section-subtitle {
    font-size: 16px;
  }

  .chart-canvas {
    height: 350px;
  }
}
</style>
