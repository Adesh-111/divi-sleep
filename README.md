# DIVI Sleep Tracker

## Overview

DIVI Sleep Tracker is a web application designed to help users track their sleep patterns and improve their overall well-being. The application allows users to start and end sleep sessions, view sleep history, and monitor their sleep duration over different periods (daily, weekly, monthly).

## Features

### Frontend

- **Start and End Sleep Sessions**: Users can start and end sleep sessions with a simple button click.
- **Track Sleep Duration**: The application tracks and displays the duration of sleep sessions.
- **View Sleep History**: Users can view their sleep history, including start and end times and total sleep duration.
- **Dashboard**: The dashboard provides a summary of total sleep time for today, the week, and the month.
- **Logout**: Users can log out of the application.

### Backend

- **Authentication**: Secure authentication using JWT tokens.
- **Session Management**: Start and end sleep sessions with accurate time tracking.
- **Data Storage**: Store and retrieve sleep session data using PostgreSQL.
- **API Endpoints**: Provide RESTful API endpoints for frontend interaction.
  - **POST /api/sleep/start**: Start a new sleep session.
  - **POST /api/sleep/end**: End the current sleep session.
  - **GET /api/sleep/history**: Retrieve the user's sleep history.
  - **GET /api/sleep/today**: Get the total sleep for today.
  - **GET /api/sleep/weekly**: Get the total sleep for the current week.
  - **GET /api/sleep/monthly**: Get the total sleep for the current month.

## Technologies Used

### Frontend

- **React**: Frontend framework for building user interfaces.
- **Context API**: For state management.
- **Axios**: For making HTTP requests to the backend API.
- **CSS**: For styling the application.

### Backend

- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web framework for building RESTful APIs.
- **PostgreSQL**: Relational database for storing sleep session data.
- **JWT**: JSON Web Tokens for secure authentication.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- PostgreSQL database set up and running.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Adesh-111/divi-sleep-tracker.git
   cd divi-sleep-tracker
   ```

2. Install frontend dependencies:

   ```bash
   cd client
   npm install
   ```

3. Install backend dependencies:

   ```bash
   cd ../server
   npm install
   ```

4. Set up environment variables in the `server` directory:

   Create a `.env` file and add the following:

   ```plaintext
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret
   ```

5. Start the backend server:

   ```bash
   npm start
   ```

6. Start the frontend development server:

   ```bash
   cd ../client
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

The project is structured as follows:

- **client**: Contains the frontend code.
  - **src**: Source code for the React application.
    - **assets**: Contains assets like images and styles.
    - **components**: Contains reusable components.
    - **context**: Contains the AuthContext for state management.
    - **pages**: Contains the main pages of the application.
    - **App.js**: The main entry point for the React application.
- **server**: Contains the backend code.
  - **models**: Database models for PostgreSQL.
  - **routes**: API route handlers.
  - **controllers**: Business logic for handling requests.
  - **middleware**: Authentication and error handling middleware.
  - **server.js**: Main entry point for the Express server.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you would like to contribute to this project.

## Contact

For any questions or inquiries, please contact Adesh-111.
