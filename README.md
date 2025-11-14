# Job Board Project

A full-stack job board application built with Node.js, Express, MongoDB, and React. This application allows candidates to browse and apply for jobs, and employers to post job listings.

## Features

- **User Authentication**: Register and login as either a candidate or employer
- **Job Listings**: Browse and search for job opportunities
- **Job Applications**: Candidates can apply for jobs with resume upload
- **Employer Dashboard**: Employers can post and manage job listings
- **Candidate Dashboard**: Candidates can track their applications
- **File Upload**: Resume upload functionality with validation

## Project Structure

```
job-board-project/
├── backend/
│   ├── models/          # Mongoose models (User, Job, Application)
│   ├── routes/          # API routes (auth, jobs, dashboard)
│   ├── middleware/      # Authentication middleware
│   ├── uploads/         # Resume uploads directory
│   ├── db.js           # Database connection
│   ├── server.js       # Express server setup
│   └── package.json    # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── job-board-app.jsx  # Main React component
│   │   └── main.jsx            # React entry point
│   ├── index.html      # HTML entry point
│   ├── vite.config.js  # Vite configuration
│   └── package.json    # Frontend dependencies
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Setup Instructions

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd job-board-project/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the backend directory:**
   ```bash
   # Copy the example (if available) or create manually
   ```

4. **Add the following environment variables to `.env`:**
   ```env
   MONGO_URI=mongodb://localhost:27017/jobboard
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5001
   ```

   **Note:** 
   - For local MongoDB: `mongodb://localhost:27017/jobboard`
   - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/jobboard`
   - Generate a strong JWT_SECRET for production (you can use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)

5. **Ensure the uploads directory exists:**
   The `uploads/` directory should already exist with a `.gitkeep` file. If not, create it:
   ```bash
   mkdir uploads
   ```

6. **Start the backend server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npx nodemon server.js
   ```

   The server should start on `http://localhost:5001`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd job-board-project/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend should start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user (candidate or employer)
- `POST /api/auth/login` - Login user

### Jobs
- `GET /api/jobs` - Get all job listings (public)
- `GET /api/jobs/:id` - Get a single job by ID (public)
- `POST /api/jobs` - Create a new job listing (protected, employer only)
- `POST /api/jobs/:id/apply` - Apply for a job (protected, candidate only)

### Dashboard
- `GET /api/dashboard/candidate` - Get candidate's applications (protected, candidate only)
- `GET /api/dashboard/employer` - Get employer's job postings (protected, employer only)

## Usage

1. **Start MongoDB** (if using local installation):
   ```bash
   mongod
   ```

2. **Start the backend server:**
   ```bash
   cd backend
   npm start
   ```

3. **Start the frontend development server:**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Testing the Application

### Register as a Candidate:
- Click "Log In" → "Log in as Candidate"
- Or register via API: `POST /api/auth/register` with:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "candidate"
  }
  ```

### Register as an Employer:
- Register via API: `POST /api/auth/register` with:
  ```json
  {
    "name": "Jane Smith",
    "email": "jane@company.com",
    "password": "password123",
    "role": "employer",
    "company": "TechCorp"
  }
  ```

## Technologies Used

### Backend:
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Validator** - Input validation

### Frontend:
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (via CDN)

## Troubleshooting

### MongoDB Connection Issues:
- Ensure MongoDB is running (if using local installation)
- Check your `MONGO_URI` in the `.env` file
- Verify network connectivity for MongoDB Atlas

### Port Already in Use:
- Change the `PORT` in `.env` file
- Or kill the process using the port

### Missing Dependencies:
- Run `npm install` in both backend and frontend directories
- Delete `node_modules` and `package-lock.json`, then reinstall if issues persist

### File Upload Issues:
- Ensure the `uploads/` directory exists in the backend folder
- Check file permissions on the uploads directory

## Security Notes

- **Never commit `.env` files** to version control
- Use strong, unique `JWT_SECRET` values in production
- Implement rate limiting for production
- Add input sanitization and validation
- Use HTTPS in production
- Implement proper error handling

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests!

