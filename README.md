# MEVN Stack Application

A modern full-stack web application built with the MEVN stack (MongoDB, Express.js, Vue.js, Node.js) featuring user authentication, beautiful UI, and RESTful APIs.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with password hashing
- **Modern UI**: Beautiful, responsive design with Vue.js 3 and Composition API
- **RESTful API**: Express.js backend with MongoDB integration
- **State Management**: Vuex for centralized state management
- **Protected Routes**: Route guards for authenticated users
- **Real-time Validation**: Form validation and error handling
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Technology Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **express-validator**: Input validation

### Frontend
- **Vue.js 3**: Progressive JavaScript framework
- **Vue Router**: Client-side routing
- **Vuex**: State management
- **Axios**: HTTP client
- **CSS3**: Modern styling with gradients and animations

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mevn-application
```

### 2. Install Dependencies
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```bash
cp env.example .env
```

Edit the `.env` file with your configuration:
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGODB_URI=mongodb://localhost:27017/mevn_app
NODE_ENV=development
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows
mongod

# On macOS/Linux
sudo systemctl start mongod
```

### 5. Run the Application

#### Development Mode (Recommended)
```bash
# Terminal 1: Start the backend server
npm run dev

# Terminal 2: Start the frontend development server
npm run client
```

#### Production Mode
```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api/health

## 📚 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User authentication
- `GET /api/profile` - Get user profile (protected)
- `GET /api/health` - Server health check

### Request/Response Examples

#### Register User
```bash
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```bash
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

## 🏗️ Project Structure

```
mevn-application/
├── server/
│   └── index.js          # Express server with API routes
├── client/
│   ├── public/
│   │   └── index.html    # Main HTML file
│   ├── src/
│   │   ├── components/   # Vue components
│   │   ├── views/        # Page components
│   │   ├── router/       # Vue Router configuration
│   │   ├── store/        # Vuex store
│   │   ├── App.vue       # Main app component
│   │   └── main.js       # Vue app entry point
│   ├── package.json      # Frontend dependencies
│   └── vue.config.js     # Vue configuration
├── package.json          # Backend dependencies
├── env.example           # Environment variables template
└── README.md            # This file
```

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Express-validator for API validation
- **CORS**: Cross-origin resource sharing configuration
- **Protected Routes**: Authentication middleware for sensitive endpoints

## 🎨 UI Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Mobile-first approach
- **Gradient Backgrounds**: Beautiful visual effects
- **Loading States**: User feedback during operations
- **Error Handling**: Clear error messages
- **Form Validation**: Real-time input validation

## 🚀 Available Scripts

```bash
# Development
npm run dev              # Start backend in development mode
npm run client           # Start frontend development server
npm run install-all      # Install all dependencies

# Production
npm run build            # Build frontend for production
npm start                # Start production server

# Utilities
npm run lint             # Lint frontend code
```

## 🔧 Configuration

### MongoDB Connection
The application connects to MongoDB at `mongodb://localhost:27017/mevn_app`. You can change this in the `.env` file.

### JWT Secret
Change the JWT secret in the `.env` file for production use.

### Port Configuration
- Backend: Port 5000 (configurable via PORT environment variable)
- Frontend: Port 8080 (configurable in vue.config.js)

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check if the connection string is correct

2. **Port Already in Use**
   - Change the port in `.env` file
   - Kill processes using the port

3. **CORS Issues**
   - Check if the frontend URL is correctly configured
   - Verify CORS settings in server/index.js

4. **JWT Token Issues**
   - Ensure JWT_SECRET is set in `.env`
   - Check token expiration settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Express.js community for the robust backend framework
- MongoDB team for the powerful database
- All contributors and maintainers

---

**Happy Coding! 🎉** 
