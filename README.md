User Signup and Login Page - MERN Stack

This project is a user authentication system built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to register, log in, and securely authenticate using JSON Web Tokens (JWT). The app includes a responsive and user-friendly interface for both signup and login pages, leveraging Bootstrap for styling.

Key Features:

User Registration: Users can create an account by providing a name, email, and password. Passwords are hashed using bcrypt for enhanced security.

Login Authentication: Users can log in using their email and password. JWT tokens are used for user authentication, ensuring secure access to private routes.

Token Storage: JWT tokens are stored in the browser's local storage, ensuring the user remains authenticated across sessions.

Error Handling: Proper error messages and success notifications are displayed using React Toastify.

Responsive UI: The frontend is styled with Bootstrap to ensure a mobile-friendly and responsive design.


Technologies Used:

Frontend: React.js, React Router, Bootstrap, React Toastify

Backend: Node.js, Express.js, MongoDB, bcrypt.js, JWT (JSON Web Token)

Security: Password hashing with bcrypt, JWT-based user authentication


Installation:

To run the project locally:

Clone the repository: git clone https://github.com/2005pavitra/MERN-Deploy-1.git

Navigate to the backend folder and install dependencies:


cd backend

npm install

Navigate to the frontend folder and install dependencies:

cd frontend

npm install

Set up your MongoDB connection in .env file.

Run both the frontend and backend servers:

Backend: npm start (Port 8080)

Frontend: npm start (Port 3000)
How It Works:
Upon successful signup or login, the user is redirected to a secure home page.
The app ensures that only authenticated users can access certain pages by verifying the JWT token stored in local storage.
