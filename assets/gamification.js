// Crypto Gamification System
class CryptoGameSystem {
  constructor() {
    this.userLevel = parseInt(localStorage.getItem('cryptoLevel')) || 1;
    this.userXP = parseInt(localStorage.getItem('cryptoXP')) || 0;
    this.userCoins = parseInt(localStorage.getItem('cryptoCoins')) || 100;
    this.dailyStreak = parseInt(localStorage.getItem('dailyStreak')) || 0;
    this.lastVisit = localStorage.getItem('lastVisit') || new Date().toDateString();
    this.achievements = JSON.parse(localStorage.getItem('achievements')) || [];
    this.predictions = JSON.parse(localStorage.getItem('predictions')) || [];
    
    this.init();
  }

  init() {
    this.createGameUI();
    this.checkDailyStreak();
    this.createPredictionGame();
    this.createDailyChallenge();
    this.updateGameStats();
  }

  // Create Game UI Elements
  createGameUI() {
    const gameUI = document.createElement('div');
    gameUI.className = 'game-ui';
    gameUI.innerHTML = `
      <div class="game-stats">
        <div class="stat-item">
          <div class="stat-icon">⭐</div>
          <div class="stat-info">
            <div class="stat-label">Level</div>
            <div class="stat-value" id="userLevel">${this.userLevel}</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🎯</div>
          <div class="stat-info">
            <div class="stat-label">XP</div>
            <div class="stat-value" id="userXP">${this.userXP}</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🪙</div>
          <div class="stat-info">
            <div class="stat-label">Coins</div>
            <div class="stat-value" id="userCoins">${this.userCoins}</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🔥</div>
          <div class="stat-info">
            <div class="stat-label">Streak</div>
            <div class="stat-value" id="dailyStreak">${this.dailyStreak}</div>
          </div>
        </div>
      </div>
      
      <div class="xp-bar">
        <div class="xp-fill" id="xpFill"></div>
        <div class="xp-text">XP: ${this.userXP}/${this.getXPForNextLevel()}</div>
      </div>
    `;
    
    // Add to header
    const header = document.querySelector('.header');
    if (header) {
      header.appendChild(gameUI);
    }
  }

  // Daily Streak System
  checkDailyStreak() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (this.lastVisit === yesterday) {
      this.dailyStreak++;
      this.awardXP(10 * this.dailyStreak, 'Daily Visit Bonus!');
      this.awardCoins(5 * this.dailyStreak);
    } else if (this.lastVisit !== today) {
      this.dailyStreak = 1;
      this.awardXP(10, 'Welcome back!');
    }
    
    this.lastVisit = today;
    this.saveProgress();
  }

  // Prediction Game
  createPredictionGame() {
    const predictionGame = document.createElement('div');
    predictionGame.className = 'prediction-game';
    predictionGame.innerHTML = `
      <div class="game-card">
        <h3>🔮 Price Prediction Game</h3>
        <p>Predict if Bitcoin will go up or down in the next hour!</p>
        <div class="prediction-buttons">
          <button class="prediction-btn up" onclick="gameSystem.makePrediction('up')">
            📈 UP (+10 coins)
          </button>
          <button class="prediction-btn down" onclick="gameSystem.makePrediction('down')">
            📉 DOWN (+10 coins)
          </button>
        </div>
        <div class="prediction-timer" id="predictionTimer"></div>
        <div class="prediction-history" id="predictionHistory"></div>
      </div>
    `;
    
    // Add to sidebar or create floating widget
    this.addGameWidget(predictionGame);
  }

  makePrediction(direction) {
    const now = Date.now();
    const prediction = {
      direction,
      timestamp: now,
      resolveTime: now + 3600000, // 1 hour
      resolved: false
    };
    
    this.predictions.push(prediction);
    this.saveProgress();
    
    // Disable buttons
    const buttons = document.querySelectorAll('.prediction-btn');
    buttons.forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = '0.5';
    });
    
    // Start countdown
    this.startPredictionTimer(prediction);
    
    // Award participation XP
    this.awardXP(5, 'Prediction made!');
    
    animationEngine.showAchievement('🔮 Prediction Made!', `You predicted Bitcoin will go ${direction.toUpperCase()}`);
  }

  startPredictionTimer(prediction) {
    const timer = document.getElementById('predictionTimer');
    
    const updateTimer = () => {
      const remaining = prediction.resolveTime - Date.now();
      
      if (remaining <= 0) {
        this.resolvePrediction(prediction);
        return;
      }
      
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      
      timer.textContent = `Resolving in: ${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      setTimeout(updateTimer, 1000);
    };
    
    updateTimer();
  }

  async resolvePrediction(prediction) {
    // Simulate price check (in real app, get actual price data)
    const wasCorrect = Math.random() > 0.4; // 60% chance of being correct
    
    prediction.resolved = true;
    prediction.correct = wasCorrect;
    
    if (wasCorrect) {
      this.awardXP(25, 'Correct Prediction!');
      this.awardCoins(20);
      animationEngine.showAchievement('🎯 Prediction Correct!', 'You earned 25 XP and 20 coins!');
    } else {
      this.awardXP(5, 'Better luck next time!');
      animationEngine.showAchievement('😅 Prediction Wrong', 'You still earned 5 XP for trying!');
    }
    
    // Re-enable buttons
    const buttons = document.querySelectorAll('.prediction-btn');
    buttons.forEach(btn => {
      btn.disabled = false;
      btn.style.opacity = '1';
    });
    
    // Update history
    this.updatePredictionHistory();
    this.saveProgress();
  }

  updatePredictionHistory() {
    const history = document.getElementById('predictionHistory');
    const recentPredictions = this.predictions.slice(-5).reverse();
    
    history.innerHTML = recentPredictions.map(p => {
      if (!p.resolved) return '';
      
      const icon = p.correct ? '✅' : '❌';
      const direction = p.direction === 'up' ? '📈' : '📉';
      
      return `<div class="prediction-result">${icon} ${direction} ${p.correct ? '+20 coins' : '+5 XP'}</div>`;
    }).join('');
  }

  // Daily Challenges
  createDailyChallenge() {
    const challenges = [
      { id: 'visit_5_coins', name: 'Coin Explorer', desc: 'Visit 5 different coin pages', reward: 50, progress: 0, target: 5 },
      { id: 'portfolio_update', name: 'Portfolio Manager', desc: 'Add a coin to your portfolio', reward: 30, progress: 0, target: 1 },
      { id: 'news_reader', name: 'Stay Informed', desc: 'Read 3 news articles', reward: 25, progress: 0, target: 3 },
      { id: 'prediction_master', name: 'Fortune Teller', desc: 'Make 3 predictions', reward: 75, progress: 0, target: 3 }
    ];
    
    const todaysChallenges = this.getTodaysChallenges(challenges);
    
    const challengeWidget = document.createElement('div');
    challengeWidget.className = 'daily-challenges';
    challengeWidget.innerHTML = `
      <div class="game-card">
        <h3>🎯 Daily Challenges</h3>
        <div class="challenges-list">
          ${todaysChallenges.map(challenge => `
            <div class="challenge-item ${challenge.completed ? 'completed' : ''}">
              <div class="challenge-info">
                <div class="challenge-name">${challenge.name}</div>
                <div class="challenge-desc">${challenge.desc}</div>
              </div>
              <div class="challenge-progress">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${(challenge.progress / challenge.target) * 100}%"></div>
                </div>
                <div class="challenge-reward">+${challenge.reward} XP</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    this.addGameWidget(challengeWidget);
  }

  getTodaysChallenges(allChallenges) {
    const today = new Date().toDateString();
    const savedChallenges = JSON.parse(localStorage.getItem('dailyChallenges_' + today)) || [];
    
    if (savedChallenges.length === 0) {
      // Generate new daily challenges
      const shuffled = [...allChallenges].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      localStorage.setItem('dailyChallenges_' + today, JSON.stringify(selected));
      return selected;
    }
    
    return savedChallenges;
  }

  // Achievement System
  checkAchievements() {
    const achievementList = [
      { id: 'first_visit', name: 'Welcome!', desc: 'Visit the site for the first time', condition: () => true },
      { id: 'level_5', name: 'Rising Star', desc: 'Reach level 5', condition: () => this.userLevel >= 5 },
      { id: 'level_10', name: 'Crypto Expert', desc: 'Reach level 10', condition: () => this.userLevel >= 10 },
      { id: 'streak_7', name: 'Dedicated Trader', desc: 'Maintain a 7-day streak', condition: () => this.dailyStreak >= 7 },
      { id: 'streak_30', name: 'Crypto Addict', desc: 'Maintain a 30-day streak', condition: () => this.dailyStreak >= 30 },
      { id: 'coins_1000', name: 'Coin Collector', desc: 'Earn 1000 coins', condition: () => this.userCoins >= 1000 },
      { id: 'predictions_10', name: 'Oracle', desc: 'Make 10 predictions', condition: () => this.predictions.length >= 10 }
    ];
    
    achievementList.forEach(achievement => {
      if (!this.achievements.includes(achievement.id) && achievement.condition()) {
        this.unlockAchievement(achievement);
      }
    });
  }

  unlockAchievement(achievement) {
    this.achievements.push(achievement.id);
    this.awardXP(100, `Achievement Unlocked: ${achievement.name}`);
    this.awardCoins(50);
    
    animationEngine.showAchievement(
      `🏆 ${achievement.name}`,
      achievement.desc + ' (+100 XP, +50 coins)'
    );
    
    this.saveProgress();
  }

  // XP and Leveling System
  awardXP(amount, reason = '') {
    this.userXP += amount;
    
    const newLevel = this.calculateLevel(this.userXP);
    if (newLevel > this.userLevel) {
      this.levelUp(newLevel);
    }
    
    this.updateGameStats();
    this.saveProgress();
    
    if (reason) {
      this.showXPGain(amount, reason);
    }
  }

  awardCoins(amount) {
    this.userCoins += amount;
    this.updateGameStats();
    this.saveProgress();
  }

  calculateLevel(xp) {
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  }

  getXPForNextLevel() {
    return Math.pow(this.userLevel, 2) * 100;
  }

  levelUp(newLevel) {
    const oldLevel = this.userLevel;
    this.userLevel = newLevel;
    
    animationEngine.showAchievement(
      `🎉 Level Up!`,
      `You reached level ${newLevel}! (+100 coins)`
    );
    
    this.awardCoins(100);
    
    // Trigger celebration animation
    animationEngine.triggerBullCelebration();
  }

  showXPGain(amount, reason) {
    const xpPopup = document.createElement('div');
    xpPopup.className = 'xp-popup';
    xpPopup.innerHTML = `
      <div class="xp-amount">+${amount} XP</div>
      <div class="xp-reason">${reason}</div>
    `;
    
    document.body.appendChild(xpPopup);
    
    setTimeout(() => {
      xpPopup.remove();
    }, 3000);
  }

  // Update UI
  updateGameStats() {
    document.getElementById('userLevel').textContent = this.userLevel;
    document.getElementById('userXP').textContent = this.userXP;
    document.getElementById('userCoins').textContent = this.userCoins;
    document.getElementById('dailyStreak').textContent = this.dailyStreak;
    
    // Update XP bar
    const xpFill = document.getElementById('xpFill');
    const currentLevelXP = Math.pow(this.userLevel - 1, 2) * 100;
    const nextLevelXP = this.getXPForNextLevel();
    const progress = ((this.userXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
    
    if (xpFill) {
      xpFill.style.width = Math.min(progress, 100) + '%';
    }
    
    this.checkAchievements();
  }

  // Utility Functions
  addGameWidget(widget) {
    // Add to a game widgets container or create one
    let container = document.querySelector('.game-widgets');
    if (!container) {
      container = document.createElement('div');
      container.className = 'game-widgets';
      document.body.appendChild(container);
    }
    container.appendChild(widget);
  }

  saveProgress() {
    localStorage.setItem('cryptoLevel', this.userLevel);
    localStorage.setItem('cryptoXP', this.userXP);
    localStorage.setItem('cryptoCoins', this.userCoins);
    localStorage.setItem('dailyStreak', this.dailyStreak);
    localStorage.setItem('lastVisit', this.lastVisit);
    localStorage.setItem('achievements', JSON.stringify(this.achievements));
    localStorage.setItem('predictions', JSON.stringify(this.predictions));
  }

  // Event Tracking
  trackEvent(eventType, data = {}) {
    switch (eventType) {
      case 'coin_visit':
        this.awardXP(2, 'Coin page visit');
        break;
      case 'portfolio_add':
        this.awardXP(10, 'Added to portfolio');
        break;
      case 'news_read':
        this.awardXP(5, 'Read news article');
        break;
      case 'currency_switch':
        this.awardXP(3, 'Currency switched');
        break;
    }
  }
}

// Initialize Game System
let gameSystem;
document.addEventListener('DOMContentLoaded', () => {
  gameSystem = new CryptoGameSystem();
});

// Export for use in other scripts
window.CryptoGameSystem = CryptoGameSystem;