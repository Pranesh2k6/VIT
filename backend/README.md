# Clario Backend - Gemini Flash API Integration

This backend server powers the Clario chatbot using Google's Gemini Flash Latest API.

## Features

- ✨ Gemini Flash Latest API integration for fast, intelligent responses
- 💬 Chat history support for contextual conversations
- 🛡️ Safety settings to filter inappropriate content
- 🎓 Customized for JEE students (Physics, Chemistry, Math)
- 🚀 Express.js backend with CORS support

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=5002
```

**Important:** Never commit your `.env` file to version control!

### 3. Start the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5002`

## API Endpoints

### POST `/api/chat`

Send a message to the chatbot and receive a response.

**Request Body:**
```json
{
  "message": "What is Newton's second law?",
  "history": [
    {
      "role": "user",
      "parts": [{ "text": "Hello" }]
    },
    {
      "role": "model",
      "parts": [{ "text": "Hi! I'm Dr. Neutron." }]
    }
  ]
}
```

**Response:**
```json
{
  "reply": "Newton's second law states that F = ma..."
}
```

**Error Response:**
```json
{
  "error": "Failed to get response from AI."
}
```

## Configuration

### System Prompt

The chatbot is configured with a JEE-focused persona called "Dr. Neutron". You can modify this in `server.js`:

```javascript
const systemPrompt = `
You are Dr. Neutron, an expert AI mentor for JEE students...
`;
```

### Safety Settings

Safety thresholds are configured to block medium and above harmful content. Modify in `server.js`:

```javascript
const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  // ...
];
```

## Testing

Test the API using curl:

```bash
curl -X POST http://localhost:5002/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is integration?"}'
```

## Troubleshooting

### Server won't start
- Check if port 5002 is already in use
- Verify your `.env` file exists and has the correct API key
- Run `npm install` to ensure dependencies are installed

### API returns errors
- Verify your Gemini API key is valid
- Check your internet connection
- Review server logs for detailed error messages

### CORS issues
- The server is configured to allow all origins in development
- For production, update the CORS configuration in `server.js`

## Project Structure

```
backend/
├── server.js           # Main Express server
├── package.json        # Dependencies and scripts
├── .env               # Environment variables (create this)
├── .env.example       # Template for .env
└── README.md          # This file
```

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment
2. Configure CORS to allow only your domain
3. Use a process manager like PM2
4. Set up SSL/HTTPS
5. Monitor logs and error rates

## Dependencies

- `express` - Web framework
- `cors` - Enable CORS
- `dotenv` - Environment variable management
- `@google/generative-ai` - Google Gemini API client

## License

ISC
