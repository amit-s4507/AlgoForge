﻿﻿﻿﻿# 🔥 AlgoForge - Advanced DSA Practice Platform

<div align="center">
  <h3>A modern, comprehensive React application for mastering Data Structures & Algorithms</h3>
  
  ![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
  ![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?style=for-the-badge&logo=vite)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
  ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)
</div>

---

## 🌟 **Live Demo**
🚀 **[AlgoForge Live Application](https://dsa-sheet-qzm5000k7-amits-projects-552f728d.vercel.app)** - Experience the full DSA learning platform!

---

## 📋 **Table of Contents**
- [🎯 Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [📖 Usage Guide](#-usage-guide)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🔧 Development](#-development)
- [🌐 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 **Features**

### 🔥 **Core Functionality**
- **📚 10 Main DSA Topics** - Comprehensive coverage of all essential data structures and algorithms
- **🎯 Hierarchical Learning** - Topics → Subtopics → Problems structure for organized learning
- **📊 Progress Tracking** - Visual progress bars and completion statistics
- **🔥 Activity Heatmap** - GitHub-style activity visualization
- **⚡ Real-time Updates** - Instant progress updates and state persistence

### 🎨 **User Experience**
- **🌟 Modern UI/UX** - Clean, intuitive interface with Tailwind CSS
- **📱 Responsive Design** - Works seamlessly on all devices
- **🚀 Fast Performance** - Optimized with Vite for lightning-fast development
- **🎭 Interactive Components** - Engaging user interface with smooth animations

### 🔐 **Authentication & Profile**
- **🔑 Multiple Login Options** - OAuth2 (Google, GitHub) + Email/Password
- **👤 Comprehensive Profile** - Detailed user statistics and achievements
- **🏆 Achievement System** - Unlock badges as you progress
- **📈 Personal Analytics** - Track your learning journey

### 📚 **Learning Resources**
- **🎥 Apna College Integration** - Direct links to Shradha Khapra's DSA videos
- **📝 Multiple Resource Types** - YouTube, LeetCode, Codeforces, Articles
- **💡 Problem Notes** - Helpful hints and explanations for each problem
- **🏷️ Smart Tagging** - Problems categorized by difficulty and topic

### ⚙️ **Advanced Features**
- **👨‍💻 Admin Mode** - Add/edit problems, topics, and sections
- **💾 Local Storage** - Persistent data with backend-ready architecture
- **🔄 State Management** - Custom reducer for complex state handling
- **📤 Export/Import** - Backup and restore your progress

---

## 🏗️ **Architecture**

### 🎯 **Design Patterns**
- **Component-Based Architecture** - Modular, reusable UI components
- **Custom Hook Pattern** - `useAppReducer` for centralized state management
- **Context API** - Authentication state management
- **Strategy Pattern** - Persistence layer abstraction for easy backend integration

### 📊 **Data Flow**
```
User Actions → Components → useAppReducer → State Updates → UI Re-render
                    ↓
               LocalStorage ← → Future Backend API
```

---

## 🚀 **Quick Start**

### 📋 **Prerequisites**
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Git**

### ⚡ **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/amit-s4507/AlgoForge.git
   cd AlgoForge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional for OAuth)
   ```bash
   cp .envX .env
   # Edit .env with your OAuth credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📖 **Usage Guide**

### 🎯 **Getting Started**
1. **Sign Up/Login** - Use OAuth2 or email/password authentication
2. **Explore Topics** - Navigate to the Topics tab to see 10 main DSA categories
3. **Start Learning** - Click on any topic to see subtopics and problems
4. **Track Progress** - Mark problems as solved and watch your progress grow
5. **View Profile** - Check your statistics, achievements, and activity heatmap

### 📚 **Main Sections**
- **🏠 Practice** - Traditional problem sheets and custom collections
- **📖 Topics** - Comprehensive DSA curriculum with 10 main topics
- **👤 Profile** - Personal dashboard with statistics and achievements

### 🎥 **Learning Resources**
- **Video Links** - Direct access to Apna College DSA tutorials
- **Problem Links** - LeetCode, Codeforces, and other coding platforms
- **Articles** - GeeksforGeeks and other educational content

---

## 🛠️ **Tech Stack**

### 🎨 **Frontend**
- **⚛️ React 18** - Modern React with hooks and functional components
- **⚡ Vite** - Next-generation frontend tooling
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🎭 Lucide React** - Beautiful, customizable icons

### 🔧 **State Management**
- **🪝 Custom Hooks** - `useAppReducer` for complex state logic
- **🌐 Context API** - Authentication and global state
- **💾 LocalStorage** - Client-side persistence

### 🔐 **Authentication**
- **🔑 OAuth2** - Google and GitHub integration
- **📧 Email/Password** - Traditional authentication
- **🔒 Secure Storage** - Environment-based credential management

### 🏗️ **Development Tools**
- **📦 npm** - Package management
- **🧹 ESLint** - Code linting and formatting
- **🔥 Hot Reload** - Instant development feedback

---

## 📁 **Project Structure**

```
AlgoForge/
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   │   ├── 🎯 TopicsView.jsx   # Main topics display
│   │   ├── 👤 ProfilePage.jsx  # User profile & statistics
│   │   ├── 🔐 LoginModal.jsx   # Authentication modal
│   │   ├── 📊 Heatmap.jsx      # Activity visualization
│   │   └── 🎨 Card.jsx         # Reusable card component
│   ├── 📁 contexts/            # React contexts
│   │   └── 🔐 AuthContext.jsx  # Authentication state
│   ├── 📁 hooks/               # Custom React hooks
│   │   └── 🪝 useAppReducer.js # Main state management
│   ├── 📁 data/                # Data and schemas
│   │   ├── 📚 topicsData.js    # 10 DSA topics with problems
│   │   └── 📋 seedData.js      # Initial demo data
│   ├── 📁 utils/               # Utility functions
│   │   ├── 🔧 helpers.js       # Helper functions
│   │   ├── 💾 persistence.js   # LocalStorage wrapper
│   │   └── 🔐 oauth2.js        # OAuth2 implementation
│   ├── 📁 types/               # Type definitions
│   └── 🎯 App.jsx              # Main application component
├── 📄 package.json             # Dependencies and scripts
├── ⚙️ vite.config.js          # Vite configuration
└── 📖 README.md               # Project documentation
```

---

## 🔧 **Development**

### 📝 **Available Scripts**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### 🔧 **Development Setup**
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make changes** and test thoroughly
4. **Commit changes** (`git commit -m 'Add amazing feature'`)
5. **Push to branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### 🎯 **Key Components**
- **`App.jsx`** - Main application with navigation
- **`TopicsView.jsx`** - Displays 10 DSA topics with hierarchical structure
- **`ProfilePage.jsx`** - User profile with statistics and achievements
- **`useAppReducer.js`** - Centralized state management
- **`topicsData.js`** - Complete DSA curriculum data

---

## 🌐 **Deployment**

### 🚀 **AWS Deployment (Recommended)**

#### 📋 **Prerequisites**
- AWS Account
- AWS CLI installed and configured
- Domain name (optional)

#### ⚡ **Deployment Steps**

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to AWS S3 + CloudFront**
   ```bash
   # Install AWS CLI
   npm install -g aws-cli
   
   # Configure AWS credentials
   aws configure
   
   # Deploy with CloudFront CDN (Recommended)
   ./deploy-aws.bat
   
   # Or CloudFront only (if S3 exists)
   ./setup-cloudfront.bat
   ```

3. **CloudFront Benefits**
   - **🌐 Global CDN**: 400+ edge locations worldwide
   - **⚡ Performance**: 40-60% faster load times
   - **🔒 Security**: DDoS protection + free SSL
   - **📊 Analytics**: Detailed usage reports

#### 🔧 **Alternative Deployment Options**
- **Vercel** - `npm i -g vercel && vercel`
- **Netlify** - Drag and drop `dist` folder
- **GitHub Pages** - Use GitHub Actions for automatic deployment

### 🔒 **Environment Variables for Production**
```bash
# .env.production
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_GOOGLE_REDIRECT_URI=https://your-domain.com/auth/callback
VITE_GITHUB_REDIRECT_URI=https://your-domain.com/auth/callback
```

---

## 🎯 **DSA Topics Covered**

### 📚 **Complete Curriculum**
1. **🔢 Arrays** - Traversal, Two Pointers, Sliding Window
2. **📝 Strings** - Manipulation, Pattern Matching, KMP Algorithm
3. **🔗 Linked Lists** - Singly, Doubly, Circular, Advanced Operations
4. **📚 Stacks & Queues** - LIFO/FIFO operations, Applications
5. **🌳 Trees** - Binary Trees, BST, Traversals, Advanced Operations
6. **🕸️ Graphs** - BFS, DFS, Shortest Path, Minimum Spanning Tree
7. **💡 Dynamic Programming** - Memoization, Tabulation, Optimization
8. **🔍 Hashing** - Hash Tables, Collision Resolution, Applications
9. **⛰️ Heaps** - Min/Max Heaps, Priority Queues, Heap Sort
10. **🔍 Sorting & Searching** - All major algorithms, Binary Search variations

### 🎥 **Video Integration**
Direct links to **Apna College's DSA series** by Shradha Khapra for each topic, providing high-quality video explanations.

---

## 🤝 **Contributing**

We welcome contributions! Here's how you can help:

### 🎯 **Ways to Contribute**
- 🐛 **Bug Reports** - Found an issue? Let us know!
- ✨ **Feature Requests** - Have an idea? We'd love to hear it!
- 📝 **Documentation** - Help improve our docs
- 🎨 **UI/UX Improvements** - Make it even more beautiful
- 📚 **Content** - Add more problems, topics, or resources

### 📋 **Contribution Guidelines**
1. **Check existing issues** before creating new ones
2. **Follow code style** - Use ESLint configuration
3. **Write descriptive commits** - Clear commit messages
4. **Test thoroughly** - Ensure changes work as expected
5. **Update documentation** - Keep README and comments updated

---

## 📊 **Project Statistics**

- **📚 10 Main Topics** - Complete DSA coverage
- **🎯 50+ Subtopics** - Detailed learning paths
- **💪 100+ Problems** - Comprehensive problem set
- **🎥 Video Integration** - Apna College series
- **🏆 Achievement System** - Gamified learning
- **📱 Responsive Design** - Works on all devices

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Apna College** - For the excellent DSA video content
- **Shradha Khapra** - For the comprehensive DSA tutorials
- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the beautiful styling system
- **Vite** - For the lightning-fast development experience

---

## 📞 **Contact & Support**

- **GitHub Issues** - [Report bugs or request features](https://github.com/amit-s4507/AlgoForge/issues)
- **Discussions** - [Join community discussions](https://github.com/amit-s4507/AlgoForge/discussions)
- **Email** - [asssahu1910egmailcom](mailto:asssahu1910@gmail.com)

---

<div align="center">
  <h3>🚀 Happy Coding with AlgoForge! 🚀</h3>
  <p>Star ⭐ this repository if you found it helpful!</p>
  
  **Made with ❤️ for the DSA learning community**
</div>