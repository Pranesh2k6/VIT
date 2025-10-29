const express = require('express');
const cors = require('cors');
const path = require('path'); // Required for serving static files
const fs = require('fs');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
require('dotenv').config(); // Load .env variables

const app = express();
const port = process.env.PORT || 5002; // Use port from .env or default

// --- Check for Essential Environment Variables ---
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("---------------------------------------------------------");
    console.error("FATAL ERROR: GEMINI_API_KEY is not defined in the .env file!");
    console.error("Please create a '.env' file in the 'clario-backend' folder");
    console.error("and add your key like this: GEMINI_API_KEY=AIzaSy......");
    console.error("---------------------------------------------------------");
    process.exit(1); // Stop the server if the key is missing
}
// Add checks for MONGO_URI later if needed

// --- Core Middleware ---
app.use(cors()); // Enable CORS for all origins (adjust for production later)
app.use(express.json()); // Parse JSON request bodies

// --- Serve Static Files ---
// This line tells Express to serve any files found in the 'public' directory
// It should come BEFORE your API routes.
app.use(express.static(path.join(__dirname, 'public')));
// Now requests like http://localhost:5002/login.html or
// http://localhost:5002/chatbot/js/main.YYYY.js will be served automatically.
// --------------------------

// Explicit routes for login page to avoid any ambiguity
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Redirect root to login page
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// Diagnostics: list files in public and check login.html
app.get('/__ls', (req, res) => {
    const publicDir = path.join(__dirname, 'public');
    let listing = [];
    try {
        listing = fs.readdirSync(publicDir).sort();
    } catch (e) {
        return res.status(500).json({ error: 'Cannot read public dir', details: String(e) });
    }
    const loginPath = path.join(publicDir, 'login.html');
    const exists = fs.existsSync(loginPath);
    res.json({ publicDir, exists, loginPath, files: listing.slice(0, 200) });
});

// --- Logging Middleware (Optional but helpful) ---
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// --- Gemini API Setup ---
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "models/gemini-flash-latest" });

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

const systemPrompt = `
You are Dr. Neutron, an expert AI mentor for JEE (Physics, Chemistry, Math) students.
Your personality is friendly, encouraging, supportive, and enthusiastic about science.
Help with: Study Strategies, Chapter Roadmaps, and Small Doubts (using LaTeX like $E=mc^2$).
Keep answers concise, accurate, and relevant to JEE. If unsure or outside scope, politely say so.
Maintain your persona.
`;

// --- API Route for Chatbot ---
app.post('/api/chat', async (req, res) => {
    console.log("Handling POST request on /api/chat");
    try {
        const userMessage = req.body.message;
        const history = req.body.history || []; // Get optional chat history

        if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
            return res.status(400).json({ error: 'Message is required.' });
        }

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: "Remember your persona: " + systemPrompt }] },
                { role: "model", parts: [{ text: "Understood! I'm Dr. Neutron!" }] },
                ...history
            ],
            safetySettings: safetySettings
        });

        const result = await chat.sendMessage(userMessage);
        const response = await result.response;

        if (!response) { throw new Error("No response from AI model."); }
        if (response.promptFeedback?.blockReason) {
            return res.status(400).json({ error: `Response blocked: ${response.promptFeedback.blockReason}` });
        }

        const botReply = response.text();
        res.json({ reply: botReply });

    } catch (error) {
        console.error("Error in /api/chat:", error);
        res.status(500).json({ error: 'Failed to get response from AI.' });
    }
});

// --- Optional: Add other API routes later (e.g., /api/users, /api/quiz) ---
// app.use('/api/users', userRoutes);
// app.use('/api/quiz', quizRoutes);

// --- Serve index.html as fallback for SPA (Single Page App) behavior if needed ---
// If your React app handles all routing, you might want this AFTER API routes
// but usually not needed if you are serving multiple distinct HTML files.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// --- Basic Error Handling Middleware ---
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err.stack || err);
    // Avoid sending stack trace to client in production
    res.status(500).json({ error: 'Something went wrong on the server!' });
});

// (removed duplicate express.static to avoid confusion)

// 404 logger
app.use((req, res) => {
    console.warn(`404 Not Found: ${req.method} ${req.url}`);
    res.status(404).send('Not Found');
});

// --- Start the Server ---
app.listen(port, () => {
    console.log(`Clario Backend Server listening on http://localhost:${port}`);
    console.log(`Serving static files from: ${path.join(__dirname, 'public')}`);
});