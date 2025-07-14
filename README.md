# Twiter Arctic Wildlife Bot
A bot that fetches images of arctic wildlife using the Pexels API and Twitter API v2.

## Information
- Fetches an image from pexel using search terms (can be modified to include other terms) every two hours and posts them on twitter.
- Each post comes with the alt text of the image and credit. 

## Set-up
1. **Clone the repository**
   - git clone https://github.com/cyyberian/twitter-arctic-wildlife-bot.git
   - cd twitter-arctic-wildlife-bot
2. **Install dependencies**
   - npm install
3. **Create the .env file in the directory and create the following:**
   - API_KEY=your-twitter-api-key
   - API_SECRET=your-twitter-api-secret
   - ACCESS_TOKEN=your-twitter-access-token
   - ACCESS_SECRET=your-twitter-access-secret
   - PEXELS_API_KEY=your-pexels-api-key
4. **Run using node index.js**

# Usage and Notes
- This bot will post automatically every 2 hours.
- You can edit the search terms to include keywords of your interest.
- You **MUST** make sure your twitter dev account can post media tweets
