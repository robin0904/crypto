// AI-Powered Market Predictor with Animated Characters
class AIMarketPredictor {
  constructor() {
    this.predictions = [];
    this.aiCharacter = null;
    this.marketSentiments = ['Very Bearish', 'Bearish', 'Neutral', 'Bullish', 'Very Bullish'];
    this.init();
  }

  init() {
    this.createAICharacter();
    this.createPredictorWidget();
    this.startAIAnalysis();
  }

  createAICharacter() {
    const aiCharacter = document.createElement('div');
    aiCharacter.className = 'ai-character';
    aiCharacter.innerHTML = `
      <div class="ai-body">
        <div class="ai-head">
          <div class="ai-eyes">
            <div class="ai-eye left">
              <div class="ai-pupil"></div>
            </div>
            <div class="ai-eye right">
              <div class="ai-pupil"></div>
            </div>
          </div>
          <div class="ai-mouth"></div>
        </div>
        <div class="ai-brain">
          <div class="brain-wave"></div>
          <div class="brain-wave"></div>
          <div class="brain-wave"></div>
        </div>
      </div>
      <div class="ai-speech-bubble" id="aiSpeech">
        <div class="speech-text">Analyzing market data...</div>
      </div>
    `;
    
    document.body.appendChild(aiCharacter);
    this.aiCharacter = aiCharacter;
    
    // AI Character interactions
    aiCharacter.addEventListener('click', () => {
      this.triggerAIAnalysis();
    });
  }

  createPredictorWidget() {
    const predictorWidget = document.createElement('div');
    predictorWidget.className = 'ai-predictor-widget';
    predictorWidget.innerHTML = `
      <div class="predictor-card">
        <h3>🤖 AI Market Oracle</h3>
        <div class="ai-status">
          <div class="status-indicator"></div>
          <span id="aiStatus">Analyzing...</span>
        </div>
        
        <div class="prediction-display">
          <div class="prediction-item">
            <div class="prediction-label">Next Hour</div>
            <div class="prediction-value" id="hourPrediction">
              <span class="prediction-direction">📈</span>
              <span class="prediction-confidence">85%</span>
            </div>
          </div>
          
          <div class="prediction-item">
            <div class="prediction-label">Next Day</div>
            <div class="prediction-value" id="dayPrediction">
              <span class="prediction-direction">📊</span>
              <span class="prediction-confidence">72%</span>
            </div>
          </div>
          
          <div class="prediction-item">
            <div class="prediction-label">Next Week</div>
            <div class="prediction-value" id="weekPrediction">
              <span class="prediction-direction">🚀</span>
              <span class="prediction-confidence">68%</span>
            </div>
          </div>
        </div>
        
        <div class="ai-insights">
          <div class="insight-title">🧠 AI Insights</div>
          <div class="insight-text" id="aiInsight">
            Market showing strong bullish patterns with high volume confirmation...
          </div>
        </div>
        
        <div class="market-fear-gauge">
          <div class="gauge-title">Market Fear/Greed</div>
          <div class="gauge-container">
            <div class="gauge-fill" id="fearGaugeFill"></div>
            <div class="gauge-needle" id="fearGaugeNeedle"></div>
            <div class="gauge-labels">
              <span>Fear</span>
              <span>Greed</span>
            </div>
          </div>
        </div>
        
        <button class="ai-analyze-btn" onclick="aiPredictor.triggerAIAnalysis()">
          🔮 Get New Prediction
        </button>
      </div>
    `;
    
    // Add to game widgets
    let container = document.querySelector('.game-widgets');
    if (!container) {
      container = document.createElement('div');
      container.className = 'game-widgets';
      document.body.appendChild(container);
    }
    container.appendChild(predictorWidget);
  }

  async startAIAnalysis() {
    // Simulate AI analysis with realistic delays and animations
    await this.simulateAIThinking();
    this.generatePredictions();
    this.updateAICharacterMood();
    
    // Update predictions every 5 minutes
    setInterval(() => {
      this.triggerAIAnalysis();
    }, 300000);
  }

  async triggerAIAnalysis() {
    this.setAIStatus('Analyzing market data...', 'analyzing');
    this.animateAIThinking();
    
    await this.simulateAIThinking();
    
    this.generatePredictions();
    this.updateAICharacterMood();
    this.setAIStatus('Analysis complete!', 'complete');
    
    // Award XP for using AI predictor
    if (window.gameSystem) {
      gameSystem.awardXP(15, 'Used AI Predictor');
    }
  }

  async simulateAIThinking() {
    const thinkingPhrases = [
      "Processing market indicators...",
      "Analyzing volume patterns...",
      "Checking social sentiment...",
      "Evaluating technical signals...",
      "Computing probability matrices...",
      "Finalizing predictions..."
    ];
    
    for (let phrase of thinkingPhrases) {
      this.updateAISpeech(phrase);
      await this.delay(800);
    }
  }

  generatePredictions() {
    // Generate realistic-looking predictions with some randomness
    const baseConfidence = 60 + Math.random() * 30; // 60-90%
    
    const hourPrediction = {
      direction: Math.random() > 0.5 ? 'up' : 'down',
      confidence: Math.round(baseConfidence + Math.random() * 10),
      change: (Math.random() * 5).toFixed(1)
    };
    
    const dayPrediction = {
      direction: Math.random() > 0.4 ? 'up' : 'down',
      confidence: Math.round(baseConfidence - 5 + Math.random() * 10),
      change: (Math.random() * 15).toFixed(1)
    };
    
    const weekPrediction = {
      direction: Math.random() > 0.3 ? 'up' : 'down',
      confidence: Math.round(baseConfidence - 10 + Math.random() * 15),
      change: (Math.random() * 25).toFixed(1)
    };
    
    this.updatePredictionDisplay('hourPrediction', hourPrediction);
    this.updatePredictionDisplay('dayPrediction', dayPrediction);
    this.updatePredictionDisplay('weekPrediction', weekPrediction);
    
    this.generateAIInsight(hourPrediction, dayPrediction, weekPrediction);
    this.updateFearGreedGauge();
  }

  updatePredictionDisplay(elementId, prediction) {
    const element = document.getElementById(elementId);
    const directionIcon = prediction.direction === 'up' ? '📈' : '📉';
    const confidenceColor = prediction.confidence > 80 ? '#00ff88' : 
                           prediction.confidence > 60 ? '#ffaa00' : '#ff6666';
    
    element.innerHTML = `
      <span class="prediction-direction">${directionIcon}</span>
      <span class="prediction-confidence" style="color: ${confidenceColor}">
        ${prediction.confidence}%
      </span>
    `;
    
    // Add animation
    element.style.animation = 'none';
    setTimeout(() => {
      element.style.animation = 'predictionUpdate 0.5s ease-out';
    }, 10);
  }

  generateAIInsight(hour, day, week) {
    const insights = [
      `Strong ${hour.direction}ward momentum detected with ${hour.confidence}% confidence. Volume analysis suggests ${day.direction === 'up' ? 'bullish' : 'bearish'} continuation.`,
      `Technical indicators show ${day.direction === 'up' ? 'positive' : 'negative'} divergence. Market sentiment is ${week.direction === 'up' ? 'optimistic' : 'cautious'} for the week ahead.`,
      `AI models detect ${hour.direction === 'up' ? 'accumulation' : 'distribution'} patterns. ${day.confidence > 75 ? 'High confidence' : 'Moderate confidence'} in short-term direction.`,
      `Social sentiment analysis indicates ${week.direction === 'up' ? 'growing interest' : 'declining enthusiasm'}. Technical confluence at ${hour.confidence}% reliability.`,
      `Market microstructure suggests ${hour.direction === 'up' ? 'buying pressure' : 'selling pressure'}. Weekly outlook remains ${week.direction === 'up' ? 'constructive' : 'challenging'}.`
    ];
    
    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    document.getElementById('aiInsight').textContent = randomInsight;
    
    this.updateAISpeech(randomInsight.substring(0, 50) + "...");
  }

  updateFearGreedGauge() {
    const fearValue = 25 + Math.random() * 50; // 25-75 range
    const percentage = fearValue;
    
    const gaugeFill = document.getElementById('fearGaugeFill');
    const gaugeNeedle = document.getElementById('fearGaugeNeedle');
    
    if (gaugeFill && gaugeNeedle) {
      gaugeFill.style.width = percentage + '%';
      gaugeNeedle.style.left = percentage + '%';
      
      // Color based on fear/greed level
      const color = fearValue < 30 ? '#ff6666' : 
                   fearValue < 50 ? '#ffaa00' : '#00ff88';
      gaugeFill.style.background = color;
      gaugeNeedle.style.borderTopColor = color;
    }
  }

  animateAIThinking() {
    const aiCharacter = this.aiCharacter;
    const brainWaves = aiCharacter.querySelectorAll('.brain-wave');
    
    brainWaves.forEach((wave, index) => {
      wave.style.animationDelay = (index * 0.2) + 's';
      wave.style.animation = 'brainWave 1s ease-in-out infinite';
    });
    
    // Make AI eyes look around
    const pupils = aiCharacter.querySelectorAll('.ai-pupil');
    pupils.forEach(pupil => {
      pupil.style.animation = 'eyeMovement 2s ease-in-out infinite';
    });
  }

  updateAICharacterMood() {
    const aiCharacter = this.aiCharacter;
    const mouth = aiCharacter.querySelector('.ai-mouth');
    
    // Change mouth expression based on market sentiment
    const marketTrend = Math.random();
    if (marketTrend > 0.6) {
      mouth.className = 'ai-mouth happy';
      aiCharacter.className = 'ai-character bullish';
    } else if (marketTrend < 0.4) {
      mouth.className = 'ai-mouth sad';
      aiCharacter.className = 'ai-character bearish';
    } else {
      mouth.className = 'ai-mouth neutral';
      aiCharacter.className = 'ai-character neutral';
    }
  }

  setAIStatus(status, type) {
    const statusElement = document.getElementById('aiStatus');
    const indicator = document.querySelector('.status-indicator');
    
    if (statusElement) {
      statusElement.textContent = status;
    }
    
    if (indicator) {
      indicator.className = `status-indicator ${type}`;
    }
  }

  updateAISpeech(text) {
    const speechElement = document.querySelector('.speech-text');
    if (speechElement) {
      speechElement.textContent = text;
      
      // Animate speech bubble
      const bubble = document.querySelector('.ai-speech-bubble');
      bubble.style.animation = 'none';
      setTimeout(() => {
        bubble.style.animation = 'speechBubble 0.3s ease-out';
      }, 10);
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize AI Predictor
let aiPredictor;
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    aiPredictor = new AIMarketPredictor();
  }, 2000); // Delay to let other systems load first
});

// Export for global access
window.AIMarketPredictor = AIMarketPredictor;