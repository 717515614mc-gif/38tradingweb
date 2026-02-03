<template>
  <div class="quote-container">
    <img class="background-image" src="./images/end.png" alt="">
    <div class="overlay-content">
      <div class="content">
        <div class="quote-section">
          <p class="quote-text-en">We capture the 38 microseconds caused by the gravitational difference</p>
          <p class="quote-text-zh">我们捕捉因引力差产生的38微秒</p>
          <p class="quote-text-en">This is the only time untouched by consensus</p>
          <p class="quote-text-zh">这是唯一未被共识污染的时间</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.quote-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 1;
}

.overlay-content {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 15px 30px;
  z-index: 3;
}

.quote-section {
  text-align: center;
  padding: 20px;
}

.quote-text-en {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 6px 0;
  line-height: 1.6;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.quote-text-zh {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin: 6px 0;
  line-height: 1.6;
  font-weight: 500;
  letter-spacing: 0.5px;
}
</style>
