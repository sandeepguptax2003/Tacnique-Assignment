# User Management Application

## Introduction

The User Management Application is a full-stack web application that provides a comprehensive solution for managing user information. This project aims to simplify the process of creating, updating, and deleting user data, making it an essential tool for organizations that need to maintain an efficient and organized user database.

## Project Overview

This project consists of a robust backend API built with Node.js and Express.js, and a modern frontend interface developed using React.js. The backend API handles all the CRUD (Create, Read, Update, Delete) operations for user data, ensuring secure and reliable data management. The frontend, on the other hand, provides an intuitive and user-friendly interface for interacting with the backend, allowing admins to perform various tasks related to user management.

## Features

### Frontend Features
- Responsive and visually appealing user interface
- Dynamic forms for adding and updating user information
- Real-time data display and updates
- Interactive buttons for CRUD operations
- Seamless integration with the backend API

### Backend Features
- RESTful API for user management
- CRUD operations for users
- Robust error handling and validation
- Efficient data storage and retrieval using MongoDB and Mongoose

## Technologies Used

### Frontend Technologies
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Axios (for API requests)
- Material-UI (for UI components and styling)

### Backend Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv (for environment variables)

## Installation

### Backend Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/repo-here
2. **Navigate to the backend directory**:
   ```bash
   cd project-name
3. **Install dependencies**:
   ```bash
   npm install
4. **Set up environment variables**:
   Create a `.env` file in the root directory of the backend project and add the following:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
5. **Start the backend server**:
   ```bash
   nodemon server.js

### Frontend Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/repo-here
2. **Navigate to the frontend directory**:
   ```bash
   cd project-name
3. **Install dependencies**:
   ```bash
   npm install
4. **Start the frontend development server**:
   ```bash
   npm start

## API Endpoints

### User APIs
- Get All Users (GET): `/api/users`
- Create A New User (POST): `/api/users`
- Update User (PUT): `/api/users/:id`
- Delete User (DELETE): `/api/users/:id`

## Backend Deployed Link - https://tacnique-assignment-backend.onrender.com

## Frontend Deployed Link - https://user-management-dashboards.netlify.app/

## Contributing

We welcome contributions to enhance the project! To contribute:

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them thoroughly.
4. Commit your changes with a descriptive message.
5. Push your branch to your forked repository.
6. Create a pull request with a detailed description of your changes.

## Contact

For any queries or suggestions, please feel free to contact the project maintainers.
