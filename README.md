# MEVN Full-Stack Application

A comprehensive full-stack application built with the MEVN stack (MongoDB, Express.js, Vue.js 3, Node.js) featuring user authentication, profile management, and a modern dashboard interface.

## Features

### Core Features
- **User Authentication**: Secure login and registration with JWT tokens
- **Profile Management**: Update user information and change passwords
- **Settings Management**: Customize application preferences and themes
- **Analytics Dashboard**: Monitor session statistics and system performance
- **Real-time Validation**: Form validation and error handling
- **Protected Routes**: JWT-based authentication middleware
- **Responsive Design**: Works seamlessly on all devices

### Advanced Features
- **Multi-tab Navigation**: Dashboard, Profile, Settings, and Analytics tabs
- **Session Tracking**: Real-time session duration and activity monitoring
- **Theme Support**: Light/dark mode toggle
- **Settings Persistence**: User preferences saved to database
- **Activity Logging**: Track user actions and system events
- **API Health Monitoring**: Real-time server status checks

## Tech Stack

### Frontend
- Vue.js 3 (Composition API)
- Vue Router 4
- Vite (Build tool)
- Modern CSS with gradients and animations
- Responsive design with CSS Grid and Flexbox

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled
- RESTful API design

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
- `PUT /api/auth/change-password` - Change user password

### User Management
- `GET /api/profile` - Get user profile (protected)
- `PUT /api/profile` - Update user profile (protected)
- `DELETE /api/profile` - Delete user account (protected)

### Settings
- `GET /api/settings` - Get user settings (protected)
- `PUT /api/settings` - Update user settings (protected)

### System
- `GET /api/health` - Server health check
- `GET /api/info` - Server information
- `GET /api/users` - Get all users (protected)

## Application Structure

### Dashboard Tab
- User profile information
- Authentication status
- System information
- Quick action buttons

### Profile Tab
- Update personal information
- Change password functionality
- Form validation and error handling

### Settings Tab
- Theme preferences (light/dark mode)
- Notification settings
- Auto-refresh configuration
- Session timeout settings
- API configuration

### Analytics Tab
- Session statistics
- System performance metrics
- Recent activity log
- Real-time session tracking

## Usage

1. **Start the application** using `npm run dev`
2. **Open your browser** and navigate to `http://localhost:5173`
3. **Register a new account** or login with existing credentials
4. **Explore the dashboard** with multiple tabs and features:
   - **Dashboard**: Overview of your account and system status
   - **Profile**: Update your personal information and security settings
   - **Settings**: Customize your application preferences
   - **Analytics**: Monitor your usage and system performance

## Features in Detail

### Authentication System
- Secure password hashing with bcryptjs
- JWT token-based authentication
- Form validation and error handling
- Automatic token storage in localStorage
- Session management and tracking

### User Interface
- Responsive design that works on all devices
- Modern gradient backgrounds and animations
- Clean, intuitive user experience
- Real-time form validation
- Loading states and error handling
- Tab-based navigation system

### Backend Security
- CORS enabled for cross-origin requests
- Password hashing for security
- JWT middleware for protected routes
- Input validation and error handling
- User session tracking

### Database Features
- User profile management
- Settings persistence
- Activity logging
- Session tracking
- Secure password storage

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

### Adding New Features
- Add new API endpoints in `server/index.js`
- Create new Vue components in `client/src/components/`
- Add new routes in `client/src/main.js`
- Update the navigation tabs in `client/src/views/Landing.vue`

### Styling
Modify the CSS in the Vue components to match your brand colors and design preferences.

## Project Structure

```
NodePractice/
├── client/                 # Vue.js frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   └── LoadingSpinner.vue
│   │   ├── views/         # Page components
│   │   │   ├── Login.vue  # Login/Register page
│   │   │   └── Landing.vue # Full-page dashboard
│   │   ├── App.vue        # Main app component
│   │   └── main.js        # App entry point
│   └── package.json
├── server/                 # Express.js backend
│   ├── index.js           # Main server file
│   └── config.env         # Environment configuration
├── package.json           # Root package.json
└── README.md             # This file
```

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

### Performance Issues
- Check browser console for errors
- Verify API endpoints are responding
- Monitor network requests in browser dev tools

## Future Enhancements

- User roles and permissions
- File upload functionality
- Real-time notifications
- Advanced analytics and reporting
- Email verification
- Password reset functionality
- Social media authentication
- API rate limiting
- Database backup and recovery

## License

This project is open source and available under the [ISC License](LICENSE). 