let analysisHistory = [];

function analyzeSentiment() {
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const buttonText = analyzeBtn.querySelector('.button-text');
    const loadingSpinner = analyzeBtn.querySelector('.loading-spinner');
    
    // Don't analyze empty text
    if (!textInput.value.trim()) {
        alert('Please enter some text to analyze');
        return;
    }

    // Show loading state
    buttonText.style.opacity = '0.5';
    loadingSpinner.style.display = 'block';
    analyzeBtn.disabled = true;

    // Send request to backend
    fetch('/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textInput.value })
    })
    .then(response => response.json())
    .then(data => {
        // Show results section
        document.getElementById('resultSection').style.display = 'block';
        
        // Update emoji and sentiment text
        document.getElementById('sentimentEmoji').textContent = data.emoji;
        document.getElementById('sentimentText').textContent = data.sentiment;
        
        // Update polarity score
        const polarityScore = document.getElementById('polarityScore');
        polarityScore.textContent = data.polarity.toFixed(2);
        
        // Update polarity indicator position
        const indicator = document.getElementById('polarityIndicator');
        const position = ((data.polarity + 1) / 2) * 100; // Convert -1 to 1 range to 0 to 100
        indicator.style.left = `${position}%`;

        // Add to history
        addToHistory(textInput.value, data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while analyzing the text');
    })
    .finally(() => {
        // Reset button state
        buttonText.style.opacity = '1';
        loadingSpinner.style.display = 'none';
        analyzeBtn.disabled = false;
    });
}

function addToHistory(text, result) {
    const historyItem = {
        text: text,
        sentiment: result.sentiment,
        polarity: result.polarity,
        emoji: result.emoji,
        timestamp: new Date()
    };
    
    analysisHistory.unshift(historyItem);
    if (analysisHistory.length > 5) {
        analysisHistory.pop();
    }
    
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = '';
    
    analysisHistory.forEach(item => {
        const historyElement = document.createElement('div');
        historyElement.className = 'history-item';
        
        const truncatedText = item.text.length > 50 
            ? item.text.substring(0, 50) + '...' 
            : item.text;
        
        historyElement.innerHTML = `
            <div class="history-text">${truncatedText}</div>
            <div class="history-result">
                ${item.emoji} (${item.polarity.toFixed(2)})
            </div>
        `;
        
        historyContainer.appendChild(historyElement);
    });
}