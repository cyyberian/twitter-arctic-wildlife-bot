require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

// env variables
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

const client = new TwitterApi ({
    appKey: API_KEY,
    appSecret: API_SECRET,
    accessToken: ACCESS_TOKEN,
    accessSecret: ACCESS_SECRET
});

const searchTerms = ['polar bears', 'seals', 'otters', 'penguins', 'snow leopard', 'walrus', 'narwhal', 'snowy owl', 'arctic fox', 'snowy owl'];
const randomSearch = searchTerms[Math.floor(Math.random() * searchTerms.length)]
const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(randomSearch)}&per_page=15`;

// note to self: learn how to actually debug instead of relying on ai
const getImage = async() => {
    try {
        console.log('Fetching from Pexels...' + `Search for ${randomSearch}`);
        const res = await fetch(apiUrl, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        console.log('Response status:', res.status);
        console.log('Response ok:', res.ok);

        const data = await res.json();
        console.log('Response data:', JSON.stringify(data, null, 2));

        if (data.photos && data.photos.length > 0) {
            console.log('Found', data.photos.length, 'images');
            const random = data.photos[Math.floor(Math.random() * data.photos.length)]
            console.log('Selected image URL:', random.src.large);
            return random;
        } else {
            console.log('No images found.');
        }

    } catch (err) {
        console.error("Error with pexels", err);
    }
}

const writeTweet = async () => {
    const image = await getImage();

    if (image) {
        const imageAltText = image.alt;
        const imagePhotographer = image.photographer;
        const imagePhotographerURL = image.photographer_url;

        const res = await fetch(image.src.large);
        const buffer = await res.arrayBuffer();
        const media = await client.v1.uploadMedia(Buffer.from(buffer), {mimeType: 'image/jpeg'});

        await client.v2.tweet({
            text: `${imageAltText}\nImage by ${imagePhotographer} at ${imagePhotographerURL}`,
            media: {media_ids: [media]}
        })
    } else {
        console.log("Error with uploading image..");
    }
}

writeTweet();

// for every two hours
const time = 2*60*60*1000;
setInterval(writeTweet, time);