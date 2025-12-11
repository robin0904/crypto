// Professional 3D Effects and Interactive Animations Manager
class CryptoAnimationEngine {
  constructor() {
    this.particles = [];
    this.achievements = [];
    this.marketMood = 'neutral';
    this.lastPrice = 0;
    this.animationFrameId = null;
    this.canvas = null;
    this.ctx = null;
    this.backgroundParticles = [];
    this.priceWaves = [];
    this.init();
  }

  init() {
    this.createAnimationCanvas();
    this.createProfessionalCharacters();
    this.createAdvancedParticleSystem();
    this.createInteractiveElements();
    this.createMarketVisualization();
    this.setupAdvancedInteractions();
    this.startProfessionalAnimationLoop();
  }

  createAnimationCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'crypto-animation-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1';
    this.canvas.style.opacity = '0.8';
    
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createProfessionalCharacters() {
    this.createAdvancedBullCharacter();
    this.createAdvancedBearCharacter();
    this.createCryptoMascots();
  }

  createAdvancedBullCharacter() {
    // Bull Character
    const bullCharacter = document.createElement('div');
    bullCharacter.className = 'bull-character';
    bullCharacter.innerHTML = `
      <div class="bull-body">
        <div class="bull-head">
          <div class="bull-horns">
            <div class="bull-horn left"></div>
            <div class="bull-horn right"></div>
          </div>
          <div class="bull-eyes">
            <div class="bull-eye left"></div>
            <div class="bull-eye right"></div>
          </div>
        </div>
      </div>
    `;
    
    // Bear Character
    const bearCharacter = document.createElement('div');
    bearCharacter.className = 'bear-character';
    bearCharacter.innerHTML = `
      <div class="bear-body">
        <div class="bear-head">
          <div class="bear-ears">
            <div class="bear-ear left"></div>
            <div class="bear-ear right"></div>
          </div>
          <div class="bear-eyes">
            <div class="bear-eye left"></div>
            <div class="bear-eye right"></div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(bullCharacter);
    document.body.appendChild(bearCharacter);

    // Character interactions
    bullCharacter.addEventListener('click', () => {
      this.triggerBullCelebration();
    });

    bearCharacter.addEventListener('click', () => {
      this.triggerBearReaction();
    });
  }

  // Create Floating Coins
  createFloatingCoins() {
    const floatingCoins = document.createElement('div');
    floatingCoins.className = 'floating-coins';
    document.body.appendChild(floatingCoins);

    setInterval(() => {
      this.spawnFloatingCoin();
    }, 3000);
  }

  spawnFloatingCoin() {
    const coin = document.createElement('div');
    coin.className = 'floating-coin';
    coin.style.left = Math.random() * window.innerWidth + 'px';
    
    const coins = ['₿', '₹', '$', '€', '🚀'];
    coin.textContent = coins[Math.floor(Math.random() * coins.length)];
    
    document.querySelector('.floating-coins').appendChild(coin);

    setTimeout(() => {
      coin.remove();
    }, 8000);
  }

  // Create Particle System
  createParticleSystem() {
    const particleSystem = document.createElement('div');
    particleSystem.className = 'particle-system';
    document.body.appendChild(particleSystem);
  }

  createParticles(x, y, type = 'green', count = 10) {
    const particleSystem = document.querySelector('.particle-system');
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = `particle ${type}`;
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.animationDelay = (i * 0.1) + 's';
      
      particleSystem.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 3000);
    }
  }

  // Market Mood Indicator
  createMoodIndicator() {
    const moodIndicator = document.createElement('div');
    moodIndicator.className = 'market-mood neutral';
    moodIndicator.innerHTML = '😐';
    moodIndicator.title = 'Market Mood: Neutral';
    
    moodIndicator.addEventListener('click', () => {
      this.cycleMood();
    });
    
    document.body.appendChild(moodIndicator);
  }

  updateMood(priceChange) {
    const moodIndicator = document.querySelector('.market-mood');
    
    if (priceChange > 5) {
      this.marketMood = 'very-bullish';
      moodIndicator.innerHTML = '🤑';
      moodIndicator.className = 'market-mood bullish';
      moodIndicator.title = 'Market Mood: Very Bullish!';
      this.showBullCharacter();
    } else if (priceChange > 0) {
      this.marketMood = 'bullish';
      moodIndicator.innerHTML = '😊';
      moodIndicator.className = 'market-mood bullish';
      moodIndicator.title = 'Market Mood: Bullish';
      this.showBullCharacter();
    } else if (priceChange < -5) {
      this.marketMood = 'very-bearish';
      moodIndicator.innerHTML = '😱';
      moodIndicator.className = 'market-mood bearish';
      moodIndicator.title = 'Market Mood: Very Bearish!';
      this.showBearCharacter();
    } else if (priceChange < 0) {
      this.marketMood = 'bearish';
      moodIndicator.innerHTML = '😟';
      moodIndicator.className = 'market-mood bearish';
      moodIndicator.title = 'Market Mood: Bearish';
      this.showBearCharacter();
    } else {
      this.marketMood = 'neutral';
      moodIndicator.innerHTML = '😐';
      moodIndicator.className = 'market-mood neutral';
      moodIndicator.title = 'Market Mood: Neutral';
      this.hideCharacters();
    }
  }

  cycleMood() {
    const moods = [
      { emoji: '😐', class: 'neutral', title: 'Neutral' },
      { emoji: '😊', class: 'bullish', title: 'Bullish' },
      { emoji: '🤑', class: 'bullish', title: 'Very Bullish' },
      { emoji: '😟', class: 'bearish', title: 'Bearish' },
      { emoji: '😱', class: 'bearish', title: 'Very Bearish' }
    ];
    
    const currentIndex = moods.findIndex(mood => mood.title.toLowerCase().includes(this.marketMood));
    const nextIndex = (currentIndex + 1) % moods.length;
    const nextMood = moods[nextIndex];
    
    const moodIndicator = document.querySelector('.market-mood');
    moodIndicator.innerHTML = nextMood.emoji;
    moodIndicator.className = `market-mood ${nextMood.class}`;
    moodIndicator.title = `Market Mood: ${nextMood.title}`;
    
    this.marketMood = nextMood.title.toLowerCase().replace(' ', '-');
  }

  // Character Management
  showBullCharacter() {
    const bull = document.querySelector('.bull-character');
    const bear = document.querySelector('.bear-character');
    bull.style.display = 'block';
    bear.style.display = 'none';
  }

  showBearCharacter() {
    const bull = document.querySelector('.bull-character');
    const bear = document.querySelector('.bear-character');
    bull.style.display = 'none';
    bear.style.display = 'block';
  }

  hideCharacters() {
    const bull = document.querySelector('.bull-character');
    const bear = document.querySelector('.bear-character');
    bull.style.display = 'block';
    bear.style.display = 'none';
  }

  // Character Animations
  triggerBullCelebration() {
    const bull = document.querySelector('.bull-character');
    bull.style.animation = 'none';
    setTimeout(() => {
      bull.style.animation = 'bullBreathe 0.5s ease-in-out 3, bullNod 0.3s ease-in-out 5';
    }, 10);
    
    this.createParticles(
      bull.offsetLeft + 60,
      bull.offsetTop + 30,
      'green',
      15
    );
    
    this.showAchievement('🐂 Bull Power!', 'Market is looking strong!');
  }

  triggerBearReaction() {
    const bear = document.querySelector('.bear-character');
    bear.style.animation = 'none';
    setTimeout(() => {
      bear.style.animation = 'bearSway 0.3s ease-in-out 5, bearShake 0.2s ease-in-out 8';
    }, 10);
    
    this.createParticles(
      bear.offsetLeft + 60,
      bear.offsetTop + 30,
      'red',
      15
    );
  }

  // Price Movement Animations
  triggerPriceRocket(element) {
    const rocket = document.createElement('div');
    rocket.className = 'price-rocket';
    
    const rect = element.getBoundingClientRect();
    rocket.style.left = rect.left + rect.width / 2 + 'px';
    rocket.style.top = rect.top + 'px';
    
    document.body.appendChild(rocket);
    
    setTimeout(() => {
      rocket.remove();
    }, 2000);
  }

  triggerPriceCrash(element) {
    const crash = document.createElement('div');
    crash.className = 'price-crash';
    
    const rect = element.getBoundingClientRect();
    crash.style.left = rect.left + rect.width / 2 + 'px';
    crash.style.top = rect.top + 'px';
    
    document.body.appendChild(crash);
    
    setTimeout(() => {
      crash.remove();
    }, 2000);
  }

  // Achievement System
  showAchievement(title, description) {
    const achievement = document.createElement('div');
    achievement.className = 'achievement-popup';
    achievement.innerHTML = `
      <div style="display: flex; align-items: center;">
        <div class="achievement-icon">🏆</div>
        <div>
          <div style="font-weight: bold; font-size: 16px;">${title}</div>
          <div style="font-size: 14px; opacity: 0.8;">${description}</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(achievement);
    
    setTimeout(() => {
      achievement.remove();
    }, 4000);
  }

  // Price Change Detection
  onPriceChange(newPrice, oldPrice) {
    const change = ((newPrice - oldPrice) / oldPrice) * 100;
    
    if (Math.abs(change) > 2) {
      const priceElements = document.querySelectorAll('.price, .current-price');
      priceElements.forEach(element => {
        if (change > 0) {
          this.triggerPriceRocket(element);
          this.createParticles(
            element.offsetLeft + element.offsetWidth / 2,
            element.offsetTop + element.offsetHeight / 2,
            'green',
            8
          );
        } else {
          this.triggerPriceCrash(element);
          this.createParticles(
            element.offsetLeft + element.offsetWidth / 2,
            element.offsetTop + element.offsetHeight / 2,
            'red',
            8
          );
        }
      });
    }
    
    this.updateMood(change);
    this.lastPrice = newPrice;
  }

  // Interactive Setup
  setupInteractions() {
    // Add hover effects to cards
    document.addEventListener('mouseover', (e) => {
      if (e.target.classList.contains('card')) {
        this.createParticles(
          e.pageX,
          e.pageY,
          'green',
          3
        );
      }
    });

    // Add click effects
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn')) {
        this.createParticles(
          e.pageX,
          e.pageY,
          'green',
          5
        );
      }
    });
  }

  // Animation Loop
  startAnimationLoop() {
    setInterval(() => {
      // Random particle bursts
      if (Math.random() < 0.1) {
        this.createParticles(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          Math.random() > 0.5 ? 'green' : 'red',
          2
        );
      }
    }, 2000);
  }

  // Gamification Features
  checkAchievements(portfolioValue, priceChange) {
    if (portfolioValue > 100000 && !this.achievements.includes('portfolio-100k')) {
      this.showAchievement('💰 Portfolio Milestone!', 'You reached ₹1 Lakh portfolio value!');
      this.achievements.push('portfolio-100k');
    }
    
    if (priceChange > 10 && !this.achievements.includes('daily-gain-10')) {
      this.showAchievement('🚀 Daily Rocket!', 'Your portfolio gained 10% today!');
      this.achievements.push('daily-gain-10');
    }
    
    if (this.marketMood === 'very-bullish' && !this.achievements.includes('bull-run')) {
      this.showAchievement('🐂 Bull Run Master!', 'You caught the bull run!');
      this.achievements.push('bull-run');
    }
  }

  // 3D Chart Enhancement
  enhance3DCharts() {
    const charts = document.querySelectorAll('canvas, .chart-container');
    charts.forEach(chart => {
      chart.classList.add('chart-3d');
      
      chart.addEventListener('mousemove', (e) => {
        const rect = chart.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const rotateY = (x - 0.5) * 20;
        const rotateX = (y - 0.5) * -20;
        
        chart.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
      });
      
      chart.addEventListener('mouseleave', () => {
        chart.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      });
    });
  }
}

// Initialize Animation Engine
let animationEngine;
document.addEventListener('DOMContentLoaded', () => {
  animationEngine = new CryptoAnimationEngine();
});

// Export for use in other scripts
window.CryptoAnimationEngine = CryptoAnimationEngine;