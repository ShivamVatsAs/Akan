import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// A simple check to see if we are in a local development environment
const isDevelopment = process.env.VERCEL_ENV !== 'production';

app.use(cors());
app.use(express.json());

// --- PRODUCTION ONLY SETUP ---
let model;
if (!isDevelopment) {
  if (!process.env.GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY is not set for production.");
  } else {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }
}

// --- PROMPTS for Production (when calling the real API) ---
const floatingMessagePrompts = [
    "Write one short, poetic line (max 10 words) from Shivam to Akanksha about her smile.",
    "Write one short, romantic sentence (max 10 words) from Shivam to Akanksha about her eyes.",
    "Write one beautiful phrase (max 10 words) from Shivam to Akanksha about her presence in his life.",
    "Write a single, heartfelt compliment (max 10 words) from Shivam to Akanksha about her laughter.",
    "Write one short, poetic line (max 10 words) from Shivam to Akanksha about the joy she brings him.",
];

const imageTitlePrompts = [
    "Write one short, romantic photo title (max 5 words) for a picture of Shivam and Akanksha.",
    "Write one sweet and simple photo caption (max 5 words) for a picture of Shivam and Akanksha.",
    "Write one poetic photo title (max 5 words) for a picture of a couple in love.",
    "Write one heartfelt photo caption (max 5 words) about a cherished memory for Shivam and Akanksha.",
    "Write one loving phrase (max 5 words) for a photo of a happy couple.",
];

// --- FALLBACK MESSAGES for Development (to avoid rate-limiting) ---
const devFloatingMessages = [
    "Your smile lights up my world.",
    "Lost in the sparkle of your eyes.",
    "Every moment with you is a gift.",
    "Your laughter is my favorite song.",
    "You are my greatest joy, Akanksha.",
    "My world is better with you in it.",
    "Simply beautiful, inside and out."
];

const devImageTitles = [
    "Our Forever Starts Now.",
    "A Moment to Cherish.",
    "Two Hearts, One Love.",
    "Simply, Us.",
    "My Favorite Chapter.",
    "Better Together.",
    "Love's Sweet Embrace."
];

// Helper function to generate content
async function generateContent(prompt) {
  // Guard against running in production without a model
  if (!model) {
    console.error("Gemini model not initialized. Returning fallback.");
    return "Happy Birthday, My Dear Akanksha! ❤️";
  }
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    // Clean up the response to remove any unwanted characters like asterisks
    return response.text().replace(/\*/g, '').trim();
  } catch (error) {
    console.error("Error generating content:", error);
    return "A wish for you, Akanksha! ✨"; // Fallback message
  }
}

// Route to get a random floating message
app.get('/api/floating-message', async (req, res) => {
  if (isDevelopment) {
    const randomIndex = Math.floor(Math.random() * devFloatingMessages.length);
    const message = devFloatingMessages[randomIndex];
    return res.json({ message });
  } else {
    const randomIndex = Math.floor(Math.random() * floatingMessagePrompts.length);
    const prompt = floatingMessagePrompts[randomIndex];
    const message = await generateContent(prompt);
    return res.json({ message });
  }
});

// Route to get a random image title
app.get('/api/image-title', async (req, res) => {
  if (isDevelopment) {
    const randomIndex = Math.floor(Math.random() * devImageTitles.length);
    const title = devImageTitles[randomIndex];
    return res.json({ title });
  } else {
    const randomIndex = Math.floor(Math.random() * imageTitlePrompts.length);
    const prompt = imageTitlePrompts[randomIndex];
    const title = await generateContent(prompt);
    return res.json({ title });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}. Running in ${isDevelopment ? 'Development' : 'Production'} mode.`);
});

export default app;

