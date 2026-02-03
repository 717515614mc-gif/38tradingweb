<template>
  <div>
    <img class="background-image" src="./images/index.png" alt="">
    <div class="app-container">
      <div class="background-overlay"></div>
      <div class="floating-cubes">
        <div class="cube cube-1"></div>
        <div class="cube cube-2"></div>
        <div class="cube cube-3"></div>
        <div class="cube cube-4"></div>
        <div class="cube cube-5"></div>
      </div>

      <div class="decorative-lines top-right">
        <div class="line-group">
          <div class="line"></div>
          <div class="line short"></div>
          <div class="line"></div>
        </div>
        <div class="stripes">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>

      <div class="decorative-lines bottom-left">
        <div class="stripes">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="line-group">
          <div class="line"></div>
        </div>
      </div>

      <div class="decorative-lines bottom-right">
        <div class="line-group">
          <div class="line"></div>
        </div>
        <div class="stripes">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>

      <header class="header">
        <div class="logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="24" height="24" rx="2" stroke="white" stroke-width="2"/>
            <path d="M12 16L16 20L24 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <nav class="nav">
          <a href="#" class="nav-item active">
            <span class="nav-text-en">Home</span>
            <span class="nav-text-zh">首页</span>
          </a>
          <a @click.prevent="goToChart" href="#" class="nav-item">
            <span class="nav-text-en">Transaction</span>
            <span class="nav-text-zh">交易</span>
          </a>
          <a @click.prevent="handleLogout" href="#" class="nav-item logout-btn">
            <span class="nav-text-en">Logout</span>
            <span class="nav-text-zh">退出</span>
          </a>
        </nav>
      </header>

      <main class="main-content">
        <div class="left-section">
          <div class="title-wrapper">
            <div class="title-decoration top">
              <div class="arrow"></div>
              <div class="line"></div>
            </div>
            <h1 class="main-title">
              <span class="title-number">38</span>
              <span class="title-text">
                <span class="title-line">Microsecond</span>
                <span class="title-line">Trading</span>
                <span class="title-line">Platform</span>
              </span>
            </h1>
            <div class="title-decoration bottom">
              <div class="line"></div>
              <div class="stripes-small">
                <span></span><span></span><span></span>
              </div>
              <div class="line"></div>
              <div class="stripes-small">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>

          <div class="quote-section">
            <p class="quote-en">"Not time, but freedom. 38 microseconds stolen from gravity's cage."</p>
            <p class="quote-zh">"卖给你的不是时间,而是从引力监狱中偷来的38微秒自由。"</p>
          </div>

          <div class="button-group">
            <button class="btn btn-primary">
              <span class="btn-text-en">Reservation</span>
              <span class="btn-text-zh">预订</span>
            </button>
            <a href="#" class="btn-link">
              <span class="link-text-en">Learn more</span>
              <span class="link-text-zh">了解更多</span>
            </a>
          </div>
        </div>

        <div class="right-section">
          <div class="content-card">
            <div class="card-content">
              <h2 class="card-title">Relativity Arbitrage Protocol</h2>
              <p class="card-title-zh">相对论套利协议</p>

              <div class="card-divider"></div>

              <p class="card-description">
                To obtain the next 38 microseconds one must pay the price of sacrificing the Earth's past memories
              </p>
              <p class="card-description-zh">
                获取未来的38微秒<br/>
                必须以牺牲地球过去的记忆为代价
              </p>

              <div class="card-divider"></div>

              <div class="time-display">
                <p class="time-text-en">38 microseconds</p>
                <p class="time-text-zh">38 微秒</p>
              </div>

              <button class="btn-transaction" @click="goToChart">
                <span>transaction</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToChart = () => {
  router.push('/chart1')
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('uploadedFiles')
  localStorage.removeItem('memoryText')
  localStorage.removeItem('mailingAddress')
  router.push('/login')
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.app-container {
  position: relative;
  height: 100vh;
  color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at 50% 50%, rgba(138, 43, 226, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.floating-cubes {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.cube {
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(138, 43, 226, 0.1);
  border: 2px solid rgba(138, 43, 226, 0.3);
  transform: rotate(45deg);
  animation: float 6s ease-in-out infinite;
}

.cube-1 {
  top: 15%;
  right: 15%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.cube-2 {
  top: 60%;
  right: 8%;
  width: 50px;
  height: 50px;
  animation-delay: 1s;
}

.cube-3 {
  bottom: 20%;
  left: 10%;
  width: 40px;
  height: 40px;
  animation-delay: 2s;
}

.cube-4 {
  top: 40%;
  left: 20%;
  width: 35px;
  height: 35px;
  animation-delay: 1.5s;
}

.cube-5 {
  top: 25%;
  right: 45%;
  width: 45px;
  height: 45px;
  animation-delay: 0.5s;
}

@keyframes float {
  0%, 100% {
    transform: rotate(45deg) translateY(0);
  }
  50% {
    transform: rotate(45deg) translateY(-20px);
  }
}

.decorative-lines {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1;
}

.decorative-lines.top-right {
  top: 40px;
  right: 40px;
}

.decorative-lines.bottom-left {
  bottom: 40px;
  left: 40px;
}

.decorative-lines.bottom-right {
  bottom: 40px;
  right: 40px;
}

.line-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.line {
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 100%);
}

.line.short {
  width: 120px;
}

.stripes {
  display: flex;
  gap: 4px;
  transform: skewX(-20deg);
}

.stripes span {
  width: 3px;
  height: 30px;
  background: rgba(255, 255, 255, 0.8);
}

.stripes-small {
  display: flex;
  gap: 3px;
  transform: skewX(-20deg);
}

.stripes-small span {
  width: 2px;
  height: 20px;
  background: rgba(255, 255, 255, 0.8);
}

.header {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 25px 50px;
  gap: 50px;
  flex-shrink: 0;
}

.logo svg {
  display: block;
}

.nav {
  display: flex;
  gap: 50px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s;
  cursor: pointer;
}

.nav-item:hover,
.nav-item.active {
  color: white;
}

.nav-text-en {
  font-size: 16px;
  font-weight: 500;
}

.nav-text-zh {
  font-size: 12px;
  margin-top: 2px;
}

.main-content {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px 30px;
  gap: 50px;
  flex: 1;
  overflow: hidden;
}

.left-section {
  flex: 1;
  max-width: 600px;
}

.title-wrapper {
  margin-bottom: 18px;
}

.title-decoration.top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.arrow {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid white;
}

.title-decoration.top .line {
  width: 250px;
  height: 2px;
  background: white;
}

.main-title {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin: 0;
}

.title-number {
  font-size: 90px;
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -3px;
}

.title-text {
  display: flex;
  flex-direction: column;
  padding-top: 10px;
}

.title-line {
  font-size: 28px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -1px;
}

.title-decoration.bottom {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.title-decoration.bottom .line {
  width: 80px;
  height: 2px;
  background: white;
}

.quote-section {
  margin-bottom: 18px;
}

.quote-en {
  font-size: 11px;
  line-height: 1.4;
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.9);
}

.quote-zh {
  font-size: 10px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.7);
}

.button-group {
  display: flex;
  align-items: center;
  gap: 30px;
}

.btn {
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
  color: white;
  padding: 12px 28px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(124, 58, 237, 0.5);
}

.btn-text-en {
  font-size: 13px;
}

.btn-text-zh {
  font-size: 10px;
  margin-top: 2px;
  opacity: 0.9;
}

.btn-link {
  text-decoration: none;
  color: white;
  display: flex;
  flex-direction: column;
  transition: opacity 0.3s;
}

.btn-link:hover {
  opacity: 0.8;
}

.link-text-en {
  font-size: 13px;
  border-bottom: 1px solid white;
  padding-bottom: 2px;
}

.link-text-zh {
  font-size: 10px;
  margin-top: 3px;
  opacity: 0.7;
}

.right-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-card {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.card-content {
  background: rgba(138, 43, 226, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(138, 43, 226, 0.3);
  padding: 15px 20px 20px;
  position: relative;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
}

.card-title-zh {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
}

.card-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%);
  margin: 10px 0;
}

.card-description {
  font-size: 10px;
  line-height: 1.4;
  margin-bottom: 4px;
  color: rgba(255, 255, 255, 0.9);
}

.card-description-zh {
  font-size: 9px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
}

.time-display {
  margin: 10px 0;
}

.time-text-en {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 2px;
}

.time-text-zh {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
}

.btn-transaction {
  background: linear-gradient(90deg, #7c3aed 0%, rgba(124, 58, 237, 0) 100%);
  border: none;
  color: white;
  padding: 8px 18px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.btn-transaction:hover {
  background: linear-gradient(90deg, #8b5cf6 0%, rgba(139, 92, 246, 0) 100%);
  transform: translateX(5px);
}

@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }

  .left-section,
  .right-section {
    max-width: 100%;
  }

  .title-number {
    font-size: 120px;
  }

  .title-line {
    font-size: 36px;
  }
}
</style>
