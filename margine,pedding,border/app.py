from flask import Flask, render_template, request, jsonify
from textblob import TextBlob

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    text = request.json.get('text', '')
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    
    # Determine sentiment and emoji
    if polarity > 0:
        sentiment = "Positive"
        emoji = "😊"
    elif polarity < 0:
        sentiment = "Negative"
        emoji = "😠"
    else:
        sentiment = "Neutral"
        emoji = "😐"
    
    return jsonify({
        'sentiment': sentiment,
        'polarity': polarity,
        'emoji': emoji
    })

if __name__ == '__main__':
    app.run(debug=True)