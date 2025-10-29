# Chatbot Setup Guide - Gemini Flash Integration

This guide will help you set up and run the Clario chatbot with Gemini Flash Latest API integration.

## 🚀 Quick Start

### Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Step 2: Configure Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your API key
# GEMINI_API_KEY=your_actual_api_key_here
# PORT=5002
```

### Step 3: Start the Backend Server

```bash
# Start in development mode (recommended)
npm run dev

# OR start in production mode
npm start
```

You should see:
```
Clario Backend Server listening on http://localhost:5002
```

### Step 4: Open the Frontend

Open `frontend/login.html` or `frontend/signup.html` in your browser, and you'll see the chatbot floating button in the bottom right corner.

## 📋 What Was Changed

### Backend (`backend/server.js`)
- ✅ Already configured with Gemini Flash Latest API
- ✅ Endpoint: `POST /api/chat`
- ✅ Supports chat history for contextual conversations
- ✅ Safety settings enabled
- ✅ Custom JEE-focused system prompt ("Dr. Neutron")

### Frontend (`chatbot-widget/src/App.js`)
- ✅ Updated to call backend API at `http://localhost:5002/api/chat`
- ✅ Added loading state ("💭 Thinking...")
- ✅ Error handling with user-friendly messages
- ✅ Chat history sent to API for context

### Built Files
- ✅ Rebuilt chatbot widget: `main.8f2b1fcb.js`
- ✅ Updated `login.html` to use new build
- ✅ Updated `signup.html` to use new build

## 🧪 Testing the Integration

### Test 1: Backend API
```bash
curl -X POST http://localhost:5002/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is F=ma?"}'
```

Expected response:
```json
{
  "reply": "F = ma is Newton's second law of motion..."
}
```

### Test 2: Frontend Chatbot
1. Open `frontend/login.html` in browser
2. Click the floating chatbot button (bottom right)
3. Type a message like "What is Newton's second law?"
4. You should see a response from Dr. Neutron

## 📁 File Structure

```
VIT/
├── backend/
│   ├── server.js              # Express server with Gemini API
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment template
│   ├── .env                   # Your API key (create this)
│   └── README.md              # Backend documentation
│
├── chatbot-widget/
│   ├── src/
│   │   ├── App.js            # Updated with API integration
│   │   ├── ChatWindow.js     # Chat UI component
│   │   └── FloatingButton.js # Floating button component
│   └── build/                # Built React app
│
└── frontend/
    ├── chatbot/static/js/
    │   └── main.8f2b1fcb.js  # New chatbot build
    ├── login.html            # Updated to use new build
    └── signup.html           # Updated to use new build
```

## 🔧 Troubleshooting

### Issue: "Failed to get response from AI"
**Solution:**
- Check if backend server is running on port 5002
- Verify your API key in `backend/.env`
- Check browser console for error messages

### Issue: CORS Error
**Solution:**
- Backend already has CORS enabled for all origins
- If using a different port, update the fetch URL in `App.js`

### Issue: "💭 Thinking..." never goes away
**Solution:**
- Backend server might not be running
- Check backend terminal for errors
- Verify port 5002 is not blocked by firewall

### Issue: Old chatbot responses (dummy messages)
**Solution:**
- Clear browser cache and localStorage
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Check that HTML files reference `main.8f2b1fcb.js`

## 🎯 API Features

### Chat History Support
The chatbot maintains conversation context by sending chat history with each request.

### Safety Settings
Content is filtered for:
- Harassment
- Hate speech
- Sexually explicit content
- Dangerous content

### Custom Persona
Dr. Neutron is configured to help with:
- JEE Physics, Chemistry, and Math
- Study strategies
- Chapter roadmaps
- Concept explanations with LaTeX support

## 🔐 Security Notes

1. **Never commit `.env` file** - It contains your API key
2. **API Key limits** - Gemini API has usage quotas
3. **Production CORS** - Update CORS settings for production deployment
4. **Rate limiting** - Consider adding rate limiting for production

## 📚 Additional Resources

- [Gemini API Documentation](https://ai.google.dev/docs)
- [Google AI Studio](https://makersuite.google.com/)
- [Backend README](./backend/README.md)

## 🆘 Need Help?

If you encounter issues:
1. Check backend terminal logs
2. Check browser console (F12)
3. Verify all dependencies are installed
4. Ensure API key is valid and has quota remaining

---

**Integration completed on:** October 30, 2025
**Gemini Model:** gemini-flash-latest
**Backend Port:** 5002
