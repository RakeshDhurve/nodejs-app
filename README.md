# MEVN Stack Application

A full-stack application built with the MEVN stack (MongoDB, Express.js, Vue.js 3, Node.js) featuring user authentication and a modern UI.

## Features

- **User Authentication**: Login and registration with JWT tokens
- **Modern UI**: Beautiful, responsive design with Vue 3
- **Secure Backend**: Express.js server with MongoDB integration
- **Real-time Validation**: Form validation and error handling
- **Protected Routes**: JWT-based authentication middleware
- **Dashboard**: User profile and system information display

## Tech Stack

### Frontend
- Vue.js 3 (Composition API)
- Vue Router 4
- Vite (Build tool)
- Modern CSS with gradients and animations

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up MongoDB**
   - Install MongoDB locally, or
   - Use MongoDB Atlas (cloud service)
   - Update the connection string in `server/config.env` if needed

4. **Configure environment variables**
   - The default configuration is in `server/config.env`
   - You can modify the MongoDB URI and JWT secret as needed

## Running the Application

### Development Mode (Both Frontend and Backend)
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:5173`

### Running Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/profile` - Get user profile (protected)

### Health Check
- `GET /api/health` - Server health check

## Usage

1. **Start the application** using `npm run dev`
2. **Open your browser** and navigate to `http://localhost:5173`
3. **Register a new account** or login with existing credentials
4. **Explore the dashboard** with your user information and system details

## Project Structure

```
NodePractice/
├── client/                 # Vue.js frontend
│   ├── src/
│   │   ├── views/         # Page components
│   │   │   ├── Login.vue  # Login/Register page
│   │   │   └── Landing.vue # Dashboard page
│   │   ├── App.vue        # Main app component
│   │   └── main.js        # App entry point
│   └── package.json
├── server/                 # Express.js backend
│   ├── index.js           # Main server file
│   └── config.env         # Environment configuration
├── package.json           # Root package.json
└── README.md             # This file
```

## Features in Detail

### Authentication System
- Secure password hashing with bcryptjs
- JWT token-based authentication
- Form validation and error handling
- Automatic token storage in localStorage

### User Interface
- Responsive design that works on all devices
- Modern gradient backgrounds and animations
- Clean, intuitive user experience
- Real-time form validation

### Backend Security
- CORS enabled for cross-origin requests
- Password hashing for security
- JWT middleware for protected routes
- Input validation and error handling

## Customization

### Changing the Database
Update the MongoDB URI in `server/config.env`:
```
MONGODB_URI=mongodb://your-mongodb-uri
```

### Changing the JWT Secret
Update the JWT secret in `server/config.env`:
```
JWT_SECRET=your-custom-secret-key
```

### Adding New Routes
Add new routes in `server/index.js` following the existing pattern.

### Styling
Modify the CSS in the Vue components to match your brand colors and design preferences.

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally, or
- Check your MongoDB Atlas connection string
- Verify network connectivity

### Port Conflicts
- Backend runs on port 5000 by default
- Frontend runs on port 5173 by default
- Change ports in `server/config.env` and `client/vite.config.js` if needed

### CORS Issues
- CORS is already configured for development
- Update CORS settings in `server/index.js` for production

## License

This project is open source and available under the [ISC License](LICENSE). 