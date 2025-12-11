// Advanced Crypto Gaming System with Multiple Mini-Games
class CryptoGamingHub {
  constructor() {
    this.games = {
      coinCatcher: null,
      tradingSimulator: null,
      cryptoQuiz: null,
      priceGuess: null,
      memoryMatch: null
    };
    this.userStats = JSON.parse(localStorage.getItem('cryptoGameStats')) || {
      totalScore: 0,
      gamesPlayed: 0,
      highScores: {},
      achievements: [],
      coins: 1000,
      level: 1,
      experience: 0
    };
    this.init();
  }

  init() {
    this.createGameHub();
    this.initializeGames();
    this.createFloatingGameElements();
    this.startBackgroundAnimations();
  }

  createGameHub() {
    const gameHub = document.createElement('div');
    gameHub.className = 'crypto-game-hub';
    gameHub.innerHTML = `
      <div class="game-hub-toggle" onclick="cryptoGames.toggleGameHub()">
        <i class="fas fa-gamepad"></i>
        <span class="game-notification" id="gameNotification">5</span>
      </div>
      
      <div class="game-hub-panel" id="gameHubPanel">
        <div class="game-hub-header">
          <h3><i class="fas fa-trophy"></i> Crypto Gaming Hub</h3>
          <button class="close-btn" onclick="cryptoGames.toggleGameHub()">×</button>
        </div>
        
        <div class="player-stats">
          <div class="stat-item">
            <i class="fas fa-coins"></i>
            <span>Coins: <strong id="playerCoins">${this.userStats.coins}</strong></span>
          </div>
          <div class="stat-item">
            <i class="fas fa-star"></i>
            <span>Level: <strong id="playerLevel">${this.userStats.level}</strong></span>
          </div>
          <div class="stat-item">
            <i class="fas fa-chart-line"></i>
            <span>Score: <strong id="playerScore">${this.userStats.totalScore}</strong></span>
          </div>
        </div>
        
        <div class="games-grid">
          <div class="game-card" onclick="cryptoGames.startGame('coinCatcher')">
            <div class="game-icon">🪙</div>
            <h4>Coin Catcher</h4>
            <p>Catch falling crypto coins!</p>
            <div class="game-reward">+50 coins</div>
          </div>
          
          <div class="game-card" onclick="cryptoGames.startGame('tradingSimulator')">
            <div class="game-icon">📈</div>
            <h4>Trading Master</h4>
            <p>Buy low, sell high!</p>
            <div class="game-reward">+100 coins</div>
          </div>
          
          <div class="game-card" onclick="cryptoGames.startGame('cryptoQuiz')">
            <div class="game-icon">🧠</div>
            <h4>Crypto Quiz</h4>
            <p>Test your knowledge!</p>
            <div class="game-reward">+75 coins</div>
          </div>
          
          <div class="game-card" onclick="cryptoGames.startGame('priceGuess')">
            <div class="game-icon">🎯</div>
            <h4>Price Predictor</h4>
            <p>Guess the next price!</p>
            <div class="game-reward">+200 coins</div>
          </div>
          
          <div class="game-card" onclick="cryptoGames.startGame('memoryMatch')">
            <div class="game-icon">🔄</div>
            <h4>Crypto Memory</h4>
            <p>Match crypto pairs!</p>
            <div class="game-reward">+80 coins</div>
          </div>
          
          <div class="game-card" onclick="cryptoGames.startGame('spinWheel')">
            <div class="game-icon">🎰</div>
            <h4>Lucky Wheel</h4>
            <p>Spin for rewards!</p>
            <div class="game-reward">+??? coins</div>
          </div>
        </div>
        
        <div class="achievements-section">
          <h4><i class="fas fa-medal"></i> Recent Achievements</h4>
          <div class="achievements-list" id="achievementsList">
            <div class="achievement-item">
              <i class="fas fa-star"></i>
              <span>First Game Completed!</span>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(gameHub);
  }

  toggleGameHub() {
    const panel = document.getElementById('gameHubPanel');
    panel.classList.toggle('active');
  }

  // Game 1: Coin Catcher
  startCoinCatcher() {
    const gameContainer = this.createGameContainer('Coin Catcher', 'Catch the falling crypto coins!');
    
    const gameArea = document.createElement('div');
    gameArea.className = 'coin-catcher-game';
    gameArea.innerHTML = `
      <div class="game-score">Score: <span id="catcherScore">0</span></div>
      <div class="game-timer">Time: <span id="catcherTimer">30</span>s</div>
      <div class="player-basket" id="playerBasket">🧺</div>
      <div class="falling-coins" id="fallingCoins"></div>
    `;
    
    gameContainer.querySelector('.game-content').appendChild(gameArea);
    
    let score = 0;
    let timeLeft = 30;
    let gameActive = true;
    const basket = document.getElementById('playerBasket');
    const coinsContainer = document.getElementById('fallingCoins');
    
    // Basket movement
    let basketPosition = 50;
    document.addEventListener('mousemove', (e) => {
      if (!gameActive) return;
      const gameRect = gameArea.getBoundingClientRect();
      basketPosition = ((e.clientX - gameRect.left) / gameRect.width) * 100;
      basketPosition = Math.max(5, Math.min(95, basketPosition));
      basket.style.left = basketPosition + '%';
    });
    
    // Spawn coins
    const spawnCoin = () => {
      if (!gameActive) return;
      
      const coin = document.createElement('div');
      coin.className = 'falling-coin';
      coin.innerHTML = ['₿', '₹', '💎', '🪙'][Math.floor(Math.random() * 4)];
      coin.style.left = Math.random() * 90 + '%';
      coin.style.animationDuration = (Math.random() * 2 + 2) + 's';
      
      coinsContainer.appendChild(coin);
      
      // Check collision
      const checkCollision = () => {
        const coinRect = coin.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();
        
        if (coinRect.bottom >= basketRect.top && 
            coinRect.left < basketRect.right && 
            coinRect.right > basketRect.left) {
          score += 10;
          document.getElementById('catcherScore').textContent = score;
          coin.remove();
          this.createParticleExplosion(basketRect.left + basketRect.width/2, basketRect.top);
          return;
        }
        
        if (coinRect.top > window.innerHeight) {
          coin.remove();
          return;
        }
        
        if (gameActive) requestAnimationFrame(checkCollision);
      };
      
      requestAnimationFrame(checkCollision);
    };
    
    // Game timer
    const gameTimer = setInterval(() => {
      timeLeft--;
      document.getElementById('catcherTimer').textContent = timeLeft;
      
      if (timeLeft <= 0) {
        gameActive = false;
        clearInterval(gameTimer);
        clearInterval(coinSpawner);
        this.endGame('coinCatcher', score);
      }
    }, 1000);
    
    // Spawn coins every 800ms
    const coinSpawner = setInterval(spawnCoin, 800);
  }

  // Game 2: Trading Simulator
  startTradingSimulator() {
    const gameContainer = this.createGameContainer('Trading Master', 'Buy low, sell high to maximize profit!');
    
    const gameArea = document.createElement('div');
    gameArea.className = 'trading-simulator-game';
    gameArea.innerHTML = `
      <div class="trading-stats">
        <div class="stat">Portfolio: $<span id="portfolio">1000</span></div>
        <div class="stat">Bitcoin: <span id="btcHolding">0</span> BTC</div>
        <div class="stat">Price: $<span id="btcPrice">50000</span></div>
      </div>
      
      <div class="price-chart" id="priceChart">
        <canvas id="tradingChart" width="400" height="200"></canvas>
      </div>
      
      <div class="trading-controls">
        <button class="trade-btn buy-btn" onclick="cryptoGames.executeTrade('buy')">
          <i class="fas fa-arrow-up"></i> BUY
        </button>
        <button class="trade-btn sell-btn" onclick="cryptoGames.executeTrade('sell')">
          <i class="fas fa-arrow-down"></i> SELL
        </button>
      </div>
      
      <div class="game-timer">Time: <span id="tradingTimer">60</span>s</div>
    `;
    
    gameContainer.querySelector('.game-content').appendChild(gameArea);
    
    this.initTradingGame();
  }

  initTradingGame() {
    this.tradingData = {
      portfolio: 1000,
      btcHolding: 0,
      currentPrice: 50000,
      priceHistory: [50000],
      timeLeft: 60,
      gameActive: true
    };
    
    // Price simulation
    const updatePrice = () => {
      if (!this.tradingData.gameActive) return;
      
      const change = (Math.random() - 0.5) * 2000;
      this.tradingData.currentPrice = Math.max(30000, this.tradingData.currentPrice + change);
      this.tradingData.priceHistory.push(this.tradingData.currentPrice);
      
      if (this.tradingData.priceHistory.length > 50) {
        this.tradingData.priceHistory.shift();
      }
      
      document.getElementById('btcPrice').textContent = Math.round(this.tradingData.currentPrice);
      this.drawTradingChart();
    };
    
    // Game timer
    const gameTimer = setInterval(() => {
      this.tradingData.timeLeft--;
      document.getElementById('tradingTimer').textContent = this.tradingData.timeLeft;
      
      if (this.tradingData.timeLeft <= 0) {
        this.tradingData.gameActive = false;
        clearInterval(gameTimer);
        clearInterval(priceUpdater);
        
        const finalValue = this.tradingData.portfolio + (this.tradingData.btcHolding * this.tradingData.currentPrice);
        const profit = finalValue - 1000;
        this.endGame('tradingSimulator', Math.max(0, Math.round(profit / 10)));
      }
    }, 1000);
    
    const priceUpdater = setInterval(updatePrice, 2000);
    this.drawTradingChart();
  }

  executeTrade(action) {
    if (!this.tradingData.gameActive) return;
    
    if (action === 'buy' && this.tradingData.portfolio >= this.tradingData.currentPrice) {
      this.tradingData.portfolio -= this.tradingData.currentPrice;
      this.tradingData.btcHolding += 1;
    } else if (action === 'sell' && this.tradingData.btcHolding > 0) {
      this.tradingData.portfolio += this.tradingData.currentPrice;
      this.tradingData.btcHolding -= 1;
    }
    
    document.getElementById('portfolio').textContent = Math.round(this.tradingData.portfolio);
    document.getElementById('btcHolding').textContent = this.tradingData.btcHolding;
  }

  drawTradingChart() {
    const canvas = document.getElementById('tradingChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const prices = this.tradingData.priceHistory;
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    const priceRange = maxPrice - minPrice || 1;
    
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    prices.forEach((price, index) => {
      const x = (index / (prices.length - 1)) * canvas.width;
      const y = canvas.height - ((price - minPrice) / priceRange) * canvas.height;
      
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    
    ctx.stroke();
  }

  // Game 3: Crypto Quiz
  startCryptoQuiz() {
    const gameContainer = this.createGameContainer('Crypto Quiz', 'Test your cryptocurrency knowledge!');
    
    const questions = [
      {
        question: "What does 'HODL' mean in crypto?",
        options: ["Hold On for Dear Life", "High Order Digital Ledger", "Hybrid Online Data Link", "Hold Original Digital License"],
        correct: 0
      },
      {
        question: "Who created Bitcoin?",
        options: ["Vitalik Buterin", "Satoshi Nakamoto", "Charlie Lee", "Roger Ver"],
        correct: 1
      },
      {
        question: "What is the maximum supply of Bitcoin?",
        options: ["21 million", "100 million", "1 billion", "Unlimited"],
        correct: 0
      },
      {
        question: "What consensus mechanism does Ethereum 2.0 use?",
        options: ["Proof of Work", "Proof of Stake", "Delegated Proof of Stake", "Proof of Authority"],
        correct: 1
      },
      {
        question: "What does DeFi stand for?",
        options: ["Digital Finance", "Decentralized Finance", "Distributed Finance", "Direct Finance"],
        correct: 1
      }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    let timeLeft = 15;
    
    const gameArea = document.createElement('div');
    gameArea.className = 'crypto-quiz-game';
    gameArea.innerHTML = `
      <div class="quiz-header">
        <div class="question-counter">Question <span id="questionNum">1</span> of ${questions.length}</div>
        <div class="quiz-timer">Time: <span id="quizTimer">15</span>s</div>
        <div class="quiz-score">Score: <span id="quizScore">0</span></div>
      </div>
      
      <div class="question-container">
        <h3 id="questionText">${questions[0].question}</h3>
        <div class="options-container" id="optionsContainer">
          ${questions[0].options.map((option, index) => 
            `<button class="quiz-option" onclick="cryptoGames.selectAnswer(${index})">${option}</button>`
          ).join('')}
        </div>
      </div>
      
      <div class="quiz-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${(currentQuestion / questions.length) * 100}%"></div>
        </div>
      </div>
    `;
    
    gameContainer.querySelector('.game-content').appendChild(gameArea);
    
    this.quizData = { questions, currentQuestion, score, timeLeft, gameActive: true };
    this.startQuizTimer();
  }

  selectAnswer(selectedIndex) {
    if (!this.quizData.gameActive) return;
    
    const correct = this.quizData.questions[this.quizData.currentQuestion].correct;
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((option, index) => {
      option.disabled = true;
      if (index === correct) {
        option.classList.add('correct');
      } else if (index === selectedIndex && index !== correct) {
        option.classList.add('wrong');
      }
    });
    
    if (selectedIndex === correct) {
      this.quizData.score += 20;
      document.getElementById('quizScore').textContent = this.quizData.score;
    }
    
    setTimeout(() => {
      this.nextQuestion();
    }, 1500);
  }

  nextQuestion() {
    this.quizData.currentQuestion++;
    
    if (this.quizData.currentQuestion >= this.quizData.questions.length) {
      this.quizData.gameActive = false;
      this.endGame('cryptoQuiz', this.quizData.score);
      return;
    }
    
    const question = this.quizData.questions[this.quizData.currentQuestion];
    document.getElementById('questionNum').textContent = this.quizData.currentQuestion + 1;
    document.getElementById('questionText').textContent = question.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = question.options.map((option, index) => 
      `<button class="quiz-option" onclick="cryptoGames.selectAnswer(${index})">${option}</button>`
    ).join('');
    
    document.querySelector('.progress-fill').style.width = 
      `${(this.quizData.currentQuestion / this.quizData.questions.length) * 100}%`;
    
    this.quizData.timeLeft = 15;
  }

  startQuizTimer() {
    const timer = setInterval(() => {
      if (!this.quizData.gameActive) {
        clearInterval(timer);
        return;
      }
      
      this.quizData.timeLeft--;
      document.getElementById('quizTimer').textContent = this.quizData.timeLeft;
      
      if (this.quizData.timeLeft <= 0) {
        this.nextQuestion();
        this.quizData.timeLeft = 15;
      }
    }, 1000);
  }

  // Game 4: Price Predictor
  startPriceGuess() {
    const gameContainer = this.createGameContainer('Price Predictor', 'Predict if the price will go up or down!');
    
    const gameArea = document.createElement('div');
    gameArea.className = 'price-guess-game';
    gameArea.innerHTML = `
      <div class="current-price-display">
        <h3>Bitcoin Price</h3>
        <div class="price-value" id="currentPriceDisplay">$50,000</div>
      </div>
      
      <div class="prediction-buttons">
        <button class="predict-btn up-btn" onclick="cryptoGames.makePrediction('up')">
          <i class="fas fa-arrow-up"></i>
          <span>UP</span>
        </button>
        <button class="predict-btn down-btn" onclick="cryptoGames.makePrediction('down')">
          <i class="fas fa-arrow-down"></i>
          <span>DOWN</span>
        </button>
      </div>
      
      <div class="prediction-timer">
        <div class="timer-circle">
          <span id="predictionCountdown">5</span>
        </div>
        <p>Seconds until price reveal</p>
      </div>
      
      <div class="prediction-stats">
        <div class="stat">Correct: <span id="correctPredictions">0</span></div>
        <div class="stat">Total: <span id="totalPredictions">0</span></div>
        <div class="stat">Accuracy: <span id="accuracy">0%</span></div>
      </div>
    `;
    
    gameContainer.querySelector('.game-content').appendChild(gameArea);
    
    this.initPriceGuessGame();
  }

  initPriceGuessGame() {
    this.priceGuessData = {
      currentPrice: 50000,
      predictions: [],
      gameActive: true,
      roundsLeft: 10
    };
    
    this.startPredictionRound();
  }

  startPredictionRound() {
    if (this.priceGuessData.roundsLeft <= 0) {
      const correct = this.priceGuessData.predictions.filter(p => p.correct).length;
      this.endGame('priceGuess', correct * 20);
      return;
    }
    
    // Generate new price
    this.priceGuessData.currentPrice = 45000 + Math.random() * 20000;
    document.getElementById('currentPriceDisplay').textContent = 
      '$' + Math.round(this.priceGuessData.currentPrice).toLocaleString();
    
    // Enable prediction buttons
    document.querySelectorAll('.predict-btn').forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('selected');
    });
    
    this.priceGuessData.userPrediction = null;
  }

  makePrediction(direction) {
    this.priceGuessData.userPrediction = direction;
    
    document.querySelectorAll('.predict-btn').forEach(btn => {
      btn.disabled = true;
      btn.classList.remove('selected');
    });
    
    document.querySelector(`.${direction}-btn`).classList.add('selected');
    
    // Start countdown
    let countdown = 5;
    const countdownElement = document.getElementById('predictionCountdown');
    
    const timer = setInterval(() => {
      countdown--;
      countdownElement.textContent = countdown;
      
      if (countdown <= 0) {
        clearInterval(timer);
        this.revealPriceResult();
      }
    }, 1000);
  }

  revealPriceResult() {
    const oldPrice = this.priceGuessData.currentPrice;
    const newPrice = oldPrice + (Math.random() - 0.5) * 5000;
    const actualDirection = newPrice > oldPrice ? 'up' : 'down';
    
    const correct = this.priceGuessData.userPrediction === actualDirection;
    
    this.priceGuessData.predictions.push({
      prediction: this.priceGuessData.userPrediction,
      actual: actualDirection,
      correct: correct
    });
    
    // Update stats
    const correctCount = this.priceGuessData.predictions.filter(p => p.correct).length;
    const totalCount = this.priceGuessData.predictions.length;
    
    document.getElementById('correctPredictions').textContent = correctCount;
    document.getElementById('totalPredictions').textContent = totalCount;
    document.getElementById('accuracy').textContent = Math.round((correctCount / totalCount) * 100) + '%';
    
    // Show result animation
    this.showPredictionResult(correct, newPrice);
    
    this.priceGuessData.roundsLeft--;
    
    setTimeout(() => {
      this.startPredictionRound();
    }, 2000);
  }

  showPredictionResult(correct, newPrice) {
    const resultDiv = document.createElement('div');
    resultDiv.className = `prediction-result ${correct ? 'correct' : 'wrong'}`;
    resultDiv.innerHTML = `
      <div class="result-icon">${correct ? '✅' : '❌'}</div>
      <div class="result-text">${correct ? 'Correct!' : 'Wrong!'}</div>
      <div class="new-price">New Price: $${Math.round(newPrice).toLocaleString()}</div>
    `;
    
    document.querySelector('.price-guess-game').appendChild(resultDiv);
    
    setTimeout(() => {
      resultDiv.remove();
    }, 2000);
  }

  // Game 5: Memory Match
  startMemoryMatch() {
    const gameContainer = this.createGameContainer('Crypto Memory', 'Match the cryptocurrency pairs!');
    
    const cryptoSymbols = ['₿', '⟠', '◊', '🔗', '💎', '🚀', '🌙', '⚡'];
    const gameCards = [...cryptoSymbols, ...cryptoSymbols].sort(() => Math.random() - 0.5);
    
    const gameArea = document.createElement('div');
    gameArea.className = 'memory-match-game';
    gameArea.innerHTML = `
      <div class="memory-stats">
        <div class="stat">Matches: <span id="matchCount">0</span>/8</div>
        <div class="stat">Moves: <span id="moveCount">0</span></div>
        <div class="stat">Time: <span id="memoryTimer">0</span>s</div>
      </div>
      
      <div class="memory-grid">
        ${gameCards.map((symbol, index) => `
          <div class="memory-card" data-symbol="${symbol}" data-index="${index}" onclick="cryptoGames.flipCard(this)">
            <div class="card-front">?</div>
            <div class="card-back">${symbol}</div>
          </div>
        `).join('')}
      </div>
    `;
    
    gameContainer.querySelector('.game-content').appendChild(gameArea);
    
    this.memoryData = {
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      startTime: Date.now(),
      gameActive: true
    };
    
    this.startMemoryTimer();
  }

  flipCard(cardElement) {
    if (!this.memoryData.gameActive || 
        cardElement.classList.contains('flipped') || 
        cardElement.classList.contains('matched') ||
        this.memoryData.flippedCards.length >= 2) {
      return;
    }
    
    cardElement.classList.add('flipped');
    this.memoryData.flippedCards.push(cardElement);
    
    if (this.memoryData.flippedCards.length === 2) {
      this.memoryData.moves++;
      document.getElementById('moveCount').textContent = this.memoryData.moves;
      
      setTimeout(() => {
        this.checkMemoryMatch();
      }, 1000);
    }
  }

  checkMemoryMatch() {
    const [card1, card2] = this.memoryData.flippedCards;
    const symbol1 = card1.dataset.symbol;
    const symbol2 = card2.dataset.symbol;
    
    if (symbol1 === symbol2) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      this.memoryData.matchedPairs++;
      
      document.getElementById('matchCount').textContent = this.memoryData.matchedPairs;
      
      if (this.memoryData.matchedPairs === 8) {
        this.memoryData.gameActive = false;
        const timeBonus = Math.max(0, 300 - Math.floor((Date.now() - this.memoryData.startTime) / 1000));
        const moveBonus = Math.max(0, 50 - this.memoryData.moves);
        const score = (this.memoryData.matchedPairs * 10) + timeBonus + moveBonus;
        this.endGame('memoryMatch', score);
      }
    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }
    
    this.memoryData.flippedCards = [];
  }

  startMemoryTimer() {
    const timer = setInterval(() => {
      if (!this.memoryData.gameActive) {
        clearInterval(timer);
        return;
      }
      
      const elapsed = Math.floor((Date.now() - this.memoryData.startTime) / 1000);
      document.getElementById('memoryTimer').textContent = elapsed;
    }, 1000);
  }

  // Game 6: Spin Wheel
  startSpinWheel() {
    const gameContainer = this.createGameContainer('Lucky Wheel', 'Spin the wheel for crypto rewards!');
    
    const prizes = [
      { label: '10 Coins', value: 10, color: '#ff6b6b' },
      { label: '50 Coins', value: 50, color: '#4ecdc4' },
      { label: '100 Coins', value: 100, color: '#45b7d1' },
      { label: '25 Coins', value: 25, color: '#96ceb4' },
      { label: '200 Coins', value: 200, color: '#feca57' },
      { label: '75 Coins', value: 75, color: '#ff9ff3' },
      { label: '500 Coins', value: 500, color: '#54a0ff' },
      { label: '5 Coins', value: 5, color: '#5f27cd' }
    ];
    
    const gameArea = document.createElement('div');
    gameArea.className = 'spin-wheel-game';
    gameArea.innerHTML = `
      <div class="wheel-container">
        <div class="wheel-pointer">▼</div>
        <div class="wheel" id="spinWheel">
          ${prizes.map((prize, index) => `
            <div class="wheel-segment" style="
              transform: rotate(${index * 45}deg);
              background: ${prize.color};
            ">
              <span class="prize-text">${prize.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
      
      <button class="spin-button" id="spinButton" onclick="cryptoGames.spinWheel()">
        <i class="fas fa-play"></i> SPIN
      </button>
      
      <div class="spins-left">
        Spins Left: <span id="spinsLeft">3</span>
      </div>
    `;
    
    gameContainer.querySelector('.game-content').appendChild(gameArea);
    
    this.wheelData = {
      prizes: prizes,
      spinsLeft: 3,
      totalWinnings: 0
    };
  }

  spinWheel() {
    if (this.wheelData.spinsLeft <= 0) return;
    
    const wheel = document.getElementById('spinWheel');
    const spinButton = document.getElementById('spinButton');
    
    spinButton.disabled = true;
    
    const randomSpin = Math.random() * 360 + 1440; // At least 4 full rotations
    wheel.style.transform = `rotate(${randomSpin}deg)`;
    
    setTimeout(() => {
      const finalAngle = randomSpin % 360;
      const segmentAngle = 360 / this.wheelData.prizes.length;
      const winningIndex = Math.floor((360 - finalAngle) / segmentAngle) % this.wheelData.prizes.length;
      const prize = this.wheelData.prizes[winningIndex];
      
      this.wheelData.totalWinnings += prize.value;
      this.wheelData.spinsLeft--;
      
      document.getElementById('spinsLeft').textContent = this.wheelData.spinsLeft;
      
      this.showWheelResult(prize);
      
      if (this.wheelData.spinsLeft > 0) {
        spinButton.disabled = false;
      } else {
        this.endGame('spinWheel', this.wheelData.totalWinnings);
      }
    }, 3000);
  }

  showWheelResult(prize) {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'wheel-result';
    resultDiv.innerHTML = `
      <div class="result-animation">🎉</div>
      <div class="prize-won">You won ${prize.label}!</div>
    `;
    
    document.querySelector('.spin-wheel-game').appendChild(resultDiv);
    
    setTimeout(() => {
      resultDiv.remove();
    }, 3000);
  }

  // Utility Functions
  createGameContainer(title, description) {
    const container = document.createElement('div');
    container.className = 'game-container';
    container.innerHTML = `
      <div class="game-overlay">
        <div class="game-modal">
          <div class="game-header">
            <h2>${title}</h2>
            <p>${description}</p>
            <button class="close-game-btn" onclick="cryptoGames.closeGame()">×</button>
          </div>
          <div class="game-content"></div>
        </div>
      </div>
    `;
    
    document.body.appendChild(container);
    return container;
  }

  startGame(gameType) {
    this.toggleGameHub();
    
    switch(gameType) {
      case 'coinCatcher':
        this.startCoinCatcher();
        break;
      case 'tradingSimulator':
        this.startTradingSimulator();
        break;
      case 'cryptoQuiz':
        this.startCryptoQuiz();
        break;
      case 'priceGuess':
        this.startPriceGuess();
        break;
      case 'memoryMatch':
        this.startMemoryMatch();
        break;
      case 'spinWheel':
        this.startSpinWheel();
        break;
    }
  }

  closeGame() {
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
      gameContainer.remove();
    }
  }

  endGame(gameType, score) {
    this.userStats.totalScore += score;
    this.userStats.coins += score;
    this.userStats.gamesPlayed++;
    
    if (!this.userStats.highScores[gameType] || score > this.userStats.highScores[gameType]) {
      this.userStats.highScores[gameType] = score;
    }
    
    // Level up check
    const newLevel = Math.floor(this.userStats.totalScore / 1000) + 1;
    if (newLevel > this.userStats.level) {
      this.userStats.level = newLevel;
      this.showLevelUp(newLevel);
    }
    
    this.saveStats();
    this.updateUI();
    this.showGameResult(gameType, score);
  }

  showGameResult(gameType, score) {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'game-result-overlay';
    resultDiv.innerHTML = `
      <div class="result-modal">
        <h2>🎉 Game Complete!</h2>
        <div class="result-score">Score: ${score}</div>
        <div class="result-coins">+${score} Coins</div>
        <div class="result-buttons">
          <button onclick="cryptoGames.startGame('${gameType}')" class="play-again-btn">Play Again</button>
          <button onclick="cryptoGames.closeGameResult()" class="close-result-btn">Close</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(resultDiv);
  }

  closeGameResult() {
    const resultOverlay = document.querySelector('.game-result-overlay');
    if (resultOverlay) resultOverlay.remove();
    
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) gameContainer.remove();
  }

  showLevelUp(level) {
    const levelUpDiv = document.createElement('div');
    levelUpDiv.className = 'level-up-notification';
    levelUpDiv.innerHTML = `
      <div class="level-up-content">
        <h2>🎊 LEVEL UP! 🎊</h2>
        <div class="new-level">Level ${level}</div>
        <p>You've reached a new level!</p>
      </div>
    `;
    
    document.body.appendChild(levelUpDiv);
    
    setTimeout(() => {
      levelUpDiv.remove();
    }, 4000);
  }

  createParticleExplosion(x, y) {
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'explosion-particle';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.setProperty('--random-x', (Math.random() - 0.5) * 200 + 'px');
      particle.style.setProperty('--random-y', (Math.random() - 0.5) * 200 + 'px');
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 1000);
    }
  }

  createFloatingGameElements() {
    setInterval(() => {
      if (Math.random() < 0.3) {
        const element = document.createElement('div');
        element.className = 'floating-game-element';
        element.innerHTML = ['🎮', '🎯', '🏆', '💎', '⭐'][Math.floor(Math.random() * 5)];
        element.style.left = Math.random() * 100 + '%';
        
        document.body.appendChild(element);
        
        setTimeout(() => element.remove(), 8000);
      }
    }, 5000);
  }

  startBackgroundAnimations() {
    // Create animated background elements
    const createBackgroundElement = () => {
      const element = document.createElement('div');
      element.className = 'background-game-element';
      element.style.left = Math.random() * 100 + '%';
      element.style.animationDuration = (Math.random() * 10 + 10) + 's';
      
      document.body.appendChild(element);
      
      setTimeout(() => element.remove(), 20000);
    };
    
    setInterval(createBackgroundElement, 3000);
  }

  updateUI() {
    document.getElementById('playerCoins').textContent = this.userStats.coins;
    document.getElementById('playerLevel').textContent = this.userStats.level;
    document.getElementById('playerScore').textContent = this.userStats.totalScore;
    document.getElementById('gameNotification').textContent = this.userStats.gamesPlayed;
  }

  saveStats() {
    localStorage.setItem('cryptoGameStats', JSON.stringify(this.userStats));
  }
}

// Initialize the gaming system
let cryptoGames;
document.addEventListener('DOMContentLoaded', () => {
  cryptoGames = new CryptoGamingHub();
});

// Export for global access
window.CryptoGamingHub = CryptoGamingHub;