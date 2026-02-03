<template>
  <div class="final-container" @click="goToQuote">
    <div class="content">
      <div class="title-section">
        <h1 class="main-title">The Commercial Trade of Time</h1>
        <h2 class="microseconds">38 microseconds</h2>
        <p class="subtitle-zh">38微秒时间的贸易</p>
      </div>

      <div class="coin-section">
        <div class="coin-3d">
          <div class="coin-flipper">
            <div class="coin-front">
              <img src="./images/yb-zheng.png" alt="coin front" />
            </div>
            <div class="coin-back">
              <img src="./images/yb-fan.png" alt="coin back" />
            </div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
            <div class="coin-edge"></div>
          </div>
        </div>
        <p class="coin-label-en">Relativity Time Coin</p>
        <p class="coin-label-zh">相对论时间币</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToQuote = () => {
  router.push('/quote')
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.final-container {
  width: 100%;
  min-height: 100vh;
  background: #0F0E20;
  position: relative;
  padding: 60px 20px 40px;
  overflow-y: auto;
  cursor: pointer;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding-top: 20px;
}

.title-section {
  text-align: center;
}

.main-title {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 12px 0;
  font-weight: 400;
  letter-spacing: 0.5px;
}

.microseconds {
  font-size: 32px;
  color: #06b6d4;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.subtitle-zh {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.coin-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.coin-3d {
  width: 250px;
  height: 250px;
  perspective: 1000px;
  filter: drop-shadow(0 0 25px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 45px rgba(192, 192, 192, 0.3));
}

.coin-flipper {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: coinFlip 6s linear infinite;
}

@keyframes coinFlip {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}

.coin-front,
.coin-back,
.coin-edge {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.coin-front,
.coin-back {
  backface-visibility: hidden;
  overflow: hidden;
}

.coin-front {
  transform: translateZ(6px);
  z-index: 2;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5);
}

.coin-back {
  transform: rotateY(180deg) translateZ(6px);
  z-index: 1;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5);
}

.coin-edge {
  background: linear-gradient(to right, #2c2f3a, #e0e0e0, #2c2f3a);
  backface-visibility: visible;
}

.coin-edge:nth-of-type(3) { transform: translateZ(5px); }
.coin-edge:nth-of-type(4) { transform: translateZ(4px); }
.coin-edge:nth-of-type(5) { transform: translateZ(3px); }
.coin-edge:nth-of-type(6) { transform: translateZ(2px); }
.coin-edge:nth-of-type(7) { transform: translateZ(1px); }
.coin-edge:nth-of-type(8) { transform: translateZ(0px); }
.coin-edge:nth-of-type(9) { transform: translateZ(-1px); }
.coin-edge:nth-of-type(10) { transform: translateZ(-2px); }
.coin-edge:nth-of-type(11) { transform: translateZ(-3px); }
.coin-edge:nth-of-type(12) { transform: translateZ(-4px); }
.coin-edge:nth-of-type(13) { transform: translateZ(-5px); }

.coin-front img,
.coin-back img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.coin-label-en {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.coin-label-zh {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}
</style>
