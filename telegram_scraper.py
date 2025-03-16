import pandas as pd
import numpy as np
import re
from flask import Flask, render_template, request, jsonify
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import json
from datetime import datetime
import collections
import requests

# Initialize Flask app
app = Flask(__name__)

# List of top 200 cryptocurrencies (to be populated)
TOP_CRYPTOCURRENCIES = []

# Initialize top cryptocurrencies list
def initialize_crypto_list():
    global TOP_CRYPTOCURRENCIES
    try:
        # You can use CoinGecko's API to get the top 200 cryptocurrencies
        # This is a free API with generous rate limits
        response = requests.get('https://api.coingecko.com/api/v3/coins/markets', 
                               params={'vs_currency': 'usd', 'order': 'market_cap_desc', 'per_page': 200, 'page': 1})
        if response.status_code == 200:
            data = response.json()
            for coin in data:
                # Add both symbol and name to our list
                TOP_CRYPTOCURRENCIES.append(coin['symbol'].lower())
                TOP_CRYPTOCURRENCIES.append(coin['name'].lower())
            
            # Remove duplicates
            TOP_CRYPTOCURRENCIES = list(set(TOP_CRYPTOCURRENCIES))
        else:
            # Fallback: Use a predefined list if API fails
            fallback_top_cryptos()
    except Exception as e:
        print(f"Error initializing crypto list: {e}")
        # Fallback to predefined list
        fallback_top_cryptos()

def fallback_top_cryptos():
    """Fallback function with a predefined list of top cryptocurrencies"""
    global TOP_CRYPTOCURRENCIES
    # This is a simplified list - in production you would want to expand this
    basic_cryptos = [
        "bitcoin", "btc", "ethereum", "eth", "tether", "usdt", "binance coin", "bnb",
        "xrp", "cardano", "ada", "solana", "sol", "polkadot", "dot", "dogecoin", "doge",
        "avalanche", "avax", "shiba inu", "shib", "terra", "luna", "polygon", "matic",
        "dai", "litecoin", "ltc", "cosmos", "atom", "chainlink", "link", "uniswap", "uni",
        "bitcoin cash", "bch", "algorand", "algo", "stellar", "xlm", "internet computer", "icp",
        "vechain", "vet", "filecoin", "fil", "tron", "trx", "ethereum classic", "etc",
        "theta", "theta", "hedera", "hbar", "monero", "xmr", "fantom", "ftm", "elrond", "egld"
    ]
    TOP_CRYPTOCURRENCIES = basic_cryptos

# Load the data
def load_data():
    # In a real application, this would be your scraping function
    # For now, let's assume we have the data in a predefined format
    
    # Convert data to proper format
    data = {
        'timestamp': [],
        'channel_name': [],
        'message_id': [],
        'sender_username': [],
        'message_text': [],
        'keywords_detected': [],
        'sentiment': [],
        'polarity': [],
        'subjectivity': [],
        'coin_symbol': [],
        'coin_name': []
    }
    
    # This function would parse your CSV data
    # For demonstration, let's manually create sample data
    # In a real application, you would load from your database
    df = pd.read_csv('defi_telegram_data.csv')
    
    # Convert timestamp to datetime format
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    
    # Improve coin detection by labeling messages with any of the top cryptocurrencies
    for index, row in df.iterrows():
        message_text = str(row['message_text']).lower()
        
        # If coin is already labeled, continue
        if pd.notna(row['coin_symbol']) and str(row['coin_symbol']).strip() != 'Unknown':
            continue
        
        # Search for cryptocurrency mentions in the message
        for crypto in TOP_CRYPTOCURRENCIES:
            # Use word boundary to avoid false positives
            pattern = r'\b' + re.escape(crypto) + r'\b'
            if re.search(pattern, message_text):
                df.at[index, 'coin_symbol'] = crypto.upper()
                # Attempt to determine the proper name if we found a symbol
                if len(crypto) <= 5:  # Likely a symbol
                    # Look up full name - in production this would use a proper mapping
                    for full_crypto in TOP_CRYPTOCURRENCIES:
                        if len(full_crypto) > 5 and crypto in full_crypto:
                            df.at[index, 'coin_name'] = full_crypto.title()
                            break
                else:
                    df.at[index, 'coin_name'] = crypto.title()
                break
    
    return df

# Define urgency keywords
URGENCY_KEYWORDS = ['breaking', 'urgent', 'alert', 'warning', 'scam', 'hack']

# Define topic categories
TOPIC_CATEGORIES = {
    'Price Movement': ['price', 'ath', 'buy', 'sell', 'pump', 'dump', 'bull', 'bear', 'value'],
    'Partnerships': ['partnership', 'collaboration', 'announce', 'announcement', 'agreement', 'release', 'upgrade'],
    'Regulation': ['regulation', 'compliance', 'law', 'legal', 'government', 'ban', 'policy', 'governance', 'vote', 'proposal'],
    'Technology': ['protocol', 'token', 'blockchain', 'apy', 'apr', 'yield', 'pool', 'lp', 'liquidity', 'avalanche', 'ethereum', 'eth', 'btc', 'bnb', 'bitcoin'],
    'Security': ['security', 'scam', 'hack', 'bug', 'vulnerability', 'warning', 'alert', 'whale']
}

# Categorize message into topics
def categorize_message(message_text, keywords):
    lowercase_text = message_text.lower()
    detected_topics = []
    
    # Check keywords from message
    if isinstance(keywords, str):
        keyword_list = [k.strip() for k in keywords.split(',')]
    else:
        keyword_list = []
    
    for category, keywords in TOPIC_CATEGORIES.items():
        for keyword in keywords:
            if keyword in lowercase_text or keyword in keyword_list:
                detected_topics.append(category)
                break
    
    return list(set(detected_topics))  # Remove duplicates

# Check for urgency in message
def check_urgency(message_text, sentiment):
    lowercase_text = message_text.lower()
    
    # Check for urgency keywords
    for keyword in URGENCY_KEYWORDS:
        if keyword in lowercase_text:
            return True
    
    # Also consider strongly negative sentiment as urgent
    if sentiment == 'warning' or (isinstance(sentiment, str) and 'negative' in sentiment.lower()):
        return True
    
    return False

# Process data for analysis
def process_data(df, coin_filter=None):
    results = {
        'total_messages': 0,
        'sentiment_distribution': {'positive': 0, 'neutral': 0, 'negative': 0, 'warning': 0},
        'topic_distribution': {},
        'urgent_messages': 0,
        'channel_distribution': {},
        'latest_insights': [],
        'time_series_data': [],
        'coin_distribution': {}
    }
    
    # Apply filter if provided
    if coin_filter:
        coin_filter = coin_filter.lower()
        # Enhanced filtering logic for better matching
        filtered_df = df[
            (df['coin_symbol'].str.lower() == coin_filter) | 
            (df['coin_name'].str.lower() == coin_filter) | 
            (df['coin_symbol'].str.lower().str.contains(f"\\b{coin_filter}\\b", regex=True, na=False)) |
            (df['coin_name'].str.lower().str.contains(f"\\b{coin_filter}\\b", regex=True, na=False)) |
            (df['message_text'].str.lower().str.contains(f"\\b{coin_filter}\\b", regex=True, na=False))
        ]
    else:
        filtered_df = df
    
    if filtered_df.empty:
        return results
    
    results['total_messages'] = len(filtered_df)
    
    # Process each message
    all_topics = []
    for _, row in filtered_df.iterrows():
        # Sentiment distribution
        sentiment = row['sentiment']
        if sentiment in results['sentiment_distribution']:
            results['sentiment_distribution'][sentiment] += 1
        
        # Topic categorization
        topics = categorize_message(str(row['message_text']), row['keywords_detected'])
        all_topics.extend(topics)
        
        # Check for urgency
        if check_urgency(str(row['message_text']), sentiment):
            results['urgent_messages'] += 1
        
        # Channel distribution
        channel = row['channel_name']
        if channel in results['channel_distribution']:
            results['channel_distribution'][channel] += 1
        else:
            results['channel_distribution'][channel] = 1
            
        # Coin distribution
        coin = row['coin_symbol'] if pd.notna(row['coin_symbol']) else 'Unknown'
        if coin in results['coin_distribution']:
            results['coin_distribution'][coin] += 1
        else:
            results['coin_distribution'][coin] = 1
        
        # Add to latest insights (last 10 messages)
        if len(results['latest_insights']) < 10:
            message_data = {
                'timestamp': row['timestamp'].strftime('%Y-%m-%d %H:%M'),
                'channel': channel,
                'message': row['message_text'][:100] + '...' if len(str(row['message_text'])) > 100 else str(row['message_text']),
                'sentiment': sentiment,
                'urgent': check_urgency(str(row['message_text']), sentiment),
                'topics': topics
            }
            results['latest_insights'].append(message_data)
    
    # Count topic occurrences
    topic_counter = collections.Counter(all_topics)
    results['topic_distribution'] = dict(topic_counter.most_common())
    
    # Prepare time series data (messages per day)
    filtered_df['date'] = filtered_df['timestamp'].dt.date
    daily_counts = filtered_df.groupby(['date', 'sentiment']).size().reset_index(name='count')
    
    for _, row in daily_counts.iterrows():
        results['time_series_data'].append({
            'date': row['date'].strftime('%Y-%m-%d'),
            'sentiment': row['sentiment'],
            'count': row['count']
        })
    
    return results

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    coin_filter = request.args.get('coin', None)
    df = load_data()
    results = process_data(df, coin_filter)
    return jsonify(results)

@app.route('/api/coins', methods=['GET'])
def get_coins():
    df = load_data()
    # Get unique coins from both the dataframe and our top cryptocurrencies list
    coins = []
    
    # Add coins from dataframe
    for symbol in df['coin_symbol'].dropna().unique():
        if symbol != 'Unknown':
            coins.append(symbol)
    
    for name in df['coin_name'].dropna().unique():
        if name != 'Unknown':
            coins.append(name)
    
    # Add top cryptocurrencies not already in the list
    for crypto in TOP_CRYPTOCURRENCIES:
        if crypto not in [c.lower() for c in coins]:
            coins.append(crypto.upper() if len(crypto) <= 5 else crypto.title())
    
    return jsonify(sorted(list(set(coins))))

if __name__ == '__main__':
    # Initialize top cryptocurrencies list before starting the app
    initialize_crypto_list()
    app.run(debug=True)