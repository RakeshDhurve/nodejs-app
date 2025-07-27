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
   - Client environment files are in `client/env.development` and `client/env.production`

## Environment Configuration

### Client Environment Variables

The application uses environment-specific configuration files for the client:

- **Development**: `client/env.development` - Uses `http://localhost:5000`
- **Production**: `client/env.production` - Uses your production domain

#### Environment Variables Available:
- `VITE_API_URL` - Backend API URL
- `VITE_APP_TITLE` - Application title
- `VITE_APP_VERSION` - Application version
- `VITE_APP_ENV` - Environment name

#### Updating Production URL:
Edit `client/env.production` and change:
```
VITE_API_URL=https://your-domain.com
```

### Server Environment Variables

Server configuration is in `server/config.env`:
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret

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

### Building for Different Environments

**Development build:**
```bash
npm run build:dev
```

**Production build:**
```bash
npm run build:prod
```

**Preview builds:**
```bash
npm run preview:dev    # Preview development build
npm run preview:prod   # Preview production build
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

## Ubuntu Production Deployment

This section provides a complete step-by-step guide to deploy the MEVN application on Ubuntu server.

### Prerequisites

#### 1. Ubuntu Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install curl wget git unzip -y
```

#### 2. Install Node.js
```bash
# Install Node.js 18.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x
```

#### 3. Install MongoDB
```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update and install MongoDB
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
```

#### 4. Install PM2 (Process Manager)
```bash
# Install PM2 globally
sudo npm install -g pm2
```

#### 5. Install Nginx (Web Server)
```bash
# Install Nginx
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify Nginx is running
sudo systemctl status nginx
```

### Deployment Steps

#### Step 1: Clone/Upload Project
```bash
# Create deployment directory
sudo mkdir -p /var/www/mevn-app
sudo chown $USER:$USER /var/www/mevn-app
cd /var/www/mevn-app

# If using Git:
git clone <your-repository-url> .

# Or upload your project files to this directory
```

#### Step 2: Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..

# Install server dependencies
cd server
npm install
cd ..
```

#### Step 3: Configure Environment
```bash
# Create production environment file
sudo nano server/config.env
```

**Add this content:**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mevn-app
JWT_SECRET=your-super-secret-production-key-change-this
```

#### Step 4: Build Frontend
```bash
# Build the Vue.js application
npm run build

# Verify build was successful
ls client/dist/
```

#### Step 5: Configure PM2
```bash
# Create PM2 ecosystem file
nano ecosystem.config.js
```

**Add this content:**
```javascript
module.exports = {
  apps: [{
    name: 'mevn-app',
    script: 'server/index.js',
    cwd: '/var/www/mevn-app',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: '/var/log/pm2/mevn-app-error.log',
    out_file: '/var/log/pm2/mevn-app-out.log',
    log_file: '/var/log/pm2/mevn-app-combined.log'
  }]
}
```

#### Step 6: Start Application with PM2
```bash
# Create PM2 logs directory
sudo mkdir -p /var/log/pm2
sudo chown $USER:$USER /var/log/pm2

# Start the application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the instructions provided by the command above
```

#### Step 7: Configure Nginx
```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/mevn-app
```

**Add this content:**
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # API proxy
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve static files
    location / {
        root /var/www/mevn-app/client/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
}
```

#### Step 8: Enable Nginx Site
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/mevn-app /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### Step 9: Configure Firewall
```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

# Enable firewall
sudo ufw enable

# Check firewall status
sudo ufw status
```

#### Step 10: Setup SSL (Optional but Recommended)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add this line: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Post-Deployment Configuration

#### Systemd Service (Alternative to PM2)
```bash
# Create service file
sudo nano /etc/systemd/system/mevn-app.service
```

**Add this content:**
```ini
[Unit]
Description=MEVN Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/mevn-app
ExecStart=/usr/bin/node server/index.js
Restart=on-failure
Environment=NODE_ENV=production
Environment=PORT=5000

[Install]
WantedBy=multi-user.target
```

#### Log Rotation
```bash
# Create logrotate configuration
sudo nano /etc/logrotate.d/mevn-app
```

**Add this content:**
```
/var/log/pm2/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
}
```

### Maintenance Commands

#### Update Application
```bash
# Stop application
pm2 stop mevn-app

# Pull latest code
git pull origin main

# Install dependencies
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..

# Build frontend
npm run build

# Start application
pm2 start mevn-app
pm2 save
```

#### Backup Database
```bash
# Create backup directory
sudo mkdir -p /var/backups/mongodb

# Backup database
mongodump --db mevn-app --out /var/backups/mongodb/$(date +%Y%m%d_%H%M%S)

# Restore database (if needed)
mongorestore --db mevn-app /path/to/backup/mevn-app/
```

#### Monitor Application
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs mevn-app

# Monitor resources
pm2 monit

# Check Nginx status
sudo systemctl status nginx

# Check MongoDB status
sudo systemctl status mongod
```

### Troubleshooting

#### Common Issues

**1. Application not starting:**
```bash
# Check PM2 logs
pm2 logs mevn-app

# Check if port is in use
sudo netstat -tlnp | grep :5000
```

**2. Nginx not serving files:**
```bash
# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check file permissions
ls -la /var/www/mevn-app/client/dist/
```

**3. MongoDB connection issues:**
```bash
# Check MongoDB status
sudo systemctl status mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

**4. Permission issues:**
```bash
# Fix ownership
sudo chown -R www-data:www-data /var/www/mevn-app

# Fix permissions
sudo chmod -R 755 /var/www/mevn-app
```

### Performance Optimization

#### Nginx Optimization
```nginx
# Add to nginx.conf
worker_processes auto;
worker_connections 1024;
keepalive_timeout 65;
client_max_body_size 10M;
```

#### Node.js Optimization
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=2048"
```

#### MongoDB Optimization
```bash
# Edit MongoDB configuration
sudo nano /etc/mongod.conf

# Add these settings:
storage:
  wiredTiger:
    engineConfig:
      cacheSizeGB: 1
```

### Deployment Checklist

- [ ] Ubuntu server updated
- [ ] Node.js installed
- [ ] MongoDB installed and running
- [ ] PM2 installed
- [ ] Nginx installed
- [ ] Project files uploaded
- [ ] Dependencies installed
- [ ] Environment configured
- [ ] Frontend built
- [ ] PM2 application started
- [ ] Nginx configured
- [ ] Firewall configured
- [ ] SSL certificate installed (optional)
- [ ] Application accessible via domain
- [ ] Database backup configured
- [ ] Monitoring setup

### Your Application is Now Live!

Your MEVN application should now be accessible at:
- **HTTP**: `http://your-domain.com`
- **HTTPS**: `https://your-domain.com` (if SSL configured)

**Next Steps:**
1. Test all functionality
2. Set up monitoring
3. Configure backups
4. Set up CI/CD pipeline
5. Monitor performance

## License

This project is open source and available under the [ISC License](LICENSE). 