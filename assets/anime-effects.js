// Anime-Style Effects System - Demon Slayer Inspired
class AnimeEffectsEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.swordSlashes = [];
    this.breathingEffects = [];
    this.lightningEffects = [];
    this.fireEffects = [];
    this.waterEffects = [];
    this.animationId = null;
    this.mousePosition = { x: 0, y: 0 };
    this.isMouseMoving = false;
    
    this.init();
  }

  init() {
    this.createAnimeCanvas();
    this.createBreathingBackground();
    this.createFloatingElements();
    this.setupAnimeInteractions();
    this.startAnimeAnimations();
  }

  createAnimeCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'anime-effects-canvas';
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

  createBreathingBackground() {
    // Create animated background with breathing effect
    const breathingBg = document.createElement('div');
    breathingBg.className = 'breathing-background';
    breathingBg.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, 
        rgba(138, 43, 226, 0.1) 0%,
        rgba(30, 144, 255, 0.1) 25%,
        rgba(255, 20, 147, 0.1) 50%,
        rgba(255, 165, 0, 0.1) 75%,
        rgba(50, 205, 50, 0.1) 100%);
      background-size: 400% 400%;
      animation: breathingGradient 8s ease-in-out infinite;
      z-index: 0;
    `;
    
    document.body.insertBefore(breathingBg, document.body.firstChild);
  }

  createFloatingElements() {
    // Create floating sakura petals
    this.createSakuraPetals();
    
    // Create energy orbs
    this.createEnergyOrbs();
    
    // Create sword aura effects
    this.createSwordAuras();
  }

  createSakuraPetals() {
    for (let i = 0; i < 20; i++) {
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';
      petal.style.cssText = `
        position: fixed;
        width: 12px;
        height: 12px;
        background: linear-gradient(45deg, #ff69b4, #ffb6c1);
        border-radius: 50% 0 50% 0;
        animation: sakuraFall ${15 + Math.random() * 10}s linear infinite;
        left: ${Math.random() * 100}%;
        top: -20px;
        opacity: 0.7;
        z-index: 2;
        transform: rotate(${Math.random() * 360}deg);
      `;
      
      document.body.appendChild(petal);
    }
  }

  createEnergyOrbs() {
    for (let i = 0; i < 15; i++) {
      const orb = document.createElement('div');
      orb.className = 'energy-orb';
      orb.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #00ffff, #0080ff);
        border-radius: 50%;
        box-shadow: 0 0 20px #00ffff, 0 0 40px #0080ff;
        animation: orbFloat ${8 + Math.random() * 4}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0.8;
        z-index: 2;
      `;
      
      document.body.appendChild(orb);
    }
  }

  createSwordAuras() {
    for (let i = 0; i < 10; i++) {
      const aura = document.createElement('div');
      aura.className = 'sword-aura';
      aura.style.cssText = `
        position: fixed;
        width: 3px;
        height: 100px;
        background: linear-gradient(to bottom, #ff4500, #ffd700, transparent);
        animation: swordGlow ${3 + Math.random() * 2}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0.6;
        z-index: 2;
        transform: rotate(${Math.random() * 360}deg);
      `;
      
      document.body.appendChild(aura);
    }
  }

  setupAnimeInteractions() {
    // Mouse movement creates sword slash effects
    document.addEventListener('mousemove', (e) => {
      this.mousePosition.x = e.clientX;
      this.mousePosition.y = e.clientY;
      this.isMouseMoving = true;
      
      // Create trailing effect
      if (Math.random() < 0.3) {
        this.createSwordSlash(e.clientX, e.clientY);
      }
      
      clearTimeout(this.mouseTimeout);
      this.mouseTimeout = setTimeout(() => {
        this.isMouseMoving = false;
      }, 100);
    });

    // Click creates special effects
    document.addEventListener('click', (e) => {
      this.createClickExplosion(e.clientX, e.clientY);
      this.createLightningStrike(e.clientX, e.clientY);
    });

    // Scroll creates breathing effects
    document.addEventListener('scroll', () => {
      this.createBreathingWave();
    });
  }

  createSwordSlash(x, y) {
    const slash = {
      x: x,
      y: y,
      angle: Math.random() * Math.PI * 2,
      length: 50 + Math.random() * 50,
      opacity: 1,
      life: 30,
      color: this.getRandomSlashColor()
    };
    
    this.swordSlashes.push(slash);
  }

  getRandomSlashColor() {
    const colors = [
      '#ff4500', // Fire
      '#00bfff', // Water
      '#ffd700', // Thunder
      '#ff69b4', // Love
      '#32cd32', // Wind
      '#8a2be2'  // Mist
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  createClickExplosion(x, y) {
    // Create anime-style explosion
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const speed = 5 + Math.random() * 10;
      
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 5,
        opacity: 1,
        life: 60,
        maxLife: 60,
        color: this.getRandomSlashColor(),
        type: 'explosion'
      });
    }
  }

  createLightningStrike(x, y) {
    const lightning = {
      startX: x,
      startY: 0,
      endX: x + (Math.random() - 0.5) * 100,
      endY: y,
      branches: [],
      opacity: 1,
      life: 20,
      color: '#00ffff'
    };
    
    // Create lightning branches
    for (let i = 0; i < 5; i++) {
      lightning.branches.push({
        x: x + (Math.random() - 0.5) * 200,
        y: y * Math.random(),
        opacity: 0.7
      });
    }
    
    this.lightningEffects.push(lightning);
  }

  createBreathingWave() {
    const wave = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      radius: 0,
      maxRadius: 300,
      opacity: 0.5,
      life: 100,
      color: '#00ffff'
    };
    
    this.breathingEffects.push(wave);
  }

  updateEffects() {
    // Update sword slashes
    for (let i = this.swordSlashes.length - 1; i >= 0; i--) {
      const slash = this.swordSlashes[i];
      slash.life--;
      slash.opacity = slash.life / 30;
      
      if (slash.life <= 0) {
        this.swordSlashes.splice(i, 1);
      }
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;
      particle.opacity = particle.life / particle.maxLife;
      
      if (particle.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Update lightning effects
    for (let i = this.lightningEffects.length - 1; i >= 0; i--) {
      const lightning = this.lightningEffects[i];
      lightning.life--;
      lightning.opacity = lightning.life / 20;
      
      if (lightning.life <= 0) {
        this.lightningEffects.splice(i, 1);
      }
    }

    // Update breathing effects
    for (let i = this.breathingEffects.length - 1; i >= 0; i--) {
      const wave = this.breathingEffects[i];
      wave.radius += 3;
      wave.life--;
      wave.opacity = (wave.life / 100) * 0.5;
      
      if (wave.radius >= wave.maxRadius || wave.life <= 0) {
        this.breathingEffects.splice(i, 1);
      }
    }
  }

  drawEffects() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw sword slashes
    this.swordSlashes.forEach(slash => {
      this.ctx.save();
      this.ctx.globalAlpha = slash.opacity;
      this.ctx.strokeStyle = slash.color;
      this.ctx.lineWidth = 3;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = slash.color;
      
      this.ctx.beginPath();
      this.ctx.moveTo(slash.x, slash.y);
      this.ctx.lineTo(
        slash.x + Math.cos(slash.angle) * slash.length,
        slash.y + Math.sin(slash.angle) * slash.length
      );
      this.ctx.stroke();
      this.ctx.restore();
    });

    // Draw particles
    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fillStyle = particle.color;
      this.ctx.shadowBlur = 5;
      this.ctx.shadowColor = particle.color;
      
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Draw lightning effects
    this.lightningEffects.forEach(lightning => {
      this.ctx.save();
      this.ctx.globalAlpha = lightning.opacity;
      this.ctx.strokeStyle = lightning.color;
      this.ctx.lineWidth = 2;
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = lightning.color;
      
      // Main lightning bolt
      this.ctx.beginPath();
      this.ctx.moveTo(lightning.startX, lightning.startY);
      this.ctx.lineTo(lightning.endX, lightning.endY);
      this.ctx.stroke();
      
      // Lightning branches
      lightning.branches.forEach(branch => {
        this.ctx.globalAlpha = lightning.opacity * branch.opacity;
        this.ctx.beginPath();
        this.ctx.moveTo(lightning.endX, lightning.endY);
        this.ctx.lineTo(branch.x, branch.y);
        this.ctx.stroke();
      });
      
      this.ctx.restore();
    });

    // Draw breathing effects
    this.breathingEffects.forEach(wave => {
      this.ctx.save();
      this.ctx.globalAlpha = wave.opacity;
      this.ctx.strokeStyle = wave.color;
      this.ctx.lineWidth = 2;
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = wave.color;
      
      this.ctx.beginPath();
      this.ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();
    });
  }

  startAnimeAnimations() {
    const animate = () => {
      this.updateEffects();
      this.drawEffects();
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }

  // Public methods for integration
  triggerSpecialEffect(type, x, y) {
    switch (type) {
      case 'fire':
        this.createFireBreathing(x, y);
        break;
      case 'water':
        this.createWaterBreathing(x, y);
        break;
      case 'thunder':
        this.createThunderBreathing(x, y);
        break;
      case 'wind':
        this.createWindBreathing(x, y);
        break;
    }
  }

  createFireBreathing(x, y) {
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30;
      const speed = 3 + Math.random() * 7;
      
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 4,
        opacity: 1,
        life: 80,
        maxLife: 80,
        color: '#ff4500',
        type: 'fire'
      });
    }
  }

  createWaterBreathing(x, y) {
    for (let i = 0; i < 25; i++) {
      const angle = (Math.PI * 2 * i) / 25;
      const speed = 2 + Math.random() * 5;
      
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 3,
        opacity: 0.8,
        life: 100,
        maxLife: 100,
        color: '#00bfff',
        type: 'water'
      });
    }
  }

  createThunderBreathing(x, y) {
    for (let i = 0; i < 5; i++) {
      this.createLightningStrike(x + (Math.random() - 0.5) * 100, y);
    }
  }

  createWindBreathing(x, y) {
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 5 + Math.random() * 10;
      
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1 + Math.random() * 2,
        opacity: 0.6,
        life: 60,
        maxLife: 60,
        color: '#32cd32',
        type: 'wind'
      });
    }
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    if (this.canvas) {
      this.canvas.remove();
    }
    
    // Remove floating elements
    document.querySelectorAll('.sakura-petal, .energy-orb, .sword-aura, .breathing-background').forEach(el => {
      el.remove();
    });
  }
}

// CSS for anime effects
const animeStyle = document.createElement('style');
animeStyle.textContent = `
  @keyframes breathingGradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @keyframes sakuraFall {
    0% {
      transform: translateY(-20px) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.7;
    }
    90% {
      opacity: 0.7;
    }
    100% {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
  
  @keyframes orbFloat {
    0%, 100% {
      transform: translateY(0px) scale(1);
    }
    50% {
      transform: translateY(-20px) scale(1.1);
    }
  }
  
  @keyframes swordGlow {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1) rotate(var(--rotation, 0deg));
    }
    50% {
      opacity: 0.8;
      transform: scale(1.2) rotate(var(--rotation, 0deg));
    }
  }
  
  .sakura-petal {
    filter: drop-shadow(0 0 5px rgba(255, 105, 180, 0.5));
  }
  
  .energy-orb {
    filter: blur(1px);
  }
  
  .sword-aura {
    filter: blur(2px);
  }
`;

document.head.appendChild(animeStyle);

// Initialize anime effects
let animeEffects;
document.addEventListener('DOMContentLoaded', () => {
  animeEffects = new AnimeEffectsEngine();
});

// Export for global access
window.AnimeEffectsEngine = AnimeEffectsEngine;