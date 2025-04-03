# **DIVI Sleep Tracker**

## **DID WE SLEEP?**

### **Overview**

The **DIVI Sleep Tracker** is a modern web application designed to help users monitor and optimize their sleep patterns, ultimately improving their overall well-being. With an intuitive interface and powerful backend, the application enables users to seamlessly start and end sleep sessions, review historical data, and analyze sleep trends over various time frames (daily, weekly, monthly).

---

## **Features**

### **Frontend Capabilities**
- **Start & End Sleep Sessions**: Users can initiate and conclude sleep sessions effortlessly.
- **Real-time Sleep Tracking**: The application dynamically calculates and displays sleep duration.
- **Comprehensive Sleep History**: Users can review previous sleep records, including start/end times and total hours slept.
- **Intelligent Dashboard**: Provides insightful summaries of daily, weekly, and monthly sleep trends.
- **User Authentication & Session Management**: Secure login and logout functionality to protect user data.

### **Backend Capabilities**
- **JWT-Based Authentication**: Ensures secure user authentication via JSON Web Tokens.
- **Sleep Session Management**: Accurately records and manages sleep session timestamps.
- **Database Integration**: Utilizes PostgreSQL for persistent storage and efficient data retrieval.
- **Robust API Endpoints**:
  - `POST /api/sleep/start` - Initiates a sleep session.
  - `POST /api/sleep/end` - Ends an ongoing sleep session.
  - `GET /api/sleep/history` - Retrieves detailed sleep history.
  - `GET /api/sleep/today` - Fetches total sleep for the current day.
  - `GET /api/sleep/weekly` - Aggregates total sleep duration for the week.
  - `GET /api/sleep/monthly` - Generates sleep insights for the month.

---

## **Technology Stack**

### **Frontend Technologies**
- **React.js** - Component-based framework for building interactive UIs.
- **Context API** - Manages global state efficiently.
- **Axios** - Handles API requests seamlessly.
- **CSS** - Implements responsive and visually appealing styles.

### **Backend Technologies**
- **Node.js** - High-performance JavaScript runtime.
- **Express.js** - Lightweight framework for building RESTful APIs.
- **PostgreSQL** - Reliable and scalable relational database.
- **JWT Authentication** - Secure user authentication system.

---

## **Installation & Setup**

### **Prerequisites**
Ensure you have the following installed:
- **Node.js & npm**
- **PostgreSQL database**

### **Installation Steps**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Adesh-111/divi-sleep-tracker.git
   cd divi-sleep-tracker
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Configure Environment Variables**
   In the `server` directory, create a `.env` file and add:
   ```plaintext
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret
   ```

5. **Start the Backend Server**
   ```bash
   npm start
   ```

6. **Start the Frontend Development Server**
   ```bash
   cd ../client
   npm start
   ```

7. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`

---

## **Project Structure**

```plaintext
/divi-sleep-tracker
│── client/                # Frontend code
│   ├── src/
│   │   ├── assets/        # Images & styles
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # State management (Context API)
│   │   ├── pages/         # Application pages
│   │   ├── App.js         # Main application entry point
│
│── server/                # Backend code
│   ├── models/            # Database schema
│   ├── routes/            # API route handlers
│   ├── controllers/       # Business logic
│   ├── middleware/        # Authentication & error handling
│   ├── server.js          # Express server entry point
│
│── README.md              # Documentation
│── LICENSE                # MIT License
```

---

## **License**
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for further details.

---

## **Contributing**
Contributions are highly encouraged! Feel free to open an issue or submit a pull request if you'd like to enhance the project.

---

## **Contact**
For inquiries or feedback, please contact **Adesh-111**.

---

