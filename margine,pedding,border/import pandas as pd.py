# Install TextBlob (only once)
# In VS Code terminal: pip install textblob

from textblob import TextBlob

# Take user input
review = input("Enter your movie review: ")

# Create a TextBlob object
blob = TextBlob(review)

# Get polarity score (-1 to 1)
polarity = blob.sentiment.polarity

# Interpret the score
if polarity > 0:
    sentiment = "Positive 😊"
elif polarity < 0:
    sentiment = "Negative 😠"
else:
    sentiment = "Neutral 😐"

# Output result
print(f"Sentiment: {sentiment}")
print(f"Polarity Score: {polarity}")
