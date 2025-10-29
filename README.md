# 🚀 Clario - Interactive Learning Galaxy Platform

[![Repository Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()

> **Learn. Explore. Conquer the Galaxy.**

An immersive, space-themed educational platform designed to make JEE preparation engaging and interactive. Navigate through galaxies of knowledge, explore planetary chapter systems, and master complex concepts with an integrated AI chatbot companion.

---

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Usage](#-usage)
- [Dataset](#-dataset)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Authors](#-authors)

---

## ✨ Features

### 🎯 Core Features

- **🌌 Galaxy Navigation System**: Choose from multiple subject galaxies (Mathematics, Physics, Chemistry, Biology, Computer Science)
- **🪐 Interactive Chapter Cards**: Visual progress tracking with mastery percentages and planet-based learning paths
- **🤖 AI Chatbot Widget**: Integrated React-based chatbot for instant learning assistance
- **📊 Progress Dashboard**: Real-time tracking of learning progress across all subjects
- **🔐 User Authentication**: Secure login and signup system with form validation
- **📱 Responsive Design**: Fully responsive interface that works on desktop and mobile devices

### 🎨 Design Highlights

- **Space-Themed UI**: Immersive cosmic design with gradient backgrounds and glassmorphism effects
- **Smooth Animations**: Enhanced user experience with fluid transitions and hover effects
- **Intuitive Navigation**: Clear visual hierarchy and easy-to-use interface
- **Mastery Indicators**: Color-coded progress dots (Low/In Progress/Mastered)

### 📚 Educational Features

- **Comprehensive JEE Syllabus**: Detailed breakdown of all topics for JEE preparation
- **Subject-wise Organization**: Structured content for Mathematics, Physics, and Chemistry
- **Chapter-wise Learning Paths**: Progressive unlocking system to guide learning journey
- **Interactive Problem Sets**: JSON-based dataset with questions and solutions

---

## 🎥 Demo

### Main Features Showcase

1. **Galaxy Selection Screen**: Choose your subject galaxy
   - `frontend/choose-galaxy.html`

2. **Dashboard**: Navigate through chapters and track progress
   - `frontend/dashboard.html`

3. **Chapter Pages**: Dive deep into topics like Complex Numbers & Quadratic Equations
   - `frontend/CN&QE.HTML`

4. **Authentication**: Secure login and signup flow
   - `frontend/login.html`
   - `frontend/signup.html`

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Flexbox, Grid, and animations
- **JavaScript (ES6+)** - Interactive functionality and DOM manipulation
- **React.js** - Chatbot widget component

### Design & UI
- **Google Fonts (Poppins)** - Clean, modern typography
- **Custom CSS Animations** - Smooth transitions and effects
- **Glassmorphism** - Modern UI design pattern

### Storage
- **localStorage** - Client-side state persistence for galaxy selection

### Version Control
- **Git & GitHub** - Source code management and collaboration

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No build tools required - pure HTML/CSS/JS!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pranesh2k6/VIT.git
   cd VIT
   ```

2. **Navigate to the frontend directory**
   ```bash
   cd frontend
   ```

3. **Open in browser**

   **Option 1: Direct file opening**
   - Open `choose-galaxy.html` in your browser to start the experience

   **Option 2: Using a local server (recommended)**
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

   Then navigate to `http://localhost:8000/choose-galaxy.html`

4. **Explore the platform!**
   - Select a galaxy (Maths, Physics, or Chemistry)
   - Navigate through the dashboard
   - Click "Explore" on unlocked chapters
   - Interact with the chatbot widget

---

## 📁 Project Structure

```
VIT/
├── frontend/
│   ├── chatbot/                    # React chatbot widget build
│   │   ├── static/
│   │   │   ├── css/               # Chatbot styles
│   │   │   └── js/                # Chatbot JavaScript bundle
│   │   └── index.html
│   │
│   ├── choose-galaxy.html          # Galaxy selection page
│   ├── choose-galaxy.css           # Galaxy selection styles
│   │
│   ├── dashboard.html              # Main dashboard
│   ├── dashboard.css               # Dashboard styles
│   │
│   ├── login.html                  # Login page
│   ├── login.css                   # Login styles
│   ├── login.js                    # Login functionality
│   │
│   ├── signup.html                 # Signup page
│   ├── signup.css                  # Signup styles
│   ├── signup.js                   # Signup functionality
│   │
│   ├── CN&QE.HTML                  # Complex Numbers chapter page
│   ├── topics.html                 # Topics listing page
│   ├── workenergypower.html        # Physics chapter example
│   ├── forgot password.html        # Password recovery
│   └── jee_full_syllabus_detailed.html  # Complete JEE syllabus
│
├── dataset/
│   ├── maths.json                  # Mathematics questions dataset
│   ├── physics.json                # Physics questions dataset
│   └── chemistry.json              # Chemistry questions dataset
│
├── chatbot-widget/                 # Chatbot source code (React)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore                      # Git ignore rules
└── README.md                       # You are here!
```

---

## 💡 Usage

### User Flow

1. **Start**: Open `choose-galaxy.html`
2. **Select Galaxy**: Click "Enter Galaxy" on your chosen subject
3. **Dashboard**: Automatically redirected with your selection loaded
4. **Explore Chapters**: Click "Explore" on unlocked chapters
5. **Learn**: Access chapter content and interact with the chatbot
6. **Track Progress**: Monitor mastery levels and progress bars

### Key Navigation

- **Galaxy Selection** → **Dashboard** → **Chapter Content**
- Use the subject dropdown in dashboard to switch between galaxies
- Chatbot widget available on all pages for instant help

### LocalStorage Integration

The platform uses localStorage to remember your galaxy selection:
```javascript
// Stored when selecting a galaxy
localStorage.setItem("selectedSubject", "Mathematics");

// Retrieved on dashboard load
const selectedSubject = localStorage.getItem("selectedSubject");
```

---

## 📊 Dataset

The platform includes structured JSON datasets for three subjects:

### Dataset Structure

```json
{
  "subject": "Mathematics",
  "chapters": [
    {
      "title": "Complex Numbers",
      "topics": [...],
      "questions": [
        {
          "id": 1,
          "question": "...",
          "options": [...],
          "answer": "...",
          "difficulty": "medium"
        }
      ]
    }
  ]
}
```

### Available Datasets

- **maths.json** (26KB) - 200+ mathematics problems
- **physics.json** (27KB) - Physics concepts and problems
- **chemistry.json** (30KB) - Chemistry topics and questions

---

## 🗺️ Roadmap

### ✅ Completed
- [x] Space-themed UI design
- [x] Galaxy selection system
- [x] Interactive dashboard
- [x] Chatbot integration
- [x] Authentication pages
- [x] LocalStorage state management
- [x] Responsive design
- [x] Dataset creation

### 🔄 In Progress
- [ ] Backend integration for user data
- [ ] Database for progress tracking
- [ ] Advanced chatbot AI responses
- [ ] More chapter content pages

### 🎯 Future Enhancements
- [ ] User profiles and leaderboards
- [ ] Study streak tracking
- [ ] Timed practice tests
- [ ] Performance analytics
- [ ] Social features (duels, competitions)
- [ ] Video explanations integration
- [ ] Mobile app version
- [ ] Gamification with XP and badges

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write descriptive commit messages
- Test your changes across different browsers
- Update documentation as needed

---

## 👥 Authors

**Pranesh JS**
- GitHub: [@Pranesh2k6](https://github.com/Pranesh2k6)
- Email: praneshsreenivasan5164@gmail.com

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Inspired by the need for engaging JEE preparation platforms
- Space theme concept for making learning fun
- Thanks to all contributors and testers

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/Pranesh2k6/VIT/issues)
- **Email**: praneshsreenivasan5164@gmail.com
- **Repository**: [https://github.com/Pranesh2k6/VIT](https://github.com/Pranesh2k6/VIT)

---

<div align="center">

### ⭐ If you like this project, please give it a star!

**Made with ❤️ for learners everywhere**

[🚀 View Live Demo](#) | [📖 Documentation](#) | [🐛 Report Bug](https://github.com/Pranesh2k6/VIT/issues)

</div>
