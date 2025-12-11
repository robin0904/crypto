// Professional Crypto Animation System
class ProfessionalCryptoAnimations {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.cryptoLogos = [];
    this.priceWaves = [];
    this.marketIndicators = [];
    this.animationId = null;
    this.mousePosition = { x: 0, y: 0 };
    this.marketData = { trend: 'neutral', volatility: 0.5, volume: 0.5 };
    
    this.init();
  }

  init() {
    this.createCanvas();
    this.initializeParticles();
    this.createCryptoLogos();
    this.createMarketVisualization();
    this.setupEventListeners();
    this.startAnimation();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'professional-crypto-canvas';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      opacity: 0.9;
    `;
    
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initializeParticles() {
    // Create different types of particles
    for (let i = 0; i < 50; i++) {
      this.particles.push(this.createParticle('glow'));
    }
    
    for (let i = 0; i < 30; i++) {
      this.particles.push(this.createParticle('crypto'));
    }
    
    for (let i = 0; i < 20; i++) {
      this.particles.push(this.createParticle('data'));
    }
  }

  createParticle(type) {
    const particle = {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      type: type,
      color: this.getParticleColor(type),
      life: 1,
      maxLife: Math.random() * 200 + 100
    };
    
    if (type === 'crypto') {
      particle.symbol = this.getCryptoSymbol();
      particle.rotation = Math.random() * Math.PI * 2;
      particle.rotationSpeed = (Math.random() - 0.5) * 0.1;
    }
    
    return particle;
  }

  getParticleColor(type) {
    const colors = {
      glow: ['#00ff88', '#0099ff', '#ff6b6b', '#feca57'],
      crypto: ['#f7931a', '#627eea', '#00d4aa', '#ff6b6b'],
      data: ['#00ff88', '#0099ff', '#feca57']
    };
    
    return colors[type][Math.floor(Math.random() * colors[type].length)];
  }

  getCryptoSymbol() {
    const symbols = ['₿', '⟠', '◊', '🔗', '💎', '🚀', '⚡', '🌙'];
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  createCryptoLogos() {
    // Create floating crypto logos with advanced animations
    const logoContainer = document.createElement('div');
    logoContainer.className = 'crypto-logos-container';
    logoContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
    `;
    
    document.body.appendChild(logoContainer);
    
    // Create animated crypto logos
    this.createFloatingLogo('₿', '#f7931a', logoContainer);
    this.createFloatingLogo('⟠', '#627eea', logoContainer);
    this.createFloatingLogo('◊', '#00d4aa', logoContainer);
    this.createFloatingLogo('🔗', '#375bd2', logoContainer);
  }

  createFloatingLogo(symbol, color, container) {
    const logo = document.createElement('div');
    logo.className = 'floating-crypto-logo';
    logo.textContent = symbol;
    logo.style.cssText = `
      position: absolute;
      font-size: 40px;
      color: ${color};
      filter: drop-shadow(0 0 20px ${color}80);
      animation: floatCrypto ${8 + Math.random() * 4}s ease-in-out infinite;
      left: ${Math.random() * 90}%;
      top: ${Math.random() * 90}%;
      opacity: 0.7;
    `;
    
    container.appendChild(logo);
    
    // Add interactive hover effect
    logo.addEventListener('mouseenter', () => {
      logo.style.transform = 'scale(1.5) rotate(360deg)';
      logo.style.transition = 'all 0.5s ease';
      this.createParticleExplosion(logo.offsetLeft, logo.offsetTop, color);
    });
    
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'scale(1) rotate(0deg)';
    });
  }

  createMarketVisualization() {
    // Create market trend visualization
    this.marketIndicator = document.createElement('div');
    this.marketIndicator.className = 'market-trend-indicator';
    this.marketIndicator.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      width: 200px;
      height: 100px;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 15px;
      border: 2px solid #00ff88;
      padding: 15px;
      z-index: 100;
      backdrop-filter: blur(10px);
    `;
    
    this.marketIndicator.innerHTML = `
      <div style="color: #00ff88; font-weight: bold; margin-bottom: 10px;">Market Pulse</div>
      <div class="pulse-line" style="height: 40px; background: linear-gradient(90deg, #00ff88, #0099ff); border-radius: 5px; position: relative; overflow: hidden;">
        <div class="pulse-wave" style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); animation: pulseWave 2s linear infinite;"></div>
      </div>
      <div style="color: #feca57; font-size: 12px; margin-top: 5px;">Live Market Data</div>
    `;
    
    document.body.appendChild(this.marketIndicator);
  }

  setupEventListeners() {
    // Mouse tracking for interactive effects
    document.addEventListener('mousemove', (e) => {
      this.mousePosition.x = e.clientX;
      this.mousePosition.y = e.clientY;
      
      // Create trail particles
      if (Math.random() < 0.3) {
        this.particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          size: Math.random() * 3 + 1,
          opacity: 0.8,
          type: 'trail',
          color: '#00ff88',
          life: 30,
          maxLife: 30
        });
      }
    });

    // Click effects
    document.addEventListener('click', (e) => {
      this.createClickExplosion(e.clientX, e.clientY);
    });

    // Scroll effects
    let scrollTimeout;
    document.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      this.createScrollParticles();
      
      scrollTimeout = setTimeout(() => {
        // Scroll ended
      }, 100);
    });
  }

  createClickExplosion(x, y) {
    const colors = ['#00ff88', '#0099ff', '#ff6b6b', '#feca57'];
    
    for (let i = 0; i < 15; i++) {
      const angle = (Math.PI * 2 * i) / 15;
      const speed = Math.random() * 8 + 4;
      
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        opacity: 1,
        type: 'explosion',
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 60,
        maxLife: 60,
        gravity: 0.2
      });
    }
  }

  createScrollParticles() {
    for (let i = 0; i < 5; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: this.canvas.height + 10,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 6 - 2,
        size: Math.random() * 3 + 1,
        opacity: 0.6,
        type: 'scroll',
        color: '#0099ff',
        life: 100,
        maxLife: 100
      });
    }
  }

  createParticleExplosion(x, y, color) {
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI * 2 * i) / 10;
      const speed = Math.random() * 6 + 3;
      
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1,
        opacity: 0.8,
        type: 'logo-explosion',
        color: color,
        life: 40,
        maxLife: 40
      });
    }
  }

  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Apply gravity for explosion particles
      if (particle.gravity) {
        particle.vy += particle.gravity;
      }
      
      // Update life
      particle.life--;
      particle.opacity = particle.life / particle.maxLife;
      
      // Rotation for crypto particles
      if (particle.type === 'crypto') {
        particle.rotation += particle.rotationSpeed;
      }
      
      // Boundary wrapping for continuous particles
      if (particle.type === 'glow' || particle.type === 'data') {
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;
        
        // Reset life for continuous particles
        if (particle.life <= 0) {
          particle.life = particle.maxLife;
          particle.opacity = Math.random() * 0.8 + 0.2;
        }
      }
      
      // Remove dead particles
      if (particle.life <= 0 && particle.type !== 'glow' && particle.type !== 'data') {
        this.particles.splice(i, 1);
      }
    }
  }

  drawParticles() {
    this.particles.forEach(particle => {
      this.ctx.save();
      
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fillStyle = particle.color;
      
      if (particle.type === 'crypto') {
        // Draw crypto symbols
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.rotation);
        this.ctx.font = `${particle.size * 8}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(particle.symbol, 0, 0);
      } else if (particle.type === 'glow') {
        // Draw glowing particles
        const gradient = this.ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        // Draw regular particles
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      
      this.ctx.restore();
    });
  }

  drawMarketWaves() {
    if (this.priceWaves.length === 0) return;
    
    this.ctx.save();
    this.ctx.strokeStyle = '#00ff88';
    this.ctx.lineWidth = 2;
    this.ctx.globalAlpha = 0.6;
    
    this.ctx.beginPath();
    this.priceWaves.forEach((point, index) => {
      const x = (index / this.priceWaves.length) * this.canvas.width;
      const y = this.canvas.height - (point * this.canvas.height * 0.3) - 50;
      
      if (index === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    });
    
    this.ctx.stroke();
    this.ctx.restore();
  }

  updateMarketData(priceChange) {
    // Update market trend based on price change
    if (priceChange > 5) {
      this.marketData.trend = 'very-bullish';
      this.createBullishEffect();
    } else if (priceChange > 0) {
      this.marketData.trend = 'bullish';
    } else if (priceChange < -5) {
      this.marketData.trend = 'very-bearish';
      this.createBearishEffect();
    } else if (priceChange < 0) {
      this.marketData.trend = 'bearish';
    } else {
      this.marketData.trend = 'neutral';
    }
    
    // Add to price waves
    this.priceWaves.push(Math.random());
    if (this.priceWaves.length > 100) {
      this.priceWaves.shift();
    }
  }

  createBullishEffect() {
    // Create green upward particles
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: this.canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 8 - 4,
        size: Math.random() * 4 + 2,
        opacity: 0.8,
        type: 'bullish',
        color: '#00ff88',
        life: 80,
        maxLife: 80
      });
    }
  }

  createBearishEffect() {
    // Create red downward particles
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: 0,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 8 + 4,
        size: Math.random() * 4 + 2,
        opacity: 0.8,
        type: 'bearish',
        color: '#ff0066',
        life: 80,
        maxLife: 80
      });
    }
  }

  startAnimation() {
    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.updateParticles();
      this.drawParticles();
      this.drawMarketWaves();
      
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }

  // Public methods for integration
  onPriceChange(newPrice, oldPrice) {
    const change = ((newPrice - oldPrice) / oldPrice) * 100;
    this.updateMarketData(change);
  }

  createCustomEffect(type, x, y) {
    switch (type) {
      case 'success':
        this.createParticleExplosion(x, y, '#00ff88');
        break;
      case 'error':
        this.createParticleExplosion(x, y, '#ff0066');
        break;
      case 'info':
        this.createParticleExplosion(x, y, '#0099ff');
        break;
    }
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    if (this.canvas) {
      this.canvas.remove();
    }
    
    const logoContainer = document.querySelector('.crypto-logos-container');
    if (logoContainer) {
      logoContainer.remove();
    }
    
    if (this.marketIndicator) {
      this.marketIndicator.remove();
    }
  }
}

// CSS Animations for floating logos
const style = document.createElement('style');
style.textContent = `
  @keyframes floatCrypto {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    25% {
      transform: translateY(-20px) rotate(90deg);
    }
    50% {
      transform: translateY(-10px) rotate(180deg);
    }
    75% {
      transform: translateY(-30px) rotate(270deg);
    }
  }
  
  @keyframes pulseWave {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
  
  .floating-crypto-logo {
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .floating-crypto-logo:hover {
    filter: brightness(1.5) drop-shadow(0 0 30px currentColor);
  }
`;

document.head.appendChild(style);

// Initialize the professional animation system
let professionalAnimations;
document.addEventListener('DOMContentLoaded', () => {
  professionalAnimations = new ProfessionalCryptoAnimations();
});

// Export for global access
window.ProfessionalCryptoAnimations = ProfessionalCryptoAnimations;